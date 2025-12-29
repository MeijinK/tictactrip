import express from 'express';
import cors from 'cors';
import tokenRoutes from './routes/tokenRoutes';
import justifyRoutes from './routes/justifyRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'text/plain', limit: '10mb' }));

app.use('/api', tokenRoutes);
app.use('/api', justifyRoutes);

export default app;
