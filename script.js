let boxes = document.querySelectorAll(".box");
let game = document.querySelector(".game");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new-game");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");

let turnX = true;
let counter = 0;

// store all the winning patterns using 2D array
const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8], 
    [1, 4, 7], 
    [2, 5, 8], 
    [2, 4, 6], 
    [3, 4, 5], 
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX) {
            box.innerText = "X";
        } else {
            box.style.color = "green";
            box.innerText = "O";
        }
        turnX = !turnX;
        box.disabled = true; 

        checkWinner();
        counter++; 
        if(counter >= 9) {
            drawGame();
        }
    })
})

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true; 
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false; 
        box.innerText = "";
    }
}

const checkWinner = () => {
    for(let pattern of winningPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if(pos1 === pos2 && pos2 === pos3)  {
                showWinner(pos1);
                disableBoxes();
            }
        }
    }
}

const drawGame = () => {
    message.innerText = "It's a Draw game.";
    msgContainer.classList.remove("hide");
}

const showWinner = (winner) => {
    if(winner == "X") {
        message.innerText = `Congratulations! Player 1 Wins.`;
    } else {
        message.innerText = `Congratulations! Player 2 Wins.`;
    }
    msgContainer.classList.remove("hide");
}

const resetGame = () => {
    turnX = true; 
    counter = 0;
    enableBoxes(); 
    msgContainer.classList.add("hide");
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame); 