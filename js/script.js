const password = document.getElementById("password");
const includeLowercase = document.getElementById("includeLowercase");
const includeUppercase = document.getElementById("includeUppercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const passwordLength = document.getElementById("passwordLength");
const lengthValue = document.getElementById("lengthValue");
const copied = document.getElementById("copied");
const strength = document.getElementById("strength");

strength.style.borderBottomColor = "gray";

lengthValue.addEventListener("input", (event) => {
  passwordLength.value = event.target.value;
});

passwordLength.addEventListener("input", (event) => {
  lengthValue.value = event.target.value;
});

const generatePassword = () => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+=~`?{}[],:;";

  let allowedChars = "";
  let generatedPassword = "";
  let error = false;

  if (includeLowercase.checked) {
    allowedChars += lowercaseChars;
  }

  if (includeUppercase.checked) {
    allowedChars += uppercaseChars;
  }

  if (includeNumbers.checked) {
    allowedChars += numbers;
  }

  if (includeSymbols.checked) {
    allowedChars += symbols;
  }

  for (let i = 0; i < passwordLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    generatedPassword += allowedChars[randomIndex];
  }

  if (allowedChars.length === 0) {
    password.textContent = `At least 1 set of character needs to be selected`;
    password.style.color = "#ff0000";
    password.style.textAlign = "center";
    strength.style.borderBottomColor = "#000000";
    error = true;
  } else {
    password.textContent = `${generatedPassword}`;
    password.style.color = "";
  }

  copyTo(generatedPassword);
  strengthChecker(error);
};

const copyTo = (generatedPassword) => {
  password.onclick = function () {
    navigator.clipboard.writeText(generatedPassword);
    copied.textContent = "✅ Copied!";
    copied.style.backgroundColor = "white";
    copied.style.boxShadow = "-1px 5px 13px 0px #82828296";
    setTimeout(() => {
      copied.textContent = "";
      copied.style.backgroundColor = "";
      copied.style.boxShadow = "";
    }, 2000);
  };
};

const strengthChecker = (error) => {
  if (error) {
    strength.style.borderBottomColor = "#ff0000";
  } else {
    if (passwordLength.value <= 8) {
      strength.style.borderBottomColor = "#ff0000";
    } else if (passwordLength.value <= 16) {
      strength.style.borderBottomColor = "#ffa500";
    } else {
      strength.style.borderBottomColor = "#00ff00";
    }
  }
};
