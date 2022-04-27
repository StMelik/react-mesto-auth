import {Link} from "react-router-dom";
import {useContext} from "react";
import {LoggedInContext} from "../contexts/LoggedInContext";


function HeaderInfo(props) {
    const isLoggedIn = useContext(LoggedInContext)
    const {path, name, email} = props

    return (
        <div className="header__info-box">
            {isLoggedIn ? <p className="header__email">{email}</p>: null}
            <Link to={path} className={isLoggedIn ? "header__link header__link_type_exit" : "header__link"}>
                {name}
            </Link>
        </div>
    )
}

export default HeaderInfo;