import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    fixedHeight: {
        height: 450,
    },
}));

export default function MemoryCard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState([]);

    const handleClick = value => {
        const currentIndex = open.indexOf(value);
        const newOpen = [...open];

        if (currentIndex === -1) {
            newOpen.push(value);
        } else {
            newOpen.splice(currentIndex, 1);
        }

        setOpen(newOpen);
    };

    const data = [
        {
            "name": "Dror",
            "terminal": null,
            "host": "0.0.0.0"
        }
    ];

    let {reportID} = useParams();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Paper className={fixedHeightPaper}>
            <h2>Users</h2>
            <List>
                {data.map((partition, key) => {
                        return (
                            <div key={key}>
                                <ListItem button onClick={event => handleClick(key)}>
                                    <ListItemText primary={partition.name}/>
                                    {(open.indexOf(key) !== -1) ? <ExpandLess/> : <ExpandMore/>}
                                </ListItem>
                                <Collapse in={open.indexOf(key) !== -1} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary={"User Name: " + partition.name}/>
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary={"Terminal: " + partition.terminal}/>
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary={"Host: " + partition.host}/>
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </div>
                        )
                    }
                )}

            </List>
        </Paper>
    )
}

