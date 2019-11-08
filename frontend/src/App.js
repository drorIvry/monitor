import SignIn from './components/Login'
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

export default function App() {
    return (
        <Router>
          <div>
            <Switch>
              <Route path="/login">
                <SignIn />
              </Route>
            </Switch>
          </div>
        </Router>
    );
}