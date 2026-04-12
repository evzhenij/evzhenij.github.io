const blocks = {
    block1: document.getElementById('block1'),
    block2: document.getElementById('block2'),
    block3: document.getElementById('block3')
};

const globalBtn = document.getElementById('globalToggle');

const updateGlobalButton = () => {
    const allHidden = blocks.block1.style.display === 'none' && blocks.block2.style.display === 'none' && blocks.block3.style.display === 'none';
    if (allHidden) {
        globalBtn.textContent = 'Показать всё';
    } else {
        globalBtn.textContent = 'Скрыть всё';
    }
}

const updateIndividualButton = (blockId, button) => {
    if (blocks[blockId].style.display === 'none') {
        button.textContent = 'Показать';
    } else {
        button.textContent = 'Скрыть';
    }
}

const allToggleBtns = document.querySelectorAll('.toggle-btn');
for (let i = 0; i < allToggleBtns.length; i++) {
    const btn = allToggleBtns[i];
    const targetId = btn.getAttribute('data-target');
    updateIndividualButton(targetId, btn);
    
    btn.addEventListener('click', () => {
        const block = blocks[targetId];
        if (block.style.display === 'none') {
            block.style.display = 'block';
        } else {
            block.style.display = 'none';
        }
        updateIndividualButton(targetId, btn);
        updateGlobalButton();
    });
}

globalBtn.addEventListener('click', () => {
    const allHidden = blocks.block1.style.display === 'none' && blocks.block2.style.display === 'none' && blocks.block3.style.display === 'none';
    
    if (allHidden) {
        blocks.block1.style.display = 'block';
        blocks.block2.style.display = 'block';
        blocks.block3.style.display = 'block';
        globalBtn.textContent = 'Скрыть всё';
    } else {
        blocks.block1.style.display = 'none';
        blocks.block2.style.display = 'none';
        blocks.block3.style.display = 'none';
        globalBtn.textContent = 'Показать всё';
    }
    
    for (let i = 0; i < allToggleBtns.length; i++) {
        const btn = allToggleBtns[i];
        const targetId = btn.getAttribute('data-target');
        updateIndividualButton(targetId, btn);
    }
});