import * as moment from 'moment';

export function addTimeToDate(date, time) : Date {  
  const _ = moment();
  const completeDate = moment(moment(date).format('YYYY-MM-DD') +" "+ time)
  return completeDate.toDate();
}
