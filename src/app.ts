import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import swaggerUi from 'swagger-ui-express';
import { router } from "./routes/index.js";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('API Gateway - up. Visit /api/docs to see the documentation.'));
app.use('/api', router);