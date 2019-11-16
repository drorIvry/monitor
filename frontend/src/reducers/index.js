import {combineReducers} from 'redux';
import DarkModeReducer from './DarkModeReducer';
import DrawerReducer from './DrawerReducer';
import MonitorDialogReducer from './MonitorDialogReducer';
import FrameReducer from './FrameReducer';
import LoginReducer from './LoginReducer';

export default combineReducers({
    darkMode:DarkModeReducer,
    drawer: DrawerReducer,
    monitorDialog: MonitorDialogReducer,
    frame: FrameReducer,
    login: LoginReducer,
});
