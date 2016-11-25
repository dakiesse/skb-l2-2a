import _ from "lodash";
import {punkPetHairModel as model} from "../models";

function findUsersByCriterions(criterions = {}) {
  const users = _.filter(model().attributes.users, criterions);

  return users.length ? users : null;
}

function findPetsByCriterions(criterions = {}) {
  return _.filter(model().attributes.pets, criterions);
}

function petCriterionsCast(criterions) {
  const schema = {
    id: Number,
    userId: Number,
    type: String,
    color: String,
    age: Number,
    age_gt: Number,
    age_lt: Number,
  };

  Object.keys(criterions).forEach(key => {
    let type = schema[key];

    criterions[key] = type(criterions[key]);
  });

  return criterions;
}

export function getBase(req, res) {
  return res.json(model().attributes);
}

export function getUsersWithCriterion(req, res) {
  const havePet = req.query.havePet;

  let users = model().attributes.users;

  if (havePet) {
    const userIds = model().attributes.pets
      .filter(pet => pet.type === havePet)
      .map(pet => pet.userId);

    users = users.filter(user => userIds.includes(user.id));
  }

  return res.json(users);
}

export function getUserById(req, res) {
  const users = findUsersByCriterions({ id: Number(req.params.id) });

  if (!users.length) throw new Error;

  return res.json(_.first(users));
}

export function getUserByUsername(req, res) {
  const users = findUsersByCriterions({ username: req.params.username });

  if (!users.length) throw new Error;

  return res.json(_.first(users));
}

export function getPetsWithCriterion(req, res) {
  let pets = [];

  req.query = petCriterionsCast(req.query);
  const criterions = _.omitBy(req.query, (value, key) => ['age_gt', 'age_lt'].includes(key));

  if (_.isEmpty(criterions)) {
    pets = model().attributes.pets;
  } else {
    pets = findPetsByCriterions(criterions);
  }

  if (req.query.age_gt) {
    pets = pets.filter(pet => pet.age > req.query.age_gt);
  }

  if (req.query.age_lt) {
    pets = pets.filter(pet => pet.age < req.query.age_lt);
  }

  return res.json(pets);
}

export function getPetById(req, res) {
  const pets = findPetsByCriterions({ id: Number(req.params.id) });

  if (!pets.length) throw new Error;

  return res.json(pets[0]);
}

export function getPetsByUserId(req, res) {
  const user = findUsersByCriterions({ id: Number(req.params[0]) });
  if (!user) throw new Error;

  const petsOfUser = model().attributes.pets.filter(pet => pet.userId === user.id);
  if (!petsOfUser[0]) throw new Error;

  return res.json(petsOfUser);
}

export function getPetsByUserUsername(req, res) {
  const user = findUsersByCriterions({ username: req.params.username });
  req.perams.id = user.id;

  return getPetsByUserId(req, res);
}

export function getPetsPopulate(req, res) {
  let pets = [];
  const users = model().attributes.users;

  req.query = petCriterionsCast(req.query);
  const criterions = _.omitBy(req.query, (value, key) => ['age_gt', 'age_lt'].includes(key));

  if (_.isEmpty(criterions)) {
    pets = model().attributes.pets;
  } else {
    pets = findPetsByCriterions(criterions);
  }

  if (req.query.age_gt) {
    pets = pets.filter(pet => pet.age > req.query.age_gt);
  }

  if (req.query.age_lt) {
    pets = pets.filter(pet => pet.age < req.query.age_lt);
  }

  pets = pets.map(pet => {
    pet.user = _.find(users, { id: pet.userId });

    return pet;
  });

  return res.json(pets);
}

export function getPetsPopulateById(req, res) {
  const pets = findPetsByCriterions({ id: Number(req.params.id) });

  if (!pets.length) throw new Error;
  const pet = pets[0];

  pet.user = _.find(model().attributes.users, { id: pet.userId });

  return res.json(pets[0]);
}

export function getUsersPopulate(req, res) {
  const havePet = req.query.havePet;

  let users = model().attributes.users;
  const pets = model().attributes.pets;

  if (havePet) {
    const userIds = pets.filter(pet => pet.type === havePet).map(pet => pet.userId);

    users = users.filter(user => userIds.includes(user.id));
  }

  users = users.map(user => {
    user.pets = _.filter(pets, { userId: user.id });

    return user;
  });

  return res.json(users);
}

export function getUsersPopulateByIdOrUsername(req, res) {
  let user;
  const pets = model().attributes.pets;
  const usernameOrId = req.params.usernameOrId;

  if (_.isInteger(+usernameOrId) && +usernameOrId > 0) {
    user = findUsersByCriterions({ id: Number(usernameOrId) });
  } else {
    user = findUsersByCriterions({ username: usernameOrId });
  }

  if (!user.length) throw new Error;
  user = user[0];

  user.pets = _.filter(pets, { userId: user.id });

  return res.json(user);
}
