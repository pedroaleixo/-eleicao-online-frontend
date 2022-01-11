import * as moment from 'moment';

export function addTimeToDate(newdate) {
  const _ = moment();
  const date = moment(newdate).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()})
  return date.toDate();
}
