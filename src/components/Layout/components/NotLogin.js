import React, { useState } from 'react'
import Popup from '../../Helper/components/Popup'

/**
* @author
* @function NotLogin
**/

const NotLogin = (props) => {
    const [show, setShow] = useState(true)

    return (
        <>
            <Popup
                btn="OK"
                show={show}
                onClose={()=>setShow(false)}
                heading="You Need to login first"
                closeLink="/"
                btnLink="/login"
                btnLinkText="Login"
            >
                For using the all our services you need to login first
            </Popup>
        </>
    )
}


export default NotLogin