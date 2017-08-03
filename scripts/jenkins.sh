#!/bin/bash

SERVER="https://jenkins.whatcardev.haymarket.com"
JOB="CI%20-%20Aphrodite%20-%20Frontend"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
API_TOKEN="ci_user:af88566682ae0da6506886f883a27204"
TRIGGER_URL="${SERVER}/job/${JOB}/buildWithParameters?token=tokenABT&branch_tag_revision=${BRANCH}"
CRUMB=$(curl --user $API_TOKEN \
    $SERVER/crumbIssuer/api/xml?xpath=concat\(//crumbRequestField,%22:%22,//crumb\))

echo "Calling jenkins with crumb: ${CRUMB}"
curl -v -XPOST --silent --show-error \
    --user $API_TOKEN \
    -H "${CRUMB}" $TRIGGER_URL
