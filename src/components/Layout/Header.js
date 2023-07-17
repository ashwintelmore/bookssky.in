import React, { useState } from 'react'
import { IoAddCircleOutline, hamnu, IoSearchCircleOutline , BiUserCircle } from 'react-icons/all'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"


// TODO Delete
import Brand from '../../assets/Brand.png'
import SubMenu from './components/SubMenu'

const Header = (props) => {
   //Hooks
   const auth = useSelector(state => state.auth) 
    
    
    
    const [burggerToggel, setBurggerToggel] = useState(false);
    if (burggerToggel) {
        document.querySelector("body").classList.add('no-scroll')
    } else {
        document.querySelector("body").classList.remove('no-scroll')
    }
    return (
        <nav>
            <div className="navbar container  flex flex-jc-sb flex-ai-c">
                <a href="/" className="navbar__logo">
                    <img src={Brand} alt="logo" />
                </a>
                <div className="display-medium-none">
                    <Link to="/profile/userallbooks" onClick={()=>setBurggerToggel(false)} >
                        <div className="flex flex-jc-c flex-ai-c  profile-photo randomBGcolor">
                            {/* <img src="https://unsplash.it/200" /> */}
                            <span style={{fontSize:"1.4em" }}> {auth.isUserLogin ? auth.user.email.slice(0,1) : <BiUserCircle size="35"/> } </span>
                        </div>
                    </Link>
                </div>
                <div className="display-medium-none">
                    <div onClick={() => { setBurggerToggel(!burggerToggel) }}>
                        <div className={burggerToggel ? "hamburger-menu animate" : "hamburger-menu"} > </div>
                    </div>
                </div>

                <div className="navbar__navs flex flex-jc-sb flex-ai-c">
                    <div className="nav flex-search">
                        <div id="search">
                            <input type="text" placeholder={`Try "mathematics"`} />
                            <Link to="/searchResult" > <button><IoSearchCircleOutline size="36" /></button> </Link>
                        </div>
                    </div>
                    <div className="nav flex-sell"  title="Sell Book Now">
                        <Link to="/profile/sellbook" className="btn button display-small-none ">
                            {/* <span><IoAddCircleOutline size="30" /></span> */}
                            <span>Sell</span>
                        </Link>
                        <Link to="/profile/sellbook" className="btn sell-btn-mobile display-medium-none"><IoAddCircleOutline size="52" /></Link>

                    </div>
                    <Link to="/profile/userallbooks" className="nav display-small-none flex-profile-photo profile-photo flex flex-jc-c flex-ai-c randomBGcolor"  title="Your Profile">
                        {/* <img src="" /> */}
                        
                        <span style={{fontSize:"1.4em" }}> {auth.isUserLogin ? auth.user.email.slice(0,1) : <BiUserCircle size="35"/> } </span>
                    </Link>
                </div>
            </div>
            <SubMenu
             burggerToggel={burggerToggel} 
             onClose={()=>setBurggerToggel(false)}
             />
        </nav>
    )
}


export default Header