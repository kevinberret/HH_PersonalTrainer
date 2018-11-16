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

import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Datetime picker imports
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

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

const renderDateField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
            {...input}
            {...custom}
            label="Pick a date"
            disablePast
            showTodayButton
            fullWidth
        />
    </MuiPickersUtilsProvider>
)

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
        label={label}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}/>
    )

const renderMenuItems = (customers) => (
    customers.map((item, index) => 
        <MenuItem key={index} value={item.links[0].href}>{item.firstname} {item.lastname}</MenuItem>
    )
)

const AddTrainingForm = ({ handleSubmit, closeDialog, customers }) => (
  
    <form onSubmit={handleSubmit} >
        <div>
            <AppBar style={styles.appBar}>
                <Toolbar>
                    <IconButton color="inherit" onClick={closeDialog} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={styles.flex}>
                        Add a new training
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
                            fullWidth
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <Field 
                            label="Pick a date"
                            name="date"
                            component={renderDateField}
                            fullWidth
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <Field 
                            label="Duration"
                            name="duration"
                            component={renderTextField}
                            fullWidth
                            required />
                    </Grid>
                    <Grid item xs={12}>
                        <Field 
                            label="Customer"
                            name="customer"
                            component={renderSelectField}
                            fullWidth
                            required>
                            {
                                renderMenuItems(customers)
                            }
                        </Field>
                    </Grid>
                </Grid>
            </div>
        </div>
    </form>
)
export default reduxForm({form: 'addTrainingForm'})(AddTrainingForm);