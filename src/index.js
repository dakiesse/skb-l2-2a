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

app.get('/task2C', (req, res) => {
  const rawUsernameParts = req.query.username.trim().split('//');
  const re = /^([A-Z\.:+\d-]+\/)?@?([\w.-_]+)((\?|\/).*)?$/i;

  let result;

  switch (rawUsernameParts.length) {
    case 2:
      rawUsernameParts[0] = rawUsernameParts[1]; // non-break
    case 1:
      result = rawUsernameParts[0].match(re)[2];
      break;
    default:
      result = 'Invalid username';
  }

  return res.send(`@${result}`);
});

app.listen(3000);
