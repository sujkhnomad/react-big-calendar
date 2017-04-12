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
    calendarInMonth:React.PropTypes.object
  }
  constructor(){
    super();

    this.state ={
      isSelect : false
    }
    this.toggleClass = this.toggleClass.bind(this);
    this.onblur = this.onblur.bind(this);
  }

  toggleClass(){
    this.setState({
      isSelect : !this.state.isSelect
    })
  }
  onblur(){
    if(this.state.isSelect){
      this.setState({
        isSelect : false
      })
    }
  }
  render() {
    let { messages, label, view, headDateClick, date, headPrevButtonClick, headNextButtonClick } = this.props;
    let openClass = view === 'agenda' ? 'agenda' : ''
    let toolbarStyle = `rbc-toolbar ${openClass}`

    messages = message(messages)
    return (
      <div className={toolbarStyle}>
        <span className='rbc-btn-group'>
          <a
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
          </a>

          <strong className='rbc-toolbar-label'
            onClick={()=>{
              if(headDateClick){
                headDateClick({
                    view, date, label
                })
              }
            }}
          >
            { label }
          </strong>

          <a
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
          </a>
        </span>


        <span className='rbc-btn-group-custom'>
          <button
            type='button'
            className='today'
            onClick={()=>{
              this.navigate(navigate.TODAY)
            }}
          >
            {messages.today}
          </button>
            {
              this.viewNamesGroup(messages)
            }
            {/*<ul className='dateCatelist'>
            {
              this.viewNamesGroup(messages)
            }
            </ul>*/}
        </span>
      </div>
    );
  }

  navigate(action){
    this.props.onNavigate(action)
  }

  view(view){
    this.props.onViewChange(view)
  }

  viewNamesGroup(messages) {
    const view = this.props.view
    let name = messages[view];
    const cateClassName = `dateCate ${view}`
      switch (view) {
        case 'month':
          return(
            <button
              type='button'
              className={ cn({ [cateClassName] : view === name})}
              onClick={()=>{
                this.view('agenda')
              }}
            >
            </button>
          )
        case 'agenda':
          return (
            <button type='button'
              className={ cn({ [cateClassName] : view === name})}
              onClick={()=>{
                this.view('month')
              }}
            >
            </button>
          )
        default:
          break;
      }
  }
}

export default Toolbar;
{/*<button key={i}
            type='button'
            className={ cn({ [cateClassName] : view === name})}
            onClick={()=>{
              this.view(name)
            }}
          >
           
          </button>*/}