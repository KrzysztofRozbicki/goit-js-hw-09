const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let changeColor = null;

document.getElementById

const getRandomHexColor = () =>
  (document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  changeColor = setInterval(() => getRandomHexColor(), 1000);
});
stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(changeColor);
});
