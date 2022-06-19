import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
    // Подписка на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__wrapper">
                    <div className="profile__img-wrapper">
                        <img src={currentUser.avatar} alt="Фотография пользователя" className="profile__avatar" />
                        <button className="profile__avatar-btn" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" onClick={props.onEditProfile}></button>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button type="submit" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map((card) => (
                        <Card 
                            key={card._id} 
                            card={card} 
                            onCardClick={props.onCardClick} 
                            onCardLike={props.onCardLike} 
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Main;