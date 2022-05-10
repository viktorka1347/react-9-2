import moment from 'moment';

export function timeToAgo(created) {

  const timeCreated = moment(created);
  const now = moment();

  if (!timeCreated.isValid()) {
    return '';
  }

  const minutes = now.diff(timeCreated, 'minutes');
  if (minutes < 1) {
    return 'Только что';
  }
  if (minutes < 60) {
    return minutes + ' мин.';
  }
 
  const hours = now.diff(timeCreated, 'hours');
  if (hours < 24) {
    return hours + ' ч.';
  }

  const days = now.diff(timeCreated, 'days');
  if (days < 30) {
    return days + ' дн.';
  }

  const months = now.diff(timeCreated, 'months');
  return months + ' мес.';
}