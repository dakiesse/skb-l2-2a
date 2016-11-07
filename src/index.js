import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({hello: 'JS World'});
});

app.get('/task2A', (req, res) => {
  const sum = (+ req.query.a || 0) + (+ req.query.b || 0);

  res.send(sum.toString());
});

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

app.get('/task2B', (req, res) => {
  let result,
    nameParts,
    firstname,
    middlename,
    lastname;

  const fullname = req.query.fullname
  .trim()
  .toLowerCase()
  .replace(/\s\s+/g, ' '); // Remove multiple whitespaces

  const regexp = /^(?!.*(_|\/).*)[\D\s]+$/;

  if (!regexp.test(fullname)) {
    nameParts = [];
  } else {
    nameParts = fullname.split(' ');
  }

  // Capitalize all items
  nameParts = nameParts.map(capitalize);

  switch (nameParts.length) {
    case 3:
      [firstname, middlename, lastname] = nameParts;
      result = `${lastname} ${firstname[0]}. ${middlename[0]}.`;
      break;
    case 2:
      [firstname, lastname] = nameParts;
      result = `${lastname} ${firstname[0]}.`;
      break;
    case 1:
      result = req.query.fullname;
      break;
    default:
      result = 'Invalid fullname';
  }

  res.send(result);
});

app.listen(3000);
