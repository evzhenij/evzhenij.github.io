const trackContainer = document.getElementById('trackContainer');
const outputDiv = document.getElementById('analyticsOutput');
let clicksArray = [];

const handleClick = (e) => {
    const target = e.target;
    // Проверяем, что клик не по контейнеру
    if (target === trackContainer) return;
    
    const clickData = {
        textContent: target.textContent,
        id: target.id || "без id",
        tagName: target.tagName,
        className: target.className
    };
    clicksArray.push(clickData);
    
    // Выводим информацию
    let html = '<b>Список кликов:</b><br>';
    clicksArray.forEach((item, idx) => {
        html += `${idx+1}. Текст: ${item.textContent}, id: ${item.id}, тег: ${item.tagName}, класс: ${item.className}<br>`;
    });
    outputDiv.innerHTML = html;
};

trackContainer.addEventListener('click', handleClick);