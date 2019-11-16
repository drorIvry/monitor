import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Container from '@material-ui/core/Container';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import axios from 'axios';
import config from '../serverAPI/config';
import {toggleDialog} from '../actions/MonitorDialogActions';
import Frame from './Frame';
import AddMonitor from './AddMonitor';
import Copyright from './Copyright';
import {toggleProgressBar} from '../actions/FrameActions';
import {updateMonitors} from '../actions/MonitorsActions';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    button: {
        margin: theme.spacing(1),
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
    tableWrapper: {
        maxHeight: 440,
        overflow: 'auto',
    },
}));

function Monitors({onDialogClick, toggleProgressBar, monitors, updateMonitors}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        toggleProgressBar(true);

        axios.get(config.server + '/monitors', {
                withCredentials: true,
                auth: {
                    username: '2',
                    password: '1'
                },
            },
        ).then((response) => {
            updateMonitors(response.data);
            toggleProgressBar(false);
        }).catch((error) => {
            console.error(error);
        })
    }, monitors.monitors);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div className={classes.root}>
            <Frame/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Paper>
                        <div className={classes.tableWrapper}>

                            <Table stickyHeader size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Monitor API Key</TableCell>
                                        <TableCell>Monitor Name</TableCell>
                                        <TableCell>PC Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {monitors.monitors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={row.id}>
                                                <TableCell>{row.APIKey}</TableCell>
                                                <TableCell>{row.MonitorName}</TableCell>
                                                <TableCell>{row.PCName}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={monitors.monitors.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'previous page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'next page',
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />

                        <Button variant="outlined" className={classes.button} onClick={() => onDialogClick(true)}>
                            Add new Monitor
                        </Button>
                        <AddMonitor/>
                    </Paper>
                </Container>
                <Copyright/>
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        dialogStatus: state.monitorDialog,
        monitors: state.monitors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDialogClick: (isOpen) => {
            dispatch(toggleDialog(isOpen));
        },
        toggleProgressBar: (isOpen) => {
            dispatch(toggleProgressBar(isOpen));
        },
        updateMonitors: (monitors) => {
            dispatch(updateMonitors(monitors));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monitors);