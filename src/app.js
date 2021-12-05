import cors from 'cors';
import express from 'express';
import * as songController from './controllers/songController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => res.send('Bolezinha'));

app.post('/recommendations', songController.newSong);
app.post('/recommendations/:id/upvote', songController.upvote);
app.post('/recommendations/:id/downvote', songController.downvote);

export default app;
