import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UsageChart from './UsageChart'
import Copyright from './Copyright';
import Frame from './Frame';
import CpuChart from './CpuChart'
import {toggleProgressBar} from "../actions/FrameActions";
import {updateDashboard} from "../actions/DashboardActions";
import {connect} from "react-redux";
import axios from "axios";


const drawerWidth = 240;

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

    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
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

function Dashboard({dashboard, updateDashboard, toggleProgressBar, }) {
    const classes = useStyles();
    const [loaded, setLoaded] = React.useState(false);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const convertToGB = (value) =>  {
        return value/1024/1024/1024;
    }
    const createData = (raw) => {
        return [
            { name: 'Used', value: convertToGB(raw.used)},
            { name: 'Free', value: convertToGB(raw.free)},
        ];
    };

    useEffect(() => {
        const fetchData = async () => {

            toggleProgressBar(true);
            const response = await axios.get('/dashboard', {
                    withCredentials: true,
                    auth: {
                        username: '2',
                        password: '1'
                    },
                },
            );
            updateDashboard(response.data);
            toggleProgressBar(false);
            setLoaded(true);
        };
        fetchData();
    }, []);

    return (
        <div className={classes.root}>
            <Frame/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Memory</h2>
                                <UsageChart data={createData(dashboard.Memory)}/>
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Disk</h2>
                                <UsageChart data={createData(dashboard.Disk)}/>
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <h1>CPU</h1>
                                {loaded && <CpuChart graph_data={dashboard.CPU}/>}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Copyright />
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        toggleProgressBar: (isOpen) => {
            dispatch(toggleProgressBar(isOpen));
        },
        updateDashboard: (data) => {
            dispatch(updateDashboard(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);