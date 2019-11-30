import React, {useEffect} from 'react';
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
import Checkbox from '@material-ui/core/Checkbox';
import {toggleDialog} from '../actions/MonitorDialogActions';
import Frame from './Frame';
import AddMonitor from './AddMonitor';
import Copyright from './Copyright';
import {toggleProgressBar, toggleSnackbar} from '../actions/FrameActions';
import {updateMonitors} from '../actions/MonitorsActions';
import history from "../history";

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

function Monitors({onDialogClick, toggleProgressBar, updateMonitors, toggleSnackbar, login, monitors}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selected, setSelected] = React.useState([]);

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = monitors.monitors.map(n => n.APIKey);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                toggleProgressBar(true);
                const response = await axios.get('/monitors', {
                        withCredentials: true,
                        auth: {
                            username: login.username,
                            password: login.password,
                        },
                    },
                );

                updateMonitors(response.data);
                toggleProgressBar(false);
            } catch (e) {
                toggleProgressBar(false);
                toggleSnackbar(true, e.message);
            }

        };
        fetchData();
    }, [monitors.monitors.length]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onDeletePressed = () => {
        axios.post('/delete-monitor', {
                apiKeys: selected,
            },
            {
                withCredentials: true,
                auth: {
                    username: login.username,
                    password: login.password,
                },
            }).then((response) => {
            toggleProgressBar(false);
            updateMonitors([...monitors.monitors, response.data]);
            onDialogClick(false);
        }).catch((error) => {
            toggleProgressBar(false);
            console.error(error);
            toggleSnackbar(true, error.message);
            onDialogClick(false);
        });
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
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                id={'select-all'}
                                                indeterminate={selected.length > 0 && selected.length < monitors.monitors.length}
                                                checked={selected.length === monitors.monitors.length}
                                                onChange={handleSelectAllClick}
                                                inputProps={{'aria-label': 'select all desserts'}}
                                            />
                                        </TableCell>
                                        <TableCell>Monitor API Key</TableCell>
                                        <TableCell>Monitor Name</TableCell>
                                        <TableCell>PC Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {monitors.monitors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        const isItemSelected = isSelected(row.APIKey);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow hover tabIndex={-1} key={row.id}
                                                      onClick={event => handleClick(event, row.APIKey)}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{'aria-labelledby': labelId}}

                                                    />
                                                </TableCell>
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
                        {selected.length > 0 &&
                        <Button variant="outlined" className={classes.button} onClick={onDeletePressed}>
                            Delete
                        </Button>}
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
        monitors: state.monitors,
        login: state.login,
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
        toggleSnackbar: (isOpen, text) => {
            dispatch(toggleSnackbar(isOpen, text));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monitors);