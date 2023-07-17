import React, { useEffect, useState } from 'react'
import { BsPen } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAN_UP_USER_DATA, getUserData, updateUserData } from '../../../../actions/userData.action';
import Loader from '../../../Helper/components/Loader';
import Popup from '../../../Helper/components/Popup';
import { randomBGcolor } from '../../../Helper/js/RandomBGcolor';

import Input, { InputSelect } from '../../../Layout/components/Input'

/**
* @author
* @function UserEditForm
**/

const UserEditForm = (props) => {
  document.title="Edit Profile"
  //Hooks
  const auth = useSelector(state => state.auth);
  const _userData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  //state variable 
  //TODO Jugad for geting percentage bcoz of setState not asnyc
  //TODO after setState not immediatly set values
  const [JugadForPercentage, setJugadForPercentage] = useState(false)
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [userData, setUserData] = useState({
    uid: auth.user.uid,
    // hide: false,
    hide: _userData.userData.hide ? true : false,
    email: auth.user.email,
    displayName: "",
    DOB: "",
    photoURL: "",
    profile_percent: "",
    city: "",
    fAddress: "",
    state: "",
    pin: "",
    insta: "",
    fb: "",
    twit: "",
    wApp: "",
    linkDin: "",
    discord: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value })
  };

  //! Functions
  const onUpdate = async (e) => {
    e.preventDefault();

    if ((userData.fb !== "" && !/^(http|https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(userData.fb)) || (userData.linkDin !== "" && !/^(http|https?:\/\/)?((w{3}\.)?)linkedin.com\/.*/.test(userData.linkDin))) {
      var t = document.getElementsByName("linkDin").parentNode
      setShow2(true)
      return;
    }
    var count = 0
    for (var key of Object.keys(userData)) {
      if (userData[key] !== "" && key !== "hide" && key != "photoURL" && key !== "profile_percent" && key !== "uid" && key !== "email") {
        count++;
      }
    }
    //TODO Change hard code to dynamic "12" Should change
    var _percentage = Math.round((count / 12) * 100);
    setUserData({ ...userData, profile_percent: _percentage })
    setShow(true)
    setJugadForPercentage(true)
  };
  //! useEffects
  useEffect(() => {
    if (JugadForPercentage && show) {
      dispatch(updateUserData(userData));
      // alert("Your Data is successfully updated")
      setJugadForPercentage(false)
    };
  }, [JugadForPercentage ])
  useEffect(() => {
    // randomBGcolor();
    if (!_userData.isEmpty) {
      setUserData({
        uid: _userData.userData.uid,
        hide: _userData.userData.hide ? true : false,
        email: auth.user.email,
        displayName: _userData.userData.displayName,
        DOB: _userData.userData.DOB,
        photoURL: _userData.userData.photoURL,
        profile_percent: _userData.userData.profile_percent,
        city: _userData.userData.address.city,
        fAddress: _userData.userData.address.fAddress,
        state: _userData.userData.address.state,
        pin: _userData.userData.address.pin,
        insta: _userData.userData.social_Media.insta,
        fb: _userData.userData.social_Media.fb,
        twit: _userData.userData.social_Media.twit,
        wApp: _userData.userData.social_Media.wApp,
        linkDin: _userData.userData.social_Media.linkDin,
        discord: _userData.userData.social_Media.discord,
      })
    } else {
      dispatch(getUserData(auth.user));
    }
  }, [_userData.isEmpty])

  useEffect(() => {
    return () => {
      dispatch(CLEAN_UP_USER_DATA())
    }
  }, [])

  if (_userData.loading) {
    return <Loader />
  }

  //TODO #Percentage Condion 
  // const takenInPercent = document.querySelectorAll(".percent_take_in");
  // console.log('takenInPercent :>> ', takenInPercent);

  // takenInPercent.forEach(t => {
  //   console.log('t.innerHTML :>> ', t.innerContent);
  // })
  //TODO #Percentage Condion 
  return (
    <div className="edit__form">
      <form onSubmit={onUpdate}>
          <Popup
            heading="Your Profile update successfully"
            btn="Ok"
            onClose={()=>setShow(false)}
            show={show}
          />
          <Popup
            heading="Linkdin or Facebook Link is Invalid "
            btn="Ok"
            error="ERROR"
            onClose={()=>setShow2(false)}
            show={show2}
          >
            <p>Linkdin or Facebook link are not in correct link format, please! copy Your profile link and paste here (You can see videos for reference)</p>
          </Popup>
        <div className="formData">
          <h1 className="margin-y">Persnol Details</h1>
          <div className="form__inputs flex">
            <div className="inputData flex flex-center">
              <div className="pen__upload flex flex-jc-c flex-ai-c profile-photo randomBGcolor">
                {/* <img src="https://unsplash.it/200" alt="" /> */}
                <span style={{ fontSize: "3em" }}>t</span>
                {/* <span className="pen"> <BsPen /><input className="upload" type="file" /> </span> */}
              </div>
            </div>
            <div className="inputData">
              <Input
                label="Name"
                placeholder="e.g. Salman Khan"
                messege="Be carefull this name will shows publicaly"
                name="displayName"
                value={userData.displayName}
                onChange={handleChange}
                _className="percent_take_in"
                required="required"
              />
            </div>
            <div className="inputData">
              <Input
                label="Date of Birth"
                placeholder="DD/MM/YYYY"
                type="date"
                messege="We are naver share your data with anyone"
                name="DOB"
                value={userData.DOB}
                onChange={handleChange}
                required="required"
              />
            </div>
          </div>
        </div>
        <div className="formData">
          <h1 className="margin-y">Contact Details</h1>
          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="City"
                placeholder="e.g. Yavatmal"
                messege="Please fill Your Current City"
                name="city"
                value={userData.city}
                onChange={handleChange}
                required="required"
              />
            </div>
            <div className="inputData">
              <Input
                label="Full Address"
                placeholder="e.g. near GCOEY , Yavatmal"
                messege="Please fill Your full address seperated by comma ‘,’."
                name="fAddress"
                value={userData.fAddress}
                onChange={handleChange}
              />

            </div>
          </div>
          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="State"
                placeholder="e.g. maharashtra"
                messege="We are naver share your data with anyone"
                name="state"
                value={userData.state}
                onChange={handleChange}
              />
            </div>
            <div className="inputData">
              <Input
                label="Pin"
                placeholder="e.g. 444106"
                messege="Please fill Your full address without any special symboll ‘,’ or ‘.’"
                name="pin"
                value={userData.pin}
                onChange={handleChange}
                required="required"
              />
            </div>
          </div>
        </div>
        <div className="formData">
          <h1 className="margin-y">Social media Handles</h1>
          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="Instagram"
                placeholder="e.g. bookssky.in"
                messege="Please Enter only user name/id"
                name="insta"
                value={userData.insta}
                onChange={handleChange}
              />
            </div>
            <div className="inputData">
              <Input
                label="Home map Link"
                placeholder="e.g. bookssky.in"
                messege="Copy Your Home location link from google map and paste here"
                name="discord"
                youtubeLink="link"
                value={userData.discord}
                onChange={handleChange}
              />
            </div>

          </div>
          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="Twitter"
                placeholder="e.g. bookssky.in"
                messege="Please Enter only user name/id"
                name="twit"
                value={userData.twit}
                onChange={handleChange}
              />
            </div>
            <div className="inputData">
              <Input
                label="WhatsApp Number"
                placeholder="e.g. xxxxxx5178"
                messege="We are naver share your data without your permission"
                name="wApp"
                value={userData.wApp}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="Linkdin"
                placeholder="e.g. "
                messege="Copy Your Linkdin profile link and paste here"
                name="linkDin"
                value={userData.linkDin}
                onChange={handleChange}
                youtubeLink="https://www.youtube.com/watch?v=kZQjXFIe3_A"

              />
            </div>
            <div className="inputData">
              <Input
                label="Facebook"
                placeholder="e.g. "
                messege="Copy Your Facebook profile link and paste here"
                name="fb"
                value={userData.fb}
                onChange={handleChange}
                youtubeLink="https://www.youtube.com/watch?v=ybLJTQTvSe4"
              />
            </div>
          </div>
          <div className="submit__btn">
            <button className="btn">Update</button>
          </div>
        </div>
      </form>
    </div>
  )
}


export default UserEditForm