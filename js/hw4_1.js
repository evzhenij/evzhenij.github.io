document.addEventListener('DOMContentLoaded', () => {
    const titles = document.querySelectorAll('.title');
    const texts = document.querySelectorAll('.myText');

    const hideAllTexts = () => {
        texts.forEach(text => {
            text.classList.remove('active');
        });
    };

    titles.forEach((title, index) => {
        title.addEventListener('click', () => {
            hideAllTexts();
            texts[index].classList.add('active');
        });
    });
});