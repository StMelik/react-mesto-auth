import { useContext } from "react"
import { optionsApi } from "../utils/optionsApi"
import Api from "../utils/Api"
import Card from "./Card"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

const api = new Api(optionsApi)

function Main(props) {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete } = props

    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="main">
            <section className="profile">
                <button
                    className="profile__avatar-box"
                    onClick={onEditAvatar}
                >
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt="Аватар"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Открыть"
                        onClick={onEditProfile}
                    ></button>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Открыть"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="elements">
                {
                    cards.map(card => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))
                }
            </section>
        </main>
    )
}

export default Main