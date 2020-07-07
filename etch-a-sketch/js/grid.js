let gridContainer = document.querySelector("#grid-container");
let gridChildren  = gridContainer.children;

function createSquare() {
    let newSquare = document.createElement("div");
    newSquare.setAttribute("class", "grid-square");
    newSquare.addEventListener("mouseover", changeColor);
    return newSquare;
}

function generateColor() {
    const hexArray = "0123456789abcdef"
    let color = "#";

    for (let i = 0; i < 6; ++i) {
        color += hexArray[ Math.floor(Math.random() * 16) ];
    }

    return color;
}

function changeColor() {
    let newColor = generateColor();
    this.style.backgroundColor = newColor;
}

function clearColor() {
    for (let i = 0; i < gridChildren.length; ++i) {
        gridChildren[i].style.backgroundColor = "#FFFFFF";
    }
}

function changeSize(rows, columns) {
    clearColor();

    let root = document.documentElement;
    root.style.setProperty("--square-amount-row", rows);
    root.style.setProperty("--square-amount-column", columns);
    
    let squareAmount = rows * columns;
    while (gridChildren.length < squareAmount) {
        gridContainer.appendChild(createSquare());
    }
    while (gridChildren.length > squareAmount) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

changeSize(16, 16);