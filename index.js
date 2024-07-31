const circularProgressBar = document.querySelector("#circularProgressBar");
const circularProgressBarNumber = document.querySelector("#circularProgressBar .progress-value");
const buttonTypePomodoro = document.getElementById('buttonTypePomodoro');
const buttonTypeShortBreak = document.querySelector('.buttonTypeShortBreak');
const buttonTypeLongBreak = document.querySelector('.buttonTypeLongBreak');
const audio = new Audio('alarm.mp3');

const pomodoroTimerInSeconds = 1500; 
const shortBreakTimerInSeconds = 300;
const longBreakTimerInSeconds = 600; 
const TIMER_TYPE_POMODORO = 'POMODORO';
const TIMER_TYPE_SHORT_BREAK = 'SHORTBREAK';
const TIMER_TYPE_LONG_BREAK = 'LONGBREAK';

let progressInterval;
let pomodoroType = TIMER_TYPE_POMODORO;
let timerValue = pomodoroTimerInSeconds;
let multiplierFactor = 360 / timerValue;

function formatNumberInStringMinute(number) {
    const minutes = Math.trunc(number / 60).toString().padStart(2, '0');
    const seconds = Math.trunc(number % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

const startTimer = () => {
    progressInterval = setInterval(() => {
        timerValue--;
        setInfoCircularProgressBar();
    }, 1000);
};

const stopTimer = () => clearInterval(progressInterval);

const resetTimer = () => {
    clearInterval(progressInterval);
    switch (pomodoroType) {
        case TIMER_TYPE_POMODORO:
            timerValue = pomodoroTimerInSeconds;
            break;
        case TIMER_TYPE_SHORT_BREAK:
            timerValue = shortBreakTimerInSeconds;
            break;
        case TIMER_TYPE_LONG_BREAK:
            timerValue = longBreakTimerInSeconds;
            break;
    }
    multiplierFactor = 360 / timerValue;
    setInfoCircularProgressBar();
    audio.stop();
};

function setInfoCircularProgressBar() {
    if (timerValue === 0) {
        stopTimer();
        audio.play();
    }

    circularProgressBarNumber.textContent = `${formatNumberInStringMinute(timerValue)}`;
    circularProgressBar.style.background = `conic-gradient(var(--blue) ${timerValue * multiplierFactor}deg, var(--purple) 0deg)`;
}

const setPomodoroType = (type) => {
    pomodoroType = type;

    buttonTypePomodoro.classList.remove("active");
    buttonTypeShortBreak.classList.remove("active");
    buttonTypeLongBreak.classList.remove("active");

    switch (type) {
        case TIMER_TYPE_POMODORO:
            buttonTypePomodoro.classList.add("active");
            setPomodoroBackground();
            break;
        case TIMER_TYPE_SHORT_BREAK:
            buttonTypeShortBreak.classList.add("active");
            setShortBreakBackground();
            break;
        case TIMER_TYPE_LONG_BREAK:
            buttonTypeLongBreak.classList.add("active");
            setLongBreakBackground();
            break;
    }

    resetTimer();
};

// Funciones para cambiar el fondo
function setPomodoroBackground() {
    document.body.style.backgroundImage = "url('images/study.gif')";
}

function setShortBreakBackground() {
    document.body.style.backgroundImage = "url('images/break.gif')";
}

function setLongBreakBackground() {
    document.body.style.backgroundImage = "url('images/back.gif')";
}


buttonTypePomodoro.addEventListener('click', () => setPomodoroType(TIMER_TYPE_POMODORO));
buttonTypeShortBreak.addEventListener('click', () => setPomodoroType(TIMER_TYPE_SHORT_BREAK));
buttonTypeLongBreak.addEventListener('click', () => setPomodoroType(TIMER_TYPE_LONG_BREAK));

setPomodoroType(TIMER_TYPE_POMODORO);
