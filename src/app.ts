import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import gatewayRoutes from "./routes/gateway.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import authRoutes from "./routes/auth.routes.js";
import apiRoutes from "./routes/gateway.routes.js";
import { setupSwagger } from "./config/swagger.js";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

setupSwagger(app);

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => res.send('API Gateway - up. Visit /api/docs to see the documentation.'));