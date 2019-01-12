/*
*  # You can pass format to this function. Example is default format. Thought there are some restrictions.
*/
let defaultFormat = 'dd MMM, yyyy'

export default dateFormat = (date, format = defaultFormat) => {
  let months = [{
      name: 'January'
    },
    {
      name: 'February'
    },
    {
      name: 'March'
    },
    {
      name: 'April'
    },
    {
      name: 'May'
    },
    {
      name: 'June'
    },
    {
      name: 'July'
    },
    {
      name: 'August'
    },
    {
      name: 'September'
    },
    {
      name: 'October'
    },
    {
      name: 'November'
    },
    {
      name: 'December'
    },
  ]

  let dates = new Date(date);
  let stringDate = '';
  let dd = dates.getDate();
  let mm = dates.getMonth() + 1;
  let yyyy = dates.getFullYear();

  let Mcount = 0,
    dcount = 0,
    ycount = 0,
    mcount = 0;

  for (let i = 0; i <= format.length; i++) {
    if (format[i] === 'M') {
      Mcount++;
    } else if (format[i] === 'd') {
      dcount++;
    } else if (format[i] === 'y') {
      ycount++;
    } else if (format[i] === 'm') {
      mcount++;
    } else if (format[i] === '/' || format[i] === ' ' || format[i] === ',' || i === format.length) {
      if (Mcount > 0) {
        stringDate += months[mm - 1].name.substring(0, Mcount);
        Mcount = 0;
      } else if (dcount > 0) {
        stringDate += dd > 9 ? dd : '0' + dd;
        dcount = 0;
      } else if (ycount > 0) {
        stringDate += ycount === 2 ? yyyy.toString().substring(2, 4) : yyyy;
        ycount = 0;
      } else if (mcount > 0) {
        stringDate += mcount !== 2 ? 'month wrong format' : mm > 9 ? mm : '0' + mm;
      }
      stringDate += format[i] ? format[i] : '';
    } else {
      stringDate = 'Wrong format!';
      break;
    }
  }

  return stringDate;
}