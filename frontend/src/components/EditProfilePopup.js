import React from 'react';

import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {

    //Стейт переменные значения инпута имени и описания
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    //Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    //Обработчик изменения инпута имени, обновляет стейт
    function handleNameChange(e) {
        setName(e.target.value);
    }

    //Обработчик изменения инпута описания, обновляет стейт
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return(
        <PopupWithForm
            title='Редактировать профиль' 
            name='profile'
            button='Сохранить'  
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input name="name" id="input__name" type="text" placeholder="Имя" className="popup__input popup__input_profile-name" value={name} onChange={handleNameChange} minLength={2} maxLength={40} required={true} />
            <span className="popup__error" id="input__name-error"></span>
            <input name="description" id="input__about" type="text" placeholder="О себе" className="popup__input popup__input_profile-about" value={description} onChange={handleDescriptionChange} minLength={2} maxLength={200} required={true} />
            <span className="popup__error" id="input__about-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;