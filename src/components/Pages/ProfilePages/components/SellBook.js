import React, { useState, useEffect } from 'react'
import { RiImageAddFill } from 'react-icons/all';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
// import bookTest from '../../../../assets/bookTest.jpg';
import Loader, { SmallLoader } from '../../../Helper/components/Loader';
import Message from '../../../Layout/components/Message'

import Input, { InputSelect } from '../../../Layout/components/Input';
import { getBookCategory } from '../../../../actions/dynamicData.action'
import { getUserBook, setBookForSell, CLEAN_UP_USER_DATA, NotForEdit, CLEAN_UP_BOOK } from '../../../../actions/book.action'

import { useParams } from 'react-router-dom';
import { app } from '../../../../firebase/base';
import Popup from '../../../Helper/components/Popup';
const storage = app.storage();
/**
* @author
* @function SellBookPage
**/

const SellBookPage = (props) => {
  document.title="Sell book"
  //! HOOKS
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const dynamicData = useSelector(state => state.dynamicData);
  const currentBook = useSelector(state => state.book)
  const params = useParams();
  //! State Variable
  const [book, setBook] = useState({
    id: '',
    b_sellerUID: auth.user.uid,//uid
    email: auth.user.email,
    hide: auth.user.hide,
    noOfRequest: '',//number
    show_status: true,//boolean

    b_Images: [],

    bTitle: '',
    for_SCU: 'GCOEY',
    actualPrice: 0,
    sellPrice: 0,
    category: '',
    bType: '',//PDF , Nots , other

    availableFor: 'sell',
    exchangeMassege: '',

    //Book description
    qunatity: 1,
    auther: '',
    discrib: '',
    lang: '',
    noPages: '',
    publisher: '',
    publisherYEAR: '',
  })

  const [images, setImages] = useState([]);
  const [imgUrlLoader, setImgUrlLoader] = useState([])
  const [show, setShow] = useState(false)

  //! Functions
  const handleChange = (e, i) => {
    if (e.target.type === "file") {
      handleChangeImages(e, i);
    } else {
      const { name, value } = e.target;
      setBook({ ...book, [name]: value })
    }
  };

  const handleChangeImages = async (e, index) => {
    const book_Img = e.target.files[0];
    //TODO There is bug...
    if (e.target.files[0] === undefined || !e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      alert("jpeg / jpg / png format allow only")
      return
    }
    let imageLoadTemp = [...imgUrlLoader];
    imageLoadTemp[index] = true;
    setImgUrlLoader(imageLoadTemp);

    const storageRef = storage.ref();
    const itemImgRef = storageRef.child(`${auth.user.email}/booksImages/${book.bTitle}/${book_Img.name}`)

    await itemImgRef.put(book_Img).on('state_changed',
      function progress(snapshot) {
        var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      },
      function error(err) {
        console.log('err :>> ', err);
      },
      async function complete() {
        await itemImgRef
          .getDownloadURL()
          .then((url) => {
            let imagesTemp = [...images];
            imagesTemp[index] = url;
            setImages(imagesTemp);

            imageLoadTemp = [...imgUrlLoader];
            imageLoadTemp[index] = false;
            setImgUrlLoader(imageLoadTemp)
          })
      }
    );
  };
  const sellBook = async (e) => {
    e.preventDefault();
    dispatch(setBookForSell(book, auth.user));
    setShow(true)
    // if (window.confirm("Your Book is successfully listed on bookssky.in after clicking on ok btn ( you can see your book on 'My Books' section )")) {
    // }else{
    //   return
    // }

    setBook({
      id: '',
      b_sellerUID: auth.user.uid,//uid
      email: auth.user.email,
      hide: auth.user.hide,
      noOfRequest: '',//number
      show_status: true,//boolean

      b_Images: [],

      bTitle: '',
      for_SCU: 'GCOEY',
      actualPrice: '',
      sellPrice: '',
      category: '',
      bType: '',//PDF , Nots , other

      availableFor: 'sell',
      exchangeMassege: '',

      //Book description
      qunatity: 1,
      auther: '',
      discrib: '',
      lang: '',
      noPages: '',
      publisher: '',
      publisherYEAR: '',
    })
  };
  //! Effects
  //Get book category CSE/ME/EEE
  useEffect(() => {
    if (dynamicData.isEmpty) {
      dispatch(getBookCategory())
    }
    return () => {
      dispatch(CLEAN_UP_BOOK());
    }
  }, [])
  //Updated successfully
  useEffect(() => {
    if (currentBook.whereFrom === "EDIT_BOOK") {
      //user coms for upadating existing book
    }else{
      //user comes for selling
      if (!currentBook.isEmpty) {
        setShow(true)
      }
    }
  }, [currentBook.isEmpty])
  //Edit or new book
  useEffect(() => {
    if (params.bookName) {
      dispatch(getUserBook(params.bookName, "EDIT_BOOK"))
    } else {
      // dispatch(NotForEdit())
      setBook({
        id: "",
        b_sellerUID: auth.user.uid,//uid
        email: auth.user.email,
        hide: auth.user.hide,
        noOfRequest: '',//number
        show_status: true,//boolean

        b_Images: [],

        bTitle: '',
        for_SCU: 'GCOEY',
        actualPrice: 0,
        sellPrice: 0,
        category: '',
        bType: '',//PDF , Nots , other

        availableFor: 'sell',
        exchangeMassege: '',

        //Book description
        qunatity: 1,
        auther: '',
        discrib: '',
        lang: '',
        noPages: '',
        publisher: '',
        publisherYEAR: '',
      })
    }
   
    //, currentBook.currentBook.isEmpty
  }, [params.bookName])
  //book state seting
  useEffect(() => {
    if (currentBook.whereFrom === "EDIT_BOOK") {
      if (!currentBook.isEmpty) {
        setBook({
          id: currentBook.currentBook.id,
          b_sellerUID: currentBook.currentBook.b_sellerUID,//uid
          email: currentBook.currentBook.email,
          hide: currentBook.currentBook.hide,
          noOfRequest: currentBook.currentBook.noOfRequest,//number
          show_status: currentBook.currentBook.show_status,//boolean

          bTitle: currentBook.currentBook.bTitle,
          for_SCU: currentBook.currentBook.for_SCU,
          actualPrice: currentBook.currentBook.actualPrice,
          sellPrice: currentBook.currentBook.sellPrice,
          category: currentBook.currentBook.category,
          bType: currentBook.currentBook.bType,//PDF , Nots , other

          availableFor: currentBook.currentBook.availableFor,
          exchangeMassege: currentBook.currentBook.exchangeMassege,

          //book_details
          qunatity: currentBook.currentBook.book_details.qunatity,
          auther: currentBook.currentBook.book_details.auther,
          discrib: currentBook.currentBook.book_details.discrib,
          lang: currentBook.currentBook.book_details.lang,
          noPages: currentBook.currentBook.book_details.noPages,
          publisher: currentBook.currentBook.book_details.publisher,
          publisherYEAR: currentBook.currentBook.book_details.publisherYEAR,

          b_Images: currentBook.currentBook.b_Images
        })
        setImages(currentBook.currentBook.b_Images)
        return () => {
          dispatch(CLEAN_UP_BOOK())
        }
      }
    }
    if (currentBook.whereFrom === "FOR_EXCHANGE") {
      if (!currentBook.isEmpty) {
        setBook({
          ...book,
          availableFor: "s_e_both",
        })
        setImages(currentBook.currentBook.b_Images)
        return () => {
          dispatch(CLEAN_UP_BOOK())
        }
      }
    }


  }, [currentBook.isEmpty])

  useEffect(() => {
    if (images.length > 0) {
      setBook({ ...book, b_Images: images })
    }
  }, [images])

  useEffect(() => {
    if (book.availableFor !== "sell") {
      setBook({ ...book, sellPrice: 0 })
    }
    return () => {
      // cleanup
      dispatch(CLEAN_UP_BOOK())
    }
  }, [book.availableFor])


  if (currentBook.loading) {
    return <Loader />
  }
  if (currentBook.error === "NOT_FOUND") {
    return <Message
      message="This is page may remove or delete"
    />
  }
  return (
    <div className={auth.user.profile_percent > 60 && auth.user.emailVerified ? "edit__form" : "edit__form edit__form-blur"} >
      <form onSubmit={sellBook} >
        <Popup
        heading="Successfully listed for sell"
        btnLink="/profile/userallbooks"
        btnLinkText="My Books"
        show={show}
        onClose={()=>setShow(false)}
         >
           <p>You can see your all listed book on My Books Section</p>
         </Popup>
        <div className="formData">
          <h1 className="margin-y">List Your book/PDF/Notes for <span className="error">selling or exchange</span>  and get some money from it</h1>
          <h5 className="red">All * mark options are compulsory to fill</h5>
          <div className="formData">
            <h1 className="margin-y">Exchange Book Should Be </h1>
            <div className="form__inputs flex">
              <div className="inputData">
                <InputSelect
                  label="Offers for"
                  messege="If you select Exchange option, then you can't set your price"
                  // moreImfo="this is more about this"
                >
                  <select
                    className=" select"
                    name="availableFor"
                    value={book.availableFor}
                    onChange={handleChange}
                  >
                    <option value="sell">Only Sell</option>
                    <option value="exchange">Only Exchange</option>
                    <option value="s_e_both">Both Sell and Exchange</option>
                  </select>
                </InputSelect>
              </div>
            </div>
            {
              book.availableFor == "exchange" || book.availableFor == "s_e_both" ?
                <div className="form__inputs flex">
                  <div className="inputData">
                    <Input
                      label="What do expect In Exchange Book"
                      placeholder="e.g. R.D.Sharma"
                      messege="Enter all details of expected book should be"
                      name="exchangeMassege"
                      value={book.exchangeMassege}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                :
                null
            }
          </div>

          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="Book Title/Name"
                placeholder="e.g. Engineering mathematics I"
                messege="Enter the exact mention on book to help other for search"
                required="required"
                name="bTitle"
                value={book.bTitle}
                onChange={handleChange}
              />
            </div>
            <div className="inputData">
              <Input
                label="School/College/University"
                messege="You can seperated out by ',' comma in case of multiple names"
                required="required"
                name="for_SCU"
                value={book.for_SCU}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="Actual Price"
                placeholder="e.g. 398"
                type="number"
                messege="Enter the actual price mentioned on book"
                required="required"
                name="actualPrice"
                value={book.actualPrice}
                onChange={handleChange}
              />
            </div>
            <div className="inputData">
              <Input
                label="Set Your Price"
                placeholder="e.g. 199 "
                type="number"
                messege={book.availableFor !== "exchange" ?  "You wish to sell on that price" : "You can't set price if you chosen 'Only Exchange'"}
                required="required"
                name="sellPrice"
                value={book.sellPrice}
                readOnly={book.availableFor === "exchange" ? "readonly" : ""}
                // moreImfo={book.availableFor !== "exchange" ? "" : "You can't set price if you chosen 'Only Exchange'"}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form__inputs flex">
            <div className="inputData">
              <InputSelect
                label="Category"
                messege="Best Category for this book"
                required="required"
              >
                <select
                  className="select"
                  required="required"
                  name="category"
                  value={book.category}
                  onChange={handleChange}
                >
                  <option value="">Select Option</option>
                  {dynamicData.books_cat.map((cat, index) => (
                    <option key={index} value={cat.id}>{cat.cat_name}</option>
                  ))}
                </select>
              </InputSelect>
            </div>
            <div className="inputData">
              <InputSelect
                label="Book Type"
                required="required"
                messege="Appropriate Type for Book"
              >
                <select
                  className=" select"
                  required="required"
                  name="bType"
                  value={book.bType}
                  onChange={handleChange}
                >
                  <option value="">Select Option</option>
                  <option value="book-physical-copy">Book (Physical Copy)</option>
                  <option value="notes">Notes</option>
                  <option value="PDF">PDF</option>
                  <option value="Handwriting-Notes">Handwriting Notes</option>
                  <option value="Printed-Notes">Printed Notes</option>
                  <option value="Soft-Copy">Soft Copy (Docs,ppt,etc)</option>
                  <option value="Other">Other</option>
                </select>
              </InputSelect>
            </div>
          </div>
          {/* <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="Tags"
                placeholder="e.g. maharashtra"
                messege="Add related to book tag for shows your book on top of search list"
              />
              <p>
                <span className="tag">DBATU</span>
                <span className="tag">GCOEY</span>
                <span className="tag">math</span>
              </p>
            </div>
          </div> */}
        </div>

        <div className="formData">
          <h1 className="margin-y">Upload Images</h1>
          {
            // imgUrlLoader.length > 0
            //  ? imgUrlLoader.forEach(load => {
            //   load ? (<p>It's Take little more of time be petiant</p>) : null
            //   console.log(load)
            // })
            //   : null
            imgUrlLoader[0] || imgUrlLoader[1] || imgUrlLoader[2]
              ?
              (<p>It's Take little more of time be petiant</p>)
              :
              null

          }

          {/* Book Images */}
          <div className="form__inputs  flex ">
            <div className="preview_book_img flex flex-ai-c">
              <h4>Front Page Cover</h4>
              <div className="uploadFile">
                <input
                  type="file"
                  accept="images/*"
                  onChange={(e) => handleChange(e, 0)}
                />
                <div className="imgesUpload"><RiImageAddFill size="100px" /></div>
              </div>
              {

                imgUrlLoader[0]
                  ?
                  <div>
                    <SmallLoader />
                  </div>
                  :
                  book.b_Images.length > 0 ?
                    <div className="img" style={{ backgroundImage: `url(${book.b_Images[0]})` }} >
                    </div>
                    :
                    <div className="img flex flex-ai-c flex-jc-c" style={{ backgroundImage: `` }} >
                      <div className="uploadFile">
                        <input type="file" />
                        <div className="imgesUpload"><RiImageAddFill size="100px" /></div>
                      </div>
                    </div>
              }
            </div>
            <div className="preview_book_img flex flex-ai-c">
              <h4>Other Page </h4>
              <div className="uploadFile">
                <input
                  type="file"
                  accept="images/*"
                  onChange={(e) => handleChange(e, 1)}

                />
                <div className="imgesUpload"><RiImageAddFill size="100px" /></div>
              </div>
              {
                imgUrlLoader[1]
                  ?
                  <div>
                    <SmallLoader />
                  </div>
                  :
                  book.b_Images.length > 0 ?
                    <div className="img " style={{ backgroundImage: `url(${book.b_Images[1]})` }} >
                    </div>
                    :
                    <div className="img flex flex-ai-c flex-jc-c" style={{ backgroundImage: `` }} >
                      <div className="uploadFile">
                        <input type="file" />
                        <div className="imgesUpload"><RiImageAddFill size="100px" /></div>
                      </div>
                    </div>

              }
            </div>
            <div className="preview_book_img flex flex-ai-c">
              <h4>Other Page </h4>
              <div className="uploadFile">
                <input
                  type="file"
                  accept="images/*"
                  onChange={(e) => handleChange(e, 2)}

                />
                <div className="imgesUpload"><RiImageAddFill size="100px" /></div>
              </div>
              {
                imgUrlLoader[2]
                  ?
                  <div>
                    <SmallLoader />
                  </div>
                  :
                  book.b_Images.length > 0 ?
                    <div className="img " style={{ backgroundImage: `url(${book.b_Images[2]})` }} >
                    </div>
                    :
                    <div className="img flex flex-ai-c flex-jc-c" style={{ backgroundImage: `` }} >
                      <div className="uploadFile">
                        <input type="file" />
                        <div className="imgesUpload"><RiImageAddFill size="100px" /></div>
                      </div>
                    </div>
              }
            </div>
          </div>
        </div>
        <div className="formData">
          <h1 className="margin-y">Book Discription</h1>
          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="Book Auther Name"
                placeholder="e.g. R.D.Sharma"
                messege="Mentioned on Your Front Page of book"
                name="auther"
                value={book.auther}
                onChange={handleChange}
              />
            </div>
            <div className="inputData">
              <Input
                label="Quantity"
                type="number"
                placeholder="e.g. near GCOEY , Yavatmal"
                messege="How many copies You have"
                required="required"
                name="qunatity"
                value={book.qunatity}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="Number of Pages"
                placeholder="e.g. 389"
                type="number"
                messege="See on last page of Book page number"
                name="noPages"
                value={book.noPages}
                onChange={handleChange}
              />
            </div>
            <div className="inputData">
              <Input
                label="Language"
                placeholder="e.g. English"
                messege="Printed book language"
                name="lang"
                value={book.lang}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="Publisher"
                placeholder="e.g. Nirali Publication"
                messege="Mention on Your Book"
                required="required"
                name="publisher"
                value={book.publisher}
                onChange={handleChange}
              />
            </div>
            <div className="inputData">
              <Input
                label="Publication Year"
                placeholder="e.g. 2018"
                messege="Mention in Your Book"
                name="publisherYEAR"
                value={book.publisherYEAR}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form__inputs flex">
            <div className="inputData">
              <Input
                label="Discription"
                placeholder="e.g. this book is best for engg students"
                messege="Discribe Your Book"
                required="required"
                name="discrib"
                value={book.discrib}
                onChange={handleChange}
              />
            </div>
          </div>


          {/* //TODO Feture Plan */}
          {/* <div className="formData">
            <h1 className="margin-y"> Social Media permision </h1>
            <h5>Which type of social media do you want to show publically</h5>
            <div className="form__inputs flex">
              <div className="inputData">
                <input type="checkbox" name="" id="" />
                <span>Instagram</span>
              </div>
            </div>
            <div className="form__inputs flex">
              <div className="inputData">
                <div>
                  <input type="checkbox" name="" id="" />
                  <span>Instagram</span>
                </div>
              </div>
            </div>
          </div> */}


          <div className="submit__btn">
            <button className="btn">sell</button>
          </div>
        </div>

      </form>
    </div>
  )
}


export default SellBookPage