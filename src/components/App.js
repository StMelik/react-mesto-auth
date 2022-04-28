import {useState, useEffect} from 'react'
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Api from "../utils/Api"
import {optionsApi} from "../utils/optionsApi"
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ComfirmDeletePopup';
import Login from "./Login";
import Register from "./Register";
import {Route, Switch, useHistory} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {LoggedInContext} from "../contexts/LoggedInContext";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";

const api = new Api(optionsApi)

const token = JSON.parse(localStorage.getItem('jwt'))

console.log("TOKEN:", token)

function App() {

    const history = useHistory()

    // Статус выполненого входа
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Статус для попапа подтверждения
    // const [isSuccessfullyRegister, setIsSuccessfullyRegister] = useState(false)
    const [isSuccessfully, setIsSuccessfully] = useState(false)

    // E-mail пользовотеля
    const [userEmail, setUserEmail] = useState("Your email")

    // Состояние попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isComfirmDeletePopupOpen, setIsComfirmDeletePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({isOpen: false})
    // const [isConfirmRegisterPopupOpen, setIsConfirmRegisterPopupOpen] = useState(false)
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)

    // Состояние загрузчиков
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const [isPreloader, setIsPreloader] = useState(true)

    // Данные пользовотеля и карточек
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])

    // ID Карточки
    const [cardId, setCardId] = useState('')

    // Запрос данных пользователя и карточек с сервера
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(res => {
                setCurrentUser(res[0])
                setCards(res[1])
                setIsPreloader(false)
            })
            .catch(err => console.log("Не удалось загрузить страницу:", err))
    }, [])

    useEffect(() => {
        handleSignInProfileToken()
    }, [])

    // Управление состоянием попапов (открыть)
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleComfirmDeleteClick(card) {
        setIsComfirmDeletePopupOpen(true)
        setCardId(card._id)
    }

    function handleConfirmRegisterClick() {
        setIsConfirmPopupOpen(true)
    }

    function handleConfirmLoginClick() {
        setIsSuccessfully(false)
        setIsConfirmPopupOpen(true)
    }

    // (закрыть)
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsComfirmDeletePopupOpen(false)
        setSelectedCard({isOpen: false})
        setIsConfirmPopupOpen(false)
    }

    // Открыть большую карточку
    function handleCardClick(card) {
        setSelectedCard({
            isOpen: true,
            ...card
        })
    }

    // Обновить данные пользователя
    function handleUpdateUser(data) {
        setIsLoadingButton(true)

        api.editUserInfo(data)
            .then(res => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch(err => console.log("Не удалось изменить данные профиля:", err))
            .finally(() => setIsLoadingButton(false))
    }

    // Обновить аватар пользователя
    function handleUpdateAvatar(data) {
        setIsLoadingButton(true)

        api.editUserAvatar(data)
            .then(res => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch(err => console.log("Не удалось сменить аватар:", err))
            .finally(() => setIsLoadingButton(false))
    }

    // Управление лайком карточки
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then(newCard => {
                setCards(state => state.map(c => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log("Не удалось изменить лайк:", err))
    }

    // Управление удалением карточки
    function handleCardDelete() {
        setIsLoadingButton(true)

        api.deleteCard(cardId)
            .then(() => {
                setCards(cards.filter(c => c._id !== cardId))
                closeAllPopups()
            })
            .catch(err => console.log("Не удалось удалить карточку:", err))
            .finally(() => setIsLoadingButton(false))
    }

    // Управление добовлением карточки
    function handleAddPlaceSubmit(data) {
        setIsLoadingButton(true)

        api.addCard(data)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch(err => console.log("Не удалось добавить карточку:", err))
            .finally(() => setIsLoadingButton(false))
    }

    // Регистрация
    function handleRegisterProfile({password, email}) {
        setIsLoadingButton(true)

        auth.signUp({password, email})
            .then(res => {
                console.log("YES Register", res);
                setIsSuccessfully(true)
                handleConfirmRegisterClick()
                history.push('/sign-in')
            })
            .catch(e => {
                console.log(e)
                setIsSuccessfully(false)
                handleConfirmRegisterClick()
            })
            .finally(() => setIsLoadingButton(false))
    }

    // Вход в профиль
    function handleSignInProfile({password, email}) {
        setIsLoadingButton(true)

        auth.signIn({password, email})
            .then(res => {
                console.log("YES Login", res);
                setIsLoggedIn(true)
                setUserEmail(email)
                localStorage.setItem('jwt', JSON.stringify(res.token))
                history.push('/')
            })
            .catch(e => {
                console.log(e)
                handleConfirmLoginClick()
            })
            .finally(() => setIsLoadingButton(false))
    }

    // Выход из профиля
    function handleSignOutProfile() {
        setIsLoggedIn(false)
        localStorage.removeItem('jwt')
        setUserEmail("Your email")
        history.push('/sign-in')
    }

    // Вход в профиль по токену
    function handleSignInProfileToken() {
            // history.replace('/')
            // setIsPreloader(true)
        if(token) {
            auth.getUserInfo(token)
                .then(res => {
                    console.log("YES Login", res);
                    setIsLoggedIn(true)
                    setUserEmail(res.data.email)
                    history.push('/')
                })
                .catch(e => {
                    console.log(e)
                    handleConfirmLoginClick()
                })
        }
    }

    return (
        <div className="page__content">
            <CurrentUserContext.Provider value={{currentUser, userEmail}}>
                <LoggedInContext.Provider value={isLoggedIn}>
                    <Header
                        onLoggOut={handleSignOutProfile}
                    />
                    <Switch>
                        <Route path='/sign-in'>
                            <Login
                                onLogin={handleSignInProfile}
                                loader={isLoadingButton}
                            />
                        </Route>
                        <Route path='/sign-up'>
                            <Register
                                onRegister={handleRegisterProfile}
                                loader={isLoadingButton}
                            />
                        </Route>
                        <ProtectedRoute
                            exact
                            path='/'
                            isLoggedIn={isLoggedIn}
                            isPreloader={isPreloader}
                            component={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleComfirmDeleteClick}
                        />
                    </Switch>
                    <Footer/>

                    <InfoTooltip
                        isOpen={isConfirmPopupOpen}
                        onClose={closeAllPopups}
                        isSuccessfully={isSuccessfully}
                    />

                    {/* Редактировать профиль */}
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        loader={isLoadingButton}
                    />

                    {/* Аватар */}
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        loader={isLoadingButton}
                    />

                    {/* Новое место */}
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        loader={isLoadingButton}
                    />

                    {/* Подтверждение удаления */}
                    <ConfirmDeletePopup
                        isOpen={isComfirmDeletePopupOpen}
                        onClose={closeAllPopups}
                        onDelete={handleCardDelete}
                        loader={isLoadingButton}
                    />

                    {/* Большая картинка */}
                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                </LoggedInContext.Provider>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
