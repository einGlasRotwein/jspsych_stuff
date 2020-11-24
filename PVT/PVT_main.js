var timer_interval; // declare the variable in global scope, but leave it undefined so that you don't start the timer yet
var diff;

// FUNCTIONS
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
            diff = `<span style="color: rgb(104, 30, 30)">0</span><span style="color:  rgb(241, 26, 26)">${diff}</span>`;
        } else if (diff.length == 3) {
            diff = `<span style="color: rgb(104, 30, 30)">00</span><span style="color:  rgb(241, 26, 26)">${diff}</span>`;
        } else if (diff.length == 2) {
            diff = `<span style="color: rgb(104, 30, 30)">000</span><span style="color:  rgb(241, 26, 26)">${diff}</span>`;
        } else if (diff.length == 1) {
            diff = `<span style="color: rgb(104, 30, 30)">0000</span><span style="color:  rgb(241, 26, 26)">${diff}</span>`;
        }

        display = document.querySelector('#time');
        display.innerHTML = diff;

    };
    // we don't want to wait a full second before the timer starts
    minutes = timer();
}

// TRIALS
var start_screen = {
    type: 'html-keyboard-response',
    stimulus: 'So it begins.<p>' +
        'Press a button to continue.<p>' +
        'Press a button every time the clock appears.',
    data: { condition: 'start_screen' },
    on_finish: function() {
        disp = document.querySelector('.jspsych-display-element');
        disp.style.background = '#000000';
    }
}

// TO DO: Make fixation jitter
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<span class = "fixation">00000</span>',
    choices: jsPsych.NO_KEYS,
    trial_duration: jsPsych.timelineVariable('fixation_duration'),
    data: { condition: 'fixation' }
}

var stopwatch = {
    on_load: function () {
        startTimer();
    },
    type: 'html-keyboard-response',
    stimulus: '<div><span id="time" class="time">00000</span></div>',
    data: { condition: 'stopwatch' },
    trial_duration: 10000,
    on_finish: function (data) {
        /* diff and elapsed time are not completely aligned, so diff will stop
        at 99998 or something. So if the participants did not make a response,
        we set the display to 10000.*/
        if (data.rt === null) diff = '10000';

        data.diff = diff;
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

// Screen shown at the end of the experiment
var end_screen = {
    type: 'html-keyboard-response',
    stimulus: 'Great job, you can close this page now.',
    data: { condition: 'send_screen' },
    on_load: function () {
        disp = document.querySelector('.jspsych-display-element');
        disp.style.background = '#fff';
    }
}

// BUILD TIMELINE
var timeline = [];
timeline.push(start_screen)

// Set up jittered fixation durations in an array
var fixation_durations = [];

var durations = [800, 1600, 5000];

for (let i = 0; i < durations.length; i++) {
    fixation_durations.push({fixation_duration: durations[i]});
}

// Set up a procedure
var PVT_procedure = {
    timeline: [fixation, stopwatch, feedback],
    timeline_variables: fixation_durations
  }
timeline.push(PVT_procedure)

timeline.push(end_screen);

jsPsych.init({
    timeline: timeline,
    on_finish: function () {
        jsPsych.data.displayData();
    }
})