//? Sign Up Inputs
let username = document.getElementById("name");
let emailUp = document.getElementById("emailUp");
let passUp = document.getElementById("passUp");
let rePass = document.getElementById("rePass");
//? Login Inputs
let emailIn = document.getElementById("emailIn");
let passIn = document.getElementById("passIn");
// ?Hints
let nameHint = document.getElementById("nameHint");
let emailHint = document.getElementById("emailHint");
let passHint = document.getElementById("passHint");
let rePassHint = document.getElementById("rePassHint");
// *
let singUpList = [];
let userInfo;
// !LocalStorage
if (localStorage.getItem("usersList")) {
  singUpList = JSON.parse(localStorage.getItem("usersList"));
  console.log(singUpList);
}
// !Sign Up
function signUp() {
  if (checkFill() && validateName() && validateEmail() && validatePass() && validateRePass()) {
    userInfo = {
      name: username.value,
      email: emailUp.value,
      pass: passUp.value,
    };
    singUpList.push(userInfo);
    localStorage.setItem("usersList", JSON.stringify(singUpList));
    clear();
    signInPage();
  }
}
document.getElementById("signUpBtn").addEventListener("click", signUp);
//!Login
function login() {
  for (let i = 0; i < singUpList.length; i++) {
    if ( emailIn.value == singUpList[i].email && passIn.value == singUpList[i].pass) {
      welcomePage(singUpList[i].name);
    } else if (emailIn.value != singUpList[i].email) {
      document.getElementById("loginHint").innerHTML =
        "Please Enter a Vaild Email";
      document
        .getElementById("loginHint")
        .classList.replace("d-none", "d-block");
    } else if (passIn.value != singUpList[i].pass) {
      document.getElementById("loginHint").innerHTML = "Wrong Password!";
      document
        .getElementById("loginHint")
        .classList.replace("d-none", "d-block");
    } else {
      document
        .getElementById("loginHint")
        .classList.replace("d-block", "d-none");
    }
  }
}
document.getElementById("loginBtn").addEventListener("click", login);
// !Welcome Page
function welcomePage(userName) {
  document.getElementById("welcomeText").innerHTML = "Welcome " + userName;
  document.querySelector(".logoutPage").classList.replace("d-none", "d-block");
  document.querySelector(".login").classList.replace("d-block", "d-none");
}
// !Logout
function logout() {
  document.querySelector(".login").classList.replace("d-none", "d-block");
  document.querySelector(".logoutPage").classList.replace("d-block", "d-none");
}
document.getElementById("logoutBtn").addEventListener("click", logout);
// !Sign in , Sign up pages
function signUpPage() {
  document.querySelector(".login").classList.replace("d-block", "d-none");
  document.querySelector(".signUp").classList.replace("d-none", "d-block");
}
function signInPage() {
  document.querySelector(".signUp").classList.replace("d-block", "d-none");
  document.querySelector(".login").classList.replace("d-none", "d-block");
  emailIn.value = userInfo.email;
  passIn.value = userInfo.pass;
}
document.getElementById("signInPage").addEventListener("click", signInPage);
document.getElementById("signUp").addEventListener("click", signUpPage);
// !Check Validation
// ?Check Name
function validateName() {
  var regex = /^[A-Za-z ]{3,}$/;
  if (!regex.test(username.value)) {
    document.getElementById("name").classList.add("is-invalid");
    nameHint.innerHTML = "Please Enter Vaild Name";
    nameHint.classList.replace("d-none", "d-block");
  } else {
    document.getElementById("name").classList.replace("is-invalid", "is-valid");
    nameHint.classList.replace("d-block", "d-none");
  }
  return regex.test(username.value);
}
username.addEventListener("input", validateName);
// ?Check Email
function validateEmail() {
  let regex = /^\w{3,}@[a-z]{4,}\.[a-z]{3,}$/;
  if (!regex.test(emailUp.value)) {
    emailUp.classList.add("is-invalid");
    emailHint.innerHTML = "Please Enter Vaild Email";
    emailHint.classList.replace("d-none", "d-block");
  } else {
    emailUp.classList.replace("is-invalid", "is-valid");
    emailHint.classList.replace("d-block", "d-none");
  }
  return regex.test(emailUp.value);
}
emailUp.addEventListener("keyup", validateEmail);
// ?Check Db-Email
function duplicatedEmail() {
  for (let i = 0; i < singUpList.length; i++) {
  if (emailUp.value==singUpList[i].email) {
    emailUp.classList.add("is-invalid");
    emailUp.classList.remove("is-valid");
    emailHint.innerHTML = "This Email is elready exits";
    emailHint.classList.replace("d-none", "d-block");
  }else if(emailUp.value!=singUpList[i].email && validateEmail()) {
    emailUp.classList.replace("is-invalid", "is-valid");
    emailHint.classList.replace("d-block", "d-none");
  }}
}
emailUp.addEventListener("keyup", duplicatedEmail);
//? Check Pass
function validatePass() {
  let regex = /^[A-Z][\w|$#!]{7,24}$/;
  if (!regex.test(passUp.value)) {
    passUp.classList.add("is-invalid");
    passHint.innerHTML =
      "Password Must Have 8 or more characters Start With Capital Letter";
    passHint.classList.replace("d-none", "d-block");
  } else {
    passUp.classList.replace("is-invalid", "is-valid");
    passHint.classList.replace("d-block", "d-none");
  }
  return regex.test(passUp.value);
}
passUp.addEventListener("input", validatePass);
//? Check Confirmed Pass
function validateRePass() {
  if (rePass.value != passUp.value) {
    rePass.classList.add("is-invalid");
    rePassHint.innerHTML = "The password you entered do not match.";
    rePassHint.classList.replace("d-none", "d-block");
    return false;
  } else if (rePass.value == passUp.value && validatePass()) {
    rePass.classList.add("is-valid");
    rePass.classList.remove("is-invalid");
    rePassHint.classList.replace("d-block", "d-none");
    return true;
  }
}
rePass.addEventListener("change", validateRePass);
// ?Check fill inputs
function checkFill() {
  if (
    username.value == "" ||
    emailUp.value == "" ||
    passUp.value == "" ||
    rePass.value == ""
  ) {
    document.getElementById("mainHint").innerHTML = "Please Fill All Inputs!";
    document.getElementById("mainHint").classList.replace("d-none", "d-block");
    return false;
  } else {
    document.getElementById("mainHint").classList.replace("d-block", "d-none");
    return true;
  }
}
//!Clear
function clear() {
  username.value = "";
  emailUp.value = "";
  passUp.value = "";
  rePass.value = "";
}
