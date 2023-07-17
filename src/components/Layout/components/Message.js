import React, { Children } from 'react'
import { Link, useParams } from 'react-router-dom'

/**
* @author
* @function Message
**/

const Message = ({
  heading = "Not Found",
  message = "This page is not Found 404",
  btnText = "Home",
  btnLink = "/",
  children
}) => {

  return (
    <section className="features">
      <div className="container">
        <div className="all-features flex flex-jc-c">
          <div className=" flex  flex-jc-c flex-ai-c ">
            <div className="instruction_content">
              <h1>{heading}</h1>
              <div className="feature-description">
                <h2>
                  {message}
                </h2>
                {children}
                <Link to={btnLink} className="btn margin-y">{btnText}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Message