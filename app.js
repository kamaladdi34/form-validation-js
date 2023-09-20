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
const formSubmitButton = document.querySelector('.sign-up-form > button');
const popUp = document.querySelector('.pop-up');
const popUpTitle = document.querySelector('.pop-up .pop-up-title');
const popUpMessage = document.querySelector('.pop-up .pop-up-message');
const popUpCloseButton = document.querySelector('.pop-up .close');
popUpCloseButton.addEventListener('click',()=>{
    popUp.classList.add('hidden');
})
formSubmitButton.addEventListener('click',(event)=>{
    event.preventDefault();
    let result = checkFormValidity();
    popUp.classList.remove('hidden');
    popUpTitle.innerText = result.isValid? '😲 You signed up!':'🤓☝️ You missed something!';
    popUpMessage.innerText = result.message;
})
let emailRules = {
    validMessage:'Valid email',
    rules:[
        {
            check: (value)=> value.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
            invalidMessage : "Invalid email"
        },
        {
            check: (value)=> value.match(/burger/),
            invalidMessage : "Email must contain 'burger' 🍔"
        },
        {
            check: (value)=> value.match(/\.TOP$/),
            invalidMessage : "Email must end with '.TOP'"
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
            invalidMessage : "Password must contain 'banana' 🍌"
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
const formInputs = [
    {
        input: emailInput,
        rules: emailRules
    },
    {
        input: countryInput,
        rules: countryRules
    },
    {
        input: zipCodeInput,
        rules: zipCodeRules
    },
    {
        input: passwordInput,
        rules: passwordRules
    },
    {
        input: passwordConfirmationInput,
        rules: passwordRules
    }
]
const checkValidity = (input, rules) =>{
    let valid = true;
    let message = rules.validMessage;
    for (let i = 0; i < rules.rules.length; i++) {
        valid = rules.rules[i].check(input.value);
        if(!valid){
            message = rules.rules[i].invalidMessage;
            break;
        }
    }
    return {isValid: valid, message: message};
}
const reportValidity = (input, inputInfo, rules)=>{
    let result = checkValidity(input, rules);
    displayValidity(input, inputInfo, result.message, result.isValid)

}
const displayValidity = (input, inputInfo, message, isValid)=>{
    if(isValid){
        input.classList.add('valid');
        input.classList.remove('invalid');
        input.setCustomValidity('');
        inputInfo.classList.remove('invalid-info');
        inputInfo.classList.add('valid-info');
    }else{
        input.classList.add('invalid');
        input.classList.remove('valid');
        input.setCustomValidity(message);
        inputInfo.classList.add('invalid-info');
        inputInfo.classList.remove('valid-info');
    }
    inputInfo.innerText = message;
}
const checkFormValidity = ()=>{
    let valid = true;
    let message = '🎉 All your informations is correct!'
    for (let i = 0; i < formInputs.length; i++) {
        let result = checkValidity(formInputs[i].input, formInputs[i].rules);
        if(!result.isValid){
            message = result.message;
            valid = false;
            break;
        }
    }
    return {isValid: valid, message: message};
}