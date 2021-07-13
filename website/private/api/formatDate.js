export default function formatDate(date) {
  //input format:  YYYY-MM-DD
  //output format: DD MMM YYYY

  var months = [
    '000',
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  var [year, month, day] = date.split('-');
  return `${parseInt(day)} ${months[parseInt(month)]} ${parseInt(year)}`;
}
