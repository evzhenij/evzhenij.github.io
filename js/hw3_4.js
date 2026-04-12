const box = document.getElementById('stateBox');
const button = document.getElementById('transformBtn');

const states = [
    { classes: "", text: "Стандарт" },
    { classes: "large red", text: "Большой красный" },
    { classes: "small blue", text: "Маленький синий" },
    { classes: "medium green", text: "Средний зелёный" }
];

let currentState = 0;

const updateBox = () => {
    box.className = "box " + states[currentState].classes;
    button.textContent = states[currentState].text;
}

button.addEventListener('click', () => {
    currentState = (currentState + 1) % states.length;
    updateBox();
});

updateBox();