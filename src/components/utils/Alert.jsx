import React from 'react';

// Dialog imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const Alert = ({ closeAlert, actionAlert, alert_open, title, message }) => (
    <div>
        <Dialog
            open={alert_open}
            onClose={closeAlert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAlert} color="primary">
                    Cancel
                </Button>
                <Button onClick={actionAlert} color="primary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);

export default Alert;