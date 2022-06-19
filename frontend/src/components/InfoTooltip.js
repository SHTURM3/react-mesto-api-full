import React from "react";
import errImg from '../images/wrong-register.svg';
import accessImg from '../images/accept-register.svg';


function InfoTooltip(props) {
    return(
        <div className={`popup popup_${props.status ? 'accept-reg' : 'err-reg' } ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_${props.status ? 'accept-reg' : 'err-reg'}`}>
                <button className={`popup__close-btn popup__close-btn_${props.status ? 'accept-reg' : 'err-reg'}`} onClick={props.onClose}></button>
                <img src={props.status? accessImg : errImg} alt="Картинка успешной(или не очень) регистрации" className={`popup__img popup__img_${props.status ? 'accept-reg' : 'err-reg'}`} />
                <h2 className={`popup__title popup__title_${props.status ? 'accept-reg' : 'err-reg'}`}>
                    {props.status ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </div>
    );
}

export default InfoTooltip;