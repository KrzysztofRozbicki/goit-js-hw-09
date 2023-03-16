import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

//Adding the HTML document elements to javascript
const dataInputEl = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const pauseButton = document.querySelector('[data-pause]');
const resetButton = document.querySelector('[data-reset]');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');

//Add null variable to declare and clear Intervals.
let countDown = null;

//Variables to store and update milliseconds Left and object to store those milliseconds as human friendly date
let pickedDate = 0;
let millisecondsLeft = 0;
let timeLeft = {};

startButton.disabled = true;
pauseButton.disabled = true;
resetButton.disabled = true;

//Function that convert Milisecond from .getTime() to date in days hours minutes and seconds
const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

//Add 0 to the beginning of string if timenumber < 9
const addLeadingZero = value => {
  if (value < 10) return value.toString().padStart(2, '0');
  return value;
};

//Function that is going to be activated only once when the counter goes to 0
const endCountdown = () => {
  clearInterval(countDown);
  daysLeft.textContent = '00';
  hoursLeft.textContent = '00';
  minutesLeft.textContent = '00';
  secondsLeft.textContent = '00';
};

//Function that updates Time Left (-1 second every time) and putting it to the HTML textContent
const updateTimeLeft = () => {
  timeLeft = convertMs(millisecondsLeft);
  daysLeft.textContent = addLeadingZero(timeLeft.days);
  hoursLeft.textContent = addLeadingZero(timeLeft.hours);
  minutesLeft.textContent = addLeadingZero(timeLeft.minutes);
  secondsLeft.textContent = addLeadingZero(timeLeft.seconds);
  millisecondsLeft -= 1000;
  if (millisecondsLeft < 0) {
    endCountdown();
    Notiflix.Report.success('Countdown ended!', 'The time has come!', 'Thank you!');
  }
};

//FlatPickr options that declares how the date picker should look and behave.
const options = {
  enableTime: true,
  time_24hr: true,
  //minDate: new Date(),   <- Disabling every date in the past - User cannot chose it.
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedDate = selectedDates[0].getTime();
    if (millisecondsLeft < 0)
      return Notiflix.Report.failure(
        'Please choose a date in the future',
        '',
        'OK will do captain!'
      );
    startButton.disabled = false;
  },
};

flatpickr(dataInputEl, options);
startButton.addEventListener('click', () => {
  millisecondsLeft = pickedDate - new Date().getTime();
  clearInterval(countDown);
  countDown = setInterval(() => updateTimeLeft(), 1000);
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
});

pauseButton.addEventListener('click', () => {
  clearInterval(countDown);
  Notiflix.Notify.warning('Countdown paused');
  startButton.disabled = false;
  pauseButton.disabled = true;
});

resetButton.addEventListener('click', () => {
  pauseButton.disabled = true;
  resetButton.disabled = true;
  clearInterval(countDown);
  endCountdown();
  Notiflix.Notify.warning('Countdown reseted');
});
