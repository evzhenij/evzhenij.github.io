const arr1 = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const arr2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const arr3 = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23];

const isPrime = (num) => {
    if (num <= 1) return false;
    if (num === 2) return true;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const sumOfPrimesInArray = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (isPrime(arr[i])) sum += arr[i];
    }
    return sum;
}

const sumOfAllPrimes = (array1, array2, array3) => {
    return sumOfPrimesInArray(array1) + sumOfPrimesInArray(array2) + sumOfPrimesInArray(array3);
}

const calculatePrimeSum = () => {
    const sum = sumOfAllPrimes(arr1, arr2, arr3);
    
    const getPrimes = (arr) => {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (isPrime(arr[i])) result.push(arr[i]);
        }
        return result;
    }
    
    document.getElementById('result').innerHTML = `
        <b>Результат:</b><br>
        Сумма всех простых чисел = <b style="font-size: 24px; color: red;">${sum}</b><br>
        <hr>
        <b>Простые числа в массиве 1:</b> [${getPrimes(arr1).join(', ')}] → сумма = ${sumOfPrimesInArray(arr1)}<br>
        <b>Простые числа в массиве 2:</b> [${getPrimes(arr2).join(', ')}] → сумма = ${sumOfPrimesInArray(arr2)}<br>
        <b>Простые числа в массиве 3:</b> [${getPrimes(arr3).join(', ')}] → сумма = ${sumOfPrimesInArray(arr3)}<br>
        <hr>
        <b>Общая сумма:</b> ${sumOfPrimesInArray(arr1)} + ${sumOfPrimesInArray(arr2)} + ${sumOfPrimesInArray(arr3)} = ${sum}
    `;
}