// React & Redux imports
import React, { Component } from 'react';
import { connect } from "react-redux";

// import all redux utilities
import { customersFetchAll, deleteCustomer, setCurrentCustomer, resetCurrentCustomer,  openDialogAddCustomer, closeDialogAddCustomer, openDialogEditCustomer } from '../../actions/customers';
import { openAlert, closeAlert } from '../../actions/utils';
import { addTraining, openDialogAddTraining, closeDialogAddTraining } from '../../actions/trainings';
import PropTypes from 'prop-types';

// GUI components imports
import MaterialTable from 'material-table';
import Alert from '../utils/Alert';

// GUI imports
import AddTrainingForm from '../training/AddTrainingForm';
import Dialog from '@material-ui/core/Dialog';

// Style imports
import Slide from '@material-ui/core/Slide';
import Editcustomer from './Editcustomer';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Customerlist extends Component {
    componentDidMount() {
        this.props.customersFetchAll();
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
                onClick:(event, value) => {this.props.setCurrent(value)}
            },
            {
                icon: 'edit',
                tooltip:'Edit',
                onClick:(event, value) => {this.props.editCustomer(value)} // get the link to the customer
            },
            {
                icon: 'add',
                tooltip:'Add a training',
                onClick:(event, value) => {this.props.addTraining(value)} // get the link to the customer
            }
        ];

        return(
            <div>
                <MaterialTable
                    columns={columns}
                    data={(this.props.customers.list[0] && this.props.customers.list[0].firstname) ? this.props.customers.list : []} // hide if no customers in list: we have to check the first element because when there is no customer, the server returns an array with one object and other informations
                    actions={(this.props.customers.list[0] && this.props.customers.list[0].firstname) ? actions : []}
                    title="Customers list"
                />
                <Alert 
                    closeAlert={this.props.closeAlert}
                    actionAlert={this.props.deleteCurrent}
                    alert_open={this.props.alert.open}
                    title="Are you sure?"
                    message="Do you really want to delete this customer?"
                />
                <Dialog
                    fullScreen
                    open={this.props.trainings.add_dialog_open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AddTrainingForm 
                        onSubmit={values => this.props.submitTraining(values)}
                        closeDialog={this.props.closeDialogAddTraining} 
                        customers={this.props.customers.list}
                        customer={this.props.customers.current}
                        initialValues={{
                            customer: (this.props.customers.current.links) ? this.props.customers.current.links[0].href : '',
                            date: new Date()
                        }}
                        label="Customer"
                    />
                </Dialog>
                <Editcustomer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    customers: state.customers,
    trainings: state.trainings,
    alert: state.utils.alert
});

//loads dispatch methods to components props
const mapDispatchToProps = dispatch => ({
    customersFetchAll: () => {
      dispatch(customersFetchAll())
    },
    openAlert: () => {
        dispatch(openAlert())
    },
    closeAlert: () => {
        dispatch(closeAlert())
        dispatch(resetCurrentCustomer())
    },
    setCurrent: (link) => {
        dispatch(setCurrentCustomer(link))
        dispatch(openAlert())
    },
    deleteCurrent: () => {
        dispatch(deleteCustomer())
        dispatch(closeAlert())
    },
    addTraining: (link) => {
        dispatch(setCurrentCustomer(link))
        dispatch(openDialogAddTraining())
    },
    submitTraining: (training) => {
        dispatch(addTraining(training));
    },      
    openDialogAddTraining: () => {
        dispatch(openDialogAddTraining())
    },
    closeDialogAddTraining: () => {
        dispatch(closeDialogAddTraining())
    },
    editCustomer: (customer) => {
        dispatch(setCurrentCustomer(customer))
        dispatch(openDialogEditCustomer())
    },       
    openDialogAddCustomer: () => {
        dispatch(openDialogAddCustomer())
    },
    closeDialogAddCustomer: () => {
        dispatch(closeDialogAddCustomer())
    }
});

Customerlist.propTypes = {
    customers:PropTypes.object.isRequired,
    alert:PropTypes.object.isRequired,  
    customersFetchAll:PropTypes.func,
    openAlert:PropTypes.func,
    closeAlert:PropTypes.func,
    setCurrent:PropTypes.func,
    deleteCurrent:PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Customerlist);