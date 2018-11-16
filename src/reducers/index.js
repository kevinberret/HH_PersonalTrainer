import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import customers from './customers';
import trainings from './trainings';
import utils from './utils';

const rootReducer = () => (
    combineReducers({
        customers,
        trainings,
        utils,
        form:formReducer,
    })
);

export default rootReducer;