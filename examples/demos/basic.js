import React from 'react';
import BigCalendar from '../../src';
import events from '../events';

class Basic extends React.Component {
  headDateClick({view, date, label}){
    console.log ('view : ', view);
    console.log ('date : ', date);
    console.log ('label : ', label);
  }
  headPrevButtonClick(){
    console.log(' headPrevButtonClick click');
  }
  headNextButtonClick(){
    console.log(' headPrevButtonClick click');
  }
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        defaultDate={new Date(2015, 3, 1)}
        headDateClick={this.headDateClick.bind(this)}
        headPrevButtonClick={this.headPrevButtonClick.bind(this)}
        headNextButtonClick={this.headNextButtonClick.bind(this)}
        sundayColor={'#e80000'}
      />
    )
  }
}

export default Basic;
