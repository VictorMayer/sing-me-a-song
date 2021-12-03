import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => res.send('Bolezinha'));

export default app;
