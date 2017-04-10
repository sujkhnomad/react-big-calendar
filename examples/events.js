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
      default :
        return ''
    }
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
    'title': '국어 선생님과 수업일',
    'content':'content 내용입니다.',
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1),
    //CustomComponent를 사용하면 month타입 달력에서는 title 숨김상태가 됩니다.
    'CustomComponent':<CustomComponent labelArr={['국어']}/>,
    //특정 일정의 수정 권한 actor가 들어갈 예정입니다.
    'planEditors':['교사', '관리자'],
    //1:한글 2:영어 3:수학 4:일반 5:추천
    'planType':1
  },
  {
    'no':11112223,
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10),
    'CustomComponent':<CustomComponent labelArr={['수학']}/>,
  },
    {
    'no':12112223,
    'title': 'Long Event',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10),
    'planType':4
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
