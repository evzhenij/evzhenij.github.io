class Person {
    constructor(name, age, city, hobby, student) {
        this.name = name;
        this.age = age;
        this.city = city;
        this.hobby = hobby;
        this.student = student;
    }
}

class Employee {
    constructor(name, age, city, position, student) {
        this.name = name;
        this.age = age;
        this.city = city;
        this.position = position;
        this.student = student;
    }
}

class Guest {
    constructor(name, age, city, hobby, student) {
        this.name = name;
        this.age = age;
        this.city = city;
        this.hobby = hobby;
        this.student = student;
    }
}

const obj1 = new Person("Евгений", 20, "Москва", "теннис", true);
const obj2 = new Employee("Анна", 25, "Москва", "разработчик", false);
const obj3 = new Guest("Пётр", 30, "Санкт-Петербург", "шахматы", false);

const findCommonProperties = () => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const keys3 = Object.keys(obj3);
    
    const commonKeys = [];
    for (let i = 0; i < keys1.length; i++) {
        const key = keys1[i];
        if (keys2.includes(key) && keys3.includes(key)) {
            commonKeys.push(key);
        }
    }
    
    let output = `<b>Общие свойства для всех трёх объектов:</b><br>`;
    
    if (commonKeys.length === 0) {
        output += `<p>Нет общих свойств у всех трёх объектов.</p>`;
    } else {
        for (let i = 0; i < commonKeys.length; i++) {
            const key = commonKeys[i];
            output += `
                <div style="background-color: whitesmoke; padding: 10px; margin: 5px 0; border-left: 3px solid pink;">
                    <b>${key}</b><br>
                    → объект 1 (Студент): ${obj1[key]}<br>
                    → объект 2 (Сотрудник): ${obj2[key]}<br>
                    → объект 3 (Гость): ${obj3[key]}
                </div>
            `;
        }
    }
    
    document.getElementById('result').innerHTML = output;
}