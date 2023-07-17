import React , {useState} from 'react'

/**
* @author
* @function Question
**/

const Question = ({
    question = "question 1",
    style,
    type = "radio",
    id = "f-loadTime",
    name = "loadTime",
    value,
    options = ["Poor", "Average", "Very Good"],
    onChange 
}) => {
    return (
        <div className="containerFD" style={style} >
            <h4>{question}</h4>
            <ul >
                <li>
                    <input
                        type="radio"
                        id={"f-"+id}
                        name={name}
                        value={options[0]}
                        onChange={onChange}
                    />
                    <label htmlFor={"f-"+id}>{options[0]}</label>

                    <div className="check"></div>
                </li>
                <li>
                    <input
                        type="radio"
                        id={"s-"+id}
                        name={name}
                        value={options[1]}
                        onChange={onChange}
                    />
                    <label htmlFor={"s-"+id}>{options[1]}</label>

                    <div className="check"><div className="inside"></div></div>
                </li>
                <li>
                    <input
                        type="radio"
                        id={"t-"+id}
                        name={name}
                        value={options[2]}
                        onChange={onChange}
                    />
                    <label htmlFor={"t-"+id}>{options[2]}</label>


                    <div className="check"><div className="inside"></div></div>
                </li>
            </ul>
        </div>
    )
}


export default Question