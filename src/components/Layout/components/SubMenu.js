import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link , NavLink } from 'react-router-dom';
import {activeBtn} from '../../Helper/js/activeBtn';

/**
* @author
* @function SubMenu
**/

const SubMenu = ({burggerToggel ,onClose }) => {
    const auth = useSelector(state => state.auth);
    useEffect(() => {
        // activeBtn(document.querySelector('.menu-item') , Array.from(document.querySelector('.menu-item').children));
    }, [])
    console.log('localStorage.getItem("loginState") :>> ', localStorage.getItem("loginState"));
    return (
        <div className={burggerToggel ? "sub-menu" : "sub-menu display-small-none"}>
            <div className=" menu-links container flex flex-jc-sb flex-ai-c">
                <div className=" location" >
                    <h2>Best City</h2>
                    <p>445001</p>
                </div>
                <div className="menu-item  flex">
                    <NavLink to="/" exact activeClassName="active-link" className="menu-sub-item" onClick={onClose} >Home</NavLink>
                    <NavLink to={"/searchresult/type/PDF"} activeClassName="active-link" className="menu-sub-item" onClick={onClose} >PDF</NavLink>
                    <NavLink to ="/searchresult/type/book-physical-copy" activeClassName="active-link" className="menu-sub-item" onClick={onClose} >Books</NavLink>
                    <NavLink to ="/searchresult/type/notes" activeClassName="active-link" className="menu-sub-item" onClick={onClose} >Notes</NavLink>
                    <NavLink to ="/request-for-book" activeClassName="active-link" className="menu-sub-item" onClick={onClose} >Request For book</NavLink>
                  
                  {
                      auth.isUserLogin === true ?
                      <NavLink to ="/profile/userallbooks" activeClassName="active-link" className="menu-sub-item" onClick={onClose} >My Profile</NavLink>
                      :
                      <NavLink to ="/login" activeClassName="active-link" className="menu-sub-item" onClick={onClose} >Login/Register</NavLink>
                  }
                </div>
            </div>
        </div>
    )
}


export default SubMenu;