import React from 'react';
import { Field, reduxForm } from 'redux-form'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NumberFormat from 'react-number-format';

// Icons imports
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from '@material-ui/core';

import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Datetime picker imports
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

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
        <FormControl
            error
            fullWidth
        >
            <TextField
                label={label}
                {...input}
                {...custom}
            />
            <FormHelperText>{touched && (error && <span>{error}</span>)}</FormHelperText>    
    </FormControl>
    )

const renderNumericTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
    <FormControl
        error
        fullWidth
    >
        <NumberFormat 
            customInput={TextField}
            allowNegative={false}
            label={label}
            {...input}
            {...custom}
        />
        <FormHelperText>{touched && (error && <span>{error}</span>)}</FormHelperText>    
    </FormControl>
)

const renderDateField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <FormControl
        error
        fullWidth
    >
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
                {...input}
                {...custom}
                label="Pick a date"
                disablePast
                showTodayButton
                ampm={false}
                fullWidth
                {...error}
            />
        </MuiPickersUtilsProvider>
        <FormHelperText>{touched && (error && <span>{error}</span>)}</FormHelperText>    
    </FormControl>
)

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <FormControl
        error
        fullWidth
    >
        <SelectField
            label={label}
            {...input}
            onChange={(event, index, value) => input.onChange(event.target.value)}
            children={children}
            {...custom}
            {...error}
        />
        <FormHelperText>{touched && (error && <span>{error}</span>)}</FormHelperText>    
    </FormControl>
)

const renderMenuItems = (customers) => (
    customers.map((item, index) =>
        <MenuItem key={index} value={item.links[0].href}>{item.firstname} {item.lastname}</MenuItem>
    )
)

const validate = value => {
    const errors = {};

    if(!value.activity){
        errors.activity = 'You must specify an activity name.';
    }

    if(!value.date || !moment(value.date).isValid()){
        errors.date = 'You must specify a valid date.';
    }

    if(!value.customer){
        errors.customer = 'You must choose a customer for this activity.';
    }

    if(!value.duration || isNaN(Number(value.duration))){
        errors.duration = 'You must define a duration for the activity.';
    }

    return errors;
}

const AddTrainingForm = ({ handleSubmit, closeDialog, customers, customer, pristine, dirty }) => (    
    <form onSubmit={handleSubmit} >
        <div>
            <AppBar style={styles.appBar}>
                <Toolbar>
                    <IconButton color="inherit" onClick={closeDialog} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={styles.flex}>
                        Add a new training 
                        {customer &&
                        <span> for {customer.firstname} {customer.lastname}</span>
                        }
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
                            Training informations               
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Field 
                            label="Activity"
                            name="activity"
                            component={renderTextField}                                                       
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field 
                            label="Pick a date"
                            name="date"
                            component={renderDateField}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field 
                            label="Duration"
                            name="duration"
                            component={renderNumericTextField}
                            fullWidth
                        />
                    </Grid>
                    {!customer && 
                    <Grid item xs={12}>
                        <Field 
                            label="Customer"
                            name="customer"
                            component={renderSelectField}
                            fullWidth
                        >
                            {
                                renderMenuItems(customers)
                            }
                        </Field>
                    </Grid>
                    }
                    {customer &&
                    <Grid item xs={12}>
                        <Field
                            component={renderTextField}
                            name="customer"
                            type="hidden"
                            disabled={true}
                            style={{ display: "none" }} // small hack to hide completely the field to the user, as issues with hidden fields in redux-form with MaterialUI
                        />
                    </Grid>
                    }
                </Grid>
            </div>
        </div>
    </form>
)
export default reduxForm({form: 'addTrainingForm', validate})(AddTrainingForm);