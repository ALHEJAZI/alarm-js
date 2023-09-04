var setAlarmButton = document.getElementById('set-alarm');
var alarmTimeInput = document.getElementById('alarm-time');
var alarmStatus = document.getElementById('alarm-status');
var alarmSound = document.getElementById('alarm-sound');

var alarmInterval;

function setAlarm() {
    var currentTime = new Date();
    var alarmTime = new Date();
    var timeParts = alarmTimeInput.value.split(':');
    
    alarmTime.setHours(timeParts[0]);
    alarmTime.setMinutes(timeParts[1]);
    
    if (alarmTime > currentTime) {
      var timeDifference = alarmTime - currentTime;
      alarmInterval = setTimeout(playAlarm, timeDifference);
      alarmStatus.textContent = 'Alarm set for ' + alarmTime.toLocaleTimeString();
      alarmStatus.classList.add('success');
      alarmStatus.classList.remove('error');
    } else {
      alarmStatus.textContent = 'Invalid time. Please set a future time.';
      alarmStatus.classList.add('error');
      alarmStatus.classList.remove('success');
    }
  }
function playAlarm() {
    alarmSound.currentTime = 0;
    alarmSound.play().catch(function(error) {
      console.log('Error playing the alarm sound:', error);
    });;
  alarmStatus.textContent = 'Wake up!';
  alarmStatus.classList.add('success');
  alarmStatus.classList.remove('error');
}

function stopAlarm() {
  clearTimeout(alarmInterval);
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmStatus.textContent = '';
  alarmStatus.classList.remove('success', 'error');
}

setAlarmButton.addEventListener('click', setAlarm);
alarmSound.addEventListener('ended', stopAlarm);


var currentTimeDisplay = document.getElementById('current-time');

function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  var formattedTime =
    padZero(hours) + ':' +
    padZero(minutes) + ':' +
    padZero(seconds);

  currentTimeDisplay.textContent = formattedTime;
}

function padZero(num) {
  return (num < 10) ? '0' + num : num;
}

setInterval(updateTime, 1000);