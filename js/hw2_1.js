const arr1 = [5, 10, 15, 20];
const arr2 = [3, 6, 9, 12];
const arr3 = [2, 4, 6, 8, 10];

const sumOfAllElements = (array1, array2, array3) => {
    let total = 0;
    for (let i = 0; i < array1.length; i++) total += array1[i];
    for (let i = 0; i < array2.length; i++) total += array2[i];
    for (let i = 0; i < array3.length; i++) total += array3[i];
    return total;
}

const calculateSum = () => {
    const sum = sumOfAllElements(arr1, arr2, arr3);
    document.getElementById('result').innerHTML = `
        <b>Результат:</b><br>
        Сумма всех элементов = <b style="font-size: 24px; color: red;">${sum}</b><br>
        <hr>
        ${arr1} + ${arr2} + ${arr3} = ${sum}
    `;
}