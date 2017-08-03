# Front End architecture

## Glossary
- [NPM commands](#npm-commands)
- [File structure](#file-structure)
- [Creating a component, reducer, etc.](#creating-a-component-reducer-etc-)

## Instructions

### npm start
Starts the development servers that have hot module reloading so you can
develop without restarting the server.
This command has a npm i check before starting the app, so no need to run it separately.

### npm run test
Runs the unit tests of the application.

### npm run test-nocov
Runs the unit tests of the application without the code coverage.

## File structure
The application lives in the src folder. There is also the config folder that contains the webpack configuration and the path resolvers.

The src folder contains the following structure.

```
src
|- actions
|- api
|- client
|- components
|- reducers
|- routes
|- sagas
|- server
|- themes
```

### actions
Actions used by redux. The file actionTypes.js should contain only constants describing the action to perform. If an action requires a function it should be extracted into a separate file.

### api
Contains general API function used within the applications.

### client
Contains the entry point of the React application on the frontend.

### server
Contains the server side rendering logic for the application as well within the api folder you would store API endpoint routes.

#### server.dev.js
Contains a small server for development to allow using real API calls.

### components
Folder containing components used within the React application, which render in one way or another JSX nodes.

Has the following structure.

```
components
|- presentational
|- containers
|- hoc
|- rootContainers
```

#### presentational
Contain React components which do not contain any logic. All properties are passed down from the container or high order component.

#### hoc
Contain High Order Components. A Higher Order Component is just a React Component that wraps another one. These components enhance the wrapped one and add logic or extra functionalities to it. 
They can be used in order to share common functionalities across the application.
They can also be decorated with the connect function of Redux.

#### containers
Components that contain several presentational components and are used to lift the state.

#### rootContainers
Entry points of specific routes. These components contain the basic layout structure.

### reducers
Reducer functions that return a new state depending on an action passed. Should be tested with deepFreeze

### sagas
Contains sagas (generator functions) that handle async actions such as fetching external API data.

### routes
Contains react-router routes.

### themes
Contains styling of the application.

## Creating a component, reducer, etc.
When creating a new component, reducer, saga, etc. you should create the folder with the name of the component you're adding in a designated folder inside ./src. Within that folder you would have an index.js, which will conatin the implementation of your component. For testing you add the file [YourComponentName].test.js.

For example you want to add a new presentational component named ItemList. Then you would have the following structure.

```
src
|- components
   |- presentational
      |- ItemList
         |- index.js
         |- ItemList.test.js
```
### Why index.js?
We use the following convention to simplify the import statements. If you name the js file as the component then you would need to write the following import statement:

```javascript
import ItemList from 'presentational/ItemList/ItemList';
```

The index.js will resolve into a simpler form like this:

```javascript
import ItemList from 'presentational/ItemList';
```

# Debugging front end in VS Code  

 - Follow steps in https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f
 - In webpack.common.js, change devtool to 'cheap-module-eval-source-map'
 - Edit launch.json to be  
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "sourceMaps": true,
            "webRoot": "${workspaceRoot}/*",
            "sourceMapPathOverrides": {
                "webpack:///*": "${workspaceRoot}/*"
            }
        }
    ]
}
```