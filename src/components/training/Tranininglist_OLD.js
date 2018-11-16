import React, { Component } from 'react';

// Custom components imports
import Addtraining from './Addtraining';
import Customsnackbar from '../utils/Customsnackbar';

// Dialog imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// GUI components imports
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';

class Traininglist extends Component {

    constructor(props){
        super(props);
        this.state = {
            trainings: [],
            dialog_opened: false,
            delete_link: '',
            snackbar_opened:false,
            snackbar_variant:'',
            snackbar_message:''
        };
    }

    componentDidMount() {
        this.getAllTrainings();
    }

    // dialog
    openDialog = (link) => {
        this.setState({
            dialog_opened:true,
            delete_link: link
        });
    }

    closeDialog = (event, delete_flag) => {
        if(delete_flag === true){
            this.deleteTraining();
        }

        this.setState({
            dialog_opened:false,
            delete_link: ''
        });
    }

    // snackbar
    openSnackbar = () => {
        this.setState({ 
            snackbar_opened: true
        });
    };
    
    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ 
            snackbar_opened: false 
        });
    };

    // interact with backend
    getAllTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(responseData => {
                this.setState({trainings: responseData.content});
            })
    }

    deleteTraining = () => {
        fetch(this.state.delete_link, { method: 'DELETE' })
            .then(response => {
                this.getAllTrainings();   
                if(response.ok){                                 
                    this.setState({
                        snackbar_message: 'Training successfully deleted.',
                        snackbar_variant: 'success'
                    }, function(){
                        this.openSnackbar();
                    });
                }else{
                    this.setState({
                        snackbar_message: 'Impossible to delete training.',
                        snackbar_variant: 'error'
                    }, function(){
                        this.openSnackbar();
                    });
                }
            }).catch((error) => {
                this.setState({
                    snackbar_message: 'Error with the server. Please contact administrator.',
                    snackbar_variant: 'error'
                }, function(){
                    this.openSnackbar();
                });
            });
    }

    saveTraining = (training) => {
        fetch(
            'https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(training)
            }
        ).then(response => {
            this.getAllTrainings();   
            if(response.ok){                                 
                this.setState({
                    snackbar_message: 'Training successfully created.',
                    snackbar_variant: 'success'
                }, function(){
                    this.openSnackbar();
                });
            }else{
                this.setState({
                    snackbar_message: 'Impossible to create the training.',
                    snackbar_variant: 'error'
                }, function(){
                    this.openSnackbar();
                });
            }
        }).catch((error) => {
            this.setState({
                snackbar_message: 'Error with the server. Please contact administrator.',
                snackbar_variant: 'error'
            }, function(){
                this.openSnackbar();
            });
        });
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
                onClick:(event, value) => {this.openDialog(value.links[0].href)} // get the link to the training
            }
        ];

        return (
            <div style={{ padding: 20 }}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <MaterialTable
                            columns={columns}
                            data={this.state.trainings}
                            actions={actions}
                            title="Trainings list"
                        />
                    </Grid>               
                </Grid>
                <Addtraining ref={(dialog) => { this._dialog = dialog; }} saveTraining={this.saveTraining}/>
                <Button variant="fab" color="primary" className="fab" onClick={() => this._dialog.handleClickOpen()}>
                    <AddIcon/>                    
                </Button>
                <Dialog
                    open={this.state.dialog_opened}
                    onClose={this.closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete training?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you really want to delete this training?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(event) => this.closeDialog(event, false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={(event) => this.closeDialog(event, true)} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackbar_opened}
                    autoHideDuration={6000}
                    onClose={this.closeSnackbar}
                >
                    <Customsnackbar
                        onClose={this.closeSnackbar}
                        variant={this.state.snackbar_variant}
                        message={this.state.snackbar_message}
                    />
                </Snackbar>
            </div>
        );
    }
}

export default Traininglist;