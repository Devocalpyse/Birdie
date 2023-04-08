import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import { db } from './models';

const app = express();
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/users', userRoutes);

// Syncing with the database
db.sync({ alter: true }).then(() => {
    console.info('Database synced!');
})

app.listen(3000)