import React from 'react';
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
import {addMonitor} from '../serverAPI/monitorActions'
import {toggleDialog, toggleProgressBard} from '../actions/MonitorDialogActions';


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

function AddMonitor({dialogStatus, onDialogClick, toggleProgressbar}) {
    const classes = useStyles();

    const onSaveClick = () => {
        toggleProgressbar(true);
        const monitor = addMonitor('2','1', 'a', 'a');
        console.log(monitor);
        toggleProgressbar(false);
        onDialogClick(false);
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
                    id="name"
                    label="PC Name"
                    variant="outlined"
                    type="text"
                />
                <TextField
                    className={classes.monitorsField}
                    margin="normal"
                    onChange={(event) => {
                        console.log(event.target.value)
                    } }
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDialogClick: (isOpen) => {
            dispatch(toggleDialog(isOpen));
        },
        toggleProgressbar: (isOpen) => {
            dispatch(toggleProgressBard(isOpen));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMonitor);
