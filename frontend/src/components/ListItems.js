import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
    <div>
        <ListItem button onClick={event => window.location = '/dashboard'}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={event => window.location = '/reports'}>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button onClick={event => window.location = '/monitors'}>
            <ListItemIcon >
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Monitors" />
        </ListItem>

    </div>
);

export function reportsItemList(reports){
    return (
        <div>
            <ListSubheader inset>Saved reports</ListSubheader>
            {reports.map((report) => {
                return <ListItem button onClick={event => window.location = '/reports/'+ report}>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={report} />
                </ListItem>
            })}
        </div>
    );
}

export const accountList = (
    <div>
        <ListItem button onClick={event => window.location = '/account'}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
        </ListItem>
        <ListItem button onClick={event => window.location = '/logout'}>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>
    </div>
);