import './Login.css'
import {useState} from "react";

function Login(props) {
    const {onLogin, loader} = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmitForm(evt) {
        evt.preventDefault()
        onLogin({password, email})
    }

    return (
            <section className='login'>
                <h2 className='login__title'>Вход</h2>
                <form className='login__form form-login' name='login'>
                    <input
                        className="form-login__input form-login__input_email"
                        type="email"
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className="form-login__input form-login__input_password"
                        type="password"
                        placeholder='Пароль'
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        className="form-login__submit"
                        onClick={handleSubmitForm}
                    >{loader ? "Вход..." : "Войти"}</button>
                </form>
            </section>
    )
}

export default Login;