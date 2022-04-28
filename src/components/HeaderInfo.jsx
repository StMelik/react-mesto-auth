import {Link} from "react-router-dom";
import {useContext} from "react";
import {LoggedInContext} from "../contexts/LoggedInContext";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function HeaderInfo(props) {
    const isLoggedIn = useContext(LoggedInContext)
    const {userEmail} = useContext(CurrentUserContext)
    const {path, name, onLoggOut} = props

    return (
        <div className="header__info-box">
            {isLoggedIn ? <p className="header__email">{userEmail}</p> : null}
            {isLoggedIn ?
                <span
                    className="header__link header__link_type_exit"
                    onClick={onLoggOut}
                >{name}</span> :
                <Link
                    to={path}
                    className="header__link"
                >
                    {name}
                </Link>}
        </div>
    )
}

export default HeaderInfo;