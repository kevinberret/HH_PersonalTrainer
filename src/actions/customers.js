import ActionType from '../constants/actions-types';
import { setSnackbarText, setSnackbarVariant, openSnackbar } from '../actions/utils'

export const fetchAllCustomers_REQ = () => (
    {
        type: ActionType.FETCH_ALL_CUSTOMERS_REQ,
    }
); 

export const fetchAllCustomers_OK = (list) => (
    {
        type: ActionType.FETCH_ALL_CUSTOMERS_OK,
        list: list
    }
); 

export const fetchAllCustomers_ERR = () => (
    {
        type: ActionType.FETCH_ALL_CUSTOMERS_ERR,
    }
);

export const fetchCustomerById_REQ = (id) => (
    {
        type: ActionType.FETCH_CUSTOMER_BY_ID_REQ,
        id: id
    }
);

export const fetchCustomerById_OK = (current) => (
    {
        type: ActionType.FETCH_CUSTOMER_BY_ID_OK,
        current: current
    }
);

export const fetchCustomerById_ERR = () => (
    {
        type: ActionType.FETCH_CUSTOMER_BY_ID_ERR
    }
);

export const addCustomer_REQ = (customer) => (
    {
        type: ActionType.ADD_CUSTOMER_REQ,
        JSON: customer,
    }
);

export const addCustomer_OK = () => (
    {
        type: ActionType.ADD_CUSTOMER_OK
    }
);

export const addCustomer_ERR = () => (
    {
        type: ActionType.ADD_CUSTOMER_ERR
    }
);

export const deleteCustomer_REQ = () => (
    {
        type: ActionType.DELETE_CUSTOMER_REQ
    }
);

export const deleteCustomer_OK = () => (
    {
        type: ActionType.DELETE_CUSTOMER_OK
    }
);

export const deleteCustomer_ERR = () => (
    {
        type: ActionType.DELETE_CUSTOMER_ERR
    }
);

export const openDialogAddCustomer_REQ = () => (
    {
        type: ActionType.OPEN_DIALOG_ADD_CUSTOMER_REQ,
    }
);

export const closeDialogAddCustomer_REQ = () => (
    {
        type: ActionType.CLOSE_DIALOG_ADD_CUSTOMER_REQ,
    }
);

export const setCurrentCustomer_REQ = (link) => (
    {
        type: ActionType.SET_CURRENT_CUSTOMER,
        link: link
    }
);

export const resetCurrentCustomer_REQ = () => (
    {
        type: ActionType.RESET_CURRENT_CUSTOMER,
    }
);

// functions
export function customersFetchAll(){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { customers } = getState();

        if(!customers.isLoading){
            //dispatches start action from the requestClients creator defined above
            dispatch(fetchAllCustomers_REQ());

            fetch('https://customerrest.herokuapp.com/api/customers')
                .then(response => response.json())
                .then(responseData => {
                    dispatch(fetchAllCustomers_OK(responseData.content));
                }).catch((error) => {
                    dispatch(fetchAllCustomers_ERR());
                })
        }        
    }
}

export function customerFetchById(id){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { customers } = getState();

        if(!customers.isLoading){
            dispatch(fetchCustomerById_REQ());

            fetch(`https://customerrest.herokuapp.com/api/customers/${id}`)
                .then(response => response.json())
                .then(responseData => {
                    dispatch(fetchCustomerById_OK(responseData.content));
                }).catch((error) => {
                    dispatch(fetchCustomerById_ERR());
                })
        }
    }
}

export function addCustomer(customer){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { customers } = getState();
        if(!customers.isLoading){
            dispatch(addCustomer_REQ(customer));

            fetch(
                'https://customerrest.herokuapp.com/api/customers',
                {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(customer)
                }
            ).then(response => {
                if(response.ok){
                    dispatch(addCustomer_OK());
                    dispatch(closeDialogAddCustomer_REQ());
                    dispatch(customersFetchAll());
                    dispatch(setSnackbarText('Customer successfully created.'));
                    dispatch(setSnackbarVariant('success'));
                    dispatch(openSnackbar());
                }else{
                    dispatch(addCustomer_ERR());
                    dispatch(setSnackbarText('Impossible to create the customer.'));
                    dispatch(setSnackbarVariant('error'));
                    dispatch(openSnackbar());
                }
            }).catch((error) => {
                dispatch(addCustomer_ERR());
                dispatch(setSnackbarText('Error with the server. Please contact administrator.'));
                dispatch(setSnackbarVariant('error'));
                dispatch(openSnackbar());
            })
        }
    }
}

export function deleteCustomer(){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { customers } = getState();

        if(!customers.isLoading && customers.current){
            dispatch(deleteCustomer_REQ());
            
            fetch(
                customers.current, 
                {
                    method: 'DELETE'
                }
            ).then(response => {
                if(response.ok){
                    dispatch(deleteCustomer_OK());                                       
                    dispatch(resetCurrentCustomer_REQ());
                    dispatch(customersFetchAll());
                    dispatch(setSnackbarText('Customer successfully deleted.'));
                    dispatch(setSnackbarVariant('success')); 
                    dispatch(openSnackbar());
                }else{
                    dispatch(deleteCustomer_ERR());
                    dispatch(setSnackbarText('Impossible to delete the customer.'));
                    dispatch(setSnackbarVariant('error'));
                    dispatch(openSnackbar());
                }
            }).catch(error => {
                dispatch(deleteCustomer_ERR());
                dispatch(setSnackbarText('Error with the server. Please contact administrator.'));
                dispatch(setSnackbarVariant('error'));
                dispatch(openSnackbar());
            })

            
        }        
    }
}

export function openDialogAddCustomer(){
    return async(dispatch, getState) => {
        dispatch(openDialogAddCustomer_REQ());
    }
}

export function closeDialogAddCustomer(){
    return async(dispatch, getState) => {
        dispatch(closeDialogAddCustomer_REQ());
    }
}

export function setCurrentCustomer(link){
    console.log(link);
    return async(dispatch, getState) => {
        dispatch(setCurrentCustomer_REQ(link));
    }
}

export function resetCurrentCustomer(){
    return async(dispatch, getState) => {
        dispatch(resetCurrentCustomer_REQ());
    }
}