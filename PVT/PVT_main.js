var timer_interval; // declare the variable in global scope, but leave it undefined so that you don't start the timer yet
var minutes,
    seconds,
    milliseconds;

// Timer function copied from:
// https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
function startTimer() {
    var start = Date.now(),
        diff;

    // Interval in a variable so it can be reset
    timer_interval = setInterval(timer, 10); // now set the value of the timer_interval variable, which also starts the timer

    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = (((Date.now() - start) / 10) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 6000) | 0;
        seconds = ((diff / 100) % 60) | 0;
        milliseconds = (diff % 100) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

        display = document.querySelector('#time');
        display.innerHTML = minutes + ":" + seconds + ":" + milliseconds;

    };
    // we don't want to wait a full second before the timer starts
    minutes = timer();
}

var timeline = [];
var n_trials = 3;

var start_screen = {
    type: 'html-keyboard-response',
    stimulus: 'So it begins.<p>' +
        'Press a button to continue.<p>' +
        'Press a button every time the clock appears.',
    data: { condition: 'start_screen' }
}

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<span fontsize class = "fixation">00:00:00</span>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 800,
    data: { condition: 'fixation' }
}

var stopwatch = {
    on_load: function () {
        startTimer();
    },
    type: 'html-keyboard-response',
    stimulus: '<div><span id="time" class="time">00:00</span></div>',
    data: { condition: 'stopwatch' },
    on_finish: function (data) {
        data.minutes = minutes;
        data.seconds = seconds;
        data.milliseconds = milliseconds;
        console.log(minutes + ":" + seconds + ":" + milliseconds);
        clearInterval(timer_interval); // this should now work without producing an error because timer_interval was declared outside of a function
    }
}

timeline.push(start_screen)

for (var i = 0; i < n_trials; i++) {

    timeline.push(fixation)
    timeline.push(stopwatch)
}

jsPsych.init({
    timeline: timeline,
    on_finish: function () {
        jsPsych.data.displayData();
    }
})