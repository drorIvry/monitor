import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {useCookies} from 'react-cookie';

import SignIn from './components/Login';
import SignUp from './components/Register';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import ReportPage from './components/ReportPage';
import Monitors from './components/Monitors';
import Alerts from './components/Alerts';
import NotFound from './components/NotFound';

import history from './history';

import React, {useEffect} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import axios from "axios";
import {toggleSnackbar} from "./actions/FrameActions";
import {login} from "./actions/LoginActions";

function App({darkMode, login, onLogin,}) {
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode.darkMode ? 'dark' : 'light',
                },
            }),
    );
    const [cookies, setCookie] = useCookies(['login']);
    useEffect(() => {
        axios.get('/login', {
            withCredentials: true,
            auth: {
                username: cookies.login.username,
                password: cookies.login.password,
            },
        }).then((response) => {
            onLogin(cookies.login.username, cookies.login.password, response.accountID, response.firstName);
            history.push('/dashboard')
        }).catch((error) => {
            console.error(error);
            toggleSnackbar(true, 'Error while logging in.')
        });
    }, []);


    if (!login.loggedIn)
        history.push('/login');

    return (
        <Router history={history}>
            <div>
                <ThemeProvider theme={theme}>

                    <Switch>
                        <Route path='/login'>
                            <SignIn/>
                        </Route>
                        <Route path='/register'>
                            <SignUp/>
                        </Route>
                        <Route path='/dashboard'>
                            <Dashboard/>
                        </Route>
                        <Route exact path='/reports'>
                            <Reports/>
                        </Route>
                        <Route path='/monitors'>
                            <Monitors/>
                        </Route>
                        <Route path='/alerts'>
                            <Alerts/>
                        </Route>
                        <Route exsact path={`/report/:reportID`} component={ReportPage}/>
                        <Route>
                            <NotFound/>
                        </Route>
                    </Switch>
                </ThemeProvider>
            </div>
        </Router>
    );
}

const mapStateToProps = (state) => {
    return {
        darkMode: state.darkMode,
        login: state.login,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password, accountID, firstName) => {
            dispatch(login(username, password, accountID, firstName));
        },
        toggleSnackbar: (isOpen, text) => {
            dispatch(toggleSnackbar(isOpen, text))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
