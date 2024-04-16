const email = document.getElementById('email');
const pass = document.getElementById('pass');
const submitButton = document.getElementById('submit');
const form = document.getElementById('reg-form');
const emailAlert = document.getElementById('email-alert');
const passAlert = document.getElementById('pass-alert');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email.value);
    const isPasswordValid = validatePassword(pass.value);

    if (isEmailValid && isPasswordValid) {

        //Form submitted
        form.requestSubmit();

    } else {
        // Show email validation error if invalid
        emailAlert.style.display = isEmailValid ? 'none' : 'flex';

        // Show password validation error if invalid or empty
        passAlert.style.display = isPasswordValid ? 'none' : 'flex';
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== '' && emailRegex.test(email);
}

function validatePassword(password) {
    return password.trim() !== '' && password.trim().length > 8;
}
