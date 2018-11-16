import React, { Component } from 'react';
import { connect } from "react-redux";

import Traininglist from '../../components/training/Traininglist';
import Addtraining from '../../components/training/Addtraining';
import Customsnackbar from '../../components/utils/Customsnackbar';

import { openSnackbar, closeSnackbar } from '../../actions/utils';

class Trainings extends Component {
    render() {
        return (
            <div style={{ padding: 20 }}>
                <Traininglist />
                <Addtraining />
                <Customsnackbar
                    onClose={this.props.closeSnackbar}
                    snackar_open={this.props.snackbar.open}
                    variant={this.props.snackbar.variant}
                    message={this.props.snackbar.message}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    snackbar: state.utils.snackbar
});

//loads dispatch methods to components props
const mapDispatchToProps = dispatch => ({
    openSnackbar: () => {
        dispatch(openSnackbar())
    },
    closeSnackbar: () => {
        dispatch(closeSnackbar())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trainings);