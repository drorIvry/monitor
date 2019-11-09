import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {useParams} from 'react-router-dom';
import Frame from './Frame';
import Copyright from './Copyright';
import CPUCard from './report_cards/CPUCard';
import DiskCard from './report_cards/DiskCard';
import MemoryCard from './report_cards/MemoryCard';
import FansCard from './report_cards/FansCard';
import BatteryCard from './report_cards/BatteryCard';
import NetworkCard from './report_cards/NetworkCard';
import OSCard from './report_cards/OSCard';
import TempCard from './report_cards/TempCard';
import UsersCard from './report_cards/UsersCard';


import history from '../history';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
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

export default function ReportPage() {
    const classes = useStyles();
    let {reportID} = useParams();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <Frame/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} lg={4}>
                            <CPUCard/>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <MemoryCard />
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={4}>
                            <DiskCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <NetworkCard/>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <OSCard/>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <UsersCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <FansCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <TempCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <BatteryCard/>
                        </Grid>

                    </Grid>
                </Container>
                <Copyright/>
            </main>
        </div>
    );
}