const stars = document.querySelectorAll('.star');
const output = document.getElementById('ratingOutput');

const starRate = (rating) => {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('orange');
        } else {
            star.classList.remove('orange');
        }
    });
    output.textContent = `Ваша оценка: ${rating} из 5`;
};

stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
        starRate(idx + 1);
    });
});