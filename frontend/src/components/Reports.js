import React from 'react';
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
    
// Generate Order Data
function createData(id, monitor, date, name,) {
    return {id, monitor, date, name,};
}

const rows = [
    createData(0, 'monitor1', '16 Mar, 2019', 'PC-2'),
    createData(1, 'monitor2', '16 Mar, 2019', 'PC-2'),
    createData(2, 'monitor3', '16 Mar, 2019', 'PC-2'),
    createData(3, 'monitor4', '16 Mar, 2019', 'PC-2'),
    createData(4, 'monitor5', '15 Mar, 2019', 'PC-2'),
];


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

export default function Reports() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

                            <Table stickyHeader size="large">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Monitor</TableCell>
                                        <TableCell>Report Date</TableCell>
                                        <TableCell>PC Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={row.id}  onClick={event => history.push('/report/'+ row.name)}>
                                                <TableCell>{row.monitor}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.name}</TableCell>
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
                    </Paper>
                </Container>
                <Copyright/>
            </main>
        </div>
    );
}