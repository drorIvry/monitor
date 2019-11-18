import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from "react-redux";

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

function BatteryCard({data}) {
    console.log(data)

    // fix the fetch@@@
    const classes = useStyles();
    let {reportID} = useParams();
    console.log(reportID)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Paper className={fixedHeightPaper}>
            <h2>Battery</h2>
            <List>
                <ListItem>
                    <ListItemText
                        primary={"Percent: " + data.reports.percent+ "%"}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={"Time Left: " + data.reports.secsleft < 0 ? 'N/A' : data.reports.secsleft}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={"Plugged In: " +data.reports.power_plugged? 'Yes' : "No"}
                    />
                </ListItem>
            </List>
        </Paper>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.reports
    };
};

export default connect(mapStateToProps)(BatteryCard);