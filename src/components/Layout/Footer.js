import React from 'react'
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/all'
import BrandSvg from '../../assets/Brand.svg'
import FullWidthContent from './FullWidthContent'
import moduleName from 'module';
import { Link } from 'react-router-dom';
/**
* @author
* @function Footer
**/

const Footer = (props) => {
    return (
        <>
        <FullWidthContent />
        <section className="footer  ">

            <div className="footer__links container flex flex-ai-c ">

                <div className="footer__logo" >
                    <img src={BrandSvg} alt="" />
                </div>
                <div className="footer__content">
                    <h2>Lets us know</h2>
                    <Link to="/coming-soon"> <h4>About us</h4></Link>
                    <Link to="/coming-soon"> <h4>Contact/help</h4></Link>
                    <Link to="/coming-soon"> <h4>FAQ</h4></Link>
                </div>
                <div className="footer__content">
                    <h2>Bookssky.in</h2>
                    <Link to="/coming-soon"> <h4>Support</h4></Link>
                    <Link to="/coming-soon"> <h4>Privacy</h4></Link>
                    <Link to="/coming-soon"> <h4>Career</h4></Link>
                </div>
                <div className="footer__content">
                    <div className="footer__content">
                        <h2>Most Usefull for</h2>
                        <Link to="#"> <h4>GCOEY , DBATU</h4></Link>
                    </div>
                    <div className="footer__content">
                        <h2>Follow Us</h2>
                        <div className="social__icons flex">
                            <Link to="/coming-soon"><FaWhatsapp color="green" /></Link>
                            <Link  to="/coming-soon"><FaFacebook color="blue" /></Link>
                            <a  href="https://www.instagram.com/bookssky.in/" target="_blank"><FaInstagram color="red" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <h4>bookssky.in | 2021 | All rights reserved</h4>
            </footer>
        </section>
        </>
    )
}


export default Footer