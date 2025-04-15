// setting game
let gameName = "Guess the word";
document.title = gameName;
document.querySelector("h1").textContent = gameName;
document.querySelector("footer").textContent = `${gameName} created by khalid`;
// rules of letters
let numberOfLetters = 6;
let numberOfGuesses = 6;
let currentGuess = 1;

function genreateInput() {
  // main input
  let inputs = document.querySelector(".inputs");
  //
  for (let i = 1; i <= numberOfGuesses; i++) {
    const trydiv = document.createElement("div");
    if (i !== 1) trydiv.classList.add("disabled");
    trydiv.classList.add(`try-${i}`);
    trydiv.innerHTML = `<span style="margin-right: 10px"> try ${i}</span>`;
    inputs.appendChild(trydiv);
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `Guess${i}-input${j}`;
      input.classList.add("letter");
      input.setAttribute("maxlength", "1");
      input.style.width = "25px";
      input.style.height = "25px";
      input.style.marginLeft = "5px";
      trydiv.appendChild(input);
    }
  }
  inputs.children[0].children[1].focus();
}
window.onload = function () {
  genreateInput();
};
