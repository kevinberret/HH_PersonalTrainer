import React, { Component } from 'react';
import { connect } from "react-redux";

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import { getTrainingsAndCustomers } from '../../actions/trainings';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
/*
const events = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2015, 3, 7),
      end: new Date(2015, 3, 10),
    },
  
    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(2016, 2, 13, 0, 0, 0),
      end: new Date(2016, 2, 20, 0, 0, 0),
    },
  
    {
      id: 3,
      title: 'DTS ENDS',
      start: new Date(2016, 10, 6, 0, 0, 0),
      end: new Date(2016, 10, 13, 0, 0, 0),
    },
  
    {
      id: 4,
      title: 'Some Event',
      start: new Date(2015, 3, 9, 0, 0, 0),
      end: new Date(2015, 3, 10, 0, 0, 0),
    },
    {
      id: 5,
      title: 'Conference',
      start: new Date(2015, 3, 11),
      end: new Date(2015, 3, 13),
      desc: 'Big conference for important people',
    },
    {
      id: 6,
      title: 'Meeting',
      start: new Date(2015, 3, 12, 10, 30, 0, 0),
      end: new Date(2015, 3, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
      id: 7,
      title: 'Lunch',
      start: new Date(2015, 3, 12, 12, 0, 0, 0),
      end: new Date(2015, 3, 12, 13, 0, 0, 0),
      desc: 'Power lunch',
    },
    {
      id: 8,
      title: 'Meeting',
      start: new Date(2015, 3, 12, 14, 0, 0, 0),
      end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
      id: 9,
      title: 'Happy Hour',
      start: new Date(2015, 3, 12, 17, 0, 0, 0),
      end: new Date(2015, 3, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day',
    },
    {
      id: 10,
      title: 'Dinner',
      start: new Date(2015, 3, 12, 20, 0, 0, 0),
      end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2015, 3, 13, 7, 0, 0),
      end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
      id: 12,
      title: 'Late Night Event',
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
      id: 12.5,
      title: 'Late Same Night Event',
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
      id: 13,
      title: 'Multi-day Event',
      start: new Date(2015, 3, 20, 19, 30, 0),
      end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
  ];
*/
const events = [
      {
        id: 0,
        title: 'Spinning',
        start: '2018-11-21T13:09:52.321Z',
        end: '2018-11-21T14:09:52.321Z',
        allDay: false
      },
      {
        id: 1,
        title: 'Gym training',
        start: '2018-11-22T13:09:51.978Z',
        end: '2018-11-22T13:39:51.978Z',
        allDay: false
      },
      {
        id: 2,
        title: 'Gym training',
        start: '2018-11-23T13:09:51.978Z',
        end: '2018-11-23T14:39:51.978Z',
        allDay: false
      },
      {
        id: 3,
        title: 'Fitness',
        start: '2018-11-21T15:09:51.978Z',
        end: '2018-11-21T16:09:51.978Z',
        allDay: false
      },
      {
        id: 4,
        title: 'Spinning',
        start: '2018-11-24T13:09:51.978Z',
        end: '2018-11-24T14:09:51.978Z',
        allDay: false
      },
      {
        id: 5,
        title: 'Gym training',
        start: '2018-11-25T13:09:51.978Z',
        end: '2018-11-25T13:54:51.978Z',
        allDay: false
      },
      {
        id: 6,
        title: 'Zumba',
        start: '2018-11-26T13:09:51.978Z',
        end: '2018-11-26T13:54:51.978Z',
        allDay: false
      },
      {
        id: 7,
        title: 'Zumba',
        start: '2018-11-21T13:09:52.415Z',
        end: '2018-11-21T14:09:52.415Z',
        allDay: false
      },
      {
        id: 8,
        title: 'Jogging',
        start: '2018-11-21T13:09:52.434Z',
        end: '2018-11-21T14:39:52.434Z',
        allDay: false
      }
    ]
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