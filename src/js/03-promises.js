import Notiflix from 'notiflix';

const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name=step]');
const amountEl = document.querySelector('input[name=amount]');
const buttonEl = document.querySelector('button[type=submit]');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`Rejected promise ${position} in ${delay}ms`);
    }
  });
};

const showPromise = (count, delay, time, current = 1) => {
  if (current - 1 >= count) return;
  createPromise(current, time)
    .then(success => Notiflix.Notify.success(success))
    .catch(error => Notiflix.Notify.failure(error));
  time += +delay;
  setTimeout(() => showPromise(count, delay, time, current + 1), delay);
};

buttonEl.addEventListener('click', event => {
  event.preventDefault();
  setTimeout(() => showPromise(amountEl.value, stepEl.value, +delayEl.value), delayEl.value);
});
