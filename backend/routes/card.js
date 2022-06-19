const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controlers/card');

const regEx = /(?:(http|https):\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+/;

router.delete('/:cardID/likes', celebrate({
  params: Joi.object().keys({
    cardID: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

router.put('/:cardID/likes', celebrate({
  params: Joi.object().keys({
    cardID: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

router.delete('/:cardID', celebrate({
  params: Joi.object().keys({
    cardID: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

router.post('', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regEx),
  }),
}), createCard);

router.get('', getCards);

module.exports.cardRouter = router;
