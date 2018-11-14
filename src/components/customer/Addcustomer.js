import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import Customsnackbar from '../utils/Customsnackbar';

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

class Addcustomer extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            streetaddress:'',
            postcode:'',
            city:'',
            email:'',
            phone:'',
            open: false,
            snackbar_opened:false,
            snackbar_variant:'',
            snackbar_message:''
        };
    }

    handleClickOpen = () => {
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

    saveCustomer = () => {
        const customer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        };

        if(!(customer.firstname
             && customer.lastname
             && customer.streetaddress
             && customer.postcode
             && customer.city
             && customer.email
             && customer.phone)){
            // display error
            this.setState({
                snackbar_message: 'Please fill in all the required informations.',
                snackbar_variant: 'warning'
            }, function(){
                this.openSnackbar();
            });
        }else{
            // save customer
            this.props.saveCustomer(customer);
            this.handleClose();
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="fab" color="primary" className="fab" onClick={this.handleClickOpen}>
                    <AddIcon/>                    
                </Button>
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
                            Add a new customer
                        </Typography>
                        <Button color="inherit" onClick={this.saveCustomer}>
                            save
                        </Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.container} style={{ padding: 20 }}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="inherit" style={styles.grow}>
                                    Personal informations               
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl required fullWidth className={classes.margin}>
                                    <InputLabel htmlFor="firstname">Firstname</InputLabel>
                                    <Input
                                        id="firstname"
                                        value={this.state.firstname}
                                        onChange={this.handleChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth className={classes.margin}>
                                    <InputLabel required htmlFor="lastname">Lastname</InputLabel>
                                    <Input                                        
                                        id="lastname"
                                        value={this.state.lastname}
                                        onChange={this.handleChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="inherit" style={styles.grow}>
                                    Postal informations               
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl required fullWidth className={classes.margin}>
                                    <InputLabel htmlFor="streetaddress">Street address</InputLabel>
                                    <Input                                        
                                        id="streetaddress"
                                        value={this.state.streetaddress}
                                        onChange={this.handleChange}/>
                                </FormControl>                                
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl required fullWidth className={classes.margin}>
                                    <InputLabel htmlFor="postcode">Postcode</InputLabel>
                                    <Input                                        
                                        id="postcode"
                                        value={this.state.postcode}
                                        onChange={this.handleChange}/>
                                </FormControl>                                
                            </Grid>
                            <Grid item xs={4}>
                            <FormControl required fullWidth className={classes.margin}>
                                    <InputLabel htmlFor="city">City</InputLabel>
                                    <Input                                        
                                        id="city"
                                        value={this.state.city}
                                        onChange={this.handleChange}/>
                                </FormControl>                                
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="inherit" style={styles.grow}>
                                    Contact informations               
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                            <FormControl required fullWidth className={classes.margin}>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input                                        
                                        id="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}/>
                                </FormControl>                                
                            </Grid>
                            <Grid item xs={6}>
                            <FormControl required fullWidth className={classes.margin}>
                                    <InputLabel htmlFor="phone">Phone</InputLabel>
                                    <Input                                        
                                        id="phone"
                                        value={this.state.phone}
                                        onChange={this.handleChange}/>
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

Addcustomer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Addcustomer);