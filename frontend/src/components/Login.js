import React from 'react';

function Login(props){
    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
    });

    function handleChange(e){
        const {name, value} = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            return;
        }

        props.handleLogin(inputs.email, inputs.password)
            .catch((err) => {
                console.log(err);
            })
    }

    return(
        <div className="user">
            <h2 className="user__title">Вход</h2>
            <form onSubmit={handleSubmit} className="user__form user__form_sign-in">
                <input id="email" type="email" name="email" value={inputs.email} onChange={handleChange} className="user__input user__input_email" placeholder="Email" autoComplete="off" required={true} />
                <input id="password" type="password" name="password" value={inputs.password} onChange={handleChange} className="user__input user__input_password" placeholder="Пароль" autoComplete="off" required={true} />
                <button type="submit" className="user__btn">Войти</button>
            </form>
        </div>
    )
}

export default Login;