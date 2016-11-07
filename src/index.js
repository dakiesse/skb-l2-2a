import express from 'express';
import cors from 'cors';
import fioPresenter from './fio-presenter';

const app = express();
app.use(cors());

app.get('/', (req, res) => res.json({ hello: 'JS World' }));

app.get('/task2A', (req, res) => {
  const sum = (Number(req.query.a) || 0) + (Number(req.query.b) || 0);

  return res.send(sum.toString());
});

app.get('/task2B', (req, res) => {
  const fullname = req.query.fullname
    .trim()
    .toLowerCase()
    .replace(/\s\s+/g, ' '); // Remove multiple whitespaces

  const presentedFullName = fioPresenter(fullname);

  return res.send(presentedFullName);
});

app.listen(3000);
