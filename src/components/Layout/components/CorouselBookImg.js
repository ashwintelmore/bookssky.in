import React, { useEffect, useState } from 'react'
import { ImCircleLeft, ImCircleRight } from 'react-icons/all';
import corouselJs from '../../Helper/js/corousel'
import { randomBGcolor } from '../../Helper/js/RandomBGcolor';

/**
* @author
* @function CoroueslBookImg
**/

const CoroueslBookImg = ({
    imagesArray = []
}) => {

    const [temp, setTemp] = useState([])

    useEffect(() => {
        corouselJs();
    }, [])

    useEffect(() => {
        randomBGcolor();
        return () => {
            randomBGcolor();
        }
    }, [])
    const renderImages = () => {
        let t = []
        for (let index = 0; index < 3; index++) {
            const element = imagesArray[index];
            t.push(element);
        }
        return t;
    };


    return (
        <>
            <div className="corousel">
                <button className="corousel__button corousel__button--left is-hidden">
                    <ImCircleLeft />
                </button>
                <div className="corousel__track-controller">

                    <ul className="corousel__track flex flex-ai-c">
                        {
                            renderImages().map((imgUrl, index) => (
                                <li className="corousel__slide current-slide randomBGcolor" key={index}>
                                    <div className="corousel__image" style={{ backgroundImage: imgUrl !== undefined ? `url(${imgUrl})` : "url(https://unsplash.it/403)" }}  ></div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <button className="corousel__button corousel__button--right">
                    <ImCircleRight />
                </button>
                <div className="corousole_nav">
                    <button className="corousel_dot current-slide"></button>
                    <button className="corousel_dot"></button>
                    <button className="corousel_dot"></button>
                </div>
            </div>
        </>
    )
}


export default CoroueslBookImg