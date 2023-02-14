'use strict';

var html = document.querySelector('html');
var formContact;

// Add a `js` class for any JavaScript-dependent CSS
// See https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
html.classList.add('js');

// Logic for About contact form
// if(html.id === 'about') {
//     formContact = document.querySelector('form[name="contact"]');
//     // formContact.addEventListener('input', debounce(handleFormInputActivity, 850));
//     formContact.addEventListener('submit', handleFormSubmission);
// }

// function handleFormSubmission(event) {
//     var targetElement = event.target;
//     event.preventDefault(); // STOP the default browser behavior
//     writeFormDataToLocalStorage(targetElement.name); // STORE all the form data
//     window.location.href = targetElement.action; // PROCEED to the URL referenced by the form action
// }

// Work on later for proper form submission
function handleFormInputActivity(event) {
    var targetElem;
    var item;


    targetElem = event.target;
}