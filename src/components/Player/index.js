import styles from './styles.module.scss';
import {useContext} from 'react';
import {PlayerContext} from '../../contexts/playerContext';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Player(){
    const {episodesList, currentEpisodesIndex, isPlaying, tooglePlay} = useContext(PlayerContext);

    const ep = episodesList[currentEpisodesIndex];
    
	return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="tocando agora" />
                <strong>Tocando Agora </strong>
            </header>

            {ep ? <div className={styles.currentEpisode}>
                <Image width={992} height={992} src={ep.thumb} objectFit='cover' />
                <strong>{ep.title}</strong>
                <span>{ep.members}</span>
            </div> : <div className={styles.emptyPlayer}><strong>Selecione um Podcast para ouvir...</strong></div>}

            <footer className={!ep ? styles.empty : ''}>
                 <div className={styles.progress}>
                 	<span>00:00</span>
                 	<div className={styles.slider}>
                 	   {ep ?  <Slider trackStyle={{backgroundColor: '#04361'}} realStyle={{backgroundColor: '#975FF'}} handleStyle={{borderColor: '#04361', borderWidth: 4}} /> : <div className={styles.emptySlider}></div>}
                 	</div>
                 	<span>00:00</span>
                 </div>

                 {ep && 
                     <audio src={ep.url} autoPlay />
                 }

                 <div className={styles.buttons}>
                 	<button type="button" disabled={!ep}>
                 		<img src="/shuffle.svg" alt="tocar aleatorio" />
                 	</button>
                 	<button type="button" disabled={!ep}>
                 		<img src="/play-previous.svg" alt="tocar anterior" />
                 	</button>
                 	<button type="button" disabled={!ep} onClick={tooglePlay()} className={styles.playButton}>
                 		{!isPlaying ? <img src="/play.svg" alt="tocar" /> : <img src="/pause.svg" alt="pausar" />}
                 	</button>
                 	<button type="button">
                 		<img src="/play-next.svg" disabled={!ep} alt="tocar proximo" />
                 	</button>
                 	<button type="button" disabled={!ep} onClick={() => play()}>
                 		<img src="/repeat.svg" alt="repetir" />
                 	</button>
                 </div>
                 
            </footer>
        </div>
    );
}