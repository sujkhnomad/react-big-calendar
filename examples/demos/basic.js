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
        //true : 교과순 다음 시간순 정렬설정 false : 시간순 정렬
        isTextBookSort={true}
        //일별 달력에서 이벤트가 없는 날은 보여주지 않습니다.
        notShowEmptyEventinDaysMode={false}
      />
    )
  }
}

export default Basic;
