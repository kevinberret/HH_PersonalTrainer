import React, { Component } from 'react';

// Custom components imports
import Addcustomer from './Addcustomer';
import Customsnackbar from '../utils/Customsnackbar';

// Dialog imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// GUI components imports
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';

class Customerlist extends Component {

    constructor(props){
        super(props);
        this.state = {
            customers: [],
            dialog_opened: false,
            delete_link: '',
            snackbar_opened:false,
            snackbar_variant:'',
            snackbar_message:''
        };
    }

    componentDidMount() {
        this.getAllCustomers();
    }

    openDialog = (link) => {
        this.setState({
            dialog_opened:true,
            delete_link: link
        });
    }

    closeDialog = (event, delete_flag) => {
        if(delete_flag === true){
            this.deleteCustomer();
        }

        this.setState({
            dialog_opened:false,
            delete_link: ''
        });
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

    deleteCustomer = () => {
        fetch(this.state.delete_link, { method: 'DELETE' })
            .then(response => {
                this.getAllCustomers();   
                if(response.ok){                                 
                    this.setState({
                        snackbar_message: 'Customer successfully deleted.',
                        snackbar_variant: 'success'
                    }, function(){
                        this.openSnackbar();
                    });
                }else{
                    this.setState({
                        snackbar_message: 'Impossible to delete customer.',
                        snackbar_variant: 'error'
                    }, function(){
                        this.openSnackbar();
                    });
                }
            }).catch((error) => {
                this.setState({
                    snackbar_message: 'Error with the server. Please contact administrator.',
                    snackbar_variant: 'error'
                }, function(){
                    this.openSnackbar();
                });
            });
    }

    saveCustomer = (customer) => {
        fetch(
            'https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(customer)
            }
        ).then(response => {
            this.getAllCustomers();   
            if(response.ok){                                 
                this.setState({
                    snackbar_message: 'Customer successfully created.',
                    snackbar_variant: 'success'
                }, function(){
                    this.openSnackbar();
                });
            }else{
                this.setState({
                    snackbar_message: 'Impossible to create the customer.',
                    snackbar_variant: 'error'
                }, function(){
                    this.openSnackbar();
                });
            }
        }).catch((error) => {
            this.setState({
                snackbar_message: 'Error with the server. Please contact administrator.',
                snackbar_variant: 'error'
            }, function(){
                this.openSnackbar();
            });
        });
    }

    render() {
        const columns = [{
            title: 'First name',
            field: 'firstname'
        },{
            title: 'Last name',
            field: 'lastname'
        },{
            title: 'Street',
            field: 'streetaddress'
        },{
            title: 'Post code',
            field: 'postcode'
        },{
            title: 'City',
            field: 'city'
        },{
            title: 'Email',
            field: 'email'
        },{
            title: 'Phone',
            field: 'phone'
        },{
            title: '',
            field: 'links.0.href'
        }];

        const actions = [
            {
                icon: 'delete',
                tooltip:'Delete',
                onClick:(event, value) => {this.openDialog(value.links[0].href)} // get the link to the customer
            }
        ];

        return (
            <div style={{ padding: 20 }}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <MaterialTable
                            columns={columns}
                            data={this.state.customers}
                            actions={actions}
                            title="Customers list"
                        />
                    </Grid>                
                </Grid>
                <Addcustomer saveCustomer={this.saveCustomer} />
                <Dialog
                    open={this.state.dialog_opened}
                    onClose={this.closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete customer?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you really want to delete this customer?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(event) => this.closeDialog(event, false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={(event) => this.closeDialog(event, true)} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
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
            </div>
        );
    }
}

export default Customerlist;