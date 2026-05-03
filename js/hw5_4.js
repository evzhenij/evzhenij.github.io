const outputDiv = document.querySelector('.game-output');
const messageDiv = document.querySelector('.game-message');

// Создаем квадрат
const box = document.createElement('div');
box.className = 'game-box';
outputDiv.appendChild(box);

const game = {
    start: null
};

const getRandom = (max) => {
    return Math.floor(Math.random() * max);
};

const addBox = () => {
    const maxLeft = outputDiv.clientWidth - box.clientWidth;
    const maxTop = outputDiv.clientHeight - box.clientHeight;
    const left = getRandom(maxLeft);
    const top = getRandom(maxTop);
    box.style.left = left + 'px';
    box.style.top = top + 'px';
    box.style.display = 'block';
    game.start = new Date().getTime();
    messageDiv.textContent = 'Кликни сюда!';
};

box.addEventListener('click', () => {
    if (game.start === null) {
        // Первый клик – запускаем игру
        messageDiv.textContent = 'Жди появления красного квадрата...';
        box.style.display = 'none';
        const delay = getRandom(2000) + 500; // от 0.5 до 2.5 секунд
        setTimeout(addBox, delay);
    } else {
        // Игрок кликнул на появившийся квадрат
        const end = new Date().getTime();
        const timeSec = (end - game.start) / 1000;
        messageDiv.textContent = `Реакция: ${timeSec.toFixed(3)} сек. Жди следующего...`;
        box.style.display = 'none';
        game.start = null;
        const delay = getRandom(2000) + 500;
        setTimeout(addBox, delay);
    }
});