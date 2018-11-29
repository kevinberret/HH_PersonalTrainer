import React, { Component } from 'react';

import { connect } from "react-redux";
import { editCustomer, openDialogEditCustomer, closeDialogEditCustomer } from '../../actions/customers'

// Style imports
import Slide from '@material-ui/core/Slide';

// GUI imports
import CustomerForm from './CustomerForm';
import Dialog from '@material-ui/core/Dialog';
  
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Editcustomer extends Component {

    render() {
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.customers.edit_dialog_open}
                    onClose={this.closeDialogEditCustomer}
                    TransitionComponent={Transition}
                >
                    <CustomerForm
                        onSubmit={values => this.props.submit(values)} 
                        closeDialog={this.props.closeDialogEditCustomer}
                        initialValues={{
                            firstname: this.props.customers.current.firstname,
                            lastname: this.props.customers.current.lastname,
                            streetaddress: this.props.customers.current.streetaddress,
                            postcode: this.props.customers.current.postcode,
                            city: this.props.customers.current.city,
                            email: this.props.customers.current.email,
                            phone: this.props.customers.current.phone,
                        }}
                        edit={true}
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
            console.log(customer)
            console.log('edit')
            dispatch(editCustomer(customer));
        },        
        openDialogEditCustomer: () => {
            dispatch(openDialogEditCustomer())
        },
        closeDialogEditCustomer: () => {
            dispatch(closeDialogEditCustomer())
        }
});

export default connect(mapStateToProps, mapDispatchToProps)(Editcustomer);