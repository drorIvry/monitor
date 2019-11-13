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

import {toggleDialog} from '../actions/MonitorDialogActions';
import Frame from './Frame';
import AddMonitor from './AddMonitor';
import {getMonitors} from '../serverAPI/monitorActions'
import Copyright from './Copyright';
import {toggleProgressBar} from '../actions/FrameActions';


const rows = [
    {
        "_id": "5dcac82a0ea51943b4ae66a2",
        "MonitorName": "a",
        "APIKey": "8022eaa3-3a02-4dfc-a395-ed76d5d42223",
        "PCName": "a",
        "Active": true,
        "__v": 0
    },
    {
        "_id": "5dcac8780ea51943b4ae66a3",
        "MonitorName": "a",
        "APIKey": "a771ec20-8446-4802-b026-c03252f86578",
        "PCName": "a",
        "Active": true,
        "__v": 0
    },
    {
        "_id": "5dcac87d0ea51943b4ae66a4",
        "MonitorName": "a",
        "APIKey": "c41e60c7-cbb0-4e71-917f-f2faff2cf833",
        "PCName": "a",
        "Active": true,
        "__v": 0
    }
];


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

function Monitors({onDialogClick, toggleProgressBar}) {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    getMonitors('2','1').then(res=>{
        setData(res.data);
    });

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
                                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
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
                            count={rows.length}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monitors);