const outputDiv = document.getElementById('gameOutput');
const messageDiv = document.getElementById('gameMessage');
const startBtn = document.getElementById('startGameBtn');
let gameActive = false;
let startTime = null;
let waitingForClick = false;

// Создаём квадрат
const box = document.createElement('div');
box.className = 'game-box';
outputDiv.appendChild(box);

// Случайное число от min до max (ms)
const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Показываем квадрат в случайном месте
const showRandomBox = () => {
    if (!gameActive) return;
    const maxLeft = outputDiv.clientWidth - box.clientWidth;
    const maxTop = outputDiv.clientHeight - box.clientHeight;
    const left = Math.floor(Math.random() * maxLeft);
    const top = Math.floor(Math.random() * maxTop);
    box.style.left = left + 'px';
    box.style.top = top + 'px';
    box.style.display = 'block';
    startTime = new Date().getTime();
    waitingForClick = true;
    messageDiv.textContent = 'Кликни по красному квадрату! 🎯';
};

// Запускаем следующий раунд через случайную задержку
const scheduleNextRound = () => {
    if (!gameActive) return;
    const delay = getRandomDelay(500, 2500); // 0.5–2.5 секунды
    setTimeout(showRandomBox, delay);
};

// Клик по квадрату
box.addEventListener('click', (e) => {
    e.stopPropagation(); // чтобы не сработало что-то ещё
    if (!gameActive || !waitingForClick) return;
    const reaction = (new Date().getTime() - startTime) / 1000;
    messageDiv.textContent = `Реакция: ${reaction.toFixed(3)} сек. Жди следующего...`;
    box.style.display = 'none';
    waitingForClick = false;
    scheduleNextRound();
});

// Обработка клика по контейнеру (если игрок кликнул мимо квадрата)
outputDiv.addEventListener('click', (e) => {
    if (e.target === box) return; // уже обработано
    if (gameActive && waitingForClick) {
        messageDiv.textContent = 'Мимо! Жди новый квадрат...';
        box.style.display = 'none';
        waitingForClick = false;
        scheduleNextRound();
    }
});

// Старт игры
const startGame = () => {
    if (gameActive) return;
    gameActive = true;
    waitingForClick = false;
    box.style.display = 'none';
    messageDiv.textContent = 'Игра началась! Жди появления квадрата...';
    startBtn.style.display = 'none';
    scheduleNextRound();
};

startBtn.addEventListener('click', startGame);