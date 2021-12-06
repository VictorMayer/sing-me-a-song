/* eslint-disable no-undef */
import * as songFactory from '../factories/songFactory.js';
import * as songService from '../../src/services/songService.js';
import * as songRepository from '../../src/repositories/songRepository.js';

describe('Song Service', () => {
    it('Should add the property score on the object passed as parameter and return undefinded', async () => {
        jest.spyOn(songRepository, 'createSong').mockImplementationOnce(() => {});

        const result = await songService.saveSong({
            name: 'marcelinho',
            youtubeLink: 'https://www.youtube.com/watch?v=0e3GPea1Tyg&t=79&ab_channel=MrBeast',
        });

        expect(result).toBe(undefined);
    });

    it('Should call deleteSong based on score returned by findSong to be less than -5', async () => {
        jest.spyOn(songRepository, 'findSong').mockImplementationOnce(() => -6);
        jest.spyOn(songRepository, 'deleteSong').mockImplementationOnce(() => 'song deleted');
        jest.spyOn(songRepository, 'updateSongScore').mockImplementationOnce(() => 'song score updated');

        const result = await songService.downvote();

        expect(result).toBe('song deleted');
    });

    it('Should call updateSongScore based on score returned by findSong to be -4', async () => {
        jest.spyOn(songRepository, 'findSong').mockImplementationOnce(() => -4);
        jest.spyOn(songRepository, 'deleteSong').mockImplementationOnce(() => 'song deleted');
        jest.spyOn(songRepository, 'updateSongScore').mockImplementationOnce(() => 'song score updated');

        const result = await songService.downvote();

        expect(result).toBe('song score updated');
    });

    it('Should return a list of songs', async () => {
        jest.spyOn(songRepository, 'getSongList').mockImplementationOnce(() => songFactory.getSongList());

        const result = await songService.getSongList();

        expect(result.length).toBeGreaterThan(0);
    });

    it('Should return a single song recommendation with score greater than 10', async () => {
        jest.spyOn(Math, 'random').mockImplementationOnce(() => 10);
        jest.spyOn(songRepository, 'getSong').mockImplementationOnce(() => songFactory.getSong('highscore'));

        const result = await songService.getRandomSong();

        expect(result.score).toBeGreaterThan(10);
    });

    it('Should return a single song recommendation with score lower than 10', async () => {
        jest.spyOn(Math, 'random').mockImplementationOnce(() => 70);
        jest.spyOn(songRepository, 'getSong').mockImplementationOnce(() => songFactory.getSong('lowscore'));

        const result = await songService.getRandomSong();

        expect(result.score).toBeLessThan(10);
    });
});
