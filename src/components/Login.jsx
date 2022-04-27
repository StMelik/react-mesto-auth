import './Login.css'
import {useState} from "react";


function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
            <section className='login'>
                <h2 className='login__title'>Вход</h2>
                <form className='login__form form-login' name='login'>
                    <input
                        className="form-login__input form-login__input_email"
                        type="email"
                        placeholder='Email'
                        name='email'
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <input
                        className="form-login__input form-login__input_password"
                        type="password"
                        placeholder='Пароль'
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="form-login__submit">Войти</button>
                </form>
            </section>
    )
}

export default Login;