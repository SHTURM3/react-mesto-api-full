import React from 'react';
import { Link } from 'react-router-dom';;

function Register(props){
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(e){
    const {name, value} = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value, 
    }));
  }

  function handleSubmit(e){
    e.preventDefault();
    let { email, password } = state;
    props.handleRegister( email, password )
      .catch((err) => {
        console.log(err);
      });
  }

  return(
    <div className="user">
        <h2 className="user__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="user__form user__form_sign-in">
            <input id="email" type="email" name="email" value={state.email} onChange={handleChange} className="user__input user__input_email" placeholder="Email" autoComplete="off" required={true} />
            <input id="password" type="password" name="password" value={state.password} onChange={handleChange} className="user__input user__input_password" placeholder="Пароль" autoComplete="off" required={true} />
            <button type="submit" className="user__btn">Зарегестрироваться</button>
            <p className="user__link">
                <Link className="user__link" to="/sign-in">Уже зарегестрированы? Войти</Link>
            </p>
        </form>
    </div>
  )
}

export default Register;
