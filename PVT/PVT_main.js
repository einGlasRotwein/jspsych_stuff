var timer_interval; // declare the variable in global scope, but leave it undefined so that you don't start the timer yet
var diff;

// Timer function 
function startTimer() {
    var start = Date.now();

    // Interval in a variable so it can be reset
    timer_interval = setInterval(timer, 1); // now set the value of the timer_interval variable, which also starts the timer

    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = (((Date.now() - start)) | 0);
        diff = String(diff);

        // add 00s if necessary
        if (diff.length == 4) {
            diff = '0' + diff;
        } else if (diff.length == 3) {
            diff = '00' + diff;
        } else if (diff.length == 2) {
            diff = '000' + diff;
        } else if (diff.length == 1) {
            diff = '0000' + diff;
        }

        display = document.querySelector('#time');
        display.innerHTML = diff;

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

// TO DO: Make fixation jitter
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<span fontsize class = "fixation">00000</span>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 800,
    data: { condition: 'fixation' }
}

var stopwatch = {
    on_load: function () {
        startTimer();
    },
    type: 'html-keyboard-response',
    stimulus: '<div><span id="time" class="time">00000</span></div>',
    data: { condition: 'stopwatch' },
    on_finish: function (data) {
        data.diff = diff;
        console.log(diff);
        clearInterval(timer_interval); // this should now work without producing an error because timer_interval was declared outside of a function
    }
}

// Leave the time when the stopwatch was stopped on the screen for a bit
var feedback = {
    type: 'html-keyboard-response',
    stimulus: function(){
        df = jsPsych.data.getLastTrialData().values()[0].diff;

        return(`<div><span class="feedback">${df}</span></div>`);
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    data: { condition: 'feedback' }
}

// TIMELINE
timeline.push(start_screen)

// TO DO: Have this as a routine?
for (var i = 0; i < n_trials; i++) {

    timeline.push(fixation);
    timeline.push(stopwatch);
    timeline.push(feedback);
}

jsPsych.init({
    timeline: timeline,
    on_finish: function () {
        jsPsych.data.displayData();
    }
})