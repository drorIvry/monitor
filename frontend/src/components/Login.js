import React, {useState} from 'react';
import {connect} from "react-redux";
import {useCookies} from 'react-cookie';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

import Copyright from './Copyright';
import history from '../history';
import {login} from "../actions/LoginActions";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn({login, onLogin}) {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [remember, setRemember] = useState(false);
    const [cookies, setCookie] = useCookies(['login']);
    const [err, setErr] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleChange = (key, value) => {
        setData({...data, [key]: value})
    };

    const toggleRemember = () => {
        setRemember(!remember);
    }
    const onLoginPressed = () => {
        axios.get('/login', {
            withCredentials: true,
            auth: {
                username: data.username,
                password: data.password,
            },
        }).then((response) => {

            if(remember){
                setCookie('login', {
                    username: data.username,
                    password: data.password,
                })
            }
            onLogin(data.username, data.password, response.accountID, response.firstName);
            history.push('/dashboard')
        }).catch((error) => {
            setErr(true);
            setErrorText('Incorrect Username / Password.');
            console.error(error);
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={err}
                        helperText={errorText}
                        id="username"
                        onChange={(event) => {
                            handleChange('username', event.target.value)
                        }}
                        label="User Name"
                        name="username"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={err}
                        helperText={errorText}
                        onChange={(event) => {
                            handleChange('password', event.target.value)
                        }}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Grid container>
                        <Checkbox value={remember} id={'remember'} color="primary" onClick={toggleRemember}/>
                        <p> Remember me</p>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onLoginPressed}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link onClick={event => history.push('/register')} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={8}>
                <Copyright/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)