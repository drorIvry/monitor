import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {connect} from 'react-redux';
import axios from 'axios';
import history from '../history';
import {addMonitor} from '../serverAPI/monitorActions'
import {toggleDialog, toggleProgressBar} from '../actions/MonitorDialogActions';
import config from "../serverAPI/config";


const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
        width: 500
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    monitorsField: {
        margin: 10
    },
    monitorsProgress: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddMonitor({dialogStatus, onDialogClick, toggleProgressbar, login}) {
    const classes = useStyles();
    const [data, setData] = useState([]);

    const handleChange = (key, value) => {
        setData({...data, [key]:value})
    };

    const onSaveClick = () => {
        toggleProgressbar(true);
        console.log(login);
        axios.post(config.server + '/monitors', {
                pcName: data.pcName,
                monitorName: data.monitorName,
            }, {
                withCredentials: true,
                auth: {
                    username: login.username,
                    password: login.password,
                },
            },
        ).then((response)=> {
            toggleProgressbar(false);
            onDialogClick(false);
            history.push('/monitors');

        }).catch((error) => {
            toggleProgressbar(false);
            console.error(error);
            onDialogClick(false);
        });

    };

    return (
        <div>
            <Dialog open={dialogStatus.dialogOpen} onClose={() => onDialogClick(false)} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => onDialogClick(false)} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add Monitor
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onSaveClick}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                {dialogStatus.progressbarVisible &&<LinearProgress color="secondary" />}
                <TextField
                    className={classes.monitorsField}
                    margin="normal"
                    required
                    onChange={(event) => {handleChange('pcName', event.target.value)}}
                    id="name"
                    label="PC Name"
                    variant="outlined"
                    type="text"
                />
                <TextField
                    className={classes.monitorsField}
                    margin="normal"
                    onChange={(event) => {handleChange('monitorName', event.target.value)}}
                    required
                    id="name"
                    variant="outlined"
                    label="Monitor Name"
                    type="text"
                />
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        dialogStatus: state.monitorDialog,
        login: state.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDialogClick: (isOpen) => {
            dispatch(toggleDialog(isOpen));
        },
        toggleProgressbar: (isOpen) => {
            dispatch(toggleProgressBar(isOpen));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMonitor);
