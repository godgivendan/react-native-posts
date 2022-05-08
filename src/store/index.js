import {combineReducers, configureStore, applyMiddleware} from '@reduxjs/toolkit'
import {postReducer} from "./reducers/post";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    post: postReducer
})
export default configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})