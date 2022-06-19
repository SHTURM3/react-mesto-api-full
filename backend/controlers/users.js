const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const Unauthorized = require('../errors/Unauthorized');

const changeAvatar = (request, response, next) => {
  const { avatar } = request.body;
  User.findByIdAndUpdate(request.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Такого пользователя не существует.');
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequest('ID пользователя передано некорретно.'));
      }
      return next(err);
    });
};

const changeProfile = (request, response, next) => {
  const { name, about } = request.body;
  User.findByIdAndUpdate(request.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Такого пользователя не существует.');
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Имя или описание пользователя не должно быть менее 2-х и более 30-ти символов.'));
      }
      if (err.kind === 'ObjectId') {
        return next(new BadRequest('ID пользователя передано некорретно.'));
      }
      return next(err);
    });
};

const getUser = (request, response, next) => {
  const { id } = request.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Такого пользователя не существует.');
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequest('ID пользователя передано некорретно.'));
      }
      return next(err);
    });
};

const getCurrentUser = (request, response, next) => {
  console.log(request.matched);
  User.findById(request.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Запрашиваемый пользователь не найден.');
      }

      return response.send({ data: user });
    })
    .catch((err) => next(err));
};

// eslint-disable-next-line consistent-return
const createUser = (request, response, next) => {
  console.log('request.body: ', request.body);

  const {
    email,
    password,
    name,
    about,
    avatar,
  } = request.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      console.log(user);
      response.status(201).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // const fields = Object.keys(err.errors).join(', ');
        return next(new BadRequest('Проверьте правильность введенных данных.'));
      }

      if (err.code === 11000) {
        return next(new Conflict('Такой пользователь уже существует.'));
      }
      return next(err);
    });
};

const login = (request, response, next) => {
  console.log('request.body: ', request.body);
  const { email, password } = request.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new BadRequest('Пользователь не найден.');
      }
      response.send({
        token: jwt.sign({ _id: user._id }, 'yandex-practicum-thebest', { expiresIn: '7d' }),
      });
    })
    .catch(() => {
      next(new Unauthorized('Логин или пароль неверны.'));
    });
};

const getUsers = (_, response, next) => {
  User.find({})
    .then((users) => {
      response.status(200).send(users);
    })
    .catch((next));
};

module.exports = {
  changeAvatar,
  changeProfile,
  getUser,
  getCurrentUser,
  getUsers,
  login,
  createUser,
};
