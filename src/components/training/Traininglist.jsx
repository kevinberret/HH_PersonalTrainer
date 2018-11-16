// React & Redux imports
import React, { Component } from 'react';
import { connect } from "react-redux";

// import all redux utilities
import { trainingsFetchAll, deleteTraining, setCurrentTraining, resetCurrentTraining } from '../../actions/trainings';
import { openAlert, closeAlert } from '../../actions/utils';
import PropTypes from 'prop-types';

// GUI components imports
import MaterialTable from 'material-table';
import Alert from '../utils/Alert';
import moment from 'moment';

class Traininglist extends Component {
    componentDidMount() {
        this.props.trainingsFetchAll();
    }

    render() {
        const columns = [{
            title: 'Date',
            field: 'date',
            type: 'datetime',
            render: rowData => {
                return (
                    <div>
                        {moment(rowData.date).format("dddd D.MM.YYYY (HH:mm:ss)")}
                    </div>
                );
            }
        },{
            title: 'Duration',
            field: 'duration'
        },{
            title: 'Activity',
            field: 'activity'
        }];

        const actions = [
            {
                icon: 'delete',
                tooltip:'Delete',
                onClick:(event, value) => {this.props.setCurrent(value.links[0].href)}
            }
        ];

        return(
            <div>
                <MaterialTable
                    columns={columns}
                    data={this.props.trainings.list}
                    actions={actions}
                    title="Trainings list"
                />
                <Alert 
                    closeAlert={this.props.closeAlert}
                    actionAlert={this.props.deleteCurrent}
                    alert_open={this.props.alert.open}
                    title="Are you sure?"
                    message="Do you really want to delete this training?"
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    trainings: state.trainings,
    alert: state.utils.alert
});

//loads dispatch methods to components props
const mapDispatchToProps = dispatch => ({
    trainingsFetchAll: () => {
      dispatch(trainingsFetchAll())
    },
    openAlert: () => {
        dispatch(openAlert())
    },
    closeAlert: () => {
        dispatch(closeAlert())
        dispatch(resetCurrentTraining())
    },
    setCurrent: (link) => {
        dispatch(setCurrentTraining(link))
        dispatch(openAlert())
    },
    deleteCurrent: () => {
        dispatch(deleteTraining())
        dispatch(closeAlert())
    }
});

Traininglist.propTypes = {
    trainings:PropTypes.object.isRequired,
    alert:PropTypes.object.isRequired,  
    trainingsFetchAll:PropTypes.func,
    openAlert:PropTypes.func,
    closeAlert:PropTypes.func,
    setCurrent:PropTypes.func,
    deleteCurrent:PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Traininglist);