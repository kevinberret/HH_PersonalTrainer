import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import Customers from './views/customerViews/Customers';
import Trainings from './views/trainingViews/Trainings';
import Calendar from './views/calendarView/Calendar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SignIn from "./components/user/Signin";
import Index from "./views/homeView/Index";
import { signOut } from './actions/auth'
import requireAuth from "./components/user/requireAuth";
import { fetchUser } from "./actions/auth"; 

class App extends Component {

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    const styles = {
      root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },
    };

    return (
      <div className="App">        
        <BrowserRouter>
          <div style={styles.root}>
          { (this.props.auth) ?
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit" style={styles.grow}>
                  Personal Training Company                
                </Typography>
                
                  <Button color="inherit" component={Link} to="/customers">
                    Customers
                  </Button>
                  <Button color="inherit" component={Link} to="/trainings">
                    Trainings
                  </Button>
                  <Button color="inherit" component={Link} to="/agenda">
                    Agenda
                  </Button>
                  <Button color="inherit" onClick={this.props.signOut}>
                    Logout
                  </Button>                
              </Toolbar>
            </AppBar>
          :
            null
          }
            <Switch>
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/" component={requireAuth(Index)} />
              <Route path="/customers" component={requireAuth(Customers)}/>
              <Route path="/trainings" component={requireAuth(Trainings)}/>
              <Route path="/agenda" component={requireAuth(Calendar)}/>
            </Switch>   
            </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { fetchUser, signOut })(App);