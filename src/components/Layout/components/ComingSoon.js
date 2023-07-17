import React from 'react'
import Message from './Message'

/**
* @author
* @function ComingSoon
**/

const ComingSoon = (props) => {
    document.title="Coming Soon"
    return (
        <>
            <div className="container">
                <Message
                    heading="Coming soon"
                    message="we are working on this page"
                />
            </div>
        </>
    )
}


export default ComingSoon