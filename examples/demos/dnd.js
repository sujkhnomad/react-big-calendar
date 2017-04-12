import React from 'react'
import events from '../events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from '../../src';
import withDragAndDrop from '../../src/addons/dragAndDrop';

import '../../src/addons/dragAndDrop/styles.less';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: events
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.headDateClick = this.headDateClick.bind(this)
    this.headPrevButtonClick = this.headPrevButtonClick.bind(this)
    this.movheadNextButtonClickeEvent = this.headNextButtonClick.bind(this)
  }

  moveEvent({ event, start, end }) {
    console.log('event', event, start, end);
  }
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
      <DragAndDropCalendar
        selectable
        events={events}
        onEventDrop={this.moveEvent}
        defaultDate={new Date(2015, 3, 1)}
        headDateClick={this.headDateClick}
        headPrevButtonClick={this.headPrevButtonClick}
        headNextButtonClick={this.headNextButtonClick}
        sundayColor={'#bdbdbd'}
        //달별 달력에서 이벤트가 있는 공간을 클릭했을때 발생합니다.
        onSelectEvent={(event) => {
          console.log(event);
        }}
        //달별 달력에서 이벤트가 없는 빈공간을 클릭했을때 발생합니다.
        onSelectSlot={(slotInfo) => {
          console.log(slotInfo)
        }}
        //true : 교과순 다음 시간순 정렬설정 false : 시간순 정렬
        isTextBookSort={true}
        //일별 달력에서 이벤트가 없는 날은 보여주지 않습니다.
        notShowEmptyEventInDaysMode={true}
        //해당 달의 날짜만 표시할지 여부.
        onlyShowInMonth={true}
      />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
