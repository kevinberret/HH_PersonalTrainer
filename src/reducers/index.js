import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import customers from './customers';
import trainings from './trainings';
import utils from './utils';
import agenda from './agenda';
import auth from './auth.js';

const rootReducer = () => (
    combineReducers({
        customers,
        trainings,
        utils,
        agenda,
        auth,
        form:formReducer,
    })
);

export default rootReducer;