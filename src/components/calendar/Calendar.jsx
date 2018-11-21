import React, { Component } from 'react';
import { connect } from "react-redux";

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import { getTrainingsAndCustomers } from '../../actions/trainings';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Calendar extends Component {
    componentDidMount() {
        this.props.getTrainingsAndCustomers();        
    }
    
    render() {
        return (
            <div>
                <BigCalendar
                    localizer={localizer}
                    events={this.props.agenda.events}
                    views={allViews}
                    style={{ height: '80vh' }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    agenda: state.agenda
});

//loads dispatch methods to components props
const mapDispatchToProps = dispatch => ({
    getTrainingsAndCustomers: () => {
        dispatch(getTrainingsAndCustomers());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);