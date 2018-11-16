// React & Redux imports
import React, { Component } from 'react';
import { connect } from "react-redux";

// import all redux utilities
import { customersFetchAll, deleteCustomer, setCurrentCustomer, resetCurrentCustomer } from '../../actions/customers';
import { openAlert, closeAlert } from '../../actions/utils';
import PropTypes from 'prop-types';

// GUI components imports
import MaterialTable from 'material-table';
import Alert from '../utils/Alert';

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
                onClick:(event, value) => {this.props.setCurrent(value.links[0].href)}
            },
            {
                icon: 'add',
                tooltip:'Add a training',
                //onClick:(event, value) => {this.openDialog(value.links[0].href)} // get the link to the customer
            }
        ];

        return(
            <div>
                <MaterialTable
                    columns={columns}
                    data={this.props.customers.list}
                    actions={actions}
                    title="Customers list"
                />
                <Alert 
                    closeAlert={this.props.closeAlert}
                    actionAlert={this.props.deleteCurrent}
                    alert_open={this.props.alert.open}
                    title="Are you sure?"
                    message="Do you really want to delete this customer?"
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    customers: state.customers,
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