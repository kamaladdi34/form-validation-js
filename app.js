const emailInput = document.querySelector('input#email');
const emailInputInfo = document.querySelector('input#email + span');
const countryInput = document.querySelector('input#country');
const countryInputInfo = document.querySelector('input#country + span');
const zipCodeInput = document.querySelector('input#zip-code');
const zipCodeInputInfo = document.querySelector('input#zip-code + span');
const passwordInput = document.querySelector('input#password');
const passwordInputInfo = document.querySelector('input#password + span');
const passwordConfirmationInput = document.querySelector('input#password-confirmation');
const passwordConfirmationInputInfo = document.querySelector('input#password-confirmation + span');
emailInput.addEventListener('change',(event)=>{
    reportValidity(emailInput, emailInputInfo,'Valid email address', 'Invalid email address');
})
countryInput.addEventListener('change',(event)=>{
    reportValidity(countryInput, countryInputInfo,'Valid country', 'Invalid country');
})
zipCodeInput.addEventListener('change',(event)=>{
    reportValidity(zipCodeInput, zipCodeInputInfo,'Valid zip code', 'Invalid zip code');
})
passwordInput.addEventListener('change',(event)=>{
    reportValidity(passwordInput, passwordInputInfo,'Valid password', 'Invalid password');
})
passwordConfirmationInput.addEventListener('change',(event)=>{
    reportValidity(passwordConfirmationInput, passwordConfirmationInputInfo,'Valid password', 'Invalid password');
})
const reportValidity = (input, inputInfo, validMessage, invalidMessage)=>{
    if(input.checkValidity()){
        input.classList.add('valid');
        input.classList.remove('invalid');
        inputInfo.innerText = validMessage;
        inputInfo.classList.remove('invalid-info');``
        inputInfo.classList.add('valid-info');
    }else{
        input.classList.add('invalid');
        input.classList.remove('valid');
        inputInfo.innerText = invalidMessage;
        inputInfo.classList.add('invalid-info');
        inputInfo.classList.remove('valid-info');
    }
}