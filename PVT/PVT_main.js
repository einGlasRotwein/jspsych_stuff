var timer_interval; // declare the variable in global scope, but leave it undefined so that you don't start the timer yet
// Timer function copied from:
// https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
function startTimer(duration) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;

    // Interval in a variable so it can be reset
    timer_interval = setInterval(timer, 1000); // now set the value of the timer_interval variable, which also starts the timer

    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display = document.querySelector('#time');
        display.innerHTML = minutes + ":" + seconds;

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    // setInterval(timer, 1000);
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
timeline.push(start_screen)

for (var i = 0; i < n_trials; i++) {
    var fixation = {
        type: 'html-keyboard-response',
        stimulus: '<span fontsize>+</span>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 800,
        data: { condition: 'fixation' }
    }
    timeline.push(fixation)

    var stopwatch = {
        on_load: function () {
            var fiveMinutes = 60 * 5
            startTimer(fiveMinutes);
        },
        type: 'html-keyboard-response',
        stimulus: '<div><span id="time">05:00</span></div>',
        data: { condition: 'stopwatch' },
        on_finish: function () {
            clearInterval(timer_interval); // this should now work without producing an error because timer_interval was declared outside of a function
        }
    }
    timeline.push(stopwatch)
}

jsPsych.init({
    timeline: timeline,
    on_finish: function () {
        jsPsych.data.displayData();
    }
})