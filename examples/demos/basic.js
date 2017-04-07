import React from 'react';
import BigCalendar from '../../src';
import events from '../events';

class Basic extends React.Component {
  headDateClick(viewType){
    console.log ('headDateClick now view type : ', viewType);
  }
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        defaultDate={new Date(2015, 3, 1)}
        headDateClick={this.headDateClick.bind(this)}
        sundayColor={'#e80000'}
      />
    )
  }
}

export default Basic;
