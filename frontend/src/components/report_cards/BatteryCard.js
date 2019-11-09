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
        height: 350,
    },
}));

export default function MemoryCard() {
    const classes = useStyles();
    let {reportID} = useParams();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Paper className={fixedHeightPaper}>
            <h2>Battery</h2>
            <List>
                <ListItem>
                    <ListItemText
                        primary={"Percent: " + 88+ "%"}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={"Time Left: " + "10:23:22"}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={"Plugged In: " + "No"}
                    />
                </ListItem>
            </List>
        </Paper>
    )
}
