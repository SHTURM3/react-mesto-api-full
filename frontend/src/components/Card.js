import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

    // Подписка на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    // Отображение иконки удаления
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `elements__trash-btn ${isOwn ? 'elements__trash-btn_visible' : 'elements__trash-btn_hidden'}`
    );

    // Отображение иконки like
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `elements__btn-like ${isLiked ? 'elements__btn-like_active' : '' }`
    );

    function handleClick(){
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return(
        <li className="elements__item">
            <img src={props.card.link} alt={props.card.name} className="elements__img" onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="elements__description">
                <h2 className="elements__name">{props.card.name}</h2>
                <div className="elements__button">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="elements__like-count">{props.card.likes.length}</span> 
                </div>
            </div>
        </li>
    );
};

export default Card; 