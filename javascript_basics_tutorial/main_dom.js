// The window object is the parent object of the browser
// console.log(window);

// alert is actually part of the window object
// So this is equivalent
// alert(1);
// window.alert(1);

// But since window is the highest level, we don't need to put window in front

// SINGLE ELEMENT
// document is what we want to use to select stuff
// See class in the html document
console.log(document.getElementById('my-form'));

// It's also possible to assign this to a variable
// const form = document.getElementById('my-form');

console.log(document.querySelector('.container'));

// Single element selector; only selects first even though there are several ones
console.log(document.querySelector('h1'));

// Multiple element
// Gives us a NodeList
console.log(document.querySelectorAll('.item'));

// We don't need the dot here (indicator of a class) because it's gonna be a class
// no matter what.
// These two give an HTMLCollection
console.log(document.getElementsByClassName('item'));
console.log(document.getElementsByTagName('li'));

// Loop through all items
const items = document.querySelectorAll('.item');

items.forEach((item) => console.log(item));

// Manipulating the DOM
// When he says DOM in the course, he means the user interface
const ul = document.querySelector('.items');

// Remove stuff
// ul.remove();

// Remove last item
// ul.lastElementChild.remove();

// Manipulate
// What is the difference here?
// ul.firstElementChild.textContent = 'Hello';
// ul.children[1].innerText = 'Brad';

// Add HTML dynamically
// ul.lastElementChild.innerHTML = '<h1>Brad</h1>';

// Does not work!
// ul.lastElementChild.innerText = '<h1>Brad</h1>';

// const btn = document.querySelector('.btn');
// btn.style.background = 'red';

// The arrow function takes in an event (e) here (the click)
/* btn.addEventListener('click', (e) => {
    // Flashes really fast.
    // We have to prevent the default behaviour of the button (submitting a form)
    // for the console log to stay on.
    e.preventDefault(); // use the event here
    console.log('click');
}); */

/* // Take a look at the event
btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e);
    // We can also do
    // console.log(e.target.className);

    // Here, the target gives us the element that the event is on.
}); */


/* btn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#my-form').style.background = '#ccc';
    // We use the bg-dark class from the .css
    document.querySelector('body').classList.add('bg-dark');
    document.querySelector('.items').lastElementChild.innerHTML = '<h1>Hello</h1>';
}); */

// Also cool: mouseover or mouseleave
/* btn.addEventListener('mouseleave', (e) => {
    e.preventDefault();
    document.querySelector('#my-form').style.background = '#ccc';
    // We use the bg-dark class from the .css
    document.querySelector('body').classList.add('bg-dark');
    document.querySelector('.items').lastElementChild.innerHTML = '<h1>Hello</h1>';
}); */

const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    
    // Message if user does not fill out all fields
    if(nameInput.value === '' || emailInput.value === '') {
        // We have the msg class in the html document
        // Take style from css
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        // Make it disappear after 3 sec
        // No paremters of the function (empty parentheses)
        // Second parameter ist time in ms
        // (read up on this?)
        setTimeout(() => msg.remove(), 3000);
    } else {
        // We can create elements out of nowhere and put them into the DOM
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));

        // This doesn't do anything yet: we need to append it to the user list
        userList.appendChild(li);

        // Users are not getting saved anywhere; you need a backend and database for this.

        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
    }
}
