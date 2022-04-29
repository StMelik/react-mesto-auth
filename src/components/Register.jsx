import {useState} from "react";
import {Link} from "react-router-dom";

function Register({onRegister, loader}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmitForm(evt) {
        evt.preventDefault()
        onRegister({password, email})
    }

    return (
        <section className='auth'>
            <h2 className='auth__title'>Регистрация</h2>
            <form className='auth__form form-auth' name='register' onSubmit={handleSubmitForm}>
                <input
                    className="form-auth__input form-auth__input_email"
                    type="email"
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className="form-auth__input form-auth__input_password"
                    type="password"
                    placeholder='Пароль'
                    name='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete='off'
                    required
                    minLength='4'
                />
                <button className="form-auth__submit" type="submit">{loader ? "Регистрация..." : "Зарегистрироваться"}</button>
            </form>
            <p className="auth__question-text">
                Уже зарегистрированы? <Link to="/sign-in" className="auth__question-link">Войти</Link>
            </p>
        </section>
    )
}

export default Register;