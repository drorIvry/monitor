import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 450,
    },
}));

export default function MemoryCard() {
    const classes = useStyles();
    let {reportID} = useParams();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Paper className={fixedHeightPaper}>
            <h2>Operating System</h2>
            <List>
                <ListItem>
                    <ListItemText
                        primary={"OS: Windows"}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={"Versiob: " + "10.0.17134"}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={"Full Name: " + "Windows-10-10.0.17134-SP0"}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={"Architecture: " + "AMD64"}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={"Processor: " + "Intel64 Family 6 Model 158 Stepping 9, GenuineIntel"}
                    />
                </ListItem>
            </List>
        </Paper>
    )
}