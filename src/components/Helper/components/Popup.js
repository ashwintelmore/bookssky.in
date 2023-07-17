import React, { Children, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

/**
* @author
* @function Popup
**/

const Popup = ({
    show,
    onClose,
    children,
    heading,
    btn,
    error = "",
    btnLink = "",
    btnLinkText = "",
    closeLink = "",

}) => {
    if (!show) {
        return null
    }
    return (
        <div>
            <div id="popup1" className={show ? "overlay visible" : "overlay "}>
                <div className="popup">
                    <h2 className={error === "ERROR" ?  "error" : "" }>{heading}</h2>

                    {
                        closeLink === "" ?
                            <p className="close" onClick={onClose}>&times;</p>
                            :
                            <Link to={closeLink}>
                                <p className="close" onClick={onClose}>&times;</p>
                            </Link>
                    }
                    <div className="content margin-y">
                        {children}
                    </div>
                    {
                        btn === "NOT_CLOSE" ?

                            null
                            :
                            btnLink === "" ?
                                <button className="btn" onClick={onClose} > {btn} </button>
                                :
                                <Link to={btnLink} className="btn" > {btnLinkText} </Link>
                    }
                </div>
            </div>

        </div>
    )
}


export default Popup