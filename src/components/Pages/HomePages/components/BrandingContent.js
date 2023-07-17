import React, { useState } from 'react'
import { Link } from 'react-router-dom'

//TODO 
/**
* @author
* @function BrandingContent
**/

const BrandingContent = (props) => {
    const [play, setPlay] = useState(false)
    return (
        <section className="hero">
            <div className="container  branding-content flex flex-ai-c flex-jc-c flex-modile-col">
                <div className="branding_content ">
                    <h1>Be The Part of <br /> Share.</h1>
                    <h4 className="text-content">Bookssky.in is  platform where you can list your books , used books, PDFs, handwriting notes , all type of study material for <span className="hyper_link"> sell or Exchange </span>
                        And connect with buyers(as student) through their social media.</h4>
                    <Link to="/profile/sellbook" className="btn" title="Sell your book">Sell Now</Link>
                </div>
                <div className="branding_video flex flex-ai-c flex-jc-c flex-di-col">
                    <div>
                        <p>For more details you can refer this video</p>
                    </div>
                    <div className="video">
                        <iframe src="https://www.youtube.com/embed/evHwO4acl8g" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    {
                        !play ?
                            <button id="play-video" onClick={() => setPlay(true)} className="video-play-button">
                                <span></span>
                            </button>
                            :
                            null
                    }
                </div>

            </div>
        </section>
    )
}


export default BrandingContent;


