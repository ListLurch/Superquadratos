const cells = document.querySelectorAll(".cell");
let currentPlayer = "playerYellow";


// function for checking winning combinations
const checkCombinations = (stepperIndex) => {
    let startRowIndex;       // starting cell iterating 
    let endRowIndex;         // ending cell iterating rows
    let startColIndex;      // starting cell iterating columnns
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
                document.querySelector("h1").innerHTML = "Yellow won";

            } else if (cells[i * 10 + j].classList.contains("playerBlue") &&
                cells[i * 10 + j + stepperIndex].classList.contains("playerBlue") &&
                cells[i * 10 + j + 2 * stepperIndex].classList.contains("playerBlue") &&
                cells[i * 10 + j + 3 * stepperIndex].classList.contains("playerBlue")) {
                document.querySelector("h1").innerHTML = "Blue won";
            }
        }
    }
};

//logic for removing buttons
const removerYellow = document.querySelector("#removerYellow");
const removerBlue = document.querySelector("#removerBlue");

removerYellow.addEventListener("click", () => {
    removerYellow.classList.add("removerYellowOn");
});
removerBlue.addEventListener("click", () => {
    removerBlue.classList.add("removerBlueOn");
});

// logic for clicking on cells
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (removerYellow.classList.contains("removerYellowOn") && cell.classList.contains("playerBlue")) {
            cell.classList.add("unusable");
            removerYellow.classList.remove("removerYellowOn");

        } else if (removerBlue.classList.contains("removerBlueOn") && cell.classList.contains("playerYellow")) {
            cell.classList.add("unusable");
            removerBlue.classList.remove("removerBlueOn");

        } else if (!(cell.classList.contains("playerYellow") || cell.classList.contains("playerBlue"))) {
            cell.classList.add(currentPlayer);
        }
        
        if (currentPlayer === "playerYellow") {
            currentPlayer = "playerBlue";
        } else {
            currentPlayer = "playerYellow";
        }
        checkCombinations(1);
        checkCombinations(10);
        checkCombinations(11);
        checkCombinations(9);
    });
});


