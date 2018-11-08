import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment';

class Traininglist extends Component {

    constructor(props){
        super(props);
        this.state = {
            trainings: [],
        };
    }

    componentDidMount() {
        this.getAllTrainings();
    }

    // interact with backend
    getAllTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(responseData => {
                this.setState({trainings: responseData.content});
            })
    }

    render() {
        const columns = [{
            Header: 'Date',
            accessor: 'date',
            Cell: row => (
                <div>
                    {moment(row.value).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </div>
            )
        },{
            Header: 'Duration',
            accessor: 'duration'
        },{
            Header: 'Activity',
            accessor: 'activity'
        }];

        return (
            <div>
                <ReactTable data={this.state.trainings} columns={columns} filterable={true} defaultPageSize={10} />
            </div>
        );
    }
}

export default Traininglist;