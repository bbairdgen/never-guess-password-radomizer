// Assignment Code
var generateBtn = document.querySelector("#generate");

// Arrays used to pick password characters from
var lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var  uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var  numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
var  specialChara = ['!', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', "\\", "]", '^', '_', '{', '|', '}', '~'];

// This function defines the length of the password. It also forces the length to be strictly between 8-128.
function choosePasswordOptions() {
  // parseInt is used to change the user entry from a sting to an integer. 
  var passwordLength = parseInt(prompt("Enter a password length between 8 and 128"))
  //
  if (passwordLength < 8 || passwordLength > 128 || passwordLength === "") {
    alert("Please choose a number between 8-128. Click Generate Password again.");
   
  };

  //create true/false prompt boxes
  var includeLowercase = confirm("Would you like to use lowercase letters?");
  var includeUppercase = confirm("Would you like to use uppercase letters?");
  var includeNumbers = confirm("Would you like to use numbers?");
  var includeSpecial = confirm("Would you like to use special characters?");

// to assign properties
  var passwordOptions = {
    length: passwordLength, 
    includeLowercase: includeLowercase,
    includeUppercase: includeUppercase,
    includeNumbers: includeNumbers,
    includeSpecial: includeSpecial,
  };
  return passwordOptions;
}

function randomNumber(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  var randomElement = arr[randomIndex];
  return randomElement;
}

function generatePassword() {
  var options = choosePasswordOptions();
  var finalArray = [];
  var middleArray = [];
  var beginningArray = [];

  if (options.includeLowercase) {
    beginningArray = beginningArray.concat(lowercase);
    middleArray.push(randomNumber(lowercase));
  }
  if (options.includeUppercase) {
    beginningArray = beginningArray.concat(uppercase);
    middleArray.push(randomNumber(uppercase));
  }
  if (options.includeNumbers) {
    beginningArray = beginningArray.concat(numbers);
    middleArray.push(randomNumber(numbers));
  }
  if (options.includeSpecial) {
    beginningArray = beginningArray.concat(specialChara);
    middleArray.push(randomNumber(specialChara));
  }
  for (var i = 0; i < options.length; i++) {
    var possibleCharacters = randomNumber(beginningArray);
    finalArray.push(possibleCharacters);
    console.log(finalArray)
  }
  for (var i = 0; i < middleArray.length; i++) {
    finalArray[i] = middleArray[i];
    console.log(finalArray)
  }
  return finalArray.join("");
}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  
  passwordText.value = password;
}

// Add event listener to generate button. 
generateBtn.addEventListener("click", writePassword);
