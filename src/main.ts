require('module-alias/register');
import express, { Request, Response } from 'express';
import 'dotenv/config';
import router from '@/routes';
import cors from 'cors';
import morgan from 'morgan';
import { Connection } from '@/lib/prisma';

const app: express.Application = express();

// TODO : Settings
app.use(cors());
app.use(express.json());
app.use('/api/v1', router);
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

const PORT: string | number = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

Connection();

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
