import cn from 'classnames';
import getHeight from 'dom-helpers/query/height';
import qsa from 'dom-helpers/query/querySelectorAll';
import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';

import dates from './utils/dates';
import { accessor, elementType } from './utils/propTypes';
import { segStyle, eventSegments, endOfRange, eventLevels } from './utils/eventLevels';
import BackgroundCells from './BackgroundCells';
import EventRow from './EventRow';
import EventEndingRow from './EventEndingRow';

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot;

const propTypes = {
  events: React.PropTypes.array.isRequired,
  range: React.PropTypes.array.isRequired,

  rtl: React.PropTypes.bool,
  renderForMeasure: React.PropTypes.bool,
  renderHeader: React.PropTypes.func,

  container: React.PropTypes.func,
  selected: React.PropTypes.object,
  selectable: React.PropTypes.oneOf([true, false, 'ignoreEvents']),

  onShowMore: React.PropTypes.func,
  onSelectSlot: React.PropTypes.func,
  onSelectEnd: React.PropTypes.func,
  onSelectStart: React.PropTypes.func,

  startAccessor: accessor.isRequired,
  endAccessor: accessor.isRequired,

  dateCellWrapper: elementType,
  eventComponent: elementType,
  eventWrapperComponent: elementType.isRequired,
  minRows: React.PropTypes.number.isRequired,
  maxRows: React.PropTypes.number.isRequired,
  calendarInMonth: React.PropTypes.object,
  isTextBookSort:React.PropTypes.bool,
  onlyShowInMonth:React.PropTypes.bool,
};

const defaultProps = {
  minRows: 0,
  maxRows: Infinity,
}

class DateContentRow extends React.Component {

  constructor(...args) {
    super(...args);
  }

  handleSelectSlot = (slot) => {
    const { range, onSelectSlot } = this.props;

    onSelectSlot(
      range.slice(slot.start, slot.end + 1),
      slot,
    )
  }

  handleShowMore = (slot) => {
    const { range, onShowMore } = this.props;
    let row = qsa(findDOMNode(this), '.rbc-row-bg')[0]

    let cell;
    if (row) cell = row.children[slot-1]

    let events = this.segments
      .filter(seg => isSegmentInSlot(seg, slot))
      .map(seg => seg.event)

    onShowMore(events, range[slot-1], cell, slot)
  }

  createHeadingRef = r => {
    this.headingRow = r;
  }

  createEventRef = r => {
    this.eventRow = r;
  }

  getContainer = () => {
    const { container } = this.props;
    return container ? container() : findDOMNode(this)
  }

  getRowLimit() {
    let eventHeight = getHeight(this.eventRow);
    let headingHeight = this.headingRow ? getHeight(this.headingRow) : 0
    let eventSpace = getHeight(findDOMNode(this)) - headingHeight;

    return Math.max(Math.floor(eventSpace / eventHeight), 1)
  }

  renderHeadingCell = (date, index) => {
    let { renderHeader, range } = this.props;

    return renderHeader({
      date,
      key: `header_${index}`,
      style: segStyle(1, range.length),
      className: cn(
        'rbc-date-cell',
        dates.eq(date, new Date(), 'day') && 'rbc-now', // FIXME use props.now
      )
    })
  }

  renderDummy = () => {
    let { className, range, renderHeader } = this.props;
    return (
      <div className={className}>
        <div className='rbc-row-content'>
          {renderHeader && (
            <div className='rbc-row' ref={this.createHeadingRef}>
              {range.map(this.renderHeadingCell)}
            </div>
          )}
          <div className='rbc-row' ref={this.createEventRef}>
            <div className='rbc-row-segment' style={segStyle(1, range.length)}>
              <div className='rbc-event'>
                <div className='rbc-event-content'>&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      rtl,
      events,
      range,
      className,
      selectable,
      renderForMeasure,
      startAccessor,
      endAccessor,
      renderHeader,
      minRows, maxRows,
      dateCellWrapper,
      eventComponent,
      eventWrapperComponent,
      onSelectStart,
      onSelectEnd,
      calendarInMonth,
      isTextBookSort,
      onlyShowInMonth,
      ...props
    } = this.props;

    if (renderForMeasure)
      return this.renderDummy();

    let { first, last } = endOfRange(range);

    let segments = this.segments = events.map(evt => eventSegments(evt, first, last, {
      startAccessor,
      endAccessor
    }))
    //교과순 시간순 정렬
    if(isTextBookSort){
      segments = segments.sort((a, b)=>{
        //둘다 교과일때
        if(a.event.planType < 4 && b.event.planType < 4){
          return moment(a.event.start).isAfter(b.event.start)
        }
        //a만 교과일때
        else if(a.event.planType < 4){
          return false
        }
        //b만 교과일때
        else if(b.event.planType < 4){
          return true
        }
        //그밖에
        else{
          return moment(a.event.start).isAfter(b.event.start)
        }
      });
    }

    let { levels, extra } = eventLevels(segments, Math.max(maxRows - 1, 1));

    while (levels.length < minRows ) levels.push([])

    return (
      <div className={className}>
        <BackgroundCells
          rtl={rtl}
          range={range}
          selectable={selectable}
          container={this.getContainer}
          onSelectStart={onSelectStart}
          onSelectEnd={onSelectEnd}
          onSelectSlot={this.handleSelectSlot}
          cellWrapperComponent={dateCellWrapper}
        />

        <div className='rbc-row-content'>
          {renderHeader && (
            <div className='rbc-row' ref={this.createHeadingRef}>
              {range.map(this.renderHeadingCell)}
            </div>
          )}
          {levels.map((segs, idx) => {
            let isInMonth = moment(segs[0].event.start).isBetween(calendarInMonth, moment(calendarInMonth).add(1, 'month'), null, '[)');
            //onlyShowInMonth false이면 전달 31일등 칸이 존재하는데로 보여줍니다.
            if(!onlyShowInMonth){
              isInMonth = true
            }

            if(isInMonth){
              return(
                <EventRow
                  {...props}
                  key={idx}
                  start={first}
                  end={last}
                  segments={segs}
                  slots={range.length}
                  eventComponent={eventComponent}
                  eventWrapperComponent={eventWrapperComponent}
                  startAccessor={startAccessor}
                  endAccessor={endAccessor}
                />
              );
            }
            else{
              return(
                <div key={idx}></div>
              )
            }

          })}
          {!!extra.length && (
            <EventEndingRow
              {...props}
              start={first}
              end={last}
              segments={extra}
              onShowMore={this.handleShowMore}
              eventComponent={eventComponent}
              eventWrapperComponent={eventWrapperComponent}
              calendarInMonth={calendarInMonth}
            />
          )}
        </div>
      </div>
    );
  }
}

DateContentRow.propTypes = propTypes;
DateContentRow.defaultProps = defaultProps;

export default DateContentRow
