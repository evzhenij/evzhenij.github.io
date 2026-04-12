const palette = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "cyan", "lime"];

const randomColors = () => {
    const squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) {
        const randomColor = palette[Math.floor(Math.random() * palette.length)];
        squares[i].style.backgroundColor = randomColor;
    }
}

const resetColors = () => {
    const squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = "white";
    }
}