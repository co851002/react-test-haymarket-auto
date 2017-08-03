#!/usr/bin/env groovy

node() {
    currentBuild.result = "SUCCESS"
    def outputs
    def url
    def slackchannel = '#whatcar-rebuild'
    if (env.Environment == "ci") {
        try {
            stage("Checkout") {
                checkout scm
            }
            stage("Build") {
                echo "Building image for ${namespace}/${env.App} commit ${env.GIT_COMMIT}"
                sh "docker build -t ${namespace}/${env.App} ."
                echo "Tagging and pushing image"
                sh "eval \$(aws ecr get-login --region eu-west-1)"
                sh "docker tag ${env.Namespace}/${env.App}:latest 882365948249.dkr.ecr.eu-west-1.amazonaws.com/${env.Namespace}/${env.App}:${env.Version}"
                sh "docker push 882365948249.dkr.ecr.eu-west-1.amazonaws.com/${env.Namespace}/${env.App}:${env.Version}"
            }
            stage("Deploy") {
                def appid = "${env.Environment}-${env.Namespace}-${env.App}-${env.Version}"
                echo "Deploying to ${env.Environment}, stack ${appid}"
                outputs = cfnUpdate(stack:"${appid}", file:"./App.yaml", params:["appid=${appid}","namespace=${env.Namespace}","environment=${env.Environment}","app=${env.App}","tag=${env.Version}"])
                writeFile file: "output/appurl.txt", text:outputs["AppURL"]
            }
            stage("Tests - cURL") {
                url = readFile('output/appurl.txt')
                echo "Running basic (HTTP Status) tests against ${url}"
                sh "for i in {1..5}; do sleep 1; curl --fail -sn ${url}; done"
            }
            stage("Tests - Behavioural") {
                if (params.run_behavioural_tests == true) {
                    echo "Running behavioural tests against ${url}"
                    build job: 'Aphrodite - Behavioural Tests', parameters: [
                        string(name: 'url', value: "https://ci-whatcar-aphrodite-frontend-${env.Version}.whatcardev.haymarket.com"),
                        string(name: 'branch', value: 'master')
                    ]
                }
            }
            wrap([$class: 'BuildUser']) {
                slackSend(
                    channel: slackchannel, color: '#37b12d',
                    message: "CI: Successfully completed build #${env.Version} of ${env.JOB_NAME} (AWS)\nBranch/Tag/Revision: ${env.Branch}\nBuilt by: ${BUILD_USER} (@${BUILD_USER_ID})"
                )
            }
        } catch (err) {
            currentBuild.result = "FAILURE"
            wrap([$class: 'BuildUser']) {
                slackSend(channel: slackchannel, color: '#e30613', message: "CI: Failed to build ${env.JOB_NAME} (AWS)\nBranch/Tag/Revision: ${env.Branch}\nBuilt by: ${BUILD_USER} (@${BUILD_USER_ID})")
            }
            throw err
        } finally {
            stage("TearDown") {
                def appid = "${env.Environment}-${env.Namespace}-${env.App}-${env.Version}"
                echo "Removing stack ${appid}"
                cfnDelete(stack:"${appid}")
                echo "Removing image for ${env.Namespace}/${env.App} commit ${env.GIT_COMMIT}"
                sh "eval \$(aws ecr get-login --region eu-west-1)"
                sh "docker rmi 882365948249.dkr.ecr.eu-west-1.amazonaws.com/${env.Namespace}/${env.App}:${env.Version}"
                sh "docker rmi ${env.Namespace}/${env.App}"
            }
        }

    }  else {
        try {
            stage("Checkout") {
                checkout scm
            }
            stage("Deploy") {
                def appid = "${env.Environment}-${env.Namespace}-${env.App}"
                echo "Deploying to ${env.Environment}, stack ${appid}"
                outputs = cfnUpdate(stack:"${appid}", file:"./App.yaml", params:["appid=${appid}","namespace=${env.Namespace}","environment=${env.Environment}","app=${env.App}","tag=${env.Version}",])
            }
            wrap([$class: 'BuildUser']) {
                slackSend(channel: slackchannel, color: '#37b12d', message: "Successfully deployed ${env.App} (build: ${env.Version}) to ${env.Environment} (AWS)\nBranch/Tag/Revision: ${env.Branch}\nBuilt by: ${BUILD_USER} (@${BUILD_USER_ID})\n${outputs["AppURL"]}")
            }
        } catch (err) {
            currentBuild.result = "FAILURE"
            wrap([$class: 'BuildUser']) {
                slackSend(channel: slackchannel, color: '#e30613', message: "Failed to deploy ${env.App} to ${env.Environment} (AWS)\nBranch/Tag/Revision: ${env.Branch}\n${outputs["AppURL"]}\nBuilt by: ${BUILD_USER} (@${BUILD_USER_ID})")
            }
            throw err
        }
    }
}
