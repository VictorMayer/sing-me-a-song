import connection from '../database.js';

async function createSong(recommendation) {
    const { name, youtubeLink, score } = recommendation;
    await connection.query(`
        INSERT INTO songs
        (name, youtube_link, score)
        VALUES ($1, $2, $3)
    `, [name, youtubeLink, score]);
}

async function updateSongScore(id, value) {
    return connection.query(`
        UPDATE songs SET score = score + $1 WHERE id = $2
    `, [value, id]);
}

async function findSong(id) {
    const result = await connection.query(`
        SELECT * FROM songs WHERE id = $1
    `, [id]);

    return result.rows[0].score;
}

async function deleteSong(id) {
    return connection.query(`
        DELETE FROM songs WHERE id = $1
    `, [id]);
}

async function getSong(score) {
    let result = await connection.query(`
        SELECT * FROM songs WHERE score >= $1 AND score <= $2
    `, [score.min, score.max]);

    if (!result.rows.length) result = await connection.query('SELECT * FROM songs');

    if (!result.rows.length) return null;

    const maxIndex = result.rows.length;
    const randomIndex = Math.floor(Math.random() * (maxIndex - 1));

    return result.rows[randomIndex];
}

async function getSongList(amount) {
    const result = await connection.query(`
        SELECT * FROM songs ORDER BY score DESC LIMIT $1
    `, [amount]);

    if (!result.rows.length) return null;

    return result.rows;
}

export {
    createSong,
    updateSongScore,
    findSong,
    deleteSong,
    getSong,
    getSongList,
};
