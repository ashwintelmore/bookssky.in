import React from 'react'
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/all'
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    LinkedinShareButton,
} from 'react-share';
/**
* @author
* @function FullWidthContent
**/

const FullWidthContent = (props) => {
    const message = "Sharing  this site link in your respective collage graups / instagram / facebook story will connect students on the same site. You can share site link by ckicking on buttons mentioned below. Please Support us by sharing it to your contacts and groups."
    const message1 = `Bookssky.in is  platform where you can list your books , used books, PDFs, handwriting notes , all type of study material for sell or Exchange 
    And connect with buyers(as student) through their social media..`
    return (
        <section className="  FullWidth flex flex-jc-c flex-ai-c">
            <h1 className="heading">Support Us</h1>
            <p className="text-content">
                {message}
            </p>
            <div className="social__icons flex">
                <a href={`https://api.whatsapp.com/send?text=${message1}`} data-action="share/whatsapp/share" target="_blank" >.<FaWhatsapp color="green" />
                </a>
                <a target="_blank">
                    <FacebookShareButton
                        url={`bookssky.in`}
                        quote={message1}>
                        <FaFacebook color="#4267B2" />
                    </FacebookShareButton>
                </a>
                <a target="_blank">
                    <TwitterShareButton
                        url={`bookssky.in`}
                        title={message1}>
                        <FaTwitter color="#1DA1F2" />
                    </TwitterShareButton>
                </a>
                <a target="_blank">
                    <LinkedinShareButton
                        url={`bookssky.in`}
                        summary={message1}>
                          <FaLinkedin color="#0077b5" />
                    </LinkedinShareButton>
                </a>
            </div>
        </section>
    )
}


export default FullWidthContent;