import React, { useState, useEffect } from 'react'
import { Link, Switch, Route, useParams, NavLink } from 'react-router-dom';
import {
    FiArrowLeftCircle,
    FiArrowRightCircle,
    AiFillWarning,
    MdThumbUp,
    FaInstagramSquare,
    FaFacebook,
    AiFillHome,
    FaLinkedin,
    MdEmail,
    BiEdit,
    BiTrash,
    FaTwitterSquare
} from 'react-icons/all';
import Message from '../../Layout/components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, CLEAN_UP_USER_DATA, getUserDataByUID } from '../../../actions/userData.action';
import { getUserAllBooks } from '../../../actions/books.action';
/**
* @author
* @function UnAuthUserProfile
**/

const UnAuthUserProfile = (props) => {
    //! HOOKS
    const auth = useSelector(state => state.auth);
    const userData = useSelector(state => state.userData)
    const books = useSelector(state => state.books)
    const dispatch = useDispatch();
    const params = useParams()
    //! states
    const [profileMenuToggel, setProfileMenuToggel] = useState(false);
    const [socialMedia, setSocialMedia] = useState({});

    //!useEffects
    // get user data to fill profile
    useEffect(() => {
        if (params.id !== ("" || undefined) && userData.isEmpty) {
            let _user = {
                email : params.id,
            }
            dispatch(getUserData(_user));
        }
        return () => {
            dispatch(CLEAN_UP_USER_DATA());
        };
    }, [])


    //Social media small name
    useEffect(() => {
        if (!userData.isEmpty) {
            dispatch(getUserAllBooks(userData.userData))
            setSocialMedia(userData.userData.social_Media);
            return () => {
                setSocialMedia({});
            }
        }
    }, [userData.isEmpty])

    return (
        <section className="profile__page">
            <div className=" container flex  profile">

                <div className={!profileMenuToggel ? "profile__menu  open__profile__menu  flex flex-jc-sb" : "profile__menu   flex flex-jc-sb"}>

                    <div className={!profileMenuToggel ? "profile__arrow open__profile__menu display-medium-none" : "profile__arrow  display-medium-none"}>
                        <FiArrowRightCircle size="35px" onClick={() => setProfileMenuToggel(!profileMenuToggel)} />
                    </div>

                    <div className="user__photo ">
                        <h2 className={
                            userData.userData.profile_percent < 60
                                ?
                                "tag tag-red"
                                :
                                "tag tag-green"
                        }> {userData.userData.profile_percent < 0 ? 0 : userData.userData.profile_percent} %</h2>

                        <div className="user__profile_img randomBGcolor flex flex-jc-c flex-ai-c">
                            {/* <img src="https://source.unsplash.com/user/erondu/200x200" alt="img" /> */}
                            <span className="heading">{userData.userData.displayName ? userData.userData.displayName[0] : "Login"}</span>
                        </div>
                        {/* <h4>Hello</h4> */}
                        <h1 className="heading">{userData.userData.displayName}</h1>
                    </div>
                    <div className="user__menu flex flex-jc-sb">
                        <div className="user__menu_active_btn">

                            <div className="book_user_social_media">
                                <div className="social_med  flex flex-ai-c" >
                                    <p><FaInstagramSquare size="25px" color="red" /></p>
                                    {
                                        socialMedia.insta === ""
                                            ?
                                            <a >    
                                                Not Provided
                                            </a>
                                            :
                                            <a href={`https://www.instagram.com/${socialMedia.insta}`} target="_blank" >
                                                {socialMedia.insta}
                                            </a>
                                    }
                                </div>
                                <div className="social_med  flex flex-ai-c" >
                                    <p><FaFacebook size="25px" color="#4267B2" /></p>
                                    {
                                        socialMedia.fb === ""
                                            ?
                                            <a >
                                                Not Provided
                                            </a>
                                            :
                                            <a href={socialMedia.fb} target="_blank" >
                                                FaceBook Profile
                                            </a>
                                    }
                                </div>
                                <div className="social_med  flex flex-ai-c" >
                                    <p><FaTwitterSquare size="25px" color="#1DA1F2" /></p>
                                    {
                                        socialMedia.twit === ""
                                            ?
                                            <a >
                                                Not Provided
                                            </a>
                                            :
                                            <a href={`https://twitter.com//${socialMedia.twit}`} target="_blank" >
                                                {socialMedia.twit}
                                            </a>
                                    }
                                </div>
                                <div className="social_med  flex flex-ai-c" >
                                    <p><FaLinkedin size="25px" color="#0077b5" /></p>
                                    {
                                        socialMedia.linkDin === ""
                                            ?
                                            <a >
                                                Not Provided
                                            </a>
                                            :
                                            <a href={socialMedia.linkDin} target="_blank"  >
                                                LinkDin
                                            </a>
                                    }
                                </div>
                                <div className="social_med  flex flex-ai-c" >
                                    <p><MdEmail size="25px" color="#EA4335" /></p>
                                    {
                                        userData.userData.email === ""
                                            ?
                                            <a >
                                                Not Provided
                                            </a>
                                            :
                                            <a target="_blank"  >
                                                {userData.userData.email}
                                            </a>
                                    }
                                </div>
                                <div className="social_med  flex flex-ai-c" >
                                    <p><AiFillHome size="25px" color="#0077b5" /></p>
                                    {
                                        userData.userData.address === undefined ?
                                            null
                                            :
                                            userData.userData.address.city === ""
                                                ?
                                                <a >
                                                    Not Provided
                                                </a>
                                                :
                                                <a href={socialMedia.discord} target="_blank"  >
                                                    {userData.userData.address.fAddress},
                                                    {userData.userData.address.city},
                                                    {userData.userData.address.state},
                                                    {userData.userData.address.pin}
                                                </a>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="user__feedback">
                            <a href="#"><h4>feedBack</h4></a>
                        </div>
                    </div>
                </div>

                <div className="profile__content ">
                    {
                        userData.userData.profile_percent < 60
                            ?
                            <div div className="warning warning-red flex flex-jc-l flex-ai-c">
                                <AiFillWarning size="40" />
                                <p>
                                    You Can connect your book buyer by Provided the this social media links
                                    <span style={{ color: "red" }}> This user has not Completed his profile more than 60% </span> 
                                </p>
                            </div>
                            :
                            <div className="warning warning-green flex flex-jc-l flex-ai-c">
                                <MdThumbUp size="40" />
                                <p>
                                    You Can connect your book buyer by Provided the this social media links
                                    <span style={{ color: "red" }}> This user has Completed his profile more than 60% so you can trust him/her  </span>
                                </p>
                            </div>
                    }


                    <div className="user__directions__path flex flex-ai-c flex-jc-sb">
                        <h5> &#62; All books of this user
                            {
                                // window.location.href.split('/').slice(4).map((element , index)=>(
                                //   <span key={index}> &#62; {element}</span>
                                //   ))
                            }
                        </h5>
                        <h2 className={
                            userData.userData.profile_percent < 60
                                ?
                                "tag tag-red"
                                :
                                "tag tag-green"

                        }>
                            {userData.userData.profile_percent < 0 ? 0 : userData.userData.profile_percent}
                            % Profile Completed
                        </h2>
                    </div>

                    {/* book list */}
                    <div>
                        {
                            books.User_All_books.length === 0
                                ?
                                <div className="user__book ">
                                    <Message
                                        heading="No book(s) available"
                                        btnText="Go Back"
                                        btnLink="/profile/userallbooks"
                                        message={userData.userData.displayName + "  didn't list any book(s) for sell yet.  😒"}
                                    />
                                </div>
                                :
                                books.User_All_books.map((book, index) => (
                                    <div className="user__book  flex flex-jc-sb flex-ai-c -modile-col" key={index}>
                                        <div style={{}} className="book_I_T_P flex flex-jc-sa flex-ai-c">
                                            <div>
                                                {/* Arrow up and down */}
                                                &#62;  {index + 1.}
                                            </div>

                                            <div className="book_I" style={{ backgroundImage: book.b_Images.length > 0 ? `url(${book.b_Images[0]})` : "url(https://unsplash.it/200)" }}></div>
                                            {/* <img src={ book.b_Images.length > 0 ? `${book.b_Images[0]}` : "https://unsplash.it/200"} alt="" /> */}
                                            <Link to={"/bookdetails/" + book.id}>
                                                <h2>{book.bTitle.slice(0, 20)}...</h2>
                                            </Link>
                                            <h4>&#8377;{book.sellPrice}</h4>
                                        </div>

                                    </div>
                                ))
                        }

                    </div>

                </div>
            </div>

        </section >
    )
}


export default UnAuthUserProfile;