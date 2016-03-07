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

document.querySelector('#ifsek').addEventListener('change', ifsekHandler);

function formatHandler() {
  clearTimeout(timeoutid);
  updateTime();
}

document.querySelector('#format').addEventListener('change', formatHandler);

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

document.querySelector('#whattype').addEventListener('change', typeHandler);

window.onload = main;
