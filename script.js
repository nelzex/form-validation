const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


var fields = [username,email,password,password2];
//Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success'; 
}

//Check if email is valid
function isValidEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
   

}

function checkLength(field, min, max){
    if(field.value.length < min){
        showError(field,`${getFieldName(field)} must be at least ${min} characters`);
    }
    else if (field.value.length > max){
        showError(field, `${getFieldName(field)} must be less than ${max} characters`);
    }

}

function getFieldName(field){
    return field.id.charAt(0).toUpperCase() + field.id.slice(1);
}

function checkFields(fields){
    fields.forEach(field => {

        if(field.value === ''){
            console.log(field);
            showError(field,`Please ${field.placeholder.toLowerCase()}`);

        }
        else if(field.id == 'email' && !isValidEmail(field.value)){
            showError(field,'Please enter a valid email address');
        }
        else{
            showSuccess(field);
        }
    })
}

function checkPasswordMatch(password,password2){
   if(password.value === password2.value){
       showSuccess(password);
       showSuccess(password2);
   }
   else{
       showError(password2,`Passwords do not match`);
   }
}

//Event Listeners
form.addEventListener('submit',function(e) {
    e.preventDefault();
    checkFields(fields);
    checkLength(username,3, 18);
    checkLength(password,6, 20);
    checkPasswordMatch(password,password2);
    
});


