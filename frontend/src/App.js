import useMediaQuery from '@material-ui/core/useMediaQuery';
import {ThemeProvider} from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import SignIn from './components/Login'
import SignUp from './components/Register'
import Dashboard from './components/Dashboard'
import Reports from './components/Reports'
import Monitors from './components/Monitors'

import history from './history';

import React from "react";
import {
    Router,
    Switch,
    Route,
} from "react-router-dom";

export default function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <Router history={history}>
            <div>
                <ThemeProvider theme={theme}>

                    <Switch>
                        <Route path="/login">
                            <SignIn/>
                        </Route>
                        <Route path="/register">
                            <SignUp/>
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard/>
                        </Route>
                        <Route path="/reports">
                            <Reports/>
                        </Route>
                        <Route path="/monitors">
                            <Monitors/>
                        </Route>
                    </Switch>
                </ThemeProvider>
            </div>
        </Router>
    );
}