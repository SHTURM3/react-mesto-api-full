import React from 'react';

function ImagePopup(props) {
    return(
        <div className={`popup popup-img ${props.isOpen  ? 'popup_opened' : ''}`}>
            <div className="popup-img__container">
                <div className="popup-img__container">
                    <button className="popup__close-btn popup-img__btn-close" onClick={props.onClose}></button>
                    <figure>
                        <img src={props.card.link} alt="Описание изображения" className="popup-img__pic" />
                        <figcaption className="popup-img__desc">
                            {props.card.name}
                        </figcaption> 
                    </figure>    
                </div>
            </div>   
        </div>
    );
}

export default ImagePopup;