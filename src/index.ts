import express, { Request, Response } from 'express';
import deviceRoutes from './routes/devices';

// import pg, { Pool } from 'pg';
// Database client.
// const db_pool = new Pool();
// const db_client = await db_pool.connect();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', deviceRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
