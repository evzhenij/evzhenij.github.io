document.addEventListener('DOMContentLoaded', () => {
    let myArray = [
        { name: "Анна", votes: 0 },
        { name: "Иван", votes: 0 },
        { name: "Мария", votes: 0 }
    ];

    const outputTable = document.getElementById('output');
    const addFriendInput = document.getElementById('addFriend');
    const addNewBtn = document.getElementById('addNew');

    const renderTable = () => {
        outputTable.innerHTML = '';
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>#</th><th>Имя</th><th>Голосов</th>';
        outputTable.appendChild(headerRow);

        myArray.forEach((person, idx) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${idx + 1}</td>
                <td>${person.name}</td>
                <td class="vote-count">${person.votes}</td>
            `;
            row.addEventListener('click', () => {
                let votesCell = row.querySelector('.vote-count');
                let currentVotes = parseInt(votesCell.textContent);
                currentVotes++;
                votesCell.textContent = currentVotes;
                myArray[idx].votes = currentVotes;
            });
            outputTable.appendChild(row);
        });
    };

    addNewBtn.addEventListener('click', () => {
        const newName = addFriendInput.value.trim();
        if (newName === "") return;
        myArray.push({ name: newName, votes: 0 });
        addFriendInput.value = "";
        renderTable();
    });

    renderTable();
});