import {ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import SignIn from './components/Login';
import SignUp from './components/Register';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import ReportPage from './components/ReportPage';
import Monitors from './components/Monitors';
import Alerts from './components/Alerts';
import NotFound from './components/NotFound';

import history from './history';

import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';

function App({darkMode}) {
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode.darkMode ? 'dark' : 'light',
                },
            }),
    );

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
                        <Route exsact path={`/report/:reportID`}>
                            <ReportPage/>
                        </Route>
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
    };
};

export default connect(mapStateToProps)(App);
