import React, { useEffect } from 'react';

import HomePage from './components/Pages/HomePages/HomePage'
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom'
import './sass/App.scss'


import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Pages/AuthPages/LoginPage';
import Registration from './components/Pages/AuthPages/RegisterPage';
import ProfilePage from './components/Pages/ProfilePages/ProfilePage';
import BookPage from './components/Pages/BookPages/BookPage';
import SearchResult from './components/Pages/SearchResult/SearchResult';
import Loader from './components/Helper/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginOrNOt } from './actions';
import ScrollToTop from './components/Helper/components/ScrollToTop';
import LogoutPage from './components/Pages/AuthPages/Logout';
import Message from './components/Layout/components/Message';
import UnAuthUserProfile from './components/Pages/ProfilePages/UnAuthUserProfile';
import Popop from './components/Helper/components/Popup';
import ProtectedRoute, { AfterLoginRoute } from './components/Pages/Private/ProtectedRoute';
import FeedBack from './components/Layout/components/FeedBack';
import ConfirmEmail, { VerifiedEmail } from './components/Layout/components/ConfirmEmail';
import NotLogin from './components/Layout/components/NotLogin';
import ComingSoon from './components/Layout/components/ComingSoon';
function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(userLoginOrNOt());
  }, [])

  const loginState = localStorage.getItem("loginstate");
  if (auth.loading) {
    return <Loader />
  }

  
  return (
    <div className="App">
      <BrowserRouter >
        <ScrollToTop>
          <Route component={FeedBack} />
          <Route component={Header} />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <AfterLoginRoute path="/login" component={Login} />
            <AfterLoginRoute path="/registration" component={Registration} />

            <Route path="/confirmation" component={ConfirmEmail} />

            {//Solution for prfilePage render twice if state changes
              loginState !== null ?
                < Route path="/profile" component={ProfilePage} />
                :
                < ProtectedRoute path="/profile" component={ProfilePage} />
            }


            <ProtectedRoute path="/UserProfile/:id?" component={UnAuthUserProfile} />
            <ProtectedRoute path="/bookdetails/:bookID" component={BookPage} />

            <Route path="/searchResult/:searchBy?/:uniqueName?" component={SearchResult} />

            <ProtectedRoute path="/loader" component={Loader} />

            <Route path="/logout" component={LogoutPage} />
            <Route path="/popup" component={Popop} />
            <AfterLoginRoute path="/notlogin" component={NotLogin} />
            <Route path="/message" component={Message} />
            <Route path="/verifiedemail" component={VerifiedEmail} />
            <Route path="/coming-soon" component={ComingSoon} />
            <Route component={Message} />
          </Switch>
          <Route component={Footer} />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
