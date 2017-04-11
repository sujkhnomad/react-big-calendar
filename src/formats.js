import dates from './utils/dates';

function inSame12Hr(start, end){
  let s = 12 - dates.hours(start)
  let e = 12 - dates.hours(end)
  return (s <= 0 && e <= 0) || (s >= 0 && e >= 0)
}

let dateRangeFormat = ({ start, end }, culture, local)=>{
  //local.format(start, 'YYYY.MM', culture) + ' — ' + local.format(end, 'MM[.]DD', culture)
  return local.format(start, 'YYYY.MM', culture);
}


let timeRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'h:mm', culture) +
    ' — ' + local.format(end, inSame12Hr(start, end) ? 'HH:mm' : 'HH:mm', culture)

let weekRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'MM[.]DD', culture) +
    ' - ' + local.format(end, dates.eq(start, end, 'month') ? 'MM[.]DD' : 'MM[.]DD', culture)

let formats = {

  dateFormat: 'DD',
  dayFormat: 'MM/DD(ddd)',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,

  timeGutterFormat: 'HH:mm',

  monthHeaderFormat: 'YYYY[.] MM',
  dayHeaderFormat: 'YYYY[.]MM[.]DD',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'DD[일] dddd',
  agendaTimeFormat: 'HH:mm',
  agendaTimeRangeFormat: timeRangeFormat
}

export function set(_formats){
  if (arguments.length > 1)
    _formats = { [_formats]: arguments[1] }

  Object.assign(_formats, formats)
}

export default function format(fmts){
  return {
    ...formats,
    ...fmts
  }
}
