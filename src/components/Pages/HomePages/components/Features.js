import React from 'react'
import { MdAccountCircle, FaUserFriends, GiReceiveMoney, FaHandsHelping } from 'react-icons/all'
import { Link } from 'react-router-dom'
import blueTree from '../../../../assets/bluetree.png'
/**
* @author
* @function Features
**/

const Features = (props) => {
    return (
        <section className="features">
            <div className="insruction">


            </div>
            <div className="container">
                <div className="all-features flex flex-jc-c">
                    <div className=" flex  flex-jc-c flex-ai-c flex-di-col">
                        <div className="instruction_content">
                            <h1>Just follow the few steps and get paid.</h1>
                            <ol>
                                <li className="text-content">Register yourself on <Link to="/" className="hyper_link" >bookssky.in</Link> with your Email id and password. (You can <Link className="hyper_link" to="/registration"> Register Here</Link> ).
                                </li>
                                <li className="text-content">Complete your <Link to="//profile/userallbooks" className="hyper_link" >Profile</Link> (Basic details). minimum 60% required for building trust with buyer.
                                </li>
                                <li className="text-content">Clicked  some pictures of your book(Screenshot in case PDF) and upload on  Bookssky.in <Link to="/profile/sellbook" className="hyper_link" >Here</Link>
                                </li>
                                <li className="text-content">And receive <Link to="/profile/userrequest" className="hyper_link" href="#">Request</Link>  from buyer and connect with him/her through the social media
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className=" flex  flex-jc-c flex-ai-c flex-di-col">
                        <div className="instruction_images">
                            <img src={blueTree} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="all-features flex flex-jc-c">
                    <div className="feature flex  flex-jc-c flex-ai-c flex-di-col">
                        <div className="feature-icon"><FaHandsHelping size="100%" color="#8100ff" /></div>
                        <div className="feature-heading">
                            <h1 className="heading">Exchange Available</h1>
                        </div>
                        <div className="feature-description">
                            <p className="text-content">
                                We have provided an option for listing your books/PDFs/Notes for Exchange
                            </p>
                        </div>
                    </div>
                    <div className="feature flex  flex-jc-c flex-ai-c flex-di-col">
                        <div className="feature-icon"><FaUserFriends size="100%" color="#8100ff" /></div>
                        <div className="feature-heading">
                            <h1 className="heading">Pay to direct seller</h1>
                        </div>
                        <div className="feature-description">
                            <p className="text-content">
                                We don't ask to any user for payment you can pay direct to seller
                            </p>
                        </div>
                    </div>
                    <div className="feature flex  flex-jc-c flex-ai-c flex-di-col">
                        <div className="feature-icon"><GiReceiveMoney size="100%" color="#8100ff" /></div>
                        <div className="feature-heading">
                            <h1 className="heading">Save money and time</h1>
                        </div>
                        <div className="feature-description">
                            <p className="text-content">
                               Our Alogorithm will show you all the books/PDFs/Notes from your locallity.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}


export default Features;