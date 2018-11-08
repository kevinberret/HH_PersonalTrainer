import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Customerlist extends Component {

    constructor(props){
        super(props);
        this.state = {
            customers: [],
        };
    }

    componentDidMount() {
        this.getAllCustomers();
    }

    // interact with backend
    getAllCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(responseData => {
                this.setState({customers: responseData.content});
            })
    }

    render() {
        const columns = [{
            Header: 'First name',
            accessor: 'firstname'
        },{
            Header: 'Last name',
            accessor: 'lastname'
        },{
            Header: 'Street',
            accessor: 'streetaddress'
        },{
            Header: 'Post code',
            accessor: 'postcode'
        },{
            Header: 'City',
            accessor: 'city'
        },{
            Header: 'Email',
            accessor: 'email'
        },{
            Header: 'Phone',
            accessor: 'phone'
        }];

        return (
            <div>
                <ReactTable data={this.state.customers} columns={columns} filterable={true} defaultPageSize={10} />
            </div>
        );
    }
}

export default Customerlist;