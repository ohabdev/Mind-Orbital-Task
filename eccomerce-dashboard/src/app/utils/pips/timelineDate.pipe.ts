import { Pipe, PipeTransform } from '@angular/core';

/*
 * format price with user currency
*/
@Pipe({
  name: 'timelineDate'
})
export class TimelineDatePipe implements PipeTransform {

  transform(timelineDate: string): any {
    const MONTH_NAMES = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];


    function getFormattedDate(date, prefomattedDate: boolean | string = false, hideYear = false) {
      const day = date.getDate();
      const month = MONTH_NAMES[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours();
      let minutes = date.getMinutes();

      if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${ minutes }`;
      }

      if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${ prefomattedDate } at ${ date.toLocaleTimeString() }`;
      }

      if (hideYear) {
        // 10. January at 10:20
        return `${ day }. ${ month } at ${ date.toLocaleTimeString() }`;
      }

      // 10. January 2017. at 10:20
      return `${ day }. ${ month } ${ year }. at ${ date.toLocaleTimeString() }`;
    }


    // --- Main function
    function timeAgo(dateParam) {
      if (!dateParam) {
        return null;
      }

      const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
      const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
      const today = new Date();
      // @ts-ignore
      const yesterday = new Date(today - DAY_IN_MS);
      // @ts-ignore
      const seconds = Math.round((today - date) / 1000);
      const minutes = Math.round(seconds / 60);
      const isToday = today.toDateString() === date.toDateString();
      const isYesterday = yesterday.toDateString() === date.toDateString();
      const isThisYear = today.getFullYear() === date.getFullYear();


      if (seconds < 5) {
        return 'now';
      } else if (seconds < 60) {
        return `${ seconds } seconds ago`;
      } else if (seconds < 90) {
        return 'about a minute ago';
      } else if (minutes < 60) {
        return `${ minutes } minutes ago`;
      } else if (isToday) {
        return getFormattedDate(date, 'Today'); // Today at 10:20
      } else if (isYesterday) {
        return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
      } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
      }

      return getFormattedDate(date); // 10. January 2017. at 10:20
    }
    return timeAgo(new Date(timelineDate));
  }
}
