import {combineReducers} from 'redux';
import DarkModeReducer from './DarkModeReducer';
import DrawerReducer from './DrawerReducer';
import MonitorDialogReducer from './MonitorDialogReducer';

export default combineReducers({
    darkMode:DarkModeReducer,
    drawer: DrawerReducer,
    monitorDialog: MonitorDialogReducer,
});
