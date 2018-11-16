import React, { Component } from 'react';

// Layout imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

// Style imports
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Form imports
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

// Icons imports
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Snackbar imports
import Snackbar from '@material-ui/core/Snackbar';
import Customsnackbar from '../utils/Customsnackbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Datetime picker imports
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
  };
  
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class Addtraining extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:new Date(),
            duration:'',
            activity:'',
            customer: this.props.customer || '',
            customers: [],
            open: this.props.open || false,
            snackbar_opened:false,
            snackbar_variant:'',
            snackbar_message:''
        };
        this._dialog = React.createRef();
        this.handleClickOpen = this.handleClickOpen.bind(this);
    }

    handleClickOpen = () => {
        this.getAllCustomers();
        this.setState({ open: true });
      };
    
    handleClose = () => {
        this.setState({ open: false });
    };    

    handleChange = (event) => {
        this.setState({
            [event.target.id]:event.target.value
        })
    }

    handleDateChange = selectedDate => {
        this.setState({date: selectedDate});
    }

    handleSelectChange = (event) => {
        this.setState({
            customer:event.target.value
        })
    }

    openSnackbar = () => {
        this.setState({ 
            snackbar_opened: true
        });
    };
    
    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ 
            snackbar_opened: false 
        });
    };

    // interact with backend
    getAllCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(responseData => {
                this.setState({customers: responseData.content});
            })
    }

    saveTraining = () => {
        const training = {
            date: this.state.date,
            duration: this.state.duration,
            activity: this.state.activity,
            customer: this.state.customer
        };

        if(!(training.date
             && training.duration
             && training.activity
             && training.customer)){
            // display error
            this.setState({
                snackbar_message: 'Please fill in all the required informations.',
                snackbar_variant: 'warning'
            }, function(){
                this.openSnackbar();
            });
        }else{
            // save training
            this.props.saveTraining(training);
            this.handleClose();
        }
    }

    render() {
        const { classes } = this.props;

        const customers_rows = this.state.customers.map((item, index) => <MenuItem key={index} value={item.links[0].href}>{item.firstname} {item.lastname}</MenuItem>);

        return (
            <div>                
                <Dialog
                    
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            Add a new training
                        </Typography>
                        <Button color="inherit" onClick={this.saveTraining}>
                            save
                        </Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.container} style={{ padding: 20 }}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="inherit" style={styles.grow}>
                                    Training informations              
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl required fullWidth className={classes.margin}>
                                    <InputLabel htmlFor="activity">Activity</InputLabel>
                                    <Input                                        
                                        id="activity"
                                        value={this.state.activity}
                                        onChange={this.handleChange}/>
                                </FormControl>                                
                            </Grid>
                            <Grid item xs={6}>                                
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DateTimePicker 
                                        id='date'
                                        value={this.state.date}
                                        onChange={this.handleDateChange}
                                        label="Pick a date"
                                        disablePast
                                        showTodayButton
                                        fullWidth
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth className={classes.margin}>
                                    <InputLabel required htmlFor="duration">Duration</InputLabel>
                                    <Input                                        
                                        id="duration"
                                        value={this.state.duration}
                                        onChange={this.handleChange}
                                        type="number"
                                        inputProps={{
                                            min: '10',
                                            max: '180',
                                            step: '10'
                                        }}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <InputLabel htmlFor="customer">Customer</InputLabel>
                                    <Select
                                        value={this.state.customer}
                                        onChange={this.handleSelectChange}
                                        inputProps={{
                                            name: 'customer',
                                            id: 'customer',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {customers_rows}
                                    </Select>
                                </FormControl>
                            </Grid>                         
                            
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={this.state.snackbar_opened}
                                autoHideDuration={6000}
                                onClose={this.closeSnackbar}
                            >
                                <Customsnackbar
                                    onClose={this.closeSnackbar}
                                    variant={this.state.snackbar_variant}
                                    message={this.state.snackbar_message}
                                />
                            </Snackbar>
                        </Grid>
                    </div>
                </Dialog>
            </div>
        );
    }
}

Addtraining.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Addtraining);