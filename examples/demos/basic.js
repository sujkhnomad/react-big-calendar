import React from 'react';
import BigCalendar from '../../src';
import events from '../events';

class Basic extends React.Component {
  headDateClick({view, date, label}){
    console.log('headDateClick');
    console.log ('view : ', view);
    console.log ('date : ', date);
    console.log ('label : ', label);
  }
  headPrevButtonClick({view, date, label}){
    console.log('headDateClick');
    console.log ('view : ', view);
    console.log ('date : ', date);
    console.log ('label : ', label);
  }
  headNextButtonClick({view, date, label}){
    console.log('headNextButtonClick');
    console.log ('view : ', view);
    console.log ('date : ', date);
    console.log ('label : ', label);
  }
  render(){
    return (
      <BigCalendar
        selectable
        {...this.props}
        events={events}
        defaultDate={new Date(2015, 3, 1)}
        headDateClick={this.headDateClick.bind(this)}
        headPrevButtonClick={this.headPrevButtonClick.bind(this)}
        headNextButtonClick={this.headNextButtonClick.bind(this)}
        sundayColor={'#bdbdbd'}
        onSelectEvent={(event) => {
          console.log(event);
        }}
        onSelectSlot={(slotInfo) => {
          console.log(slotInfo)
          console.log(`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +`\nend: ${slotInfo.end.toLocaleString()}`)
        }}
      />
    )
  }
}

export default Basic;
