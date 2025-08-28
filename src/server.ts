import express, { NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import routes from './routes';


const app = express();

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Acces-Control-Allow-Origin', '*'),
  res.header('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE'),
  res.header('Acces-Control-Allow-Headers', 'Content-Type'),
  next()
})
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use('/', routes);

export { app };

