import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LinearProgress from '@material-ui/core/LinearProgress';
import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';

import {accountList, mainListItems} from './ListItems';
import {connect, useDispatch} from 'react-redux';
import history from '../history'
import {toggleDarkMode} from '../actions/DarkModeAction';
import {toggleDrawer} from '../actions/DrawerActions';
import {toggleProgressBar, toggleSnackbar} from '../actions/FrameActions';
import {useCookies} from "react-cookie";
import {logout} from "../actions/LoginActions";


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
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
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
        height: 240,
    },
    darkmode: {
        paddingLeft: 18,
        paddingTop: 18,

    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    switchMode: {
        marginRight: 10,
    },
    frameProgress: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function Frame({alerts, darkMode, drawer, onDrawerClick, onSwitchClick, frame, toggleProgressBar, toggleSnackbar}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const dispatch = useDispatch();

    const onLogout = () => {
        removeCookie('login');
        dispatch(logout());
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        toggleSnackbar(false, '');
    };
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, drawer.open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={event => onDrawerClick(true)}
                        className={clsx(classes.menuButton, drawer.open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Monitor
                    </Typography>
                    <IconButton color="inherit" onClick={event => {
                        history.push('/alerts')
                    }}>
                        <Badge badgeContent={alerts.alerts.length} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                </Toolbar>
                {frame.progressbarVisible && <LinearProgress color="secondary"/>}
            </AppBar>

            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !drawer.open && classes.drawerPaperClose),
                }}
                open={drawer.open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={event => onDrawerClick(false)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems}</List>
                <Divider/>
                <FormControlLabel
                    className={classes.darkmode}
                    control={<Switch className={classes.switchMode} checked={darkMode.darkMode}
                                     onChange={() => onSwitchClick()}/>}
                    label="Dark Mode"
                />
                <List>{accountList(onLogout)}</List>
            </Drawer>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={frame.snackbarVisible}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <SnackbarContent
                    className={classes.error}
                    aria-describedby="client-snackbar"
                    message={ <span id="client-snackbar" className={classes.message}>
                         <ErrorIcon className={classes.error} />
                        {frame.snackbarText}
                     </span>}
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon className={classes.icon}/>
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        darkMode: state.darkMode,
        drawer: state.drawer,
        frame: state.frame,
        alerts: state.alerts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchClick: () => {
            dispatch(toggleDarkMode());
        },
        onDrawerClick: (isOpen) => {
            dispatch(toggleDrawer(isOpen));
        },
        toggleProgressBar: (isOpen) => {
            dispatch(toggleProgressBar(isOpen));
        },
        toggleSnackbar: (isOpen, text) => {
            dispatch(toggleSnackbar(isOpen, text))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
