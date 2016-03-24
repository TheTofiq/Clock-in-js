(function() {
  var showColon = true;
  var ui = {
    hour: document.querySelector('#hour'),
    min: document.querySelector('#min'),
    sec: document.querySelector('#sec'),
    asec: document.querySelector('#sekunda'),
    ahour: document.querySelector('#godzina'),
    amin: document.querySelector('#minuta'),
    ctype: document.querySelector('#whattype'),
    showsec: document.querySelector('#ifsek'),
    format: document.querySelector('#format'),
    getdateb: document.querySelector('#getdatebutton'),
    gettimeb: document.querySelector('#gettimebutton'),
    ss: document.querySelector('#ss'),
    ddata: document.querySelector('#Data'),
    dzien: document.querySelector('#Dzien'),
    cyfrowy: document.querySelector('#cyfrowy'),
    analogowy: document.querySelector('#analogowy'),
    ifsek: document.querySelector('#ifsekblock'),
    pformat: document.querySelector('#format'),
    tresult: document.querySelector('#timeresult'),
    tinput: document.querySelector('#timeinput')
  };

  function dayName(daynumber) {
    switch (daynumber) {
      case 1:
        return 'Poniedziałek';
      case 2:
        return 'Wtorek';
      case 3:
        return 'Środa';
      case 4:
        return 'Czwartek';
      case 5:
        return 'Piątek';
      case 6:
        return 'Sobota';
      case 0:
        return 'Niedziela';
      default:
        return ' ';
    }
  }

  function getTimeObject() {
    var date = new Date();
    var time = {
      hours: date.getHours(),
      mins: date.getMinutes(),
      secs: date.getSeconds(),
      msecs: date.getMilliseconds(),
      since: date.getTime(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      day: date.getDate(),
      wday: date.getDay()
    };
    return time;
  }

  function formatAmPm(uiobj, number) {
    if (uiobj.format.value === '12') {
      number = number - (number > 12 ? 12 : 0);
    }
    return number;
  }

  function updateAndDisplayTime() {
    var timeObj = getTimeObject();
    if (ui.ctype.value === 'analog') {
      updateAnalog(ui, formatAnalogData(timeObj.hours, timeObj.mins, timeObj.secs));
    } else {

      updateDigital(ui, makeTwoDigits(formatAmPm(ui, timeObj.hours)), makeTwoDigits(timeObj.mins), makeTwoDigits(timeObj.secs));
      showColon = mryg(ui.ss, showColon);
    }
    updateDate(ui, dayName(timeObj.wday), makeTwoDigits(timeObj.day), makeTwoDigits(timeObj.month), makeTwoDigits(timeObj.year));
    timeoutid = setTimeout(updateAndDisplayTime, 500);
  }

  function updateDigital(uiObj, hour, min, sec) {
    if (uiObj.hour.textContent !== hour) {
      uiObj.hour.textContent = hour;
    }
    if (uiObj.min.textContent !== min) {
      uiObj.min.textContent = min;
    }
    if (uiObj.sec.textContent !== sec) {
      uiObj.sec.textContent = sec;
    }
  }

  function mryg(item, colon) {
    item.style.opacity = colon ? 0.8 : 0.1;
    return !colon;
  }

  function updateDate(uiobj, wday, day, month, year) {
    var newtextdate = day + '-' + month + '-' + year;
    if (uiobj.dzien.textContent !== wday) {
      uiobj.dzien.textContent = wday;
    }
    if (uiobj.ddata.textContent !== newtextdate) {
      uiobj.ddata.textContent = newtextdate;
    }
  }

  function makeTwoDigits(number) {
    return (number < 10 ? '0' : '') + number;
  }

  function formatAnalogData(hour, min, sec) {
    sec = sec * 6;
    hour = 30 * (hour % 12) + min * 0.5;
    min = min * 6;
    return {
      sec: sec,
      hour: hour,
      min: min
    };
  }

  function updateAnalog(uiObj, time) {
    rotate(uiObj.asec, time.sec);
    rotate(uiObj.ahour, time.hour);
    rotate(uiObj.amin, time.min);
  }

  function rotate(what, value) {
    what.style.webkitTransform = 'rotate(' + value + 'deg)';
    what.style.MozTransform = 'rotate(' + value + 'deg)';
    what.style.msTransform = 'rotate(' + value + 'deg)';
    what.style.OTransform = 'rotate(' + value + 'deg)';
    what.style.Transform = 'rotate(' + value + 'deg)';
  }

  function ifsekHandler() {
    if (this.checked === false) {
      ui.sec.style = 'visibility: hidden';
    } else {
      ui.sec.style = 'visibility: visible';
    }
  }

  function typeHandler() {
    if (this.value === 'analog') {
      ui.cyfrowy.style = 'display: none';
      ui.ifsek.style = 'display: none';
      ui.analogowy.style = 'display: inline-block';
      ui.pformat.style = 'display: none';
    } else {
      ui.cyfrowy.style = 'display: inline-block';
      ui.analogowy.style = 'display: none';
      ui.ifsek.style = 'display: inline-block';
      ui.pformat.style = 'display: inline-block';
    }
  }

  function timeButtonHandler() {
    var time = getTimeObject();
    ui.tresult.textContent = stringToTime(ui.tinput.value, time);
  }

  function stringToTime(string, timeObj) {
    if (string.length === 0) {
      return timeObj.since;
    } else {
      return string
        .replace(/MM/g, makeTwoDigits(timeObj.mins))
        .replace(/HH/g, makeTwoDigits(timeObj.hours))
        .replace(/SS/g, makeTwoDigits(timeObj.secs))
        .replace(/MS/g, makeTwoDigits(timeObj.msecs))
        .replace(/YYYY/g, timeObj.year)
        .replace(/YY/g, timeObj.year.toString().substr(2, timeObj.year.toString().length))
        .replace(/MO/g, makeTwoDigits(timeObj.month))
        .replace(/DD/g, makeTwoDigits(timeObj.day))
        .replace(/WD/g, dayName(timeObj.wday));
    }
  }

  function main() {
    ui.ctype.value = 'analog';
    ui.showsec.addEventListener('change', ifsekHandler);
    ui.ctype.addEventListener('change', typeHandler);
    ui.gettimeb.addEventListener('click', timeButtonHandler);
    updateAndDisplayTime();
  }

  document.addEventListener('DOMContentLoaded', main);

}());
