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

    writeFormDataToLocalStorage(targetElement.form.name, targetElement);
}

function handleFormSubmission(event) {
    var targetElement = event.target;
    event.preventDefault(); // STOP the default browser behavior
    writeFormDataToLocalStorage(targetElement.name); // STORE all the form data
    window.top.location.href= "mailto:info@honeycogames.com";
}

/* Core Functions */

function writeFormDataToLocalStorage(formName, inputElement) {
    var formData = findOrCreateLocalStorageObject(formName);
    var formElements;
    var i;
    // Set just a single input value
    if (inputElement) {
      formData[inputElement.name] = inputElement.value;
    } else {
      // Set all form input values, e.g., on a submit event
      formElements = document.forms[formName].elements;
      for (i = 0; i < formElements.length; i++) {
        // Don't store empty elements, like the submit button
        if (formElements[i].value !== "") {
          formData[formElements[i].name] = formElements[i].value;
        }
      }
    }
  
    // Write the formData JS object to localStorage as JSON
    writeJsonToLocalStorage(formName, formData);
  }
  
  function findOrCreateLocalStorageObject(keyName) {
    var jsObject = readJsonFromLocalStorage(keyName);
  
    if (Object.keys(jsObject).length === 0) {
      writeJsonToLocalStorage(keyName, jsObject);
    }
  
    return jsObject;
  }
  
  function readJsonFromLocalStorage(keyName) {
    var jsonObject = localStorage.getItem(keyName);
    var jsObject = {};
  
    if (jsonObject) {
      try {
        jsObject = JSON.parse(jsonObject);
      } catch(e) {
        console.error(e);
        jsObject = {};
      }
    }
  
    return jsObject;
  }
  
  function writeJsonToLocalStorage(keyName, jsObject) {
    localStorage.setItem(keyName, JSON.stringify(jsObject));
  }
  
  function restoreFormDataFromLocalStorage(formName) {
    var jsObject = readJsonFromLocalStorage(formName);
    var formValues = Object.entries(jsObject);
    var formElements;
    var i;
  
    if (formValues.length === 0) {
      return; // nothing to restore
    }
  
    formElements = document.forms[formName].elements;
  
    for (i = 0; i < formValues.length; i++) {
      console.log('Form input key:', formValues[i][0], 'Form input value:', formValues[i][1]);
      formElements[formValues[i][0]].value = formValues[i][1];
    }
  }

  /* Utility Functions */

function capitalizeFirstLetter(string) {
    var firstLetter = string[0].toUpperCase();
    return firstLetter + string.substring(1);
  }
  
  // debounce to not execute until after an action has stopped (delay)
  function debounce(callback, delay) {
    var timer; // function-scope timer to debounce()
    return function() {
      var context = this; // track function-calling context
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
      var args = arguments; // hold onto arguments object
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
  
      // Reset the timer
      clearTimeout(timer);
  
      // Set the new timer
      timer = setTimeout(function() {
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
        callback.apply(context, args);
      }, delay);
    };
}