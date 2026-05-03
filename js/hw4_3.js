document.addEventListener('DOMContentLoaded', () => {
    const words = [
        "ПРОГРАММИРОВАНИЕ",
        "ИНТЕРНЕТ",
        "КОМПЬЮТЕР",
        "АЛГОРИТМ",
        "РАЗРАБОТЧИК"
    ];
    
    let currentWord = "";
    let guessedLetters = [];
    let wrongAttempts = 0;
    let maxWrong = 5;
    let gameActive = false;
    
    const canvas = document.getElementById('hangmanCanvas');
    const ctx = canvas.getContext('2d');
    const attemptsSpan = document.getElementById('attempts');
    const puzzleDiv = document.getElementById('puzzle');
    const lettersDiv = document.getElementById('letters');
    const statusDiv = document.getElementById('statusMessage');
    const startBtn = document.getElementById('startBtn');
    
    // Функция рисования пустой виселицы
    const drawGallows = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        // стойка
        ctx.beginPath();
        ctx.moveTo(50, 250);
        ctx.lineTo(250, 250);
        ctx.stroke();
        ctx.moveTo(150, 250);
        ctx.lineTo(150, 50);
        ctx.stroke();
        ctx.moveTo(150, 50);
        ctx.lineTo(220, 50);
        ctx.stroke();
        ctx.moveTo(220, 50);
        ctx.lineTo(220, 80);
        ctx.stroke();
        // верёвка
        ctx.beginPath();
        ctx.moveTo(220, 80);
        ctx.lineTo(220, 100);
        ctx.stroke();
    };
    
    // Рисование частей тела по количеству ошибок
    const drawBodyParts = (errors) => {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        if (errors >= 1) { // голова
            ctx.beginPath();
            ctx.arc(220, 120, 15, 0, Math.PI * 2);
            ctx.stroke();
        }
        if (errors >= 2) { // туловище
            ctx.beginPath();
            ctx.moveTo(220, 135);
            ctx.lineTo(220, 190);
            ctx.stroke();
        }
        if (errors >= 3) { // левая рука
            ctx.beginPath();
            ctx.moveTo(220, 150);
            ctx.lineTo(195, 170);
            ctx.stroke();
        }
        if (errors >= 4) { // правая рука
            ctx.beginPath();
            ctx.moveTo(220, 150);
            ctx.lineTo(245, 170);
            ctx.stroke();
        }
        if (errors >= 5) { // левая нога
            ctx.beginPath();
            ctx.moveTo(220, 190);
            ctx.lineTo(195, 220);
            ctx.stroke();
        }
    };
    
    const updateHangman = () => {
        drawGallows();
        drawBodyParts(wrongAttempts);
    };
    
    const updatePuzzle = () => {
        let display = "";
        for (let i = 0; i < currentWord.length; i++) {
            display += (guessedLetters[i] ? currentWord[i] : "_") + " ";
        }
        puzzleDiv.textContent = display.trim();
    };
    
    const checkWin = () => {
        const allGuessed = guessedLetters.every(flag => flag === true);
        if (allGuessed && gameActive) {
            statusDiv.textContent = "Поздравляю! Вы выиграли! 🎉";
            gameActive = false;
            startBtn.style.display = "inline-block";
            return true;
        }
        return false;
    };
    
    const checkLoss = () => {
        if (wrongAttempts >= maxWrong && gameActive) {
            statusDiv.textContent = "Вы проиграли! Попробуйте ещё раз.";
            gameActive = false;
            startBtn.style.display = "inline-block";
            return true;
        }
        return false;
    };
    
    const disableAllLetters = () => {
        const allLetterBtns = document.querySelectorAll('.boxE');
        allLetterBtns.forEach(btn => {
            btn.classList.remove('boxE');
            btn.classList.add('used');
            btn.style.pointerEvents = 'none';
        });
    };
    
    const handleLetter = (letter, btnElement) => {
        if (!gameActive) return;
        
        // отключаем кнопку буквы
        btnElement.classList.remove('boxE');
        btnElement.classList.add('used');
        btnElement.style.pointerEvents = 'none';
        
        let letterFound = false;
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter && !guessedLetters[i]) {
                guessedLetters[i] = true;
                letterFound = true;
            }
        }
        
        if (letterFound) {
            updatePuzzle();
            statusDiv.textContent = "Верно!";
            if (checkWin()) return;
        } else {
            wrongAttempts++;
            attemptsSpan.textContent = maxWrong - wrongAttempts;
            updateHangman();
            statusDiv.textContent = `Ошибка! Осталось попыток: ${maxWrong - wrongAttempts}`;
            if (checkLoss()) {
                disableAllLetters(); // блокируем все буквы при проигрыше
                return;
            }
        }
    };
    
    const buildAlphabet = () => {
        lettersDiv.innerHTML = '';
        const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split('');
        alphabet.forEach(letter => {
            const btn = document.createElement('div');
            btn.textContent = letter;
            btn.className = 'boxE';
            btn.addEventListener('click', () => {
                handleLetter(letter, btn);
            });
            lettersDiv.appendChild(btn);
        });
    };
    
    const startGame = () => {
        if (words.length === 0) {
            statusDiv.textContent = "Слова закончились! Добавьте слова в массив.";
            return;
        }
        
        currentWord = words.shift();
        guessedLetters = new Array(currentWord.length).fill(false);
        wrongAttempts = 0;
        gameActive = true;
        
        attemptsSpan.textContent = maxWrong;
        statusDiv.textContent = "Игра началась! Угадывайте буквы.";
        startBtn.style.display = "none";
        
        updateHangman();
        updatePuzzle();
        buildAlphabet();
    };
    
    startBtn.addEventListener('click', startGame);
    
    // Начальное состояние
    drawGallows();
    puzzleDiv.textContent = "";
    attemptsSpan.textContent = "5";
    statusDiv.textContent = 'Нажмите "Start Game"';
    lettersDiv.innerHTML = "";
});