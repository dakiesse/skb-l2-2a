import express from "express";
import cors from "cors";
import "./models";
import * as handlers from "./handlers";

const app = express();
const router3b = express.Router();
const router3c = express.Router();

app.use(cors());

app.get('/', (req, res) => res.json({ hello: 'JS World' }));

app.get('/task2A', handlers.task2a);
app.get('/task2B', handlers.task2b);
app.get('/task2C', handlers.task2c);
app.get('/task2D', handlers.task2d);
app.get('/task2X', handlers.task2x);

app.get('/task3A/volumes', handlers.task3a.getVolumes);
app.get('/task3A/*?', handlers.task3a.getMain);

// task3B
router3b.get('/', handlers.task3b.getBase);
router3b.get('/pets/populate', handlers.task3b.getPetsPopulate);
router3b.get('/pets/:id/populate', handlers.task3b.getPetsPopulateById);
router3b.get('/users/populate', handlers.task3b.getUsersPopulate);
router3b.get('/users/:usernameOrId/populate', handlers.task3b.getUsersPopulateByIdOrUsername);
router3b.get('/users', handlers.task3b.getUsersWithCriterion);
router3b.get('/users/:id(\\d+)', handlers.task3b.getUserById);
router3b.get('/users/:username', handlers.task3b.getUserByUsername);
router3b.get('/users/:id(\\d+)/pets', handlers.task3b.getPetsByUserId);
router3b.get('/users/:username/pets', handlers.task3b.getPetsByUserUsername);
router3b.get('/pets/:id(-?\\d+)', handlers.task3b.getPetById);
router3b.get('/pets', handlers.task3b.getPetsWithCriterion);
app.use('/task3B', router3b);

// task3C
router3c.use(handlers.task3c.middleware);
router3c.get('/', handlers.task3c.getAll); 
router3c.get('/huge', handlers.task3c.getHuge);
router3c.get('/micro', handlers.task3c.getMicro);
router3c.get('/light', handlers.task3c.getLight);
router3c.get('/heavy', handlers.task3c.getHeavy);
router3c.get('/angular', handlers.task3c.getAngular);
router3c.get('/fat', handlers.task3c.getFat);
app.use('/task3C', router3c);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(404).send('Not Found');
});

app.listen(3000);
