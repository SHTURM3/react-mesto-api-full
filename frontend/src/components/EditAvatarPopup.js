import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    React.useEffect(() => {
        avatarRef.current.value='';
    }, [props.isOpen])

    return (
        <PopupWithForm 
            title='Обновить аватар' 
            name='profile-avatar'
            button='Сохранить'  
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} 
        >
            <input name="avatar" ref={avatarRef} id="input-avatar__link" type="url" placeholder="Ссылка на аватар" className="popup__input popup__input_profile-avatar" required={true} />
            <span className="popup__error" id="input-avatar__link-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;