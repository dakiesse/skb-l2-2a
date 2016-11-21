import express from 'express';
import cors from 'cors';

import fioPresenter from './fio-presenter';
import PersonalComputer from './PersonalComputerModel';
import { objectPathResolver, checkRgb, chechHsl } from './helpers';
import colorcolor from 'colorcolor';

const app = express();
const model = new PersonalComputer;

app.use(cors());

// index
app.get('/', (req, res) => res.json({ hello: 'JS World' }));

// task2A
app.get('/task2A', (req, res) => {
  const sum = (Number(req.query.a) || 0) + (Number(req.query.b) || 0);

  return res.send(sum.toString());
});

// task2B
app.get('/task2B', (req, res) => {
  const fullname = req.query.fullname
    .trim()
    .toLowerCase()
    .replace(/\s\s+/g, ' '); // Remove multiple whitespaces


  const presentedFullName = fioPresenter(fullname);

  return res.send(presentedFullName);
});

// task2C
app.get('/task2C', (req, res) => {
  const rawUsernameParts = req.query.username.trim().split('//'); // remove any protocols
  const re = /^([A-Z\.:+\d-]+\/)?@?([\w.-_]+)((\?|\/).*)?$/i;

  let result;

  switch (rawUsernameParts.length) {
    case 2: rawUsernameParts[0] = rawUsernameParts[1]; // non-break
    case 1: result = rawUsernameParts[0].match(re)[2]; break;
    default: result = 'Invalid username';
  }

  return res.send(`@${result}`);
});

// task2D
app.get('/task2D', (req, res) => {
  let result;

  const hexRe = /^[#]?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  const rgbaRe = /^rgba?/;
  const hslRe = /^hsl/;
  const matchRe = /([\da-f])([\da-f])([\da-f])/i;

  try {
    let rawAnyColor = req.query.color.trim().toLowerCase()
      .replace(/%23/g, '#')
      .replace(/%20/g, '')
      .replace(/\s/g, '');

    if (hexRe.test(rawAnyColor)) {
      if (rawAnyColor[0] !== '#') rawAnyColor = `#${rawAnyColor}`;

      result = colorcolor(rawAnyColor, 'hex');
    } else if (rgbaRe.test(rawAnyColor) && checkRgb(rawAnyColor)) {
      result = colorcolor(rawAnyColor, 'hex');
    } else if (hslRe.test(rawAnyColor) && chechHsl(rawAnyColor)) {
      result = colorcolor(rawAnyColor, 'hex');
    } else {
      throw new Error();
    }

    return res.send(result);
  } catch (e) {
    return res.send('Invalid color');
  }
});

// task3A (1)
app.get('/task3A/volumes', (req, res) => {
  if (model.isEmpty()) return res.send('Model is empty', 404);

  let assignHdds = {};
  model.attributes.hdd.forEach((hdd) => {
    assignHdds[hdd.volume] = assignHdds[hdd.volume] || 0;
    assignHdds[hdd.volume] = parseInt(assignHdds[hdd.volume]) + hdd.size + `B`;
  });

  return res.json(assignHdds);
});

// task3A (2)
app.get('/task3A/*?', (req, res) => {
  req.params[0] = req.params[0] || '';

  if (model.isEmpty()) return res.send('Model is empty', 404);

  let path = req.params[0]
    .replace(/[.]|[\/]+$/g, '')
    .replace(/\//g, '.');

  if (path !== 'length') path = path.replace(/length/, '');

  const resultObject = path ? objectPathResolver(path, model.attributes) : model.attributes;

  if (resultObject === undefined) return res.send('Not Found', 404);

  res.json(resultObject);
});

app.listen(3000);
