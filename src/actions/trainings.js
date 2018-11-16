import ActionType from '../constants/actions-types';
import { setSnackbarText, setSnackbarVariant, openSnackbar } from './utils'

export const fetchAllTrainings_REQ = () => (
    {
        type: ActionType.FETCH_ALL_TRAININGS_REQ,
    }
); 

export const fetchAllTrainings_OK = (list) => (
    {
        type: ActionType.FETCH_ALL_TRAININGS_OK,
        list: list
    }
); 

export const fetchAllTrainings_ERR = () => (
    {
        type: ActionType.FETCH_ALL_TRAININGS_ERR,
    }
);

export const fetchTrainingById_REQ = (id) => (
    {
        type: ActionType.FETCH_TRAINING_BY_ID_REQ,
        id: id
    }
);

export const fetchTrainingById_OK = (current) => (
    {
        type: ActionType.FETCH_TRAINING_BY_ID_OK,
        current: current
    }
);

export const fetchTrainingById_ERR = () => (
    {
        type: ActionType.FETCH_TRAINING_BY_ID_ERR
    }
);

export const addTraining_REQ = (training) => (
    {
        type: ActionType.ADD_TRAINING_REQ,
        JSON: training,
    }
);

export const addTraining_OK = () => (
    {
        type: ActionType.ADD_TRAINING_OK
    }
);

export const addTraining_ERR = () => (
    {
        type: ActionType.ADD_TRAINING_ERR
    }
);

export const deleteTraining_REQ = () => (
    {
        type: ActionType.DELETE_TRAINING_REQ
    }
);

export const deleteTraining_OK = () => (
    {
        type: ActionType.DELETE_TRAINING_OK
    }
);

export const deleteTraining_ERR = () => (
    {
        type: ActionType.DELETE_TRAINING_ERR
    }
);

export const openDialogAddTraining_REQ = () => (
    {
        type: ActionType.OPEN_DIALOG_ADD_TRAINING_REQ,
    }
);

export const closeDialogAddTraining_REQ = () => (
    {
        type: ActionType.CLOSE_DIALOG_ADD_TRAINING_REQ,
    }
);

export const setCurrentTraining_REQ = (link) => (
    {
        type: ActionType.SET_CURRENT_TRAINING,
        link: link
    }
);

export const resetCurrentTraining_REQ = () => (
    {
        type: ActionType.RESET_CURRENT_TRAINING,
    }
);

// functions
export function trainingsFetchAll(){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { trainings } = getState();

        if(!trainings.isLoading){
            //dispatches start action from the requestClients creator defined above
            dispatch(fetchAllTrainings_REQ());

            fetch('https://customerrest.herokuapp.com/api/trainings')
                .then(response => response.json())
                .then(responseData => {
                    dispatch(fetchAllTrainings_OK(responseData.content));
                }).catch((error) => {
                    dispatch(fetchAllTrainings_ERR());
                })
        }        
    }
}

export function trainingFetchById(id){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { trainings } = getState();

        if(!trainings.isLoading){
            dispatch(fetchTrainingById_REQ());

            fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`)
                .then(response => response.json())
                .then(responseData => {
                    dispatch(fetchTrainingById_OK(responseData.content));
                }).catch((error) => {
                    dispatch(fetchTrainingById_ERR());
                })
        }
    }
}

export function addTraining(training){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { trainings } = getState();
        if(!trainings.isLoading){
            dispatch(addTraining_REQ(training));

            fetch(
                'https://customerrest.herokuapp.com/api/trainings',
                {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(training)
                }
            ).then(response => {
                if(response.ok){
                    dispatch(addTraining_OK());
                    dispatch(closeDialogAddTraining_REQ());
                    dispatch(trainingsFetchAll());
                    dispatch(setSnackbarText('Training successfully created.'));
                    dispatch(setSnackbarVariant('success'));
                    dispatch(openSnackbar());
                }else{
                    dispatch(addTraining_ERR());
                    dispatch(setSnackbarText('Impossible to create the training.'));
                    dispatch(setSnackbarVariant('error'));
                    dispatch(openSnackbar());
                }
            }).catch((error) => {
                dispatch(addTraining_ERR());
                dispatch(setSnackbarText('Error with the server. Please contact administrator.'));
                dispatch(setSnackbarVariant('error'));
                dispatch(openSnackbar());
            })
        }
    }
}

export function deleteTraining(){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { trainings } = getState();

        if(!trainings.isLoading && trainings.current){
            dispatch(deleteTraining_REQ());
            
            fetch(
                trainings.current, 
                {
                    method: 'DELETE'
                }
            ).then(response => {
                if(response.ok){
                    dispatch(deleteTraining_OK());                                       
                    dispatch(resetCurrentTraining_REQ());
                    dispatch(trainingsFetchAll());
                    dispatch(setSnackbarText('Training successfully deleted.'));
                    dispatch(setSnackbarVariant('success')); 
                    dispatch(openSnackbar());
                }else{
                    dispatch(deleteTraining_ERR());
                    dispatch(setSnackbarText('Impossible to delete the training.'));
                    dispatch(setSnackbarVariant('error'));
                    dispatch(openSnackbar());
                }
            }).catch(error => {
                dispatch(deleteTraining_ERR());
                dispatch(setSnackbarText('Error with the server. Please contact administrator.'));
                dispatch(setSnackbarVariant('error'));
                dispatch(openSnackbar());
            })

            
        }        
    }
}

export function openDialogAddTraining(){
    return async(dispatch, getState) => {
        dispatch(openDialogAddTraining_REQ());
    }
}

export function closeDialogAddTraining(){
    return async(dispatch, getState) => {
        dispatch(closeDialogAddTraining_REQ());
    }
}

export function setCurrentTraining(link){
    console.log(link);
    return async(dispatch, getState) => {
        dispatch(setCurrentTraining_REQ(link));
    }
}

export function resetCurrentTraining(){
    return async(dispatch, getState) => {
        dispatch(resetCurrentTraining_REQ());
    }
}