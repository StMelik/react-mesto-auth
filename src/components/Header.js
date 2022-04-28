import logo from '../images/logo.svg';
import HeaderInfo from "./HeaderInfo";
import {Route, Switch} from "react-router-dom";

function Header(props) {
    const {onLoggOut} = props

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <Switch>
                <Route path="/sign-in">
                    <HeaderInfo
                        path="/sign-up"
                        name="Регистрация"
                    />
                </Route>
                <Route path="/sign-up">
                    <HeaderInfo
                        path="/sign-in"
                        name="Войти"
                    />
                </Route>
                <Route exact path="/">
                    <HeaderInfo
                        path="/sign-in"
                        name="Выйти"
                        onLoggOut={onLoggOut}
                    />
                </Route>
            </Switch>
        </header>
    )
}

export default Header