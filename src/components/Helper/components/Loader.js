import React from 'react'
import {withRouter} from 'react-router-dom';
/**
* @author
* @function Loader
**/

const Loader = (props) => {
    return (

        <div className="loder_outer flex flex-jc-c flex-ai-c">
            <div className="loader"></div>
        </div>

    )
}

const SmallLoader = (props) => {
    return (
        <div className="small__loader flex flex-jc-c">
            <div className="loader"></div>
        </div>
    )
};

export default Loader;
export { SmallLoader }


