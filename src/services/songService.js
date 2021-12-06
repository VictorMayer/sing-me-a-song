import * as songRepository from '../repositories/songRepository.js';

async function saveSong(song) {
    const initialScore = 0;

    const recommendation = {
        name: song.name,
        youtubeLink: song.youtubeLink,
        score: initialScore,
    };

    return songRepository.createSong(recommendation);
}

async function upvote(id) {
    return songRepository.updateSongScore(id, 1);
}

async function downvote(id) {
    const score = await songRepository.findSong(id);

    if (score <= -5) return songRepository.deleteSong(id);

    return songRepository.updateSongScore(id, -1);
}

async function getRandomSong() {
    const randomNum = Math.floor(Math.random() * 100);
    //                                                        // maximum value of type bigint
    if (randomNum < 70) return songRepository.getSong({ min: 10, max: 9223372036854775807n });

    if (randomNum > 70) return songRepository.getSong({ min: -5, max: 10 });

    return null;
}

async function getSongList(amount) {
    return songRepository.getSongList(amount);
}

export {
    saveSong,
    upvote,
    downvote,
    getRandomSong,
    getSongList,
};
