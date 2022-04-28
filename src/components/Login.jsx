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
            <section className='auth'>
                <h2 className='auth__title'>Вход</h2>
                <form className='auth__form form-auth' name='login'>
                    <input
                        className="form-auth__input form-auth__input_email"
                        type="email"
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className="form-auth__input form-auth__input_password"
                        type="password"
                        placeholder='Пароль'
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        className="form-auth__submit"
                        onClick={handleSubmitForm}
                    >{loader ? "Вход..." : "Войти"}</button>
                </form>
            </section>
    )
}

export default Login;