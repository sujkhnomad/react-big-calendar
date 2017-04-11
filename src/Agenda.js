import React, { PropTypes } from 'react';
import classes from 'dom-helpers/class';
import getWidth from 'dom-helpers/query/width';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import moment from 'moment';

import localizer from './localizer'
import message from './utils/messages';
import dates from './utils/dates';
import { navigate } from './utils/constants';
import { accessor as get } from './utils/accessors';
import { accessor, dateFormat, dateRangeFormat } from './utils/propTypes';
import { inRange } from './utils/eventLevels';


let Agenda = React.createClass({

  propTypes: {
    events: React.PropTypes.array,
    date: React.PropTypes.instanceOf(Date),
    length: React.PropTypes.number.isRequired,
    titleAccessor: accessor.isRequired,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,

    agendaDateFormat: dateFormat,
    agendaTimeFormat: dateFormat,
    agendaTimeRangeFormat: dateRangeFormat,
    culture: React.PropTypes.string,

    components: React.PropTypes.object.isRequired,
    messages: PropTypes.shape({
      date: PropTypes.string,
      time: PropTypes.string,
    })
  },

  getDefaultProps() {
    return {
      length: 30
    };
  },

  // componentDidMount() {
  //   this._adjustHeader()
  // },

  // componentDidUpdate() {
  //   this._adjustHeader()
  // },

  render() {
    let { length, date, events, startAccessor } = this.props;
    let messages = message(this.props.messages);
    let end = dates.add(date, length, 'day')

    let range = dates.range(date, end, 'day');

    events = events.filter(event =>
      inRange(event, date, end, this.props)
    )

    events.sort((a, b) => +get(a, startAccessor) - +get(b, startAccessor))

    return (
      <div className='rbc-agenda-view calendar'>
        <div className='rbc-agenda-content' ref='content'>
          <ul ref='tbody' className="calendar-list" >
            { range.map((day, idx) => this.renderDay(day, events, idx)) }
          </ul>
          <a href="#" className="btn-write">추가</a>
        </div>
      </div>
    );
  },

  selectSummaryText(type){
    switch (type) {
      case 1:
      case 2:
      case 3:
        return '학습알림'
      case 5:
        return '추천'
      default:
        return false
    }
  },

  renderDay(day, events, dayKey){
    let {
        culture, components
      , titleAccessor, agendaDateFormat } = this.props;
    let self = this;
    let EventComponent = components.event;
    let DateComponent = components.date;

    events = events.filter(e => inRange(e, day, day, this.props))

    return events.map((event, idx) => {
      let dateLabel = idx === 0 && localizer.format(day, agendaDateFormat, culture)
      let dateLabelArr
      if(dateLabel){
        dateLabelArr = dateLabel.split(' ')
      }


      let first = idx === 0
          ? (
            <div className='rbc-agenda-date-cell'>
              { DateComponent
                ? <DateComponent day={day} label={dateLabel}/>
                : <h2>{dateLabelArr[0]}<span>{dateLabelArr[1]}</span></h2>
              }
            </div>
          ) : false

      let title = get(event, titleAccessor)
      let planType = self.selectSummaryText(event.planType);
      return (
        <li key={dayKey + '_' + idx} className="schedule-list">
          {first}
          <table>
            <caption>시간별(으)로 구성된 일정 테이블</caption>
            <colgroup>
                <col width="20%"/>
                <col width="*"/>
            </colgroup>
            <tbody>
              <tr>
                {/*이곳에 타입에따른 스타일적용*/}
                  <th className="kor color">
                {/*이곳에 타입에따른 스타일적용*/}
                    <div className="time">
                      <small>{moment(event.start).format('a')}</small>
                      { this.timeRangeLabel(day, event) }
                    </div>
                  </th>
                  <td>
                    <div className="text-box">

                      {/*타입별 태그가 들어갈 곳*/}
                      {planType && <em className="rbc-tag">{planType}</em>}
                      {/*타입별 태그가 들어갈 곳*/}

                      <strong>
                          { EventComponent
                              ? <EventComponent event={event} title={title}/>
                              : title
                          }
                      </strong>
                      {event.content && <p>
                        {event.content}
                        </p>}
                    </div>
                  </td>
              </tr>
            </tbody>
          </table>
          {/*<td className='rbc-agenda-time-cell'>
            { this.timeRangeLabel(day, event) }
          </td>
          <td className='rbc-agenda-event-cell'>
            { EventComponent
                ? <EventComponent event={event} title={title}/>
                : title
            }
          </td>*/}
        </li>
      )
    }, [])
  },

  timeRangeLabel(day, event){
    let {
        endAccessor, startAccessor, allDayAccessor
      , culture, messages, components } = this.props;

    let labelClass = ''
      , TimeComponent = components.time
      , label = message(messages).allDay

    let start = get(event, startAccessor)
    let end = get(event, endAccessor)

    if (!get(event, allDayAccessor)) {
      if (dates.eq(start, end, 'day')){
        label = localizer.format({ start, end }, this.props.agendaTimeRangeFormat, culture)
      }
      else if (dates.eq(day, start, 'day')){
        label = localizer.format(start, this.props.agendaTimeFormat, culture)
      }
      else if (dates.eq(day, end, 'day')){
        label = localizer.format(end, this.props.agendaTimeFormat, culture)
      }
    }

    if (dates.gt(day, start, 'day')) labelClass = 'rbc-continues-prior'
    if (dates.lt(day, end, 'day'))   labelClass += ' rbc-continues-after'

    return (
      <span className={labelClass.trim()}>
        { TimeComponent
          ? <TimeComponent event={event} label={label}/>
          : label
        }
      </span>
    )
  },

  // _adjustHeader() {
  //   let header = this.refs.header;
  //   let firstRow = this.refs.tbody.firstChild

  //   if (!firstRow)
  //     return

  //   let isOverflowing = this.refs.content.scrollHeight > this.refs.content.clientHeight;
  //   let widths = this._widths || []

  //   this._widths = [
  //     getWidth(firstRow.children[0]),
  //     getWidth(firstRow.children[1])
  //   ]

  //   if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
  //     this.refs.dateCol.style.width = this._widths[0] + 'px'
  //     this.refs.timeCol.style.width = this._widths[1] + 'px';
  //   }

  //   if (isOverflowing) {
  //     classes.addClass(header, 'rbc-header-overflowing')
  //     header.style.marginRight = scrollbarSize() + 'px'
  //   }
  //   else {
  //     classes.removeClass(header, 'rbc-header-overflowing')
  //   }
  // }
});

Agenda.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'day');

    case navigate.NEXT:
      return dates.add(date, 1, 'day')

    default:
      return date;
  }
}

Agenda.range = (start, { length = Agenda.defaultProps.length }) => {
  let end = dates.add(start, length, 'day')
  return { start, end }
}

export default Agenda
