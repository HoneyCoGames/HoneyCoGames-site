'use strict';

var html = document.querySelector('html');
var formContact;

// Add a `js` class for any JavaScript-dependent CSS
// See https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
html.classList.add('js');

if(html.id === 'about') {
    formContact = document.querySelector('form[name="contact"]');
    formContact.addEventListener('input', debounce(handleFormInputActivity, 850));
    formContact.addEventListener('change', handleFormInputActivity);
    formContact.addEventListener('submit', handleFormSubmission);
}

function handleFormInputActivity(event) {
    var inputElements = ['INPUT', 'TEXTAREA'];
    var targetElement = event.target;
    var targetType = targetElement.getAttribute('type');
    var errorText = capitalizeFirstLetter(targetElement.name);
    var submitButton = document.getElementById('submit');
    var errorClass = targetElement.name + '-error';
    var errorEl = document.querySelector('.' + errorClass);

    // Implicit 'else', care of the `return;` statement above...
    if(targetType === 'text' && targetElement.tagName === 'INPUT') {
        if (targetElement.value.length < 3) {
            // Don't add duplicate errors
            if (!errorEl) {
                errorText += ' must be at least 3 characters';
                errorEl = document.createElement('p');
                errorEl.className = errorClass;
                errorEl.innerText = errorText;
                targetElement.before(errorEl);
                submitButton.disabled = true;
            }
        } 
        else {
            if (errorEl) {
                errorEl.remove();
                submitButton.disabled = false;
            }
        }
    }

    if(targetType === 'email' || targetElement.tagName === 'TEXTAREA') {
        return; //this is not an element we care about particularly
    }
}

function handleFormSubmission(event) {
    var targetElement = event.target;
    event.preventDefault(); // STOP the default browser behavior
    writeFormDataToLocalStorage(targetElement.name); // STORE all the form data
    window.location.href = "mailto:info@honeycogames.com";
  }