import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Payments from './pages/Payments';
import ErrorPage from './pages/ErrorPage';
import MyNavbar from './components/MyNavbar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MyNavbar />
        <Router>
          <Switch>
            <Route exact path="/" component={Payments} />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
