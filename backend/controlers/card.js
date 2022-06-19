const Card = require('../models/Card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const dislikeCard = (request, response, next) => {
  const { cardID } = request.params;
  Card.findByIdAndUpdate(
    cardID,
    { $pull: { likes: request.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Данный пост не существует или удалён ранее.');
      }
      return response.status(200).send({ message: 'Пост отмечен как не понравившейся.' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequest('Данный пост не найден.'));
      }
      return next(err);
    });
};

const likeCard = (request, response, next) => {
  const { cardID } = request.params;
  Card.findByIdAndUpdate(
    cardID,
    { $addToSet: { likes: request.user._id } },
    { new: true },
  )
    .then((card) => {
      console.log('card: ', card);
      if (!card) {
        throw new NotFound('Данный пост не существует или удалён ранее.');
      }
      return response.status(200).send({ message: 'Пост отмечен как понравившейся.' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequest('Данный пост не найден.'));
      }
      return next(err);
    });
};

const deleteCard = (request, response, next) => {
  Card.findById(request.params.cardID)
    .then((card) => {
      if (!card) {
        throw new NotFound('Данный пост не существует или удалён ранее.');
      }
      if (!card.owner.equals(request.user._id)) {
        throw new Forbidden('Вы не можете удалить пост другого пользователя.');
      }
      return card.remove()
        .then(() => response.send({ data: card }));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequest('Данный пост не найден.'));
      }
      return next(err);
    });
};

const createCard = (request, response, next) => {
  console.log('request.body: ', request.body);
  console.log('Id пользователя создавшего пост: ', request.user._id);

  const { name, link, owner = request.user._id } = request.body;

  if (!name || !link || !owner) {
    throw new BadRequest('Ошибка валидации. Имя, ссылка или автор поста не найдены.');
  }

  Card.create({ name, link, owner })
    .then((card) => {
      response.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Проверьте правильность введенных данных.'));
      }
      return next(err);
    });
};

const getCards = (_, response, next) => {
  Card.find({})
    .then((cards) => {
      response.status(200).send(cards);
    })
    .catch((next));
};

module.exports = {
  dislikeCard,
  likeCard,
  deleteCard,
  createCard,
  getCards,
};
