import React, { Component } from 'react';

/*
  events에 Custom컴포넌트 넣어 활용 가능하게 설계하였습니다.
    - 국영수 표시, 이미지, 동영상등 활용 가능
*/

class CustomComponent extends Component {
  static propTypes = {
    labelArr: React.PropTypes.array
  }
  cssSelector(type){
    switch (type) {
      case '영어':
        return 'eng';
      case '수학':
        return 'math';
      case '국어':
        return 'kor';
        break;
    }
    return type;
  }
  render() {
    let {labelArr} = this.props
    
    return (
      <div style={{color:'black'}} className='rbc-event-content-custom'>
        {labelArr.map((item, index)=>{

          let tag = `rbc-tag ${this.cssSelector(item)}`

          return(
            <em 
            key={index} 
            className={tag}
            >
              {item}
            </em>
            );
        })}
      </div>
    );
  }
}

export default [
  {
    'no':11112222,
    // 'title': 'All Day',
    // 'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1),
    'CustomComponent':<CustomComponent labelArr={['영어', '국어', '수학']}/>,
    'dateStyleType': ''
  },
  {
    'no':11112223,
    'title': 'Long Event',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10)
  },

  {
    'no':11112224,
    'title': 'DTS STARTS',
    'start': new Date(2016, 2, 13, 0, 0, 0),
    'end': new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    'no':11112225,
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    'no':11112226,
    'title': 'Some Event',
    'start': new Date(2015, 3, 9, 0, 0, 0),
    'end': new Date(2015, 3, 9, 0, 0, 0)
  },
  {
    'no':11112227,
    'title': 'Conference',
    'start': new Date(2015, 3, 11),
    'end': new Date(2015, 3, 13),
    desc: 'Big conference for important people'
  },
  {
    'no':11112228,
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'no':11112229,
    'title': 'Lunch',
    'start':new Date(2015, 3, 12, 12, 0, 0, 0),
    'end': new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'no':11112230,
    'title': 'Meeting',
    'start':new Date(2015, 3, 12, 14, 0, 0, 0),
    'end': new Date(2015, 3, 12, 15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start':new Date(2015, 3, 12, 17, 0, 0, 0),
    'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'no':11112231,
    'title': 'Dinner',
    'start':new Date(2015, 3, 12, 20, 0, 0, 0),
    'end': new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    'no':11112232,
    'title': 'Birthday Party',
    'start':new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  }
]
