import {createContext} from 'react';

export const PlayerContext = createContext({
	episodesList: Array,
	currentEpisodeIndex: Number,
	isPlaying: Boolean,
	play: function(){},
	tooglePlay: function(){}
});