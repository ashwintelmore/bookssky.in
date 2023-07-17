import { combineReducers } from 'redux'
import testReducer from './test.reducers';
import authReducer from './auth.reducers';
import userDataReducer from './userData.reducers';
import dynamicDataReducer from './dynamicData.reducers';
import bookReducer from './book.reducers';
import booksReducer from './books.reducers';
import reqBookReducer from './reqBook.reducers';
import allRequestersReducer from './allRequesters.reducers';

const rootReducer = combineReducers({
    test: testReducer,
    auth: authReducer,
    userData: userDataReducer,
    dynamicData: dynamicDataReducer,
    book: bookReducer,
    books: booksReducer,
    reqBook :reqBookReducer,
    allRequesters :allRequestersReducer,

})


export default rootReducer;