const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/card');
const { login, createUser } = require('./controlers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');

const regEx = /(?:(http|https):\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+/;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regEx),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', userRouter); // Пользователи (связанные файл: routes/users.js; controllers/users.js)

app.use('/cards', cardRouter); // Карточки (связанные файл: routes/cards.js; controllers/cards.js)

app.use('*', (_, __, next) => next(new NotFound('Такой страницы не существует.')));

app.use(errorLogger);

app.use(errors());

app.use((error, _, response, next) => {
  const { statusCode = 500, message } = error;

  response.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log('Сервер работает.');
});
