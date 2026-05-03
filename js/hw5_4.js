const outputDiv = document.getElementById('gameOutput');
const messageDiv = document.getElementById('gameMessage');
let gameActive = false;
let startTime = null;
let currentBox = null;

// Создаём квадрат
const box = document.createElement('div');
box.className = 'game-box';
outputDiv.appendChild(box);

// Случайное число от 0 до max
const getRandom = (max) => Math.floor(Math.random() * max);

// Показываем квадрат в случайном месте
const showRandomBox = () => {
    const maxLeft = outputDiv.clientWidth - box.clientWidth;
    const maxTop = outputDiv.clientHeight - box.clientHeight;
    const left = getRandom(maxLeft);
    const top = getRandom(maxTop);
    box.style.left = left + 'px';
    box.style.top = top + 'px';
    box.style.display = 'block';
    startTime = new Date().getTime();
    messageDiv.textContent = 'Кликни по красному квадрату! 🎯';
};

// Запускаем следующий раунд через случайную задержку
const scheduleNextRound = () => {
    if (!gameActive) return;
    const delay = getRandom(2000) + 500; // 0.5–2.5 секунды
    setTimeout(showRandomBox, delay);
};

// Клик по квадрату
box.addEventListener('click', (e) => {
    e.stopPropagation(); // чтобы не сработал клик по контейнеру
    if (!gameActive || !startTime) return;
    const reaction = (new Date().getTime() - startTime) / 1000;
    messageDiv.textContent = `Реакция: ${reaction.toFixed(3)} сек. Жди следующего...`;
    box.style.display = 'none';
    startTime = null;
    scheduleNextRound();
});

// Клик по контейнеру (начало игры)
outputDiv.addEventListener('click', () => {
    if (gameActive) return; // уже играем
    gameActive = true;
    messageDiv.textContent = 'Игра началась! Жди появления квадрата...';
    box.style.display = 'none';
    startTime = null;
    scheduleNextRound();
});