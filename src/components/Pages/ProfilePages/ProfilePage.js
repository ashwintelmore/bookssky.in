import React, { useState, useEffect } from 'react'
import { Link, Switch, Route, useParams, NavLink } from 'react-router-dom';
import { FiArrowLeftCircle, FiArrowRightCircle, AiFillWarning, MdThumbUp } from 'react-icons/all';
import firebase from 'firebase';
import SellBookPage from './components/SellBook';
import UserBooksPage from './components/UserAllBooks';
import UserEditForm from './components/UserEditForm';
import UserNotifications from './components/UserNotifications';
import UserRequestsPage from './components/UserRequests';
import Message from '../../Layout/components/Message';
import { useSelector } from 'react-redux';
import ProtectedRoute from '../Private/ProtectedRoute';
import FeedBack from '../../Layout/components/FeedBack';
/**
* @author
* @function ProfilePage
**/

const ProfilePage = (props) => {
  const auth = useSelector(state => state.auth);
  const params = useParams()
  const [profileMenuToggel, setProfileMenuToggel] = useState(true);
  const profileToggler = () => {
    setProfileMenuToggel(!profileMenuToggel)
    // setProfileMenuToggel(false)

  };



  // useEffect(() => {
  //   setProfileMenuToggel(!profileMenuToggel)
  // }, [props.location.key])
  return (
    <section className="profile__page">
      <div className=" container flex  profile">

        <div className={profileMenuToggel ? "profile__menu  open__profile__menu  flex flex-jc-sb" : "profile__menu   flex flex-jc-sb"}>

          <div className={profileMenuToggel ? "profile__arrow open__profile__menu display-medium-none" : "profile__arrow  display-medium-none"}>
            <FiArrowRightCircle size="35px" onClick={profileToggler} />
          </div>

          <div className="user__photo ">
            <h2 className={
              auth.user.profile_percent < 60
                ?
                "tag tag-red"
                :
                "tag tag-green"
            }>{auth.user.profile_percent < 0 ? 0 : auth.user.profile_percent}%</h2>

            <div className="user__profile_img randomBGcolor flex flex-jc-c flex-ai-c">
              {/* <img src="https://source.unsplash.com/user/erondu/200x200" alt="img" /> */}
              <span className="heading">{auth.user.displayName ? auth.user.displayName[0] : "NA"}</span>
            </div>
            {/* <h4>Hello</h4> */}
            <h1 className="heading">{auth.user.displayName}</h1>
          </div>
          <div className="user__menu flex flex-jc-sb" onClick={profileToggler}>
            <div className="user__menu_active_btn">

              <NavLink to="/profile/
              " activeClassName="active-link" className="active-NavLink"><h4 onClick={profileToggler}>My Books</h4></NavLink>
              <NavLink to="/profile/sellbook" activeClassName="active-link" ><h4 onClick={profileToggler}>Sell Book</h4></NavLink>
              <NavLink to="/profile/userNotifications" activeClassName="active-link" ><h4 onClick={profileToggler}>Notifications</h4></NavLink>
              <NavLink to="/profile/userrequest" activeClassName="active-link" ><h4 onClick={profileToggler}>My Requests</h4></NavLink>
              <NavLink to="/profile/usereditform" activeClassName="active-link" ><h4 onClick={profileToggler}>Edit Profile</h4></NavLink>
              <NavLink to={`/logout`} activeClassName="active-link"><h4 >Logout</h4 ></NavLink>
            </div>
            <div className="user__feedback">
              <a onClick={() => <FeedBack />}><h4>feedBack</h4></a>
            </div>
          </div>
        </div>
        <div className="profile__content ">

          {
            !auth.user.emailVerified ?
              <div className="warning warning-red flex flex-jc-l flex-ai-c">
                <AiFillWarning size="40" />
                <p>
                  Mail Verification required
                  <Link to="/confirmation" className="btn btn-2"> Verify </Link>
                </p>
              </div>
              :
              null
          }
          {
            auth.user.profile_percent < 60 ?
              <div className="warning warning-red flex flex-jc-l flex-ai-c">
                <AiFillWarning size="40" />
                <p>
                  Complete your Profile (Basic details). minimum 60% required for selling a book/PDF/notes.
                  <Link to="/profile/usereditform"> <b className="error"> Click Here</b> </Link>to Complete your profile
                </p>
              </div>
              :
              <div className="warning warning-green flex flex-jc-l flex-ai-c">
                <MdThumbUp size="40" />
                <p>
                  Congrats!! Now your profile is Completed more than 60%. so, You can use now all our servises for free
                </p>
              </div>
          }


          <div className="user__directions__path flex flex-ai-c flex-jc-sb">
            <h5> &#62;
              {
                // window.location.href.split('/').slice(4).map((element , index)=>(
                //   <span key={index}> &#62; {element}</span>
                //   ))
              }
            </h5>
            <h2 className={
              auth.user.profile_percent < 60
                ?
                "tag tag-red"
                :
                "tag tag-green"

            }>{auth.user.profile_percent < 0 ? 0 : auth.user.profile_percent}% Profile Completed</h2>
          </div>
          <Switch>
            <Route exact path="/profile/userallbooks" component={UserBooksPage} />
            <Route path="/profile/sellbook/:bookName?" component={SellBookPage} />
            <Route path="/profile/userNotifications:id?" component={UserNotifications} />
            <Route path="/profile/usereditform:id?" component={UserEditForm} />
            <Route path="/profile/userrequest" component={UserRequestsPage} />
          </Switch>
        </div>
      </div>

    </section>
  )
}


export default ProfilePage;