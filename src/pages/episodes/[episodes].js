import {useRouter} from 'next/router';
import {api} from '../../services/api';
import { format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../../services/covertDurationToTimeString';
import styles from './episode.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Episode({ep}) {
	
	const router = useRouter();

	return (
            <div className={styles.episodeContainer}>
                 <div className={styles.thumbnailContainer}>
                     <Link href="/"><button type="button"><img src="/arrow-left.svg" /></button></Link>
                     <Image width={700} height={160} src={ep.thumb} objectFit="cover" />
                     <button type="button"><img src="/play.svg" alt="tocar episódio" /></button>
                 </div>
                 <header>
                     <h1>{ep.title}</h1>
                     <span>{ep.members}</span>
                     <span>{ep.publishedAt}</span>
                     <span>{ep.durationAsString}</span>
                 </header>

	             <div className={styles.description} dangerouslySetInnerHTML={{__html: ep.description}} />
        
             </div>
	)
}

export const getStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking'
	}

}

export const getStaticProps = async context => {
	const {params} = context;

	const {data} = await api.get(`episodes/${params.episodes}`); 

	const ep = 
		  {
			id: data.id,
			title: data.title,
			thumb: data.thumbnail,
			members: data.members,
			description: data.description,
			publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale: ptBR}),
			duration: Number(data.file.duration),
			durationAsString: convertDurationToTimeString(Number(data.file.duration)),
			url: data.file.url,
		};


	return {
		props: {
			ep
		},
		revalidate: 60 * 60 * 24
	}
	
}