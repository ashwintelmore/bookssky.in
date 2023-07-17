import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getAllBooksByCategory } from '../../../actions';
import { CLEAN_UP_BOOKS_DATA } from '../../../actions/books.action';
import Loader, { SmallLoader } from '../../Helper/components/Loader'
import ComingSoon from '../../Layout/components/ComingSoon';
import Message from '../../Layout/components/Message';

/**
* @author
* @function SearchResult
**/

const SearchResult = (props) => {
    const params = useParams()
    document.title = params.uniqueName;
    const dispatch = useDispatch();
    const books = useSelector(state => state.books)


    const LoadMoreBooks = (e) => {
        if ((params.searchBy && params.uniqueName) !== ("" || undefined)) {
            let searchInput = {
                searchBy: params.searchBy,
                uniqueName: params.uniqueName
            }
            dispatch(getAllBooksByCategory(searchInput, books.all_books))
        }

    };



    useEffect(() => {

        if ((params.searchBy && params.uniqueName) !== ("" || undefined)) {
            let searchInput = {
                searchBy: params.searchBy,
                uniqueName: params.uniqueName
            }
            dispatch(getAllBooksByCategory(searchInput))
        }
        return () => {
            dispatch(CLEAN_UP_BOOKS_DATA())
        }
    }, [params.uniqueName])


    return (
        <section className="searchResult  container">
            <div className="search_hero   margin-y">
                {/* <div className="search_sorting display-small-none flex flex-di-col flex-jc-c ">
                    <a className="secondary_btn" href="#">Less Requests Sended</a>
                    <a className="secondary_btn" href="#">More Requests Sended</a>
                    <a className="secondary_btn" href="#">Low to High  Price</a>
                    <a className="secondary_btn" href="#">High to Low  Price</a>
                </div> */}

                {
                    books.loading ?
                        <Loader />
                        :
                        books.whereFrom === "CATEGORY" ?
                            <div className="search_result ">
                                <h1 className="heading">Your Result Based On Category</h1>
                                {
                                    books.all_books.length > 0 ? (
                                        books.all_books.map((book, index) => (
                                            <div className="user_book flex " key={index}>
                                                <div className="user_book_img">
                                                    <div style={{ position: "relative" }}>
                                                        {
                                                            book.availableFor !== "sell" ?
                                                                <div className="non-semantic-protector" >
                                                                    <h1 className="ribbon">
                                                                        <strong className="ribbon-content">Exchange Available</strong>
                                                                    </h1>
                                                                </div>
                                                                : null
                                                        }

                                                    </div>
                                                    {
                                                        book.b_Images.length > 0 ?
                                                            <img src={book.b_Images[0]} alt="User_book_img" />
                                                            :
                                                            <img src="https://unsplash.it/200" alt="User_book_img" />
                                                    }
                                                </div>
                                                <div className="user_book_hero    flex flex-jc-sb">
                                                    <div className="user_book_heading">
                                                        <h1 className="heading">{book.bTitle}</h1>
                                                        <h4>{book.for_SCU}</h4>
                                                        <h4 className="error "> </h4>
                                                        <Link to={`/bookdetails/${book.id}`} className="btn">View</Link>
                                                    </div>
                                                    <div className="user_book_price">
                                                        <h2 >Rs.{book.sellPrice}-/</h2>
                                                        <h4> <strike>{book.actualPrice}-/</strike> </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        )))
                                        :
                                        <Message
                                            heading="No Books Available"
                                        />
                                }
                            </div>
                            :
                            <ComingSoon />

                }

            </div>
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
        </section>
    )
}


export default SearchResult

