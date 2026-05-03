const area = document.getElementById('mouseArea');
const coordsSpan = document.getElementById('coordsDisplay');

area.addEventListener('mouseover', () => {
    area.classList.add('active');
});

area.addEventListener('mouseout', () => {
    area.classList.remove('active');
    coordsSpan.textContent = 'Мышь покинула область';
});

area.addEventListener('mousemove', (e) => {
    const x = e.clientX - area.getBoundingClientRect().left;
    const y = e.clientY - area.getBoundingClientRect().top;
    coordsSpan.textContent = `Координаты: X = ${Math.round(x)}, Y = ${Math.round(y)}`;
});