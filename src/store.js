import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import postReducer from './reducers/postReducer'
import postDetailsReducer from './reducers/postDetailsReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const combinedReducer = combineReducers({
    postReducer,
    postDetailsReducer
});

export default createStore(
    combinedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);