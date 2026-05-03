document.addEventListener('DOMContentLoaded', () => {
    const words = [
        "ПРОГРАММИРОВАНИЕ",
        "ИНТЕРНЕТ",
        "КОМПЬЮТЕР",
        "АЛГОРИТМ",
        "РАЗРАБОТЧИК"
    ];
    let currentWord = "";
    let currentLetters = [];
    let guessed = [];
    let remainingLetters = 0;
    let gameActive = false;

    const scoreDiv = document.querySelector('.score');
    const puzzleDiv = document.querySelector('.puzzle');
    const lettersDiv = document.querySelector('.letters');
    const startBtn = document.querySelector('button');

    const builder = (type, parent, content, className) => {
        const element = document.createElement(type);
        if (className) element.className = className;
        element.textContent = content;
        parent.appendChild(element);
        return element;
    };

    const updateScore = () => {
        scoreDiv.textContent = `Осталось букв: ${remainingLetters}`;
        if (remainingLetters === 0 && gameActive) {
            scoreDiv.innerHTML += " – Вы выиграли! 🎉";
            gameActive = false;
            startBtn.style.display = "inline-block";
        }
    };

    const checkLetter = (letter) => {
        if (!gameActive) return;
        let found = false;
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter && !guessed[i]) {
                guessed[i] = true;
                puzzleDiv.children[i].textContent = letter;
                remainingLetters--;
                found = true;
            }
        }
        if (found) {
            updateScore();
        } else {
            // не угадал – можно добавить штраф, но по ТЗ просто ничего не меняем
        }
        if (remainingLetters === 0) updateScore();
    };

    const checker = (letterBtn, letter) => {
        letterBtn.classList.remove('boxE');
        letterBtn.classList.add('used');
        letterBtn.removeEventListener('click', () => {});
        checkLetter(letter);
    };

    const builderGame = () => {
        puzzleDiv.innerHTML = '';
        lettersDiv.innerHTML = '';
        guessed = [];
        remainingLetters = 0;

        for (let i = 0; i < currentWord.length; i++) {
            const char = currentWord[i];
            const box = builder('div', puzzleDiv, '-', 'boxE');
            box.style.border = '1px solid black';
            if (char === ' ') {
                box.textContent = ' ';
                box.style.borderColor = 'white';
            } else {
                remainingLetters++;
                guessed.push(false);
            }
        }
        updateScore();

        const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split('');
        alphabet.forEach(letter => {
            const letterBtn = builder('div', lettersDiv, letter, 'boxE');
            letterBtn.addEventListener('click', () => {
                if (!gameActive) return;
                checker(letterBtn, letter);
            });
        });
    };

    const startGame = () => {
        if (words.length === 0) {
            scoreDiv.textContent = "Игра закончена, слов больше нет!";
            return;
        }
        gameActive = true;
        startBtn.style.display = "none";
        currentWord = words.shift();
        currentLetters = currentWord.split('');
        builderGame();
    };

    startBtn.addEventListener('click', startGame);
});