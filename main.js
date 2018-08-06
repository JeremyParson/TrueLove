//This will be used to select a certain account
let indexNum;

//This will load the input from the url's Parameters
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  indexNum = vars;
  indexNum = parseInt(indexNum.index);
  console.log(vars);
  return vars;
}

//This will get the index number input from the previous page
indexNum = getUrlVars().index;
let data;
let dataSeed = getUrlVars().dataSeed; //create a data variable

console.log(indexNum);

AOS.init({
  duration: 1200,
})


fetch(`https://randomuser.me/api?seed=${dataSeed}&results=500`)
.then(function(response){
    return response.json();
})
.then(function(myjson){
    data = myjson;
    console.log(data);
}).then(function(){



//Create Info Variables
  let fullName = data.results[indexNum].name.title.toUpperCase() + "."
   + data.results[indexNum].name.first + " " + data.results[indexNum].name.last;

  let age = data.results[indexNum].dob.age;
  let dob = data.results[indexNum].dob.date;
  let dateInfo = age + " | " + dob;

  let userLocation = data.results[indexNum].location.street + data.results[indexNum].location.city + 
  data.results[indexNum].location.state;

  let accountInfo = data.results[indexNum].email + data.results[indexNum].login.username + 
  data.results[indexNum].login.password;

  let accountAge = data.results[indexNum].registered.age;
  let registrationDate = data.results[indexNum].registered.date;
//Used yo replace password characters with periods for security reasons
  //Display Info on page
  document.getElementById("account-image").src = data.results[indexNum].picture.large;
  document.getElementById("name").innerText = fullName;
  document.getElementById("gender").innerHTML = data.results[indexNum].gender;
  document.getElementById("Email").innerHTML = data.results[indexNum].email;
  document.getElementById("dob").innerHTML = dateInfo;
  document.getElementById("Username").innerHTML = data.results[indexNum].login.username;
  document.getElementById("Password").innerHTML = hidePassword(data.results[indexNum].login.password);
  document.getElementById("acount-age").innerHTML = accountAge;
  document.getElementById("registration-date").innerHTML = registrationDate;

  //Set up all event listeners
  //This call the callback function and will create a form
  let changeInfo = document.getElementById("Change-account-info");
  changeInfo.addEventListener('click',function(){
  
    let targetDiv = document.getElementById("info-change");

    targetDiv.className = "zoom-out";
    targetDiv.style.display = "flex";
    targetDiv.style.flexDirection = "column";
    targetDiv.style.alignItems = "center";


    let newForm = document.createElement('form');
    newForm.id = "account-info-form";

    let emailText = document.createElement('input');
    emailText.id = "email-input";
    emailText.type = "text";
    emailText.style.display = "block";
    emailText.placeholder = "Email";

    let Username = document.createElement('input');
    Username.id = "username-input";
    Username.type = "text";
    Username.style.display = "block";
    Username.placeholder = "Username";

    let Password = document.createElement('input');
    Password.id = "password-input";
    Password.type = "text";
    Password.style.display = "block";
    Password.placeholder = "Password";

    let submitButton = document.createElement('button');
    submitButton.appendChild(document.createTextNode('Submit'));
    submitButton.addEventListener('click', submit);

    newForm.appendChild(emailText);newForm.appendChild(Username);newForm.appendChild(Password);newForm.appendChild(submitButton);

    targetDiv.appendChild(newForm);

  //This will change the user info

  function submit(event){
    event.preventDefault();
    let emailInput = document.getElementById("email-input");
    let usernameInput = document.getElementById("username-input");
    let passwordInput =document.getElementById("password-input");

    if(document.getElementById("account-info-form") != null){
    document.getElementById("account-info-form").remove();
    
    if(emailInput.value != ""){
      document.getElementById("Email").innerHTML = emailInput.value;
    }

    if(usernameInput.value != ""){
      document.getElementById("Username").innerHTML = usernameInput.value;
    }

    if(passwordInput.value != ""){
      document.getElementById("Password").innerHTML = hidePassword(passwordInput.value);
    }

  }
}})
});

function returnSeed(){
  return dataSeed;
}

function hidePassword(password){
  let hiddenPass = "";
for(let i in password){
    hiddenPass += "."
}
return hiddenPass;
}

function filterData(){
  alert('FILTER!');
}