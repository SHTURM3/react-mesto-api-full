const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  getCurrentUser,
  getUsers,
  changeProfile,
  changeAvatar,
} = require('../controlers/users');

const regEx = /(?:(http|https):\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+/;

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regEx),
  }),
}), changeAvatar);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), changeProfile);

router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUser);

router.get('', getUsers);

module.exports.userRouter = router;
