import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import swaggerUi from 'swagger-ui-express';
import gatewayRoutes from "./routes/gateway.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('API Gateway - up. Visit /api/docs to see the documentation.'));
app.use('/api/analytics', analyticsRoutes);