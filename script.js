const display = document.querySelector('.display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let laps = [];

// Update the stopwatch display
function updateDisplay() {
  const totalTime = elapsedTime + Date.now() - startTime;
  const milliseconds = Math.floor((totalTime / 10) % 100);
  const seconds = Math.floor((totalTime / 1000) % 60);
  const minutes = Math.floor((totalTime / (1000 * 60)) % 60);
  const hours = Math.floor(totalTime / (1000 * 60 * 60));

  display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

// Start the stopwatch
function start() {
  if (!isRunning) {
    startTime = Date.now();
    intervalId = setInterval(updateDisplay, 10);
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
}

// Stop the stopwatch
function stop() {
  if (isRunning) {
    clearInterval(intervalId);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

function reset() {
    stop(); // Stop the stopwatch if it's running
    startTime = Date.now(); // Reset start time to current time
    elapsedTime = 0; // Reset elapsed time to 0
    laps = []; // Clear laps array
    lapsList.innerHTML = ''; // Clear laps list
    updateDisplay(); // Update the display to show 00:00:00.000
  }
  
  
  

// Add a lap to the list
function addLap() {
  if (isRunning) {
    const lapTime = elapsedTime + Date.now() - startTime; // Capture current elapsed time for lap
    const lapMinutes = Math.floor((lapTime / (1000 * 60)) % 60);
    const lapSeconds = Math.floor((lapTime / 1000) % 60);
    const lapMilliseconds = Math.floor((lapTime / 10) % 100);
    const lapText = `Lap ${laps.length + 1}: ${lapMinutes.toString().padStart(2, '0')}:${lapSeconds.toString().padStart(2, '0')}.${lapMilliseconds.toString().padStart(3, '0')}`;
    laps.push(lapTime); // Add the captured lap time to the laps array
    const lapListItem = document.createElement('li');
    lapListItem.textContent = lapText;
    lapsList.appendChild(lapListItem);
  }
}

// Event listeners for button clicks
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);
