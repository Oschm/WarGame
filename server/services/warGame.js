let yup = require('yup');


let userSchema = yup.object().shape({
    id: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });


let roundSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    age: yup.number().required().positive().integer(),
    email: yup.string().email(),
    website: yup.string().url(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });


let gameSchema = yup.object().shape({
    id: yup.string().required(),
    user1Attack: yup.string().nullable,
    user1Defend: yup.string().nullable,
    user2Attack: yup.string().nullable,
    user2Defend: yup.string().nullable,
    user1Health: yup.number().required().integer,
    user2Health: yup.number().required().integer,
    user1PlayTime: yup.date().nullable,
    user2PlayTime: yup.date().nullable
  });
