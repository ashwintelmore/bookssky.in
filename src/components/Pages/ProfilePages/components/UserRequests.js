import React, { useEffect, useState } from 'react'
import { MdArrowDropDown, BiTrash, BiEdit } from 'react-icons/all'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllBookRequestsUser, setBookRequests, CLEAN_UP_REQUESTS, CLEAN_UP_ALL_REQUESTS } from '../../../../actions';
import { SmallLoader } from '../../../Helper/components/Loader';

/**
* @author
* @function UserRequestsPage
**/

const UserRequestsPage = (props) => {
  document.title="My Requests"
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const allRequesters = useSelector(state => state.allRequesters)

  const LoadMoreRequests = () => {
    if (auth.isUserLogin ) {
      dispatch(getAllBookRequestsUser(auth.user.uid, allRequesters.all_requests[allRequesters.all_requests.length - 1]))
    }
  };


  useEffect(() => {
    if (auth.isUserLogin) {
      dispatch(getAllBookRequestsUser(auth.user.uid))
      return () => {
        dispatch(CLEAN_UP_ALL_REQUESTS())
      }
    }
  }, [])

  return (
    <div>
      {
        allRequesters.all_requests.length > 0
          ?
          allRequesters.all_requests.map((req, ind) => (
            <div className="user__book  flex flex-jc-sb " key={ind}>
              <div style={{ gap: "20px", textAlign: "left" }} className="  flex flex-jc-sa">
                <img src="https://unsplash.it/200" alt="" />
                <Link to={`/bookdetails/${req.bookID}`}>
                  <h1>
                    {req.b_name.slice(0, 20)}...      
                  </h1>
                </Link>
                {
                  req.exchangeBookId !== "" ?
                    <h4>
                      Exchange Request
                    </h4>
                    :
                    <h4>
                      Request Price is {req.price}
                    </h4>
                }
                <h3>{req.b_sellerName}</h3>
              </div>
              {/* <div style={{ width: "200px" }} className="flex">
                {
                  req.req_status ?
                  <button onClick={() => reqStatusHandler(req, ind)} className="btn" style={{ backgroundColor:  "orange", width: "200px" }}>Get Back Request</button>
                  :
                  <button onClick={() => reqStatusHandler(req, ind)} className="btn" style={{ backgroundColor: "green" , width: "200px" }}>Send Request</button>
                }
              </div> */}
            </div>
          ))
          :
          <div className="  flex flex-jc-c" style={{ gap: "15px" }}>
            <h2>😌 Nothing to show any request</h2>
          </div>
      }
      <div>
        <h3 style={{ textAlign: 'center' }} >
          {
            allRequesters.loadingMoreRequests ?
              <SmallLoader />
              :
              allRequesters.message === "NOT_FOUND" ?
                <p>No more books are available</p>
                :
                <button onClick={LoadMoreRequests} style={{ border: "1px solid", padding: "5px 10px", borderRadius: "5px" }} >
                  Load more
                </button>
          }
        </h3>
      </div>
    </div>
  )
}


export default UserRequestsPage;