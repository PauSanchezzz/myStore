import express from 'express';
import cors from 'cors';
import routerApi from './routes/index.js';
import {
  logErrors,
  boomErrorHandler,
  errorHandler,
} from './middlewares/error.js';

const app = express();
const port = 3001;

app.use(express.json());
//Le asigno los origienes de los cuales si quiero recibir información
const whitelist = ['http://localhost:8080'];
const option = {
  origin: (origin, callback) => {
    if (whitelist.includes) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};

app.use(cors());
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

app.listen(port, () => {
  console.log('Mi port' + port);
});
