import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    //Стейт переменные значения инпутов карточки места
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    //Обработчик изменения инпута имени карточки, обновляет стейт
    function handleNameChange(e) {
        setName(e.target.value);
    }

    //Обработчик изменения инпута ссылки на карточку, обновляет стейт
    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link: link,
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return(
        <PopupWithForm 
            title='Новое место' 
            name='card'
            button='Создать'  
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} 
        >
            <input name="name"  id="input__call" type="text" placeholder="Название" className="popup__input popup__input_card-name" value={name} onChange={handleNameChange} minLength={2} maxLength={30} required={true} />
            <span className="popup__error" id="input__call-error"></span>
            <input name="link" id="input__link" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_card-link" value={link} onChange={handleLinkChange} required={true} />
            <span className="popup__error" id="input__link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;