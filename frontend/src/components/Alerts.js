import React, {useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import axios from "axios";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Container from '@material-ui/core/Container';
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';

import Frame from './Frame';
import Copyright from './Copyright';
import {toggleProgressBar, toggleSnackbar} from "../actions/FrameActions";
import {updateAlerts} from "../actions/AlertsActions";


function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

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
    button: {
        margin: theme.spacing(1),
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

function Alerts({alerts, login, toggleProgressBar, updateAlerts, toggleSnackbar}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [loaded, setLoaded] = React.useState(false);
    const [delay, setDelay] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selected, setSelected] = React.useState([]);

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = alerts.alerts.map(n => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    useInterval(() => {
        const fetchData = async () => {
            try {
                toggleProgressBar(true);
                const response = await axios.get('/alerts', {
                        withCredentials: true,
                        auth: {
                            username: login.username,
                            password: login.password,
                        },
                    },
                );
                updateAlerts(response.data);
                toggleProgressBar(false);
                setLoaded(true);
                setDelay(10 * 1000);
            } catch (e) {
                setDelay(10 * 1000);
                toggleProgressBar(false);
                toggleSnackbar(true, e.message);
            }

        };
        fetchData();
    }, delay);

    const onDeletePressed = () => {
        axios.post('/delete-alerts', {
                alertIds: selected,
            },
            {
                withCredentials: true,
                auth: {
                    username: login.username,
                    password: login.password,
                },
            }).then((response) => {
                toggleProgressBar(false);
                setDelay(0);
        }).catch((error) => {
            toggleProgressBar(false);
            console.error(error);
            toggleSnackbar(true, error.message);
        });
    };
    return (
        <div className={classes.root}>
            <Frame/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    {loaded && <Paper>
                        <div className={classes.tableWrapper}>

                            <Table stickyHeader size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                indeterminate={selected.length > 0 && selected.length < alerts.alerts.length}
                                                checked={selected.length === alerts.alerts.length}
                                                id={'select-all'}
                                                onChange={handleSelectAllClick}
                                                inputProps={{'aria-label': 'select all desserts'}}
                                            />
                                        </TableCell>
                                        <TableCell>Alert</TableCell>
                                        <TableCell>Report Date</TableCell>
                                        <TableCell>PC Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {alerts.alerts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                                        const isItemSelected = isSelected(row._id);
                                        const labelId = `enhanced-table-checkbox-${key}`;

                                        return (
                                            <TableRow hover tabIndex={-1} key={key}
                                                      onClick={event => handleClick(event, row._id)}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{'aria-labelledby': labelId}}

                                                    />
                                                </TableCell>
                                                <TableCell>{row.Alert}</TableCell>
                                                <TableCell>{row.AlertDate}</TableCell>
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
                            count={alerts.alerts.length}
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
                        {selected.length > 0 &&
                        <Button variant="outlined" className={classes.button} onClick={onDeletePressed}>
                            Delete
                        </Button>}
                    </Paper>}
                </Container>
                <Copyright/>
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alerts,
        login: state.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleProgressBar: (isOpen) => {
            dispatch(toggleProgressBar(isOpen));
        },
        updateAlerts: (monitors) => {
            dispatch(updateAlerts(monitors));
        },
        toggleSnackbar: (isOpen, text) => {
            dispatch(toggleSnackbar(isOpen, text));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
