import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userLoginOrNOt } from '../../../actions';
import { testAction } from '../../../actions/test.action';
import { getUserData } from '../../../actions/userData.action';
import Popup from '../../Helper/components/Popup';
import { randomBGcolor } from '../../Helper/js/RandomBGcolor';
import Footer from '../../Layout/Footer'



import Header from '../../Layout/Header'
import BrandingContent from './components/BrandingContent'
import Categories from './components/Categories'
import Features from './components/Features'

/**
* @author
* @function HomePage
**/

const HomePage = (props) => {
  document.title="Home page"
  const books = useSelector(state => state.books)
  useEffect(() => {
    randomBGcolor();
  }, [books.message])

  useEffect(() => {

    setTimeout(() => {

    }, 5000);

  }, [])
  return (
    <>
      <BrandingContent />
      <Features />
      <Categories />
    </>
  )
}


export default HomePage;