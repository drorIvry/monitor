import {combineReducers} from 'redux';
import DarkModeReducer from './DarkModeReducer';
import DrawerReducer from './DrawerReducer';


export default combineReducers({
    darkMode:DarkModeReducer,
    drawer: DrawerReducer,
});
