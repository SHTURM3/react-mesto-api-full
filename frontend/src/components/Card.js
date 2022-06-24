import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

    // Подписка на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    // Отображение иконки удаления
    // console.log('Card =>', props.card);
    // console.log('Card Owner =>', props.card.owner);
    // console.log('currentUser All =>', currentUser);
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `elements__trash-btn ${isOwn ? 'elements__trash-btn_visible' : 'elements__trash-btn_hidden'}`
    );

    // Отображение иконки like
    // console.log('likes =>', props.card.likes);
    // console.log('currentUser ID =>', currentUser.data._id);
    const isLiked = props.card.likes.some(i => i === currentUser._id ); // console.log('i =>', i)
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