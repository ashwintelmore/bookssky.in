import React, { useState, useEffect, useMemo } from 'react'
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle, BiTrash, BiEdit } from 'react-icons/all'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUserAllBooks, CLEAN_UP_BOOKS_DATA } from '../../../../actions/books.action'
import { setBookForSell, CLEAN_UP_USER_DATA, deleteThisBook, CLEAN_UP_BOOK } from '../../../../actions'
import Message from '../../../Layout/components/Message'
import { getAllBookRequestsSellerBook, CLEAN_UP_REQUESTS } from '../../../../actions'
import { SmallLoader } from '../../../Helper/components/Loader'
/**
* @author
* @function UserBooksPage
**/

const UserBooksPage = (props) => {
    //! HOOKS
    document.title="My all Books"
    const auth = useSelector(state => state.auth);
    const books = useSelector(state => state.books);
    const currentBook = useSelector(state => state.book)
    const allRequesters = useSelector(state => state.allRequesters)
    const params = useParams()
    const dispatch = useDispatch();

    //! State Variables
    const [show, setShow] = useState(-1)


    //! Functions
    const bookResponce = (index, book) => {
        if (show === index) {
            setShow(-1)
        } else {
            setShow(index);
            //get all requester of selected book
            let userBasic = {
                b_sellerUID: auth.user.uid,
                bookID: book.id
            }
            dispatch(getAllBookRequestsSellerBook(userBasic))
        }
    };

    const changeShowStatus = (index) => {

        let toChangeShowStatus = books.User_All_books[index];

        toChangeShowStatus = {
            ...toChangeShowStatus,
            show_status: !toChangeShowStatus.show_status,

            book_details: {},
            qunatity: toChangeShowStatus.book_details.qunatity,
            auther: toChangeShowStatus.book_details.auther,
            discrib: toChangeShowStatus.book_details.discrib,
            lang: toChangeShowStatus.book_details.lang,
            noPages: toChangeShowStatus.book_details.noPages,
            publisher: toChangeShowStatus.book_details.publisher,
            publisherYEAR: toChangeShowStatus.book_details.publisherYEAR,
        }
        dispatch(setBookForSell(toChangeShowStatus))
    };

    const deleteBook = (index) => {
        let toBeDelete = books.User_All_books[index];

        if (window.confirm(toBeDelete.bTitle + " book want to delete")) {

            const deleted = books.User_All_books.splice(index, 1)
            dispatch(deleteThisBook(toBeDelete))
        } else {
            console.log('i dont want to delete :>> ');
        }
    };

    const LoadMoreBooks = () => {
        if ((auth.isUserLogin)) {
            //last document of first 4 user books
            dispatch(getUserAllBooks(auth.user, books.User_All_books[books.User_All_books.length - 1]))
        }
    };


    //! useEffects
    //get all book of user
    useEffect(() => {
        if ((auth.isUserLogin)) {
            dispatch(getUserAllBooks(auth.user))

        }
    }, [])
    useEffect(() => {
        if ((auth.isUserLogin && currentBook.isEmpty === false)) {
            dispatch(getUserAllBooks(auth.user))
            return () => {
                // console.log("clean")
                // dispatch(CLEAN_UP_BOOK())
            }
        }
    }, [currentBook.isEmpty])

    useEffect(() => {
        if (currentBook.isUpdateSuccess) {
            dispatch(CLEAN_UP_BOOK());
        }

    }, [currentBook.isUpdateSuccess])

    //clean up the all state
    useEffect(() => {
        return () => {
            // dispatch(CLEAN_UP_BOOK())
            dispatch(CLEAN_UP_REQUESTS())
        }
    }, [])


    return (
        <div>
            {
                books.User_All_books.length === 0
                    ?
                    <div className="user__book ">
                        <Message
                            heading="No book(s) available"
                            btnText="Sell Book"
                            btnLink="/profile/sellbook"
                            message="You didn't list any book(s) for sell yet.  😒"
                        />
                    </div>
                    :
                    books.User_All_books.map((book, index) => (
                        <div className="user__book  flex flex-jc-sb flex-ai-c -modile-col" key={index}>
                            <div className="book_I_T_P flex flex-jc-sa flex-ai-c">
                                <div className="mouse_hover_text" >
                                    {/* Arrow up and down */}
                                    {
                                        show === index ?
                                            <IoIosArrowDropupCircle
                                                size="30px"
                                                onClick={() => bookResponce(index, book)}
                                            />
                                            :
                                            <IoIosArrowDropdownCircle
                                            title="See all requests for this book"
                                                size="30px"
                                                onClick={() => bookResponce(index, book)}
                                            />
                                    }
                                </div>

                                <div className="book_I" style={{ backgroundImage: book.b_Images.length > 0 ? `url(${book.b_Images[0]})` : "url(https://unsplash.it/200)" }}></div>
                                {/* <img src={ book.b_Images.length > 0 ? `${book.b_Images[0]}` : "https://unsplash.it/200"} alt="" /> */}
                                <Link to={`/bookdetails/${book.id}`}>
                                    <h2>{book.bTitle.slice(0, 20)}...</h2>
                                </Link>
                                <h4>&#8377;{book.sellPrice}</h4>
                            </div>
                            <div style={{ flexWrap: "wrap" }} className="flex flex-ai-c flex-jc-c padding-y">
                                <Link to={"/profile/sellbook/" + book.id} className="btn" style={{ width: "47px" }}  title="Edit Your this book" ><BiEdit size="26px" /></Link>
                                <Link to="#" className="btn" onClick={() => changeShowStatus(index)} style={{ backgroundColor: book.show_status ? "green" : "orange", width: "120px" }}  title="You can set your book status to show publically or Private" >{book.show_status ? "Public" : "Private"}</Link>
                                {/* <Link to="#" className="btn" onClick={() => deleteBook(index)} style={{ backgroundColor: "red", width: "47px" }}><BiTrash size="26px" /></Link> */}
                            </div>

                            {
                                show === index ?
                                    allRequesters.loading ?
                                        <SmallLoader />
                                        :
                                        <div style={{ width: "100%" }} className="flex flex-jc-fs padding-y flex-di-col">
                                            {

                                                allRequesters.all_requests.length > 0
                                                    ?
                                                    allRequesters.all_requests.map((req, ind) => (
                                                        <div className="  flex flex-ai-c" key={ind} style={{ gap: "15px" }}>
                                                            <img style={{ borderRadius: "100%", width: "60px", height: "80%" }} src="https://unsplash.it/200" alt="" />
                                                            <h3>
                                                                <Link
                                                                    // to={`/UserProfile/${req.uid}`}
                                                                    // query={{ the: 'query' }}
                                                                    to={{
                                                                        pathname: `/UserProfile/${req.email}`,
                                                                        email: req.email
                                                                    }}

                                                                >{req.name}
                                                                </Link>
                                                            </h3>
                                                            {
                                                                req.exchangeBookId === "" ?
                                                                    <h4>Request Price is &#8377;{req.price}</h4>
                                                                    :
                                                                    <h4><Link to={`/bookdetails/${req.exchangeBookId}`} >Exchange Book</Link></h4>

                                                            }
                                                        </div>
                                                    ))
                                                    :
                                                    allRequesters.loading ?
                                                        <SmallLoader />
                                                        :
                                                        <div className="  flex flex-jc-c" style={{ gap: "15px" }}>
                                                            <h2>😌 Nothing to show any request</h2>
                                                        </div>
                                            }
                                        </div>
                                    :
                                    null
                            }

                        </div>
                    ))
            }
            <div>
                <h3 style={{ textAlign: 'center' }} >
                    {
                        books.loadingMoreBooks ?
                            <SmallLoader />
                            :
                            books.message === "NOT_FOUND" ?
                                <p>No more books are available</p>
                                :
                                <button onClick={LoadMoreBooks} style={{ border: "1px solid", padding: "5px 10px", borderRadius: "5px" }} >
                                    Load more
                                </button>
                    }
                </h3>
            </div>
        </div>
    )
}


export default UserBooksPage;


{/* <div style={{ flexWrap: "wrap" }} className="flex">
<button className="btn" style={{ backgroundColor: true ? "green" : "orange", width: "100px" }}>Accept</button>
<button className="btn" style={{ backgroundColor: true ? "red" : "orange", width: "100px" }}>Reject</button>
</div> */}