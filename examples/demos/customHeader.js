import React from 'react';
import BigCalendar from '../../src';
import events from '../events';


let MyOtherNestedComponent = React.createClass({
  render(){
    return <div>NESTED COMPONENT</div>
  }
})

let MyCustomHeader = React.createClass({
  render(){
    const { label } = this.props
    return (
      <div>
        CUSTOM HEADER:
        <div>{ label }</div>
        <MyOtherNestedComponent />
      </div>
    )
  }
})


class CustomHeader extends React.Component {
  headDateClick(viewType){
    console.log ('headDateClick now view type : ', viewType);
  }

  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        defaultDate={new Date(2015, 3, 1)}
        components={{
          day: {header: MyCustomHeader},
          week: {header: MyCustomHeader},
          month: {header: MyCustomHeader}
        }}
        headDateClick={this.headDateClick.bind(this)}
      />
    )
  }
}

export default CustomHeader;
