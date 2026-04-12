const phrases = ["Доброе утро! 🌅", "Добрый день! ☀️", "Добрый вечер! 🌙"];
let currentPhraseIndex = 0;
let clickCount = 0;

const header = document.getElementById('greetingHeader');
const button = document.getElementById('clickButton');

button.addEventListener('click', () => {
    clickCount++;
    button.textContent = `Кликов: ${clickCount}`;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    header.textContent = phrases[currentPhraseIndex];
});