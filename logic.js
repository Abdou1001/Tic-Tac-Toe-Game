// || create squares in the game ||
const gridBox = document.getElementById("gridContainer");
for (let i = 0; i < 9; i++) {
  // main div
  let square = document.createElement("div");
  square.classList.add("square");
  // child h2
  let h2 = document.createElement("h2");
  h2.classList.add("squareContant");
  h2.classList.add("animate__animated");

  square.appendChild(h2);
  gridBox.appendChild(square);
}

// Array the game
let boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let currentTurn = "X";
let gameIsfinshed = false;
const typeAnimation = "animate__bounceIn";

// || Add event click for each square ||
let squares = document.getElementsByClassName("square");
let title = document.getElementById("instruction");

Array.from(squares).forEach((ele, i) => {
  ele.addEventListener("click", () => clickSquare(i));
});

// put X or O in square when the square was cliced by user
const clickSquare = (i) => {
  if (gameIsfinshed) {
    return;
  }
  
  if (
    squares[i].children[0].textContent != "X" &&
    squares[i].children[0].textContent != "O"
  ) {
    if (currentTurn == "X") {
      squares[i].children[0].classList.add("red");
    } else {
      squares[i].children[0].classList.add("blue");
    }

    squares[i].children[0].textContent = currentTurn;
    squares[i].children[0].classList.add(typeAnimation);
    boardArray[i] = currentTurn;

    currentTurn = currentTurn == "X" ? "O" : "X";
    title.innerHTML = `${currentTurn} Turn`;

    checkWinner();
  }
};

const checkWinner = () => {
  if (
    // check probability of winning in Row
    (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]) ||
    (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]) ||
    (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]) ||
    // check probability of winning in Coloum
    (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) ||
    (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) ||
    (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]) ||
    // check probability of winning in Diagonal
    (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]) ||
    (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6])
  ) {
    let winner = currentTurn == "O" ? "X" : "O";
    gameIsfinshed = true;
    Swal.fire({
      title: `${winner} 🏆`,
      text: `${winner} is the winner 🤩`,
      timer: 1500,
    });
    title.innerHTML = `${winner} is the winner 🏆`;
    checkScore(winner);
    return;
  }

  let isDraw = true;

  for (square of boardArray) {
    if (square != "X" && square != "O") {
      isDraw = false;
    }
  }
  if (isDraw) {
    gameIsfinshed = true;
    title.innerHTML = `Draw 🙄`;
    Swal.fire({
      title: `Draw 🙄`,
      text: `Play again`,
      timer: 1500,
    });
  }
};

// || score function ||
const xSocre = document.getElementById("xScore");
const oSocre = document.getElementById("oScore");

xSocre.classList.add("animate__animated");
oSocre.classList.add("animate__animated");
// function for count the score
function checkScore(winner) {
  if (winner == "X") {
    xSocre.classList.add("animate__flash");
    xSocre.textContent = +xSocre.textContent + 1;
  }else {
    oSocre.classList.add("animate__flash");
    oSocre.textContent = +oSocre.textContent + 1;
  }
  setTimeout(() => {
    oSocre.classList.remove("animate__flash");
    xSocre.classList.remove("animate__flash");
  }, 1500);
}


// || Reset button section ||
let resetButton = document.getElementById("reset");

console.log(resetButton);

resetButton.addEventListener("click", resetEvent);

function resetEvent() {
  Array.from(squares).forEach((e) => {
    e.children[0].textContent = " ";
    e.children[0].classList.remove("red");
    e.children[0].classList.remove("blue");
    e.children[0].classList.remove(typeAnimation);
    boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    currentTurn = currentTurn == "O" ? "X" : "O";
    title.innerHTML = `${currentTurn} Turn`;
    isDraw = true;
    gameIsfinshed = false;
  });
}
