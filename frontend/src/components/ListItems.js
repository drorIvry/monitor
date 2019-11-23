import React from 'react';
import { useCookies } from 'react-cookie';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AlarmIcon from '@material-ui/icons/Warning';
import {logout} from '../actions/LoginActions';
import { useDispatch } from 'react-redux'

import history from '../history'

export const mainListItems = (
    <div>
        <ListItem button onClick={event => history.push('/dashboard')}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={event => history.push('/reports')}>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button onClick={event => history.push('/monitors')}>
            <ListItemIcon >
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Monitors" />
        </ListItem>
        <ListItem button onClick={event => history.push('/alerts')}>
            <ListItemIcon >
                <AlarmIcon />
            </ListItemIcon>
            <ListItemText primary="Alerts" />
        </ListItem>

    </div>
);

export function accountList(onLogout) {
    return (
        <div>
            <ListItem button onClick={onLogout}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>

        </div>
    );
}
