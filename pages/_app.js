import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { combineReducers,configureStore } from '@reduxjs/toolkit';
import bookmark from '../reducers/bookmark';


import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';


const reducerLocal = combineReducers({bookmark})
const persistConfig = {key:'oussnews' , storage}


const store = configureStore({
  reducer:persistReducer(persistConfig,reducerLocal),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),  

})

const persistor = persistStore(store);


function App({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Head>
        <title>OUSSNEWS</title>
      </Head>
      <Component {...pageProps} />
      </PersistGate>
      </Provider>
    </>
  );
}

export default App;




 