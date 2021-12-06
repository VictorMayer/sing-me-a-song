import * as songService from '../services/songService.js';
import validateSong from '../validations/songValidation.js';

async function newSong(req, res) {
    try {
        const { name, youtubeLink } = req.body;

        if (!name || !youtubeLink) return res.sendStatus(400);

        const invalidBody = validateSong(req.body);

        if (invalidBody) return res.status(400).send(invalidBody);

        const song = songService.saveSong({ name, youtubeLink });

        if (song) {
            res.send(201);
        } else {
            res.send(400);
        }
        return null;
    } catch (error) {
        console.log(error); // eslint-disable-line no-console
        return res.sendStatus(500);
    }
}

async function upvote(req, res) {
    try {
        const { id } = req.params;
        const result = songService.upvote(id);

        if (!result) res.sendStatus(404);

        return res.sendStatus(200);
    } catch (error) {
        console.log(error); // eslint-disable-line no-console
        return res.sendStatus(500);
    }
}

async function downvote(req, res) {
    try {
        const { id } = req.params;
        const result = songService.downvote(id);

        if (!result) res.sendStatus(404);

        return res.sendStatus(200);
    } catch (error) {
        console.log(error); // eslint-disable-line no-console
        return res.sendStatus(500);
    }
}

async function getRandomSong(req, res) {
    try {
        const randomSong = await songService.getRandomSong();

        if (!randomSong) return res.sendStatus(404);

        return res.send(randomSong);
    } catch (error) {
        console.log(error); // eslint-disable-line no-console
        return res.sendStatus(500);
    }
}

async function getSongList(req, res) {
    try {
        const { amount } = req.params;
        const topSongs = await songService.getSongList(amount);

        if (!topSongs) return res.sendStatus(404);

        return res.send(topSongs);
    } catch (error) {
        console.log(error); // eslint-disable-line no-console
        return res.sendStatus(500);
    }
}

export {
    newSong,
    upvote,
    downvote,
    getRandomSong,
    getSongList,
};
