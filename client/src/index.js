/*
 Dependencies Installed
 --------------------------
 
 1) React redux -> Redux is an open-source JavaScript library for managing and centralizing application state. React Redux is the official React UI bindings layer for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update state. The Redux store is the main, central bucket which stores all the states of an application

 2) Redux toolkit -> The Redux Toolkit package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:

        a) "Configuring a Redux store is too complicated"
        b) "We have to add a lot of packages to get Redux to do anything useful"
        c) "Redux requires too much boilerplate code"
 This package is deliberately limited in scope. It does not address concepts like "reusable encapsulated Redux modules", folder or file structures, managing entity relationships in the store, and so on.

 Redux Toolkit also includes a powerful data fetching and caching capability that we've dubbed "RTK Query". It's included in the package as a separate set of entry points. It's optional, but can eliminate the need to hand-write data fetching logic yourself.

 3) Redux Persist -> Redux Persist is a tool used to seamlessly save the application's Redux state object to AsyncStorage. We can selectively store states in local storage if required.

 4) React dropzone -> component that can handle file upload and file handling on the frontend so that we can transfer information to the backend

 5) formik -> Formik is a small group of React components and hooks for building forms in React and React Native. It helps with the three most annoying parts: Getting values in and out of form state. Validation and error messages.

 6) Yup -> Yup is a JavaScript schema builder for value parsing and validation. Define a schema, transform a value to match, validate the shape of an existing value, or both. Yup schema is extremely expressive and allows modelling complex, interdependent validations, or value transformations.

 7) react-router-dom

 8) MUI -> Material UI is an open-source React component library that implements Google's Material Design. It includes a comprehensive collection of prebuilt components that are ready for use in production right out of the box. Material-UI is designed for rapid prototyping, increasing overall software development velocity, and creating user interfaces at speed. It helps developers spend more time on the logical layers of their apps rather than wrangling with CSS-related interface elements. The perk of Material-UI is that it is made for React.

*/

/*
Folder Structure and Architecture
------------------------------------
1) The initial setup for file is divided into different pages and its sections (scenes) -> ex : Navbar , homepage etc  and widgets like email section , friendList etc.

2) the folders in scenes (excluding widgets) are set up for the layouts of our components

3) components folder has reusable components to use throughout the project

4) State folder has redux and toolkit information.

*/

/*
1) We are getting the exported authReducer from our state's index.js file to the main index.js.

2) If we are using redux-persist, we will have to do some extra imports on the main index file like the one having persistStore and other modules

3) Redux persist is used to save all the information regarding our states in local storage i.e cache storage

*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: "root", storage, version : 1};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer : persistedReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck : {
      ignoredActions : [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] //ignore some persist warnings coming from these
    }
  })
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store = {store}>
    <PersistGate loading = {null} persistor = {persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>
  </React.StrictMode>
);
