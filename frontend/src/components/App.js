import React from 'react';
import { Route, Switch, useHistory, Link } from 'react-router-dom';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as mestoAuth from '../utils/mestoAuth';
import InfoTooltip from './InfoTooltip';

function App() {

  //Стейт переменная статуса пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  //Стейт переменная данных о пользователе
  const [userData, setUserData] = React.useState(null);

  const history = useHistory();

  // Стейт переменная информации о пользователе
  const [currentUser, setCurrentUser ] = React.useState({});

  // Стейт переменная карточки места
  const [selectedCard, setSelectedCard] = React.useState({});

  //Стейт переменные состояния информации по карточкам
  const [cards, setCards] = React.useState([]);

  // Стейт переменные состояния для открытия и закрытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoToolOpen, setInfoTool] = React.useState(false);
  const [infotoolTipStatus, setInfotoolTipStatus] = React.useState(false);

  // Функция обработчик клика по карточке места
  function handleCardClick(element) {
    setImagePopupOpen(true);
    setSelectedCard(element);
    console.log(element);
  } 

  // Функции открытия и закрытия попапов
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setInfoTool(false);
    setSelectedCard({});
  }

  //Поддержка обновления информации пользователя
  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo.name, userInfo.about)
      .then(res => {
        setCurrentUser({...currentUser,
        name: res.name,
        about: res.about
        })
      })
      .catch(res => {
        console.log(res);
      })
    closeAllPopups();
  }

  //Поддержка обновления аватара пользователя
  function handleUpdateAvatar(userInfo) {
    api.changeAvatar(userInfo.avatar)
      .then( res => {
        setCurrentUser({...currentUser,
        avatar: res.avatar
        })
      })
      .catch(res => {
        console.log(res);
      })
    closeAllPopups();
  }

  // Поддержка лайков и дизлайков
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if(!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch( res => {
          console.log(res);
        })  
    } else {
        api.deleteLike(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch( res => {
            console.log(res);
          })
    }
    
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card.name, card.link)
      .then(res => {
        setCards( [res, ...cards] );
        closeAllPopups();
      })
      .catch( res => {
        console.log(res);
      })
  }

  // Поддержка удаления карточек
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((card) => {
        setCards((state) => state.filter((c) => c._id === card._id ? card.remove() : c));
      })
      .catch( res => {
        console.log(res);
      })
  }

  function handleRegister (email, password) {
    return mestoAuth
      .register(email, password)
      .then((data) => {
        if(!data.token){
          setInfotoolTipStatus(false);
          setInfoTool(true);
        }
        setInfotoolTipStatus(true);
        setInfoTool(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log('ErrorReg: ', err);
        setInfotoolTipStatus(false);
        setInfoTool(true);     
      })
  }

  function handleLogin(email,password){
    return mestoAuth
      .authorize(email,password)
      .then((data) => {
        if(!data.token){
          setInfotoolTipStatus(false);
          setInfoTool(true);
        }
        console.log('data: ', data);
        setUserData({email});
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log('ErrorLog: ', err);
        setInfotoolTipStatus(false);
        setInfoTool(true);
      })
  }

  function checkToken() {
    if(localStorage.getItem('jwt')) {
    let jwt = localStorage.getItem('jwt');  
      mestoAuth.getContent(jwt).then((res) => {
        if(res){
          console.log('checkToken: ', res);
          setUserData({
            email: res.data.email,
          });
          setLoggedIn(true);
        }
      })
    }
  }

  function handleSignOut () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push("/sign-in");
  }

  //Запросы данных пользователя и карточек с сервера и проверка токена
  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
      api.getProfile()
      .then(res => {
        setCurrentUser(res);
      })
      .catch( res => {
          console.log(res);
      })
    
      api.getInitialCards()
      .then( res => {
        setCards(res);
      })
      .catch( res => {
        console.log(res);
      })
      history.push("/");
      return;
    }
  }, [loggedIn, history])

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
              <Switch>
                <ProtectedRoute 
                  exact path="/"
                  loggedIn={loggedIn}
                >
                  <Header 
                    userData={userData}
                  >
                    <button onClick={handleSignOut} className="user-info__btn">Выйти</button>
                  </Header>

                  <Main 
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick} 
                    onEditAvatar={handleEditAvatarClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />

                </ProtectedRoute>

                <Route path="/sign-in">
                  <Header 
                    userData=''
                  >
                    <Link className="user-info__btn" to="/sign-up">Зарегестрироваться</Link> 
                  </Header>
                  
                  <Login handleLogin={handleLogin} />
                  <InfoTooltip 
                    status={infotoolTipStatus}
                    isOpen={isInfoToolOpen}
                    onClose={closeAllPopups}
                  />
                </Route>

                <Route path="/sign-up">
                  <Header 
                    userData=''
                  >
                    <Link className="user-info__btn" to="/sign-in">Вход</Link>
                  </Header>
                  <Register handleRegister={handleRegister} />
                  <InfoTooltip 
                    status={infotoolTipStatus}
                    isOpen={isInfoToolOpen}
                    onClose={closeAllPopups}
                  />
                </Route>
              </Switch>

              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

              <PopupWithForm 
                  title='Вы уверены?' 
                  name='question'
                  button='Да' 
              ></PopupWithForm>

              <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen} 
                onClose={closeAllPopups}
              />

              <Footer />              
        </div>
      </CurrentUserContext.Provider>
    </div>  
  );
}

export default App;

