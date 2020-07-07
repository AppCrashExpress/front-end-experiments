const thrownState = {
    ROCK:     0,
    PAPER:    1,
    SCISSORS: 2,

    properties: {
        0: { str: "rock"},
        1: { str: "paper"},
        2: { str: "scissors"}
    },

    convert(str) {
        switch (str.toLowerCase())
        {
            case "rock":
                return thrownState.ROCK;
            case "paper":
                return thrownState.PAPER;
            case "scissors":
                return thrownState.SCISSORS;
        }
    },

    beats(first, second)
    {
        if (first == thrownState.ROCK && 
            second == thrownState.SCISSORS)
        {
            return true;
        }

        if (first == thrownState.PAPER && 
            second == thrownState.ROCK)
        {
            return true;
        }

        if (first == thrownState.SCISSORS && 
            second == thrownState.PAPER)
        {
            return true;
        }

        return false;
    }
};

const resultState = {
    WIN:  0,
    LOSE: 1,
    DRAW: 2
}

function compareThrow(playerSelect, computerSelect)
{
    if (playerSelect === computerSelect) {
        return resultState.DRAW;
    }

    if (thrownState.beats(playerSelect, computerSelect)) {
        return resultState.WIN;
    }

    if (thrownState.beats(computerSelect, playerSelect)) {
        return resultState.LOSE;
    }
}

// Generate input from 0 to 2.
// Each number represents state from thrownStates
function createComputerInput() {
    return Math.floor(Math.random() * 3);
}

// Shows prompt version of game
function playRoundPrompt() {
    let playerInput = thrownState.convert(prompt("You use: "));
    let computerSelect = createComputerInput();
    return compareThrow(playerInput, computerSelect);
}

const mainDiv      = document.querySelector("#main");
const buttonList   = document.querySelectorAll("#input-buttons button");
const resultUL     = document.querySelector("#score ul");
const throwsOutput = document.querySelector("#result");

let playerVictories   = 0;
let computerVictories = 0;
let roundsPlayed      = 0;

function gameReset() {
    mainDiv.removeChild(mainDiv.lastChild);
    playerVictories = computerVictories = 0;
    roundsPlayed = 0;

    document.querySelector("#result").innerHTML = "Let us throw.";
    while (resultUL.childElementCount != 1) {
        resultUL.removeChild(resultUL.lastChild);
    }
    buttonList.forEach((button) => {
        button.disabled = false;
    });
}

function gameEnd(winner) {
    buttonList.forEach((button) => {
        button.disabled = true;
    });

    let winDiv = document.createElement("div");
    winDiv.id = "end-score";
    mainDiv.appendChild(winDiv);

    let winText = document.createElement("p");
    winText.innerText = `${winner} wins.`
    winDiv.appendChild(winText);

    let resetButton = document.createElement("button")
    resetButton.innerText = "Restart";
    resetButton.addEventListener("click", gameReset);
    winDiv.appendChild(resetButton);
}

function checkVictoryConditions() {
    if (playerVictories == 3) {
        gameEnd("Player");
        return;
    }
    if (computerVictories == 3) {
        gameEnd("Computer");
        return;
    }

    if (roundsPlayed < 5) return;
    switch(Math.sign(playerVictories - computerVictories)) {
        case 1:
            gameEnd("Player");
            break;
        case 0:
            gameEnd("Nobody");
            break;
        case -1:
            gameEnd("Computer");
            break;
    }
}

buttonList.forEach((button) => {
    button.addEventListener("click", () => {
        let newListItem = document.createElement("li");
        
        let computerSelect = createComputerInput();
        switch (compareThrow(thrownState.convert(button.value), computerSelect)) {
            case resultState.WIN:
                ++playerVictories;
                newListItem.innerText = "Won";
                newListItem.classList.add("round-win");
                break;

            case resultState.LOSE:
                ++computerVictories;
                newListItem.innerText = "Lost";
                newListItem.classList.add("round-lose");
                break;

            case resultState.DRAW:
                newListItem.innerText = "Draw";
                newListItem.classList.add("round-draw");
                break;
        }
        ++roundsPlayed;
        

        resultUL.appendChild(newListItem);
        throwsOutput.innerText = `You threw ${button.value}. Computer threw ${thrownState.properties[computerSelect].str}.`
        checkVictoryConditions();
    })
});