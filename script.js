let timer; 
let isRunning = false;
let startTime;
let lapTimes = [];

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1] : 0);
        timer = setInterval(updateDisplay, 10);
        document.getElementById('startStop').textContent = 'Pause';
    } else {
        clearInterval(timer);
        document.getElementById('startStop').textContent = 'Start';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStop').textContent = 'Start';
    isRunning = false;
    lapTimes = [];
    document.getElementById('lapList').innerHTML = '';
}

function updateDisplay() {
    let elapsedTime = Date.now() - startTime;
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    document.getElementById('display').textContent = 
        pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + ':' + pad(milliseconds);
}

function lap() {
    if (isRunning) {
        let elapsedTime = Date.now() - startTime;
        lapTimes.push(elapsedTime);
        let lapList = document.getElementById('lapList');
        let lapItem = document.createElement('li');
        lapItem.textContent = lapTimes.length + '. ' + formatTime(elapsedTime);
        lapList.appendChild(lapItem);
    }
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function formatTime(time) {
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);
    return pad(minutes) + ':' + pad(seconds) + ':' + pad(milliseconds);
}
