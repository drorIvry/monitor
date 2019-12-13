import React, {useEffect} from 'react';
import {connect} from "react-redux";

import axios from "axios";
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {makeStyles} from '@material-ui/core/styles';

import {toggleProgressBar, toggleSnackbar} from "../actions/FrameActions";
import {updateReports} from "../actions/ReportsActions";

import Copyright from './Copyright';
import Frame from './Frame';

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

function ReportPage({reports, toggleProgressBar, updateReports, match, login}) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [open, setOpen] = React.useState({
        disk: [],
        network: [],
        users: [],

    });
    const [loaded, setLoaded] = React.useState(false);

    const convertToGB = (num) => {
        return (num / 1024 / 1024 / 1024).toFixed(3)
    };

    const handleClick = (card, value) => {
        const currentIndex = open[card].indexOf(value);
        const newOpen = {...open};

        if (currentIndex === -1) {
            newOpen[card].push(value);
        } else {
            newOpen[card].splice(currentIndex, 1);
        }

        setOpen(newOpen);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                toggleProgressBar(true);
                const response = await axios.get('/report/' + match.params.reportID, {
                        withCredentials: true,
                        auth: {
                            username: login.username,
                            password: login.password,
                        },
                    },
                );
                updateReports(response.data);
                toggleProgressBar(false);
                setLoaded(true);
            } catch (e) {
                toggleProgressBar(false);
                toggleSnackbar(true, e.message);
            }
        };
        fetchData();
    }, []);


    return (
        <div className={classes.root}>
            <Frame/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    {loaded &&
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <h2>cpu</h2>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Load: " + reports.reports.CPU[0].total_load + "%"}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Cores: " + reports.reports.CPU[0].cpu_count}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Threads: " + reports.reports.CPU[0].cores}
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Memory</h2>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Total: " + convertToGB(reports.reports.Memory.total) + "GB"}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Free: " + convertToGB(reports.reports.Memory.available) + "GB"}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Percent: " + reports.reports.Memory.percent + "%"}
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Disk</h2>
                                <List>
                                    {reports.reports.Disk.partitions.map((partition, key) => {
                                            return (
                                                <div key={key}>
                                                    <ListItem button onClick={event => handleClick('disk', key)}>
                                                        <ListItemText primary={partition.device}/>
                                                        {(open.disk.indexOf(key) !== -1) ? <ExpandLess/> : <ExpandMore/>}
                                                    </ListItem>
                                                    <Collapse in={open.disk.indexOf(key) !== -1} timeout="auto"
                                                              unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            <ListItem className={classes.nested}>
                                                                <ListItemText primary={"FS type: " + partition.fstype}/>
                                                            </ListItem>
                                                            <ListItem className={classes.nested}>
                                                                <ListItemText primary={"Options: " + partition.opts}/>
                                                            </ListItem>
                                                            <ListItem className={classes.nested}>
                                                                <ListItemText
                                                                    primary={"Mount Point: " + partition.mount_point}/>
                                                            </ListItem>
                                                        </List>
                                                    </Collapse>
                                                </div>
                                            )
                                        }
                                    )}

                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Network</h2>
                                <List>
                                    {reports.reports.Network.map((partition, key) => {
                                            return (
                                                <div key={key}>
                                                    <ListItem button onClick={event => handleClick('network', key)}>
                                                        <ListItemText primary={partition.name}/>
                                                        {(open.network.indexOf(key) !== -1) ? <ExpandLess/> : <ExpandMore/>}
                                                    </ListItem>
                                                    <Collapse in={open.network.indexOf(key) !== -1} timeout="auto"
                                                              unmountOnExit>
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
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Operating System</h2>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={"OS:" + reports.reports.OS.name}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Version: " + reports.reports.OS.version}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Full Name: " + reports.reports.OS.fullname}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Architecture: " + reports.reports.OS.architecture}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Processor: " + reports.reports.OS.processor}
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Users</h2>
                                <List>
                                    {reports.reports.Users.map((partition, key) => {
                                            return (
                                                <div key={key}>
                                                    <ListItem button onClick={event => handleClick('users', key)}>
                                                        <ListItemText primary={partition.name}/>
                                                        {(open.users.indexOf(key) !== -1) ? <ExpandLess/> : <ExpandMore/>}
                                                    </ListItem>
                                                    <Collapse in={open.users.indexOf(key) !== -1} timeout="auto"
                                                              unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            <ListItem className={classes.nested}>
                                                                <ListItemText primary={"User Name: " + partition.name}/>
                                                            </ListItem>
                                                            <ListItem className={classes.nested}>
                                                                <ListItemText primary={"Terminal: " + partition.terminal}/>
                                                            </ListItem>
                                                            <ListItem className={classes.nested}>
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
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Fans</h2>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={"N/A"}
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Temperatures</h2>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={"N/A"}
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Battery</h2>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Percent: " + Math.floor(reports.reports.Battery.percent) + "%"}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Time Left: " + (reports.reports.Battery.secsleft < 0) ? 'N/A' : reports.reports.Battery.secsleft}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Plugged In: " + reports.reports.Battery.power_plugged ? 'Yes' : "No"}
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                    }
                </Container>
                <Copyright/>
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        reports: state.reports,
        login: state.login,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        toggleProgressBar: (isOpen) => {
            dispatch(toggleProgressBar(isOpen));
        },
        updateReports: (reports) => {
            dispatch(updateReports(reports));
        },
        toggleSnackbar: (isOpen, text) => {
            dispatch(toggleSnackbar(isOpen, text));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);