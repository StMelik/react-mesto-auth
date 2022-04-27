import './Register.css'
import {useState} from "react";
import {Link} from "react-router-dom";


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
                    <button className="form-register__submit">Зарегистрироваться</button>
                </form>
                    <p className="register__question-text">
                        Уже зарегистрированы? <Link to="/sign-in" className="register__question-link">Войти</Link>
                    </p>
            </section>
    )
}

export default Register;