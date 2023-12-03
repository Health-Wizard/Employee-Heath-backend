import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import userAuth from './routes/userAuth';
import cors from 'cors';
dotenv.config();

// Create an Express application
const app: Application = express();

// Define the port for the server
const port: unknown = process.env.PORT || 8080;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in request bodies
app.use(express.json());

// Define a sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript and Express from app!!');
});

app.use('/api/v1/emp', userAuth);

// Start the server
const start = async () => {
  try {
    console.log(`Connected to MongoDB`);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
