import React from 'react';
import { Field, reduxForm } from 'redux-form'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

// Icons imports
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from '@material-ui/core';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      label={label}
      {...input}
      {...custom}
    />
)

const EditCustomerForm = ({ handleSubmit, closeDialog }) => (
    <form onSubmit={handleSubmit} >
        <div>
            <AppBar style={styles.appBar}>
                <Toolbar>
                    <IconButton color="inherit" onClick={closeDialog} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={styles.flex}>
                        Modify a customer
                    </Typography>                
                    <Button color="inherit" type="submit">
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={styles.container} style={{ padding: 20 }}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="inherit" style={styles.grow}>
                            Personal informations               
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Field 
                            label="First name"
                            name="firstname"
                            component={renderTextField}
                            fullWidth
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <Field 
                            label="Lastname"
                            name="lastname"
                            component={renderTextField}
                            fullWidth
                            required />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="inherit" style={styles.grow}>
                            Postal informations               
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Field 
                            label="Street address"
                            name="streetaddress"
                            component={renderTextField}
                            fullWidth
                            required />                             
                    </Grid>
                    <Grid item xs={4}>
                        <Field 
                            label="Postcode"
                            name="postcode"
                            component={renderTextField}
                            fullWidth
                            required />                                
                    </Grid>
                    <Grid item xs={4}>
                        <Field 
                            label="City"
                            name="city"
                            component={renderTextField}
                            fullWidth
                            required />                               
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="inherit" style={styles.grow}>
                            Contact informations               
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Field 
                            label="Email"
                            name="email"
                            component={renderTextField}
                            fullWidth
                            required />                             
                    </Grid>
                    <Grid item xs={6}>
                        <Field 
                            label="Phone"
                            name="phone"
                            component={renderTextField}
                            fullWidth
                            required />                         
                    </Grid>
                </Grid>
            </div>
        </div>
    </form>
)
export default reduxForm({form: 'editCustomerForm'})(EditCustomerForm);