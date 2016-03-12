(function() {
  var timeoutid;

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

  function mryg() {
    var x = document.querySelector('#ss');
    if (x.innerHTML === ':') {
      x.innerHTML = ' ';
    } else {
      x.innerHTML = ':';
    }
  }

  function formatTest(number) {
    if (number < 10) {
      return '0' + number;
    } else {
      return number;
    }
  }

  function updateDigital(hour, min, sec) {
    document.querySelector('#hour').innerHTML = formatTest(hour);
    document.querySelector('#min').innerHTML = formatTest(min);
    document.querySelector('#sec').innerHTML = formatTest(sec);
    mryg();
  }

  function rotate(what, value) {
    what.style.webkitTransform = 'rotate(' + value + 'deg)';
    what.style.MozTransform = 'rotate(' + value + 'deg)';
    what.style.msTransform = 'rotate(' + value + 'deg)';
    what.style.OTransform = 'rotate(' + value + 'deg)';
    what.style.Transform = 'rotate(' + value + 'deg)';
  }

  function updateAnalog(hour, min, sec) {
    var psec = document.querySelector('#sekunda');
    sec = sec * 6;
    rotate(psec, sec);

    var phour = document.querySelector('#godzina');
    hour = 30 * (hour % 12) + min * 0.5;
    rotate(phour, hour);

    var pmin = document.querySelector('#minuta');
    min = min * 6;
    rotate(pmin, min);

  }

  function updateTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var wday = date.getDay();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    document.querySelector('#Data').innerHTML = day + '-' + month + '-' + year;
    document.querySelector('#Dzien').innerHTML = dayName(wday);

    if (document.querySelector('#format').value === '12') {
      hour = hour % 12;
    }

    updateDigital(hour, min, sec);
    updateAnalog(hour, min, sec);
    timeoutid = setTimeout(updateTime, 500);
  }

  function main() {
    document.querySelector('#whattype').value = 'analog';
    document.querySelector('#ifsek').addEventListener('change', ifsekHandler);
    document.querySelector('#whattype').addEventListener('change', typeHandler);
    document.querySelector('#format').addEventListener('change', formatHandler);
    document.querySelector('#getdatebutton').addEventListener('click', dateButton);
    document.querySelector('#gettime1button').addEventListener('click', timeButton1);
    document.querySelector('#gettime2button').addEventListener('click', timeButton2);
    updateTime();
  }

  function ifsekHandler() {
    pdsec = document.querySelector('#sec');
    if (this.checked === false) {
      pdsec.style = 'display: none';
    } else {
      pdsec.style = 'display: inline';
    }
  }


  function formatHandler() {
    clearTimeout(timeoutid);
    updateTime();
  }


  function typeHandler() {
    var cyfrowy = document.querySelector('#cyfrowy');
    var analogowy = document.querySelector('#analogowy');
    var ifsek = document.querySelector('#ifsekblock');
    var pformat = document.querySelector('#format');
    if (this.value === 'analog') {
      cyfrowy.style = 'display: none';
      ifsek.style = 'display: none';
      analogowy.style = 'display: inline-block';
      pformat.style = 'display: none';
    } else {
      cyfrowy.style = 'display: inline-block';
      analogowy.style = 'display: none';
      ifsek.style = 'display: inline-block';
      pformat.style = 'display: inline-block';
    }
  }

  function parseFormat(param) {
    var resulttable = [];
    var i;

    i = param.indexOf('h');
    if (i + 1) {
      resulttable[i] = 'h';
    }

    i = param.indexOf('m');
    if (i + 1) {
      resulttable[i] = 'm';
    }

    i = param.indexOf('s');
    if (i + 1) {
      resulttable[i] = 's';
    }

    i = param.indexOf('p');
    if (i + 1) {
      resulttable[i] = 'p';
    }
    return resulttable;
  }

  function getSeparator(param) {
    if (param.includes(':')) {
      return ':';
    }
    if (param.includes(';')) {
      return ';';
    }
    if (param.includes('.')) {
      return '.';
    }
    if (param.includes('/')) {
      return '/';
    }
    if (param.includes('|')) {
      return '|';
    }
    if (param.includes(' ')) {
      return ' ';
    }
    return '';
  }

  function getTime1(param) {
    var date = new Date();
    var hours = formatTest(date.getHours());
    var mins = formatTest(date.getMinutes());
    var secs = formatTest(date.getSeconds());
    var msecs = formatTest(date.getMilliseconds());

    if (param === '') {
      return date.getTime();
    } else {
      var format = parseFormat(param);
      if (format.length === 0) {
        return hours + ':' + mins + ':' + secs;
      } else {
        var separator = getSeparator(param);
        var result = '';
        for (var i = 0; i < format.length; i++) {
          switch (format[i]) {
            case 'h':
              result += hours + separator;
              break;
            case 'm':
              result += mins + separator;
              break;
            case 's':
              result += secs + separator;
              break;
            case 'p':
              result += msecs + separator;
              break;
            default:
              break;
          }
        }
        if (separator.length === 0) {
          return result;

        } else {
          return result.substr(0, result.length - 1);
        }
      }
    }
  }

  function getTime2(input) {
    var date = new Date();
    var hours = formatTest(date.getHours());
    var mins = formatTest(date.getMinutes());
    var secs = formatTest(date.getSeconds());
    var msecs = formatTest(date.getMilliseconds());
    if (input.length === 0) {
      return date.getTime();
    } else {
      var result = input.replace(/MM/g, mins);
      result = result.replace(/HH/g, hours);
      result = result.replace(/SS/g, hours);
      result = result.replace(/MS/g, msecs);
      return result;
    }
  }

  function timeButton1() {
    var pinput = document.querySelector('#gettime1').value;
    result = getTime1(pinput);
    document.querySelector('#gettime1result').innerHTML = result;
  }

  function timeButton2() {
    var pinput = document.querySelector('#gettime2').value;
    result = getTime2(pinput);
    document.querySelector('#gettime2result').innerHTML = result;
  }


  function dateButton() {
    var pinput = document.querySelector('#getdate').value;

    document.querySelector('#getdateresult').innerHTML = pinput;
  }

  document.addEventListener('DOMContentLoaded', main);

}());
