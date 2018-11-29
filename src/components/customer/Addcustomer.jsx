import React, { Component } from 'react';

import { connect } from "react-redux";
import { addCustomer, openDialogAddCustomer, closeDialogAddCustomer } from '../../actions/customers'

// Style imports
import Slide from '@material-ui/core/Slide';

// Icons imports
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// GUI imports
import CustomerForm from './CustomerForm';
import Dialog from '@material-ui/core/Dialog';
  
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Addcustomer extends Component {

    render() {
        return (
            <div>
                <Button variant="fab" color="primary" className="fab" onClick={this.props.openDialogAddCustomer}>
                    <AddIcon/>                    
                </Button>
                <Dialog
                    fullScreen
                    open={this.props.customers.add_dialog_open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <CustomerForm
                        onSubmit={values => this.props.submit(values)} 
                        closeDialog={this.props.closeDialogAddCustomer} 
                        edit={false}
                    />
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    customers: state.customers
});

//loads dispatch methods to components props
const mapDispatchToProps = dispatch => ({
        submit: (customer) => {
            dispatch(addCustomer(customer));
        },        
        openDialogAddCustomer: () => {
            dispatch(openDialogAddCustomer())
        },
        closeDialogAddCustomer: () => {
            dispatch(closeDialogAddCustomer())
        }
});

export default connect(mapStateToProps, mapDispatchToProps)(Addcustomer);