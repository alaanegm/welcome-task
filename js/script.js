let form = document.querySelector("form");
let userName = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#cpassword1");
let LoginEmail = document.querySelector("#getemail");
let validateUserName=false;
let validateEmail=false;
let validatePassword=false;
let validateConfirm=false;

function fetchData(){
  let userNameValue = userName.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();
  let confirmPasswordValue = confirmPassword.value.trim();
  let dataForm={
    username:userNameValue,
    email:emailValue,
    password:passwordValue,
    password_confirmation:confirmPasswordValue }

    const sendData = async () => {
      try {
        const res = await  fetch("https://goldblv.com/api/hiring/tasks/register", {
          method: "POST",
          body: JSON.stringify(dataForm),
          headers: {
            Accept: 'application.json',
           'Content-Type': 'application/json'
          }
      })
      if (res.status >= 200 && res.status <= 299) {
        const jsonResponse = await res.json();
        console.log("test")
        console.log(jsonResponse);
      }
      else {
         console.log(res.status, res.statusText);
      }
      } catch (error) {
        if(error.message=="this username used"){
                 setErrorFor(username,error.message)
              }
             else  if(error.message=="this email used"){
                 setErrorFor(email,error.message)
              }
             else{
              console.log('Error:', error);
             }
      }
    };
sendData();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
   handleInput();
   
   if(validateUserName && validateEmail && validatePassword && validateConfirm){
     fetchData();
    //  window.location.href = 'login.html';
    console.log("ok")
   }
  else{
    console.log("error")
  }
})

function setErrorFor(input, message) {
  let formControl = input.parentElement;
  formControl.className = "input-container error";
  let small = formControl.querySelector("small");
  small.innerText = message;
  input===password? validatePassword=false:null;
  input===email? validateEmail=false:null;
  input===userName? validateUserName=false:null;
  input===confirmPassword? validateConfirm=false:null;
}

function setSuccessFor(input) {
  let formControl = input.parentElement;
  formControl.className = "input-container success";
  input===password? validatePassword=true:null;
  input===email? validateEmail=true:null;
  input===userName? validateUserName=true:null;
  input===confirmPassword? validateConfirm=true:null;
}

function isEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function handleInput() {

  let userNameValue = userName.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();
  let confirmPasswordValue = confirmPassword.value.trim();
  let lastCharacter=userNameValue.slice(-1)
  let firstCharacter=userNameValue.slice(0,1)

  //  Checking for username
  if (userNameValue === "") {
    setErrorFor(userName, "Username cannot be blank");
  }
  else if (userNameValue.length < 5 || userNameValue.length >15) {
    setErrorFor(userName, "Username length should be between 5 and 15");  
  }
  else if (/\d/.test(firstCharacter)) {
    setErrorFor(userName, "username  should be start by letter");
  }
  else if (/\d/.test(lastCharacter)) {
    setErrorFor(userName, "username  should be end by letter");
  }
  else {
    setSuccessFor(userName);
  }

  // Checking for email
  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
    
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
    
  } else {
    setSuccessFor(email);
    sessionStorage.setItem("email", emailValue);
   
  }
 
  // Checking for password  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/
  let regex= /^[a-zA-Z]+$/
  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be blank");
  } else if (passwordValue.length < 8 || passwordValue.length > 30) {
    setErrorFor(password, "Password length should be between 8 and 30");
  }
  else if (!regex.test(passwordValue)) {
    setErrorFor(password, "Password length should be only letters");
  } 
   else {
    setSuccessFor(password);
  }

  // Checking for confirm password
  if (confirmPasswordValue === "") {
    setErrorFor(confirmPassword, "Confirm Password cannot be blank");
    
  } else if (confirmPasswordValue !== passwordValue) {
    setErrorFor(confirmPassword, "Confirm password not matched with password");
   
  } else {
    setSuccessFor(confirmPassword);
  }

}

