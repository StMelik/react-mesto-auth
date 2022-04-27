import './Register.css'
import {useState} from "react";


function Register() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
            <section className='register'>
                <h2 className='register__title'>Регистрация</h2>
                <form className='register__form form-register' name='register'>
                    <input
                        className="form-register__input form-register__input_email"
                        type="email"
                        placeholder='Email'
                        name='email'
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <input
                        className="form-register__input form-register__input_password"
                        type="password"
                        placeholder='Пароль'
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="form-register__submit">Войти</button>
                </form>
                    <p className="register__question-text">
                        Уже зарегистрированы? <a href="#" className="register__question-link">Войти</a>
                    </p>
            </section>
    )
}

export default Register;