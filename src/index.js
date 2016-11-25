import express from "express";
import cors from "cors";
import "./models";
import * as handlers from "./handlers";

const app = express();
const router = express.Router();

app.use(cors());

app.get('/', (req, res) => res.json({ hello: 'JS World' }));

app.get('/task2A', handlers.task2a);
app.get('/task2B', handlers.task2b);
app.get('/task2C', handlers.task2c);
app.get('/task2D', handlers.task2d);

app.get('/task3A/volumes', handlers.task3a.getVolumes);
app.get('/task3A/*?', handlers.task3a.getMain);

// task3B
router.get('/', handlers.task3b.getBase);
router.get('/pets/populate', handlers.task3b.getPetsPopulate);
router.get('/pets/:id/populate', handlers.task3b.getPetsPopulateById);
router.get('/users/populate', handlers.task3b.getUsersPopulate);
router.get('/users/:usernameOrId/populate', handlers.task3b.getUsersPopulateByIdOrUsername);
router.get('/users', handlers.task3b.getUsersWithCriterion);
router.get('/users/:id(\\d+)', handlers.task3b.getUserById);
router.get('/users/:username', handlers.task3b.getUserByUsername);
router.get('/users/:id(\\d+)/pets', handlers.task3b.getPetsByUserId);
router.get('/users/:username/pets', handlers.task3b.getPetsByUserUsername);
router.get('/pets/:id(-?\\d+)', handlers.task3b.getPetById);
router.get('/pets', handlers.task3b.getPetsWithCriterion);
app.use('/task3B', router);

app.use(function (err, req, res, next) {
  res.status(404).send('Not Found');
});

app.listen(3000);
