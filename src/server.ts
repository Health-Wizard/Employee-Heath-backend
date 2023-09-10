import express, { Application, Request, Response } from 'express';

// Create an Express application
const app: Application = express();

// Define the port for the server
const port: number = 3000;

// Middleware to parse JSON in request bodies
app.use(express.json());

// Define a sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript and Express from app!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});