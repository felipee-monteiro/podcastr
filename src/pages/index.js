import styles from './styles/styles.module.scss';
import Image from 'next/image';
import {api} from '../services/api';
import {useContext} from 'react';
import { format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../services/covertDurationToTimeString';
import Link from 'next/link';
import {PlayerContext} from '../contexts/playerContext';

export default function Home({episodes, latestEpisodes, allEpisodes}) {
    
    const {play} = useContext(PlayerContext);
    
    return (
        <div className={styles.article}>
        	<section className={styles.latestEpisodes}>
        		<h2>últimos lançamentos</h2>

        		<ul>
        			{latestEpisodes.map(ep => {
        				return (
        					<li key={ep.id}>
        					     <Image width={192} height={192} objectFit='cover' src={ep.thumb} alt={ep.title} />
        					
                                 <div className={styles.episodeDetails}>
                                 	<Link href={`/episodes/${ep.id}`}>{ep.title}</Link>
                                 	<p>{ep.members}</p>
                                 	<span>{ep.publishedAt}</span>
                                 	<span>{ep.durationAsString}</span>
                                 </div>

                                 <button type="button" onClick={() => play(ep)}>
                                 	<img src="/play-green.svg" alt="tocar episodio"/>
                                 </button>
        					</li>
                        )})
        		    }
        		</ul>
        	</section>

        	<section className={styles.allEpisodes}>
                 <table cellSpacing={0}>
                     <thead>
                        <th></th>
                        <th>Podcast</th>
                        <th>Integrantes</th>
                        <th>Data</th>
                        <th>Duração</th>
                     </thead>
                     <tbody>
                        {allEpisodes.map(ep => {
                        	return (
                               <tr key={ep.id}>
                                   <td style={{width: 100}}><Image src={ep.thumb} width={120} height={120} alt={ep.title} objectFit='cover' /></td>

                                   <td style={{width: 250, padding: 2}}><Link href={`/episodes/${ep.id}`}>{ep.title}</Link></td>

                                   <td style={{width: 250}}>{ep.members}</td>

                                   <td style={{width: 100}}>{ep.publishedAt}</td>

                                   <td>{ep.durationAsString}</td>

                                   <td><button type="button"><img src="/play-green.svg" alt="play" /></button></td>
                               </tr>
                        	)
                        })}
                     </tbody>
                 </table>
        	</section>
        </div>
    )
}

export const getStaticProps = async () => {
	const {data} = await api.get('episodes', {
		params: {
			_limit: 12,
			_sort: 'published_at',
			_order: 'desc'
		}
	});

	const episodes = data.map(ep => {
		return {
			id: ep.id,
			title: ep.title,
			thumb: ep.thumbnail,
			members: ep.members,
			publishedAt: format(parseISO(ep.published_at), 'd MMM yy', {locale: ptBR}),
			duration: Number(ep.file.duration),
			durationAsString: convertDurationToTimeString(Number(ep.file.duration)),
			url: ep.file.url,
		}
	});

	const latestEpisodes = episodes.slice(0, 2);

    const allEpisodes = episodes.slice(2, episodes.length);

	return {
		props: {
			episodes,
			latestEpisodes,
			allEpisodes
		},
		revalidate: 60 * 60 * 8
	}
}
