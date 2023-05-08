const form = document.querySelector('form');
const fullName = document.querySelector('#name');
const fullNameError = document.querySelector('#nameError');
const email = document.querySelector('#email');
const emailError = document.querySelector('#emailError');
const subject = document.querySelector('#subject');
const subjectError = document.querySelector('#subjectError');
const message = document.querySelector('#message');
const messageError = document.querySelector('#messageError');

function validateForm(event) {
    event.preventDefault();

    if (checkLength(fullName.value, 1) === true) {
        fullNameError.style.display = 'none';
    } else {
        fullNameError.style.display = 'block';
    }
    if (checkLength(subject.value, 14) === true) {
        subjectError.style.display = 'none';
    } else {
        subjectError.style.display = 'block';
    }
    if (checkLength(message.value, 24) === true) {
        messageError.style.display = 'none';
    } else {
        messageError.style.display = 'block';
    }
    if (validateEmail(email.value)) {
        emailError.style.display = 'none';
    } else {
        emailError.style.display = 'block';
    }
}

form.addEventListener('submit', validateForm);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}