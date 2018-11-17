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

export const editCustomer_REQ = (customer) => (
    {
        type: ActionType.EDIT_CUSTOMER_REQ,
        JSON: customer,
    }
);

export const editCustomer_OK = () => (
    {
        type: ActionType.EDIT_CUSTOMER_OK
    }
);

export const editCustomer_ERR = () => (
    {
        type: ActionType.EDIT_CUSTOMER_ERR
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

export const openDialogEditCustomer_REQ = () => (
    {
        type: ActionType.OPEN_DIALOG_EDIT_CUSTOMER_REQ,
    }
);

export const closeDialogEditCustomer_REQ = () => (
    {
        type: ActionType.CLOSE_DIALOG_EDIT_CUSTOMER_REQ,
    }
);

export const setCurrentCustomer_REQ = (customer) => (
    {
        type: ActionType.SET_CURRENT_CUSTOMER,
        current: customer
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

export function customerFetchById(link){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { customers } = getState();

        if(!customers.isLoading){
            dispatch(fetchCustomerById_REQ());

            fetch(link)
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
        console.log('add')
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

export function editCustomer(customer){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { customers } = getState();
        console.log(customer)
        if(!customers.isLoading){
            dispatch(editCustomer_REQ(customer));

            fetch(
                customers.current.links[0].href,
                {
                    method: 'PUT',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(customer)
                }
            ).then(response => {
                if(response.ok){
                    dispatch(editCustomer_OK());
                    dispatch(resetCurrentCustomer_REQ());
                    dispatch(closeDialogEditCustomer_REQ());
                    dispatch(customersFetchAll());
                    dispatch(setSnackbarText('Customer successfully updated.'));
                    dispatch(setSnackbarVariant('success'));
                    dispatch(openSnackbar());
                }else{
                    dispatch(editCustomer_ERR());
                    dispatch(setSnackbarText('Impossible to update the customer.'));
                    dispatch(setSnackbarVariant('error'));
                    dispatch(openSnackbar());
                }
            }).catch((error) => {
                dispatch(editCustomer_ERR());
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
                customers.current.links[0].href, 
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

export function openDialogEditCustomer(){
    return async(dispatch, getState) => {
        dispatch(openDialogEditCustomer_REQ());
    }
}

export function closeDialogEditCustomer(){
    return async(dispatch, getState) => {
        dispatch(closeDialogEditCustomer_REQ());
    }
}

export function setCurrentCustomer(customer){
    console.log(customer);
    return async(dispatch, getState) => {
        dispatch(setCurrentCustomer_REQ(customer));
    }
}

export function resetCurrentCustomer(){
    return async(dispatch, getState) => {
        dispatch(resetCurrentCustomer_REQ());
    }
}