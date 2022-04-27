import { useState, useEffect } from 'react'
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Api from "../utils/Api"
import { optionsApi } from "../utils/optionsApi"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ComfirmDeletePopup';
import Preloader from './Preloader';

const api = new Api(optionsApi)

function App() {
  // Состояние попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isComfirmDeletePopupOpen, setIsComfirmDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ isOpen: false })

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

  // Управление состоянием попапов
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

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsComfirmDeletePopupOpen(false)
    setSelectedCard({ isOpen: false })
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

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        {isPreloader ?
          <Preloader /> :
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleComfirmDeleteClick}
          />
        }
        <Footer />

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
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;
