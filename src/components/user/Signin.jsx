import React, { Component } from 'react';
import { connect } from "react-redux";
import { signIn } from '../../actions/auth'
import PropTypes from "prop-types";

import GoogleButton from 'react-google-button';
import Typography from '@material-ui/core/Typography';

/*
// code for signin based on this tutorial : https://medium.com/quick-code/adding-authentication-to-react-redux-firebase-app-f0efcb1c519a
*/
class Signin extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUpdate(nextProps) {
        if (nextProps.auth) {
          this.context.router.history.push("/");
        }
    }

    render() {
        return (
            <div style={{ display:'flex',justifyContent: 'center', flexDirection: 'column', alignItems:'center' }}>
                <Typography variant="h6">
                    Please login               
                </Typography>
                <GoogleButton
                    onClick={this.props.signIn}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

//loads dispatch methods to components props
const mapDispatchToProps = dispatch => ({
    signIn: () => {
        dispatch(signIn());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);