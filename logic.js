// logic for the modal for the starting player

let currentPlayer;
const yellowButton = document.querySelector("#yellowStart");
const blueButton = document.querySelector("#blueStart");
yellowButton.addEventListener("click", () => {
    currentPlayer = "playerYellow";
});
blueButton.addEventListener("click", () => {
    currentPlayer = "playerBlue";
});


const cells = document.querySelectorAll(".cell");

// function for checking winning combinations
const checkCombinations = (stepperIndex) => {
    let startRowIndex;       // starting cell iterating 
    let endRowIndex;         // ending cell iterating rows
    let startColIndex;       // starting cell iterating columnns
    let endColIndex;         // ending cell iterating columnns

    switch (stepperIndex) {
        case 1:         // checking horizontally
            startRowIndex = 0;
            endRowIndex = 9;
            startColIndex = 0;
            endColIndex = 6;
            break;

        case 10:         // checking vertically
            startRowIndex = 0;
            endRowIndex = 6;
            startColIndex = 0;
            endColIndex = 9;
            break;

        case 11:         // checking diagonally down right
            startRowIndex = 0;
            endRowIndex = 6;
            startColIndex = 0;
            endColIndex = 6;
            break;


        case 9:        // checking diagonally down left
            startRowIndex = 0;
            endRowIndex = 6;
            startColIndex = 3;
            endColIndex = 9;
            break;
    }
    for (let i = startRowIndex; i <= endRowIndex; i++) {
        for (let j = startColIndex; j <= endColIndex; j++) {
            if (cells[i * 10 + j].classList.contains("playerYellow") &&
                cells[i * 10 + j + stepperIndex].classList.contains("playerYellow") &&
                cells[i * 10 + j + 2 * stepperIndex].classList.contains("playerYellow") &&
                cells[i * 10 + j + 3 * stepperIndex].classList.contains("playerYellow")) {
                alert("Yellow won!");

            } else if (cells[i * 10 + j].classList.contains("playerBlue") &&
                cells[i * 10 + j + stepperIndex].classList.contains("playerBlue") &&
                cells[i * 10 + j + 2 * stepperIndex].classList.contains("playerBlue") &&
                cells[i * 10 + j + 3 * stepperIndex].classList.contains("playerBlue")) {
                alert("Blue won!");
            }
        }
    }
};

//logic for the kill buttons
const removerYellow = document.querySelector("#removerYellow");
const removerBlue = document.querySelector("#removerBlue");
let counterYellow = 3;
let counterBlue = 3;
removerYellow.addEventListener("click", () => {
    if (currentPlayer === "playerYellow") {
        removerYellow.classList.add("removerYellowOn");
        counterYellow--;
        if (counterYellow === 0) {
            removerYellow.textContent = "No kills left!";
            removerYellow.disabled = true;
        } else {
            removerYellow.textContent = `Kill a blue Square! (${counterYellow.toString()})`;
        }
    } else {
        alert("Can't choose this option!");
    }

});
removerBlue.addEventListener("click", () => {
    if (currentPlayer === "playerBlue") {
        removerBlue.classList.add("removerBlueOn");
        counterBlue--;
        if (counterBlue === 0) {
            removerBlue.textContent = "No kills left!";
            removerBlue.disabled = true;
        } else {
            removerBlue.textContent = `Kill a yellow Square! (${counterBlue.toString()})`;
        }
    } else {
        alert("Can't choose this option!");
    }

});

// logic for clicking on cells
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (cell.classList.contains("unusable")) {
            alert("Can't use killed squares! Please select other!");
        } else {

            if (currentPlayer === "playerYellow") {

                if (removerYellow.classList.contains("removerYellowOn") && cell.classList.contains("playerBlue")) {
                    cell.classList.add("unusable");
                    cell.classList.remove("playerBlue");
                    removerYellow.classList.remove("removerYellowOn");
                    currentPlayer = "playerBlue";
                } else if (!(cell.classList.contains("playerYellow") || cell.classList.contains("playerBlue"))) {
                    cell.classList.add(currentPlayer);
                    currentPlayer = "playerBlue";
                } else if (cell.classList.contains("playerYellow") || cell.classList.contains("playerBlue")) {
                    alert("Cant't play here!");
                }

            } else if (currentPlayer === "playerBlue") {

                if (removerBlue.classList.contains("removerBlueOn") && cell.classList.contains("playerYellow")) {
                    cell.classList.add("unusable");
                    cell.classList.remove("playerYellow");
                    removerBlue.classList.remove("removerBlueOn");
                    currentPlayer = "playerYellow";
                } else if (!(cell.classList.contains("playerYellow") || cell.classList.contains("playerBlue"))) {
                    cell.classList.add(currentPlayer);
                    currentPlayer = "playerYellow";
                } else if (cell.classList.contains("playerYellow") || cell.classList.contains("playerBlue")) {
                    alert("Cant't play here!");
                }
            }
        }
        checkCombinations(1);
        checkCombinations(10);
        checkCombinations(11);
        checkCombinations(9);
    });
});


