// setting game
let gameName = "Guess the word";
document.title = gameName;
document.querySelector("h1").textContent = gameName;
document.querySelector("footer").textContent = `${gameName} created by khaled`;
let message = document.querySelector(".message");

// rules of letters
let numberOfLetters = 6;
let numberOfGuesses = 6;
let currentGuess = 1;
let numberOfHints = 2;
document.querySelector(".hint").textContent = `Hints: ${numberOfHints}`;
// generate random word
let ToguessWord = "";
let arrGuessWord = ["khaled", "ahmed", "ali", "mohamed", "yousef", "moamen"];
ToguessWord =
  arrGuessWord[Math.floor(Math.random() * arrGuessWord.length)].toLowerCase();
console.log(ToguessWord);

function genreateInput() {
  // main input
  let inputs = document.querySelector(".inputs");
  //
  for (let i = 1; i <= numberOfGuesses; i++) {
    const trydiv = document.createElement("div");
    if (i !== 1) trydiv.classList.add("disabled");
    trydiv.classList.add(`try-${i}`);
    trydiv.innerHTML = `<span>Try${i}</span>`;
    inputs.appendChild(trydiv);
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `Guess${i}-input${j}`;
      input.classList.add("letter");
      input.setAttribute("maxlength", "1");
      trydiv.appendChild(input);
    }
  }
  inputs.children[0].children[1].focus();
  // disable all input expect first
  let inputDisabled = document.querySelectorAll(".disabled input");
  inputDisabled.forEach((input) => {
    input.disabled = true;
  });
  // make every element upperCase && the direct change to next input
  const arrinput = document.querySelectorAll("input");
  arrinput.forEach((input, index) => {
    input.addEventListener("input", function () {
      input.value = this.value.toLowerCase();
      const nextInput = arrinput[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      // console.log(event);
      let currentInput = Array.from(arrinput).indexOf(event.target);
      // console.log(currentInput);
      if (event.key === "ArrowRight") {
        let nextInput = arrinput[currentInput + 1];
        if (nextInput) nextInput.focus();
      } else if (event.key === "ArrowLeft") {
        let nextInput = arrinput[currentInput - 1];
        if (nextInput) nextInput.focus();
      }
    });
  });
}
const check = document.querySelector(".check");
const hint = document.querySelector(".hint");

// const reset = document.querySelector(".reset");
// check the guess word
check.addEventListener("click", function () {
  let success = true;
  for (let i = 1; i <= numberOfGuesses; i++) {
    let currentInput = document.querySelector(
      `#Guess${currentGuess}-input${i}`
    );
    // get char from the gessed word
    let actualLetter = ToguessWord[i - 1];
    //  check the input if is in the word
    if (currentInput.value === actualLetter) {
      currentInput.classList.add("yes-in-place");
    } else if (
      ToguessWord.includes(currentInput.value) &&
      currentInput.value !== ""
    ) {
      currentInput.classList.add("yes-in-word");
      success = false;
    } else {
      currentInput.classList.add("not-in-word");
      success = false;
    }
  }
  if (success) {
    message.innerHTML = `<span>You win</span> <p>You guessed the word in ${currentGuess} guesses</p>`;
    let inputDisabled = document.querySelectorAll(".disabled input");
    inputDisabled.forEach((input) => {
      input.disabled = true;
      hint.disabled = true;
    });
    check.disabled = true;
  } else {
    if (currentGuess < numberOfGuesses) {
      let currentTry = document.querySelector(`.try-${currentGuess}`);
      currentTry.classList.add("disabled");
      let currentTryInput = document.querySelectorAll(
        `.try-${currentGuess} input`
      );
      currentTryInput.forEach((input) => {
        input.disabled = true;
      });

      currentGuess++;
      let nextGuess = document.querySelector(`.try-${currentGuess}`);
      nextGuess.classList.remove("disabled");
      let nextGuessInput = document.querySelectorAll(
        `.try-${currentGuess} input`
      );
      nextGuessInput.forEach((input) => {
        input.disabled = false;
      });
      nextGuess.children[1].focus();
    } else {
      let currentTry = document.querySelector(`.try-${currentGuess}`);
      currentTry.classList.add("disabled");
      let currentTryInput = document.querySelectorAll(
        `.try-${currentGuess} input`
      );
      currentTryInput.forEach((input) => {
        input.disabled = true;
      });

      check.disabled = true;
      message.innerHTML = `<span>You lose</span> <p>The word was ${ToguessWord}</p>`;
      hint.disabled = true;
    }
  }
  hint.addEventListener("click", function () {
    if (numberOfHints > 0) {
      numberOfHints--;
      console.log(numberOfHints);
    }
  });
});
hint.addEventListener("click", function () {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint").textContent = `Hints: ${numberOfHints}`;
    if (numberOfHints === 0) {
      hint.disabled = true;
    }
    let notDisebledInput = document.querySelectorAll("input:not([disabled])");
    let emptyInput = Array.from(notDisebledInput).filter(
      (input) => input.value === ""
    );
    if (emptyInput.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyInput.length);
      let randomInput = emptyInput[randomIndex];
      let fill = Array.from(notDisebledInput).indexOf(randomInput);
      randomInput.value = ToguessWord[fill];
      randomInput.classList.add("yes-in-word");
    }
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    let activeInput = document.querySelectorAll("input:not([disabled])");
    let currentInput = Array.from(activeInput).indexOf(event.target);
    // console.log(currentInput);
    let previousInput = activeInput[currentInput - 1];
    previousInput.value = "";
    activeInput[currentInput].value = "";
    if (previousInput) previousInput.focus();
  }
});
window.onload = () => {
  genreateInput();
};
