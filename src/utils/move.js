import invariant from 'invariant';
import moment from 'moment';
import { navigate } from './constants';
import VIEWS from '../Views';

export default function moveDate(action, date, View) {
  View = typeof View === 'string' ? VIEWS[View] : View;

  switch (action) {
    case navigate.TODAY:
      date = new Date()
      break;
    case navigate.DATE:
      break;
    default:
      invariant(View && typeof View.navigate === 'function',
        'Calendar View components must implement a static `.navigate(date, action)` method.s')
      console.log('전handleNavigate', moment(date).format('YYYY MM DD'))
      date = View.navigate(date, action)
      console.log('후handleNavigate', moment(date).format('YYYY MM DD'))
  }
  return date
}
