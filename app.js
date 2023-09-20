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
let emailRules = {
    validMessage:'Valid email',
    rules:[
        {
            check: (value)=> value.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
            invalidMessage : "Invalid email"
        }
    ]
}
emailInput.addEventListener('change',(event)=>{
    reportValidity(emailInput, emailInputInfo, emailRules);
})
let countryRules = {
    validMessage:'Valid country',
    rules:[
        {
            check: (value)=> value.match(/^[a-zA-Z]{2,}$/),
            invalidMessage : "Invalid Country name"
        }
    ]
}
countryInput.addEventListener('change',(event)=>{
    reportValidity(countryInput, countryInputInfo,countryRules);
})
let zipCodeRules = {
    validMessage:'Valid zip code',
    rules:[
        {
            check: (value)=> value.match(/[0-9]{5}(?:-[0-9]{4})?$/),
            invalidMessage : "Invalid zip code"
        }
    ]
}
zipCodeInput.addEventListener('change',(event)=>{
    reportValidity(zipCodeInput, zipCodeInputInfo,zipCodeRules);
})
let passwordRules = {
    validMessage:'Valid password',
    rules:[
        {
            check: (value)=> value.length > 4,
            invalidMessage : "Password too short"
        },
        {
            check: (value)=> value.match(/\d/),
            invalidMessage : "Password must contain a number"
        },
        {
            check: (value)=> value.match(/banana/),
            invalidMessage : "Password must contain 'banana'"
        },
        {
            check: (value)=> {
                let passwordMatch = passwordInput.value === passwordConfirmationInput.value;
                let isEmpty = passwordInput.value === '' || passwordConfirmationInput.value === '';
                return isEmpty? true: passwordMatch;
            },
            invalidMessage : "Passwords don't match"
        }
    ]
}
passwordInput.addEventListener('change',(event)=>{
    reportValidity(passwordInput, passwordInputInfo,passwordRules);
    if(passwordConfirmationInput.value !== ''){
        reportValidity(passwordConfirmationInput, passwordConfirmationInputInfo, passwordRules);
    }
})
passwordConfirmationInput.addEventListener('change',(event)=>{
    reportValidity(passwordConfirmationInput, passwordConfirmationInputInfo, passwordRules);
    if(passwordInput.value !== ''){
        reportValidity(passwordInput, passwordInputInfo,passwordRules);
    }
})
const reportValidity = (input, inputInfo, rules)=>{
    let valid = true;
    let message = rules.validMessage;
    for (let i = 0; i < rules.rules.length; i++) {
        valid = rules.rules[i].check(input.value);
        if(!valid){
            message = rules.rules[i].invalidMessage;
            break;
        }
    }
    displayValidity(input, inputInfo, message, valid)

}
const displayValidity = (input, inputInfo, message, isValid)=>{
    if(isValid){
        input.classList.add('valid');
        input.classList.remove('invalid');
        inputInfo.classList.remove('invalid-info');
        inputInfo.classList.add('valid-info');
    }else{
        input.classList.add('invalid');
        input.classList.remove('valid');
        inputInfo.classList.add('invalid-info');
        inputInfo.classList.remove('valid-info');
    }
    inputInfo.innerText = message;
}