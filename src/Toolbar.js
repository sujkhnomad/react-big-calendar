import React from 'react';
import cn from 'classnames';
import message from './utils/messages';
import { navigate } from './utils/constants';

class Toolbar extends React.Component {
  static propTypes = {
    view: React.PropTypes.string.isRequired,
    views: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ).isRequired,
    label: React.PropTypes.node.isRequired,
    messages: React.PropTypes.object,
    onNavigate: React.PropTypes.func.isRequired,
    onViewChange: React.PropTypes.func.isRequired,
    headDateClick: React.PropTypes.func,
    date: React.PropTypes.object,
    headPrevButtonClick: React.PropTypes.func,
    headNextButtonClick: React.PropTypes.func,
  }

  render() {
    let { messages, label, view, headDateClick, date, headPrevButtonClick, headNextButtonClick } = this.props;
    
    messages = message(messages);

    return (
      <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
          <button
            type='button'
            className='btn-prev'
            onClick={()=>{
              this.navigate(navigate.PREVIOUS);
              if(headPrevButtonClick){
                headPrevButtonClick({
                    view, date, label
                })
              }
            }}
          >
            <span className='btn-text'>
              {messages.previous}
            </span>
          </button>

          <span className='rbc-toolbar-label'
            onClick={()=>{
              if(headDateClick){
                headDateClick({
                    view, date, label
                })
              }
            }}
          >
            { label }
          </span>

          <button
            type='button'
            className='btn-next'
            onClick={()=>{
              this.navigate(navigate.NEXT);
              if(headNextButtonClick){
                headNextButtonClick({
                    view, date, label
                })
              }
            }}
          >
            <span className='btn-text'>
                {messages.next}
            </span>
          </button>
        </span>


        <span className='rbc-btn-group-custom'>
          <button
            type='button'
            className='today'
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <div className='dateCate'>
            <div className='dateCatelist'>
            {
              this.viewNamesGroup(messages)
            }
            </div>
          </div>
        </span>
      </div>
    );
  }

  navigate(action){
    this.props.onNavigate(action)
  }

  view = (view) => {
    this.props.onViewChange(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return (
        viewNames.map(name =>
          <button key={name}
            type='button'
            className={cn({'rbc-active': view === name})}
            onClick={this.view.bind(null, name)}
          >
            {messages[name]}
          </button>
        )
      )
    }
  }
}

export default Toolbar;
