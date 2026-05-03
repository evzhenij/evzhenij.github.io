document.addEventListener('DOMContentLoaded', () => {
    // Слова для игры
    const words = [
        "ПРОГРАММИРОВАНИЕ",
        "ИНТЕРНЕТ",
        "КОМПЬЮТЕР",
        "АЛГОРИТМ",
        "РАЗРАБОТЧИК"
    ];
    
    let currentWord = "";
    let guessedLetters = [];   // массив boolean: угадана буква или нет
    let wrongAttempts = 0;
    let maxWrong = 5;          // можно ошибиться 5 раз
    let gameActive = false;
    
    // DOM элементы
    const canvas = document.getElementById('hangmanCanvas');
    const ctx = canvas.getContext('2d');
    const attemptsSpan = document.getElementById('attempts');
    const puzzleDiv = document.getElementById('puzzle');
    const lettersDiv = document.getElementById('letters');
    const statusDiv = document.getElementById('statusMessage');
    const startBtn = document.getElementById('startBtn');
    
    // Функция рисования виселицы (статическая основа)
    const drawGallows = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
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
    
    // Рисование частей тела в зависимости от количества ошибок
    const drawBodyPart = (errors) => {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        switch(errors) {
            case 1: // голова
                ctx.beginPath();
                ctx.arc(220, 120, 15, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 2: // туловище
                ctx.beginPath();
                ctx.moveTo(220, 135);
                ctx.lineTo(220, 190);
                ctx.stroke();
                break;
            case 3: // левая рука
                ctx.beginPath();
                ctx.moveTo(220, 150);
                ctx.lineTo(195, 170);
                ctx.stroke();
                break;
            case 4: // правая рука
                ctx.beginPath();
                ctx.moveTo(220, 150);
                ctx.lineTo(245, 170);
                ctx.stroke();
                break;
            case 5: // левая нога
                ctx.beginPath();
                ctx.moveTo(220, 190);
                ctx.lineTo(195, 220);
                ctx.stroke();
                break;
            default: break;
        }
    };
    
    const updateHangman = (errors) => {
        drawGallows();
        for (let i = 1; i <= errors; i++) {
            drawBodyPart(i);
        }
    };
    
    // Обновление отображаемого слова (с угаданными буквами)
    const updatePuzzle = () => {
        let display = "";
        for (let i = 0; i < currentWord.length; i++) {
            if (guessedLetters[i]) {
                display += currentWord[i] + " ";
            } else {
                display += "_ ";
            }
        }
        puzzleDiv.textContent = display.trim();
    };
    
    // Проверка, выиграли ли мы
    const checkWin = () => {
        let allGuessed = guessedLetters.every(flag => flag === true);
        if (allGuessed && gameActive) {
            statusDiv.textContent = "Поздравляю! Вы выиграли! 🎉";
            gameActive = false;
            startBtn.style.display = "inline-block";
            return true;
        }
        return false;
    };
    
    // Проверка проигрыша
    const checkLoss = () => {
        if (wrongAttempts >= maxWrong && gameActive) {
            statusDiv.textContent = `Проигрыш! Загадано слово: ${currentWord}`;
            gameActive = false;
            startBtn.style.display = "inline-block";
            return true;
        }
        return false;
    };
    
    // Обработка нажатия на букву
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
            if (checkWin()) return;
            statusDiv.textContent = "Верно! +0 ошибок";
        } else {
            wrongAttempts++;
            attemptsSpan.textContent = maxWrong - wrongAttempts;
            updateHangman(wrongAttempts);
            statusDiv.textContent = `Ошибка! Осталось попыток: ${maxWrong - wrongAttempts}`;
            if (checkLoss()) return;
        }
    };
    
    // Построение игрового поля (буквы алфавита)
    const buildAlphabet = () => {
        lettersDiv.innerHTML = '';
        const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split('');
        alphabet.forEach(letter => {
            const btn = document.createElement('div');
            btn.textContent = letter;
            btn.className = 'boxE';
            btn.addEventListener('click', (e) => {
                handleLetter(letter, btn);
            });
            lettersDiv.appendChild(btn);
        });
    };
    
    // Сброс и старт новой игры
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
        
        updateHangman(0);
        updatePuzzle();
        
        // Пересоздаём буквы алфавита (сбрасываем стили)
        buildAlphabet();
    };
    
    startBtn.addEventListener('click', startGame);
    
    // Инициализация: рисуем пустую виселицу, буквы не активны до старта
    drawGallows();
    lettersDiv.innerHTML = '';
    puzzleDiv.textContent = '';
    attemptsSpan.textContent = '5';
    statusDiv.textContent = 'Нажмите "Start Game"';
});