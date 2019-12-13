import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

import Copyright from './Copyright'
import history from '../history';
import {login} from "../actions/LoginActions";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp({login, onLogin}) {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [err, setErr] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleChange = (key, value) => {
        setData({...data, [key]:value})
    };

    const onRegister = () => {
        console.log(data);
        axios.post( '/accounts', data).then(response => {
            onLogin(data.username, data.password, response.data.accountID, data.firstName);
            history.push('/dashboard');
        }).catch((error) => {
            setErr(true);
            setErrorText('Invalid input, Username Taken');
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                onChange={(event) => {handleChange('firstName', event.target.value)}}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                onChange={(event) => {handleChange('lastName', event.target.value)}}
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                error={err}
                                helperText={errorText}
                                id="username"
                                label="User Name"
                                name="username"
                                onChange={(event) => {handleChange('username', event.target.value)}}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                error={err}
                                helperText={errorText}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(event) => {handleChange('password', event.target.value)}}
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onRegister}
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link  onClick={event => history.push('/login')} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password, accountID, firstName) => {
            dispatch(login(username, password, accountID, firstName));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)