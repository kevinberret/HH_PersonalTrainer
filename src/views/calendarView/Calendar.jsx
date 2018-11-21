import React, { Component } from 'react';

import Calendar from '../../components/calendar/Calendar';

class CalendarPage extends Component {
    render() {
        return (
            <div style={{ padding: 20 }}>
                <Calendar
                />
            </div>
        );
    }
}

export default CalendarPage;