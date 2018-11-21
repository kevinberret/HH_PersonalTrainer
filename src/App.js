import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import Customers from './views/customerViews/Customers';
import Trainings from './views/trainingViews/Trainings';
import Calendar from './views/calendarView/Calendar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class App extends Component {
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
              </Toolbar>
            </AppBar> 
            <Switch>
              <Route path="/customers" component={Customers}/>
              <Route path="/trainings" component={Trainings}/>
              <Route path="/agenda" component={Calendar}/>
            </Switch>   
            </div>
        </BrowserRouter>    
      </div>
    );
  }
}

export default App;