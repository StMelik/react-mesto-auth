import {Redirect, Route} from "react-router-dom";
import Preloader from "./Preloader";


function ProtectedRoute({isLoggedIn, isPreloader, component: Component, ...props}) {

    return (
        <Route>
            {() =>
                isLoggedIn ?
                    isPreloader ? <Preloader/> :
                        <Component {...props} /> :
                    <Redirect to='/sign-in'/>
            }
        </Route>
    )
}

export default ProtectedRoute;