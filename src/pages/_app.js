import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import Header from '../components/Header';
import Player from '../components/Player';
import {useState} from 'react';

import { PlayerContext } from '../contexts/playerContext';

function MyApp({ Component, pageProps }) {
  const [episodesList, setEpisodesList] = useState([]);
  const [currentEpisodesIndex, setCurrentEpisodesIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(ep) {
       setEpisodesList([ep]);
       setCurrentEpisodesIndex(0);
       setIsPlaying(true);
  }

  function tooglePlay() {
       setIsPlaying(!isPlaying);
  }


  return (
  <PlayerContext.Provider value={{episodesList, currentEpisodesIndex, play, isPlaying, tooglePlay}}>
     <div className={styles.appWrapper}>
        <main>
     	    <Header />
          <Component {...pageProps} />    
        </main>
        <Player/>
     </div>
  </PlayerContext.Provider>
  );
}

export default MyApp;