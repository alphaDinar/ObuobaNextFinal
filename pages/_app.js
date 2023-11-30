import Head from 'next/head'
import '../styles/globals.css'
import Loader from './Components/Loader'
import { createContext, useContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { fireAuth, fireStoreDB } from '../Firebase/base';

const LoaderContext = createContext();
export const LoaderProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
export const useLoader = () => {
  return useContext(LoaderContext);
};

const PlayingContext = createContext();
export const PlayingProvider = ({ children }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <PlayingContext.Provider value={{ playing, setPlaying }}>
      {children}
    </PlayingContext.Provider>
  );
};
export const usePlaying = () => {
  return useContext(PlayingContext);
};

function MyApp({ Component, pageProps }) {
  return (
    <LoaderProvider>
      <PlayingProvider>
        <Head>
          <script src="https://kit.fontawesome.com/eb75260fb3.js" crossorigin="anonymous" async/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,0" />
        </Head>
        <Loader />
        <Component {...pageProps} />
      </PlayingProvider>
    </LoaderProvider>
  )
}

export default MyApp
