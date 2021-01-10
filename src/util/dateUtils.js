import moment from 'moment';

export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const SIMPLE_DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT = 'MMMM DD YYYY';
export const DATE_FORMAT_DAY = 'MMMM DD YY, HH:mm';
export const TIME_ONLY_FORMAT = 'h:mm A';
export const TIME_FORMAT_24_HOUR = 'HH:mm';
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD HH:mm';
export const TIME_FORMAT_ISO8601 = 'YYYY-MM-DDTHH:mm:ssZ';

class DateUtils {
  getTimeFromNow = time => {
    return moment(time).fromNow(true);
  };

  getUnixTimeStamp = () => {
    return Math.round(new Date().getTime() / 1000);
  };

  convertTimeFormat = (time, fromFormat, toFormat) => {
    return moment(time, fromFormat).format(toFormat);
  };

  getCurrentTime(format = undefined) {
    return moment(Date.now()).format(format ? format : TIME_ONLY_FORMAT);
  }

  getCurrentGivenTime = (givenTime, format = undefined) => {
    return moment(givenTime).format(format ? format : TIME_ONLY_FORMAT);
  };

  addMinutes(givenTime, minutesToAdd, format = undefined) {
    return moment(givenTime)
      .add(minutesToAdd, 'm')
      .format(format ? format : TIME_FORMAT_ISO8601);
  }

  addYears(givenTime, yearsToAdd, format = undefined) {
    return moment(givenTime)
      .add(yearsToAdd, 'y')
      .format(format ? format : TIME_FORMAT_ISO8601);
  }

  getISOString(givenTime) {
    return moment(givenTime).toISOString();
  }

  getDaysBetweenDuration(fromDate, toDate) {
    var compareThis = moment(toDate).toISOString();
    const daysArray = [compareThis];

    while (moment(fromDate).isBefore(compareThis)) {
      compareThis = moment(compareThis)
        .subtract(1, 'day')
        .format(SERVER_DATE_FORMAT);

      if (moment(fromDate).isBefore(compareThis)) {
        daysArray.push(moment(compareThis).toISOString());
      }
    }

    return daysArray;
  }

  getWeeksBetweenDuration(fromDate, toDate) {
    var compareThis = moment(toDate).toISOString();
    const weeksArray = [compareThis];

    while (moment(fromDate).isBefore(compareThis)) {
      compareThis = moment(compareThis)
        .subtract(1, 'week')
        .format(SERVER_DATE_FORMAT);

      if (moment(fromDate).isBefore(compareThis)) {
        weeksArray.push(moment(compareThis).toISOString());
      }
    }

    return weeksArray;
  }

  getMonthsBetweenDuration(fromDate, toDate) {
    var compareThis = moment(toDate).toISOString();
    const monthsArray = [compareThis];

    while (moment(fromDate).isBefore(compareThis)) {
      compareThis = moment(compareThis)
        .subtract(1, 'month')
        .format(SERVER_DATE_FORMAT);

      if (moment(fromDate).isBefore(compareThis)) {
        monthsArray.push(moment(compareThis).toISOString());
      }
    }

    return monthsArray;
  }

  getYearsBetweenDuration(fromDate, toDate) {
    var compareThis = moment(toDate).toISOString();
    const yearsArray = [compareThis];

    while (moment(fromDate).isBefore(compareThis)) {
      compareThis = moment(compareThis)
        .subtract(1, 'year')
        .format(SERVER_DATE_FORMAT);

      if (moment(fromDate).isBefore(compareThis)) {
        yearsArray.push(moment(compareThis).toISOString());
      }
    }

    return yearsArray;
  }

  isBetweenTime(time1, time2, format) {
    const time = moment(new Date(), format);
    const beforeTime = moment(time1, format);
    const afterTime = moment(time2, format);
    return time.isBetween(beforeTime, afterTime);
  }
}

export default new DateUtils();
