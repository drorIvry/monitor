import SignIn from './components/Login'
import SignUp from './components/Register'
import Dashboard from './components/Dashboard'

import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

export default function App() {
    return (
        <Router>
          <div>
            <Switch>
              <Route path="/login">
                <SignIn />
              </Route>
              <Route path="/register">
                <SignUp />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </Router>
    );
}