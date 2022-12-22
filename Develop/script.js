// Assignment Code
var generateBtn = document.querySelector("#generate");

// Arrays used to pick password characters from
var lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
var specialChara = ['!', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', "\\", "]", '^', '_', '{', '|', '}', '~'];

// This function defines the length of the password. It also forces the length to be strictly between 8-128.
function choosePasswordOptions() {
  // parseInt is used to change the user entry from a sting to an integer. 
  var passwordLength = parseInt(prompt("Enter a password length between 8 and 128"))
  //designates the length of the password. returning to the function forces it to restrict the length.
  if (passwordLength < 8 || passwordLength > 128 || passwordLength === "") {
    alert("Please choose a number between 8-128.");
    choosePasswordOptions();
  };

  //create true/false prompt boxes. I can't find a way to change the OK and Cancel buttons to Yes and No.
  var includeLowercase = confirm("Would you like to use lowercase letters? Click 'OK' for Yes and 'Cancel' for No.");
  var includeUppercase = confirm("Would you like to use uppercase letters? Click 'OK' for Yes and 'Cancel' for No.");
  var includeNumbers = confirm("Would you like to use numbers? Click 'OK' for Yes and 'Cancel' for No.");
  var includeSpecial = confirm("Would you like to use special characters? Click 'OK' for Yes and 'Cancel' for No.");
  
  //This alerts the user that at least one option needs to be selected to generate the password. 
  if (includeLowercase === false && includeUppercase === false && includeNumbers === false && includeSpecial === false) {
    alert("You must select OK on at least one option to generate a password.");
    choosePasswordOptions();
   } 

  // This assigns item properties to an object. 
  // Need to figure out how to require one item minimum
  var passwordOptions = {
    length: passwordLength,
    includeLowercase: includeLowercase,
    includeUppercase: includeUppercase,
    includeNumbers: includeNumbers,
    includeSpecial: includeSpecial,
  };
  return passwordOptions;
}

//this function is set so it can be used multiple times. 'arr' is a placeholder that is replaced by the variable arrays on lines 5-8
function randomNumber(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  var randomElement = arr[randomIndex];
  return randomElement;
}

// This is the function to actually generate password.
function generatePassword() {
  var options = choosePasswordOptions();

  //These are empty to allow them to be dynamic, being filled and called on below. 
  var finalArray = [];
  var middleArray = [];
  var beginningArray = [];

  //These if statements call the dyamic arrays to respond to the user marking OK or Cancel. They first define the variable anew and concatenate the 
  //arrays above. The middleArray portion then adds items to the end of the array randomly, from the randomNumber function above.
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

  //This for loop first creates a variable that calls the function above to randomize the options that were added in the begginingArray variable.
  //It then will add the new variable into finalArray. 
  for (var i = 0; i < options.length; i++) {
    var possibleCharacters = randomNumber(beginningArray);
    finalArray.push(possibleCharacters);
    // this console.log is used to ensure that the loop was performing correctly. 
    // console.log(finalArray)
  }

  //This loop is used to set the finalArray and middleArray to the same length. It has to loop to ensure the finalArray reaches the same length.
  for (var i = 0; i < middleArray.length; i++) {
    finalArray[i] = middleArray[i];
    // this console.log is used to ensure that the loop was performing correctly. 
    // console.log(finalArray) 
  }

  //This finishes the function by combining all of the elements together and be ready for the next function. 
  return finalArray.join("");
}

//This precoded function calles the return from function above and places it into the document.
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// This creates the button without adding code to the index.html.
// Add event listener to generate button. 
generateBtn.addEventListener("click", writePassword);
