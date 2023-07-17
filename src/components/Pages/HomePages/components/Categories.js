import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBookCategory, timeTocleanUpCat } from '../../../../actions';
import { getAllBooks, CLEAN_UP_BOOKS_DATA } from '../../../../actions/books.action';

import Image1 from '../../../../assets/image-1.png';
import Loader, { SmallLoader } from '../../../Helper/components/Loader';
/**
* @author
* @function Categories
**/

const Categories = (props) => {
    //! HOOKS
    const dispatch = useDispatch();
    const dynamicData = useSelector(state => state.dynamicData);
    const books = useSelector(state => state.books)

    //! STATE VARIABLEs


    //!useEffects
    // get all book category
    useEffect(() => {
        //! IMP
        // dynamicData.loading becoz this ueseffects runs two times if page refreshes
        if (dynamicData.isEmpty && !dynamicData.loading) {
            dispatch(getBookCategory())
        }
        return () => {
            // Dont use any type of clean up here 
            //see IMP
        }
    }, [])
    // Get All books
    useEffect(() => {
        if (!dynamicData.isEmpty) {
            dispatch(getAllBooks(dynamicData.books_cat))

            return () => {
                dispatch(CLEAN_UP_BOOKS_DATA())
            }
        }
    }, [dynamicData.isEmpty])
    return (
        <section className=" categories">
            <div className=" categories__sidebar flex container">
                <div className=" list__Categories">
                    {
                        dynamicData.isEmpty ?
                            null
                            :
                            dynamicData.books_cat
                                .map((cat, index) =>
                                    <div className=" category" key={index}>
                                        <div className="cat__Head flex margin-y flex-jc-sb flex-ai-c">
                                            <h2 className="heading">{cat.cat_name}</h2>
                                            <Link to={"/searchresult/category/" + cat.id}>View More</Link>
                                        </div>
                                        <div className="cat__books flex flex-jc-fs" style={{ justifyContent: "flex-start", gap: "15px" }}>
                                            {
                                                books.loading ?
                                                    <SmallLoader />
                                                    :
                                                    books.whereFrom === "HOME_BOOKS" ?
                                                        books.all_books.length === 0
                                                            ?
                                                            <p>No Books Available</p>
                                                            :
                                                            (
                                                                books.all_books[index].length === 0
                                                                    ?
                                                                    <p>No books Available for this category...😒 , try another categories</p>
                                                                    :
                                                                    books.all_books[index].map((book, index) =>
                                                                        <Link to={`/bookdetails/${book.id}`} className="book" key={index}>
                                                                            <div className="book_img randomBGcolor">
                                                                                {
                                                                                    book.availableFor !== "sell"
                                                                                        ?
                                                                                        <div className="non-semantic-protector">
                                                                                            <h1 className="ribbon">
                                                                                                <strong className="ribbon-content">Exchange Available</strong>
                                                                                            </h1>
                                                                                        </div>
                                                                                        :
                                                                                        null
                                                                                }

                                                                                {
                                                                                    book.b_Images.length > 0
                                                                                        ?
                                                                                        <img src={book.b_Images[0]} alt="book" />
                                                                                        :
                                                                                        null

                                                                                }
                                                                            </div>
                                                                            <h5 >{book.bTitle} <span>({book.for_SCU})</span></h5>
                                                                            <div className="__price">
                                                                                <h1> &#x20B9; {book.sellPrice}/-</h1>
                                                                                <h4>&#x20B9;{book.actualPrice}</h4>
                                                                            </div>
                                                                        </Link>
                                                                    )
                                                            )
                                                        :
                                                        null
                                            }
                                        </div>
                                    </div>
                                )
                    }


                    <div className="Users">
                        <div className=" user__list ">
                            <div className="user__Head margin-y flex  flex-jc-sb flex-ai-c">
                                <h2 className="heading">Recent User Posted book</h2>
                            </div>
                            <div className="user flex  ">
                                <p>Not enough data to show</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" ads__List display-small-none">
                    <div className="sidebar__content">
                        <h1 className="heading">Sponsors </h1>
                            <div>
                                <img style={{width:"100%"}} src={Image1} alt="Branding"  />
                            </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Categories;