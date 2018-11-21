import ActionType from '../constants/actions-types';
import moment from 'moment';

export const getEvents_REQ = (values) => (
    {
        type: ActionType.GET_EVENTS_REQ,
    }
);

export const getEvents_OK = (events) => (
    {
        type: ActionType.GET_EVENTS_OK,
        events: events
    }
);

export const getEvents_ERR = () => (
    {
        type: ActionType.GET_EVENTS_ERR,
    }
);

// functions
export function getEvents(){
    return async(dispatch, getState) => {
        //get the current state of the store
        const { agenda, trainings } = getState();
        const events = [];

        if(!agenda.isLoading && !trainings.isLoading){
            //dispatches start action from the requestClients creator defined above
            dispatch(getEvents_REQ());
            console.log(trainings);

            if(trainings.listWithCustomers){
                trainings.listWithCustomers.forEach((training, index) => {
                    events.push(
                        {
                            id: index,
                            title: training.activity + ' ' + training.customer.lastname + ' ' + training.customer.firstname,
                            start: moment(training.date).toDate(),
                            end: (moment(training.date).add(training.duration, 'm')).toDate(),
                            allDay: false
                        }
                    );
                });

                console.log('events formatted')
                console.log(events);

                dispatch(getEvents_OK(events));
            }else{
                dispatch(getEvents_ERR());
            }
        }        
    }
}