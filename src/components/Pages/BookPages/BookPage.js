import React, { useEffect } from 'react'
import { randomBGcolor } from '../../Helper/js/RandomBGcolor';
import fireBase from 'firebase'
import { FaInstagramSquare, FaFacebook, AiFillHome, FaLinkedin, FaDiscord, FaTwitterSquare } from 'react-icons/all';
import { Link, useParams } from 'react-router-dom';
import CoroueslBookImg from '../../Layout/components/CorouselBookImg';
import Input, { InputSelect } from '../../Layout/components/Input';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBook, CLEAN_UP_BOOK, setBookNumberOfReq } from '../../../actions';
import { getUserData, CLEAN_UP_USER_DATA } from '../../../actions';
import Loader from '../../Helper/components/Loader';
import Message from '../../Layout/components/Message';
import { getUserAllExchangeBooks } from '../../../actions';
import { getBookRequestReqBook, setBookRequests, CLEAN_UP_REQUESTS } from '../../../actions/';
/**
* @author
* @function BookPage
**/

const BookPage = (props) => {

    //! HOOKS
    const book = useSelector(state => state.book);
    const books = useSelector(state => state.books);
    const auth = useSelector(state => state.auth);
    const userData = useSelector(state => state.userData);
    const reqBook = useSelector(state => state.reqBook)
    const dispatch = useDispatch();;
    const params = useParams()
    // it using for  updating the number of request
    const increment = fireBase.firestore.FieldValue.increment(1);
    const decrement = fireBase.firestore.FieldValue.increment(-1);

    //! STATES
    const [checked, setChecked] = useState(false);

    const [reqData, setReqData] = useState({
        bookID: params.bookID,
        requesterUID: auth.user.uid,
        b_sellerUID: "",
        id: '',

        email: auth.user.email,
        name: auth.user.displayName,
        profie_img: "",
        req_status: "",
        exchangeBookId: '',
        price: "",
    })
    const [socialMedia, setSocialMedia] = useState({});

    //! Functions 
    const reqSend = (e) => {
        e.preventDefault();



        dispatch(setBookRequests(reqData))


        //! it will update the number of request
        // if (reqBook.reqBook.uid !== auth.user.uid) {
        //     dispatch(setBookNumberOfReq( book.currentBook , increment))
        //     // dispatch(getUserBook(params.bookID))
        // }

    };

    //! UesEffects
    // get single book
    useEffect(() => {
        if (book.isEmpty) {
            dispatch(getUserBook(params.bookID, "FOR_EXCHANGE"))
        }

        return () => {
            //! IMP 
            dispatch(CLEAN_UP_BOOK())
            if (userData.isEmpty) {
                dispatch(CLEAN_UP_USER_DATA())
            }
        }
    }, [])
    //random color
    useEffect(() => {
        randomBGcolor();
        return () => {
            randomBGcolor();
        };
    }, [])

    //Book Seller Data
    useEffect(() => {
        if (!book.isEmpty) {
            const user = {
                email: book.currentBook.email
            }
            setReqData({
                ...reqData,
                b_sellerUID: book.currentBook.b_sellerUID,
                b_name: book.currentBook.bTitle
            })
            dispatch(getUserData(user))
            // return () => {
            //     dispatch(CLEAN_UP_USER_DATA())
            // }
        }
    }, [book.isEmpty])

    //Social media small name
    useEffect(() => {
        if (!userData.isEmpty) {
            setReqData({
                ...reqData,
                b_sellerName: userData.userData.displayName,
            })
            setSocialMedia(userData.userData.social_Media);
            return () => {
                setSocialMedia({});
            }
        }
    }, [userData.isEmpty])

    //Checked price is set to be 0 or empty
    // get all exchange books
    useEffect(() => {
        if (checked) {
            setReqData({ ...reqData, price: 0 })
            if (books.isEmpty) {
                dispatch(getUserAllExchangeBooks(auth.user))
            }
            return () => {
                setReqData({ ...reqData, price: "" })
            }
        } else {
            setReqData({ ...reqData, exchangeBookId: "" })
        }
    }, [checked])

    //get request if user is already send or not
    useEffect(() => {
        if (reqBook.isEmpty && auth.isUserLogin && !book.isEmpty) {
            dispatch(getBookRequestReqBook(reqData))
        document.title = book.currentBook.bTitle;
            
            return () => {
                dispatch(CLEAN_UP_REQUESTS())
            };
        }
    }, [auth.isUserLogin, book.isEmpty])

    // Set state reqData for upadating
    useEffect(() => {
        //false
        if (!reqBook.isEmpty) {
            //checked if user offers for exchange the book
            if (reqBook.reqBook.exchangeBookId !== "" || reqBook.reqBook.exchangeBookId === undefined) {
                setChecked(true)
            }
            setReqData(reqBook.reqBook)
        }
    }, [reqBook.isEmpty])

    useEffect(() => {
        if (reqBook.reqBook.exchangeBookId !== "" && reqBook.reqBook.req_status === false) {
            setChecked(false)
        }
        return () => {

        };
    }, [reqBook.isEmpty])

    if (book.loading || userData.loading) {
        return <Loader />
    }

    if (book.error === "NOT_FOUND") {
        return <Message />
    }

    return (
        userData.isEmpty
            ?
            // <Message />
            null
            :
            <section className="book_details container">

                <div className="book_hero margin-y  flex">
                    <div className="book_hero_imgs  ">
                        <div className="book_imgs_slider ">
                            <div style={{ position: "relative" }}>
                                {
                                    book.currentBook.availableFor !== "sell"
                                        ?
                                        <div className="non-semantic-protector" >
                                            <h1 className="ribbon">
                                                <strong className="ribbon-content">Exchange Available</strong>
                                            </h1>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <CoroueslBookImg
                                imagesArray={book.currentBook.b_Images}
                            />
                        </div>
                    </div>
                    <div className="book_hero_details  " >
                        <h1 className="heading">{book.currentBook.bTitle}</h1>
                        <h4>#{book.currentBook.for_SCU},  #{book.currentBook.bType}</h4>
                        <h2>Connect with Seller for more details</h2>



                        <div className="book_user_social_media">
                            {/* // to={`/UserProfile/${userData.userData.email}`} */}
                            <a className="__user ">
                                <div className="user__profile_photo randomBGcolor">
                                    <p style={{ textAlign: "center", color: "#fff" }}>{userData.userData.displayName.slice(0, 1)}</p>
                                </div>
                                <h3>{userData.userData.displayName}</h3>
                            </a>

                            <div className="social_med  flex" >
                                <p><FaInstagramSquare size="25px" color="red" /></p>
                                {
                                    socialMedia.insta === ""
                                        ?
                                        "Not Provided"
                                        :
                                        <a href={`https://www.instagram.com/${socialMedia.insta}`} target="_blank">
                                            {socialMedia.insta}
                                        </a>
                                }
                            </div>
                            <div className="social_med  flex" >
                                <p><FaFacebook size="25px" color="#4267B2" /></p>
                                {
                                    socialMedia.fb === ""
                                        ?
                                        "Not Provided"
                                        :
                                        <a href={socialMedia.fb} target="_blank">
                                            FaceBook Profile
                                        </a>
                                }
                            </div>
                            <div className="social_med  flex" >
                                <p><FaTwitterSquare size="25px" color="#1DA1F2" /></p>
                                {
                                    socialMedia.twit === ""
                                        ?
                                        "Not Provided"
                                        :
                                        <a href={`https://twitter.com//${socialMedia.twit}`} target="_blank">
                                            {socialMedia.twit}
                                        </a>
                                }
                            </div>
                            <div className="social_med  flex" >
                                <p><FaLinkedin size="25px" color="#0077b5" /></p>
                                {
                                    socialMedia.linkDin === ""
                                        ?
                                        "Not Provided"
                                        :
                                        <a href={socialMedia.linkDin} target="_blank">
                                            LinkDin
                                        </a>
                                }
                            </div>
                        </div>

                        <form action="" onSubmit={reqSend}>
                            <div className="price">
                                <h1 className="heading">Rs. {book.currentBook.sellPrice}-/</h1>
                                <h4>{book.currentBook.actualPrice}-/</h4>
                                {
                                    book.currentBook.availableFor !== "sell"
                                        ?
                                        <div className="">
                                            <input
                                                onChange={() => setChecked(!checked)}
                                                value={checked}
                                                style={{ width: "15px", height: '15px' }}
                                                type="checkbox"
                                                checked={checked ? "checked" : ""}
                                                disabled={reqData.req_status ? "disabled" : ""}

                                            />
                                            <span>Checked if only you interested in Exchange book</span>
                                        </div>
                                        :
                                        null
                                }
                                {
                                    !checked
                                        ?
                                        null
                                        :
                                        <div className=" form__inputs flex flex-modile-col">
                                            <div className="inputData ">
                                                <InputSelect
                                                    label=""
                                                    messege=""
                                                    moreImfo="OK"
                                                    required="required"

                                                >
                                                    <select
                                                        style={{ width: "200px" }}
                                                        className="select"
                                                        required="required"
                                                        readOnly={false ? "" : "readonly"}
                                                        disabled={reqData.req_status ? "disabled" : ""}


                                                        value={reqData.exchangeBookId}
                                                        onChange={(e) => setReqData({ ...reqData, exchangeBookId: e.target.value })}
                                                    >
                                                        <option value="">Select Book Name</option>
                                                        {
                                                            !book.isEmpty ?

                                                                books.User_All_books.map((book, index) => (
                                                                    <option key={index} value={book.id}>{book.bTitle}</option>
                                                                ))
                                                                :
                                                                <option value="">Please Add book by clicking on Add button</option>
                                                        }
                                                    </select>
                                                </InputSelect>
                                            </div>
                                            <div>
                                                <h3 style={{ margin: "13px 9px" }}>Or</h3>
                                            </div>
                                            <div className="inputData">
                                                <Link to="/profile/sellbook" style={{ width: "100px", backgroundColor: 'green' }} className="btn">Add</Link>
                                            </div>
                                        </div>
                                }
                                <div className="input">
                                    <input
                                        readOnly={!checked ? "" : "readonly"}
                                        value={reqData.price}
                                        onChange={(e) => setReqData({ ...reqData, price: e.target.value })}
                                        placeholder="Request Price"
                                        required="required"
                                        type="number"
                                    />
                                    {

                                    }
                                </div>
                                {
                                    reqBook.reqBook.req_status === true ?
                                        <div>
                                            <button style={{ backgroundColor: "orange", width: "45%" }} className="btn" type="submit" >Request Back</button>
                                            <p>
                                                You can see your all request
                                                <br />or <Link to="/profile/userrequest" style={{ color: "blue" }}> My Request</Link>
                                            </p>
                                        </div>
                                        :
                                        <div>
                                            <button style={{}} className="btn" type="submit">Send Request</button>
                                            <p>
                                                Set Your  request Price
                                            </p>
                                        </div>

                                }

                                {/* //TODO after some time */}
                                {/* <h5 className="error">5 Request Sended </h5> */}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="book_basic_details margin-y flex">

                    {
                        book.isEmpty
                            ?
                            <div className="book_basic_describ">
                                <h1>Book Description</h1>
                                {/* <p>{book.currentBook.book_details.discrib}</p> */}
                                <h1>Exchange Book should be</h1>
                                <p>{book.currentBook.exchangeMassege}</p>
                                <h1>Product Basic Details</h1>
                                {/* <p>Languge : {book.currentBook.book_details.lang}</p>
                            <p>Auther : {book.currentBook.book_details.auther}</p>
                            <p>Number of book Availabe : {book.currentBook.book_details.qunatity}</p>
                            <p>Publisher : {book.currentBook.book_details.publisher}</p>
                            <p>Publishing Year : {book.currentBook.book_details.publisherYEAR}</p>
                            <p>Number Of pages : {book.currentBook.book_details.noPages}</p> */}
                            </div>
                            :
                            <div className="book_basic_describ">
                                <h1>Book Description</h1>
                                <p>{book.currentBook.book_details.discrib === "" ? "Not Provided." : book.currentBook.book_details.discrib}</p>
                                {
                                    book.currentBook.availableFor !== "sell"
                                        ?
                                        <div>
                                            <h1>Exchange Book should be</h1>
                                            <p>{book.currentBook.exchangeMassege === "" ? "Not Provided." : book.currentBook.exchangeMassege}</p>
                                        </div>
                                        :
                                        null
                                }


                                <h1>Product Basic Details</h1>
                                <p><b>Format</b> : {book.currentBook.bType === "" ? "Not Provided." : book.currentBook.bType}</p>
                                <p><b>Languge</b> : {book.currentBook.book_details.lang === "" ? "Not Provided." : book.currentBook.book_details.lang}</p>
                                <p> <b>Auther</b> : {book.currentBook.book_details.auther === "" ? "Not Provided." : book.currentBook.book_details.auther}</p>
                                <p> <b>Publisher</b> : {book.currentBook.book_details.publisher === "" ? "Not Provided." : book.currentBook.book_details.publisher}</p>
                                <p> <b>Number of books Availabe</b> : {book.currentBook.book_details.qunatity === "" ? "Not Provided." : book.currentBook.book_details.qunatity} qunatity.</p>
                                <p> <b>Publishing Year</b> : {book.currentBook.book_details.publisherYEAR === "" ? "Not Provided." : book.currentBook.book_details.publisherYEAR}</p>
                                <p> <b>No Of Pages</b> : {book.currentBook.book_details.noPages === "" ? "Not Provided." : book.currentBook.book_details.noPages}</p>
                            </div>
                    }

                    <div className="ads display-small-none ">

                    </div>
                </div>
                <div className=" category margin-y">
                    <div className="cat__Head flex margin-y flex-jc-sb flex-ai-c">
                        <h2 className="heading">Books recommended for you</h2>

                    </div>
                    <div className="cat__books flex  ">
                        <p>No Books available</p>
                    </div>
                </div>
            </section>
    )
}


export default BookPage