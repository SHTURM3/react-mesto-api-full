function PopupWithForm(props) {
    
    return(
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <button className={`popup__close-btn popup__close-btn_${props.name}`} onClick={props.onClose}></button>
                <h2 className={`popup__title popup__title_${props.name}`}>
                    {props.title}
                </h2>
                <form onSubmit={props.onSubmit} className={`popup__form popup__form_${props.name}`} name={props.name}>
                    {props.children}
                    <button type="submit" className={`popup__button popup__button_${props.name}`}>{props.button}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;