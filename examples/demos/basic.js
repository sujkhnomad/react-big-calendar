import React from 'react';
import BigCalendar from '../../src';
import events from '../events';

let Basic = React.createClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
})

export default Basic;
