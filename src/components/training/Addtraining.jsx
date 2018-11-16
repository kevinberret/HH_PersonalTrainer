import React, { Component } from 'react';

import { connect } from "react-redux";
import { customersFetchAll } from '../../actions/customers'
import { addTraining, openDialogAddTraining, closeDialogAddTraining } from '../../actions/trainings'

// Style imports
import Slide from '@material-ui/core/Slide';

// Icons imports
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// GUI imports
import AddTrainingForm from './AddTrainingForm';
import Dialog from '@material-ui/core/Dialog';
  
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Addtraining extends Component {

    componentDidMount(){
        this.props.customersFetchAll();
    }

    render() {
        return (
            <div>
                <Button variant="fab" color="primary" className="fab" onClick={this.props.openDialogAddTraining}>
                    <AddIcon/>                    
                </Button>
                <Dialog
                    fullScreen
                    open={this.props.trainings.add_dialog_open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AddTrainingForm 
                        onSubmit={values => this.props.submit(values)}
                        closeDialog={this.props.closeDialogAddTraining} 
                        customers={this.props.customers.list}
                        label="Customer"
                    />
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    trainings: state.trainings,
    customers: state.customers
});

//loads dispatch methods to components props
const mapDispatchToProps = dispatch => ({
        submit: (training) => {
            dispatch(addTraining(training));
        },        
        openDialogAddTraining: () => {
            dispatch(openDialogAddTraining())
        },
        closeDialogAddTraining: () => {
            dispatch(closeDialogAddTraining())
        },
        customersFetchAll: () => {
            dispatch(customersFetchAll())
        },
});

export default connect(mapStateToProps, mapDispatchToProps)(Addtraining);