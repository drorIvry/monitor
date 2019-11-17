import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Container from '@material-ui/core/Container';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';

import Frame from './Frame';
import Copyright from './Copyright';
import history from '../history'
import {toggleProgressBar} from "../actions/FrameActions";
import {updateReports} from "../actions/ReportsActions";
import {connect} from "react-redux";
import axios from "axios";

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
    tableWrapper: {
        maxHeight: 440,
        overflow: 'auto',
    },
}));

function Reports({reports, updateReports, toggleProgressbar}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        const fetchData = async () => {

            toggleProgressBar(true);
            const response = await axios.get( '/reports', {
                    withCredentials: true,
                    auth: {
                        username: '2',
                        password: '1'
                    },
                },
            );
            console.log(reports.data)
            updateReports(response.data);
            toggleProgressBar(false);
        };
        fetchData();
    }, [reports.reports.length]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                                        <TableCell>Monitor</TableCell>
                                        <TableCell>Report Date</TableCell>
                                        <TableCell>PC Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reports.reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={key}  onClick={event => history.push('/report/'+ row.ReportID)}>
                                                <TableCell>{row.MonitorName}</TableCell>
                                                <TableCell>{row.TimeStamp}</TableCell>
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
                            count={reports.reports.length}
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
                    </Paper>
                </Container>
                <Copyright/>
            </main>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        reports: state.reports
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);