import React, { Component } from 'react';
import { connect } from "react-redux";

import Typography from '@material-ui/core/Typography';

class Index extends Component {
    render() {
        return (
            <div>
                <Typography variant="h6">
                    Welcome {this.props.auth.displayName}                
                </Typography>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Index);