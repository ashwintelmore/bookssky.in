import React, { Children } from 'react'
import { FaYoutube, GrCircleInformation } from 'react-icons/all';
/**
* @author
* @function Input
**/

const Input = ({
    placeholder = "placeholder",
    className = "",
    label = "label",
    messege = "messege",
    type = "text",
    name = "",
    value = "",
    style,
    onChange = () => { },
    required = "",
    _className = "",
    youtubeLink = "",
    moreImfo = "",
    readOnly = ""
}) => {
    return (
        <div {...style} className={`input ${className}`} >
            <label >{label} {required !== "" ? <span className="red">*</span> : null} </label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={_className}
                readOnly={readOnly === "" ? "" : readOnly}
            />
            <div className="flex">
                {moreImfo === "" ? "" : <a href={youtubeLink} target="_blank"><GrCircleInformation size="22" color="red" style={{ marginTop: "5px", marginRight: "5px" }} /></a>}
                {youtubeLink === "" ? "" : <a href={youtubeLink} target="_blank"><FaYoutube size="30" color="red" /></a>}

                <h5>{messege}</h5>
            </div>
        </div>
    )
}

const InputSelect = ({
    label = "label",
    messege = "messege",
    required = "",
    youtubeLink = "",
    moreImfo = "",
    children

}) => {
    return (
        <div className="input">
            <label >{label} {required !== "" ? <span className="red">*</span> : null} </label>
            {children}
            <div className="flex">
                {moreImfo === "" ? "" : <a href={youtubeLink} target="_blank"><GrCircleInformation size="22" color="red" style={{ marginTop: "5px", marginRight: "5px" }} /></a>}
                {youtubeLink === "" ? "" : <a href={youtubeLink} target="_blank"><FaYoutube size="30" color="red" /></a>}
                <h5>{messege}</h5>
            </div>
        </div>
    )
}



export default Input
export { InputSelect };