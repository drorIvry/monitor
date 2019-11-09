import {combineReducers} from 'redux';
import DarkModeReducer from './DarkModeReducer';


export default combineReducers({
    darkMode:DarkModeReducer,
});
