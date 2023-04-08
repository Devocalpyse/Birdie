import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { db } from './models';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes


// Syncing with the database
db.sync({ alter: true }).then(() => {
    console.info('Database synced!');
})

app.listen(process.env.PORT)