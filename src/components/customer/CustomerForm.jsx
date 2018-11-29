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

// form components
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

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

const validate = values => {
    const error = {};
    error.firstname = '';
    error.lastname = '';
    error.streetaddress = '';
    error.postcode = '';
    error.city = '';
    error.email = '';
    error.phone = '';

    if (values.firstname === undefined || values.firstname.length < 1 || values.firstname === '') {
        error.firstname = 'Please provide a first name';
    }

    if (values.lastname === undefined || values.lastname.length < 1 || values.lastname === '') {
        error.lastname = 'Please provide a last name';
    }

    if (values.streetaddress === undefined || values.streetaddress.length < 1 || values.streetaddress === '') {
        error.streetaddress = 'Please provide a street address';
    }

    if (values.postcode === undefined || values.postcode.length < 1 || values.postcode === '') {
        error.postcode = 'Please provide a ZIP';
    }

    if (values.city === undefined || values.city.length < 1 || values.city === '') {
        error.city = 'Please provide a city';
    }

    // regexp for email from redux form validation examples
    if (values.email === undefined || values.email.length < 1 || values.email === '' || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = 'Please provide a valid email';
    }

    if (values.phone === undefined || values.phone.length < 1 || values.phone === '' || !/^[0-9-.]+$/i.test(values.phone)) {
        error.phone = 'Please provide a valid phone number';
    }

    return error;
};

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
        <FormControl {...custom} error={Boolean(touched && error)}>
            <InputLabel>{label}</InputLabel>
            <Input {...input}  />
            {touched && error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
)

const CustomerForm = ({ handleSubmit, closeDialog, edit }) => (
    <form onSubmit={handleSubmit} >
        <div>
            <AppBar style={styles.appBar}>
                <Toolbar>
                    <IconButton color="inherit" onClick={closeDialog} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={styles.flex}>
                        {(edit) ? 'Modify a customer' : 'Add a new customer' }
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
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field 
                            label="Lastname"
                            name="lastname"
                            component={renderTextField}
                            fullWidth
                         />
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
                        />                             
                    </Grid>
                    <Grid item xs={4}>
                        <Field 
                            label="Postcode"
                            name="postcode"
                            component={renderTextField}
                            fullWidth
                        />                                
                    </Grid>
                    <Grid item xs={4}>
                        <Field 
                            label="City"
                            name="city"
                            component={renderTextField}
                            fullWidth
                        />                               
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
                        />                             
                    </Grid>
                    <Grid item xs={6}>
                        <Field 
                            label="Phone"
                            name="phone"
                            component={renderTextField}
                            fullWidth
                        />                         
                    </Grid>
                </Grid>
            </div>
        </div>
    </form>
)
export default reduxForm({form: 'customerForm', validate})(CustomerForm);