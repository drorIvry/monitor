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

    const data =  [
        {
            "name": "Ethernet",
            "address": [
                "B0-6E-BF-1B-AB-98",
                "169.254.96.192",
                "fe80::6c87:f0bb:1a15:60c0"
            ],

        },
        {
            "name": "VirtualBox Host-Only Network",
            "address": [
                "0A-00-27-00-00-11",
                "192.168.56.1",
                "fe80::648c:85ea:7b76:42e3"
            ],

        },
        {
            "name": "Local Area Connection* 1",
            "address": [
                "FA-34-41-84-1C-91",
                "169.254.98.40",
                "fe80::f8d9:51c8:ab3a:6228"
            ],

        },
        {
            "name": "Local Area Connection* 2",
            "address": [
                "F8-34-41-84-1C-92",
                "169.254.121.233",
                "fe80::18f8:c3f3:234:79e9"
            ],
        },
        {
            "name": "Wi-Fi",
            "address": [
                "F8-34-41-84-1C-91",
                "10.0.0.10",
                "fe80::b8d7:1bf1:b284:a020"
            ],

        },
        {
            "name": "Loopback Pseudo-Interface 1",
            "address": [
                "127.0.0.1",
                "::1"
            ],
        }
    ];

    let {reportID} = useParams();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Paper className={fixedHeightPaper}>
            <h2>Network</h2>
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
                                        <ListItem className={classes.nested}>
                                            <ListItemText primary={"Address: " + partition.address[0]}/>
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