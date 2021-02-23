//сперва надо обработчик событий, чтобы не мешали разные другие проблемы
window.addEventListener('DOMcontentLoaded', function () {
    'use strict';
    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent (a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }
    hideTabContent(1); // через единциы скрываются все табы кроме именно первого

    function showTabContent (b) {
        if (tabContent(b).classList.contains("hide"))  {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        } 
    }
    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0); // hide all tabs
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //timer
    let deadline = '2018-10-21';

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()), // парс превращает дату в милисекунды, новая дата - конструкция для получения времени в данный момент
            seconds = math.floor((t/1000) % 60), //округление до целых чисел
            minutes = math.floor((t/1000/60) % 60),
            hours = math.floor((t/(1000*60*60))), // equals math.floor((t/1000/60/60) % 24)
            // days = math.floor((t/(1000*60*60*24)))

            return {
                "total" : t, // для остановки таймера, как достигнет нуля 
                "hours" : hours,
                "minutes" : minutes,
                "seconds" : seconds // эта функция вычленяет нужные данные в массив
            }

    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endTime); // t - techincal var we can use
            hours.textContent = t.hours; //comes from array 
            minutes.textContent = t.minutes; 
            seconds.textContent = t.seconds; 
            
            if (t.total <= 0) {
                crealInterval(timeInterval);
            }
        }
    }


    setClock ("timer", deadLine); //указывая здесь, моно сделать и другой блок-таймер с другими дедлайнами/датами


});

// конструктор и класс

function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function() {
        console.log("Пользователь " + this.name + " ушел");
    };
}

    User.prototype.exit = function(name) {
        console.log("Пользователь " + this.name + " ушел");
    }
    

    let ivan = new User('Iven', 25),
        alex = new User('Alex', 20);

    console.log(ivan);
    console.log(alex);

    ivan.exit();

    // sintaxis sugar

    class User {
        constructor(name, id) {
            this.name = name;
            this.id = id;
            this.human = true;
        }
        hello() {
            console.log("Hello!   ${this.name}");
        }

        exit() {
            console.log("Пользователь  ${this.name} ушел");
        }
    

    }   
    
    let ivan = new User('Iven', 25),
            alex = new User('Alex', 20);
    
        console.log(ivan);
        console.log(alex);
    
        ivan.hello();


        // контекст вызова и как он работает

function showThis(a, b) {
    console.log(this); // window, т.к не знает, к чеуму обратиться. В стрикт версии - undefined. 
    function sum() {
        console.log(this); // window
        return this.a + this.b; //Nan - не находит т.к. внутри
    }
    console.log(sum());
}

showThis(5, 9);

function showThis(a, b) {
    console.log(this); // window, т.к не знает, к чеуму обратиться. В стрикт версии - undefined. 
    function sum() {
        console.log(this); // window
        return a + b; //ищет в себе, не находит, идет выше и видит параметры снизу
    }
    console.log(sum());
}

showThis(5, 9);

let obj = {
    a : 20,
    b : 15,
    sum: function() {
        console.log(this); // выдает объект, потому что контекст выполнения и есть объект 
    }
};


let obj = {
    a : 20,
    b : 15,
    sum: function() {
        console.log(this); // выдает объект, потому что контекст выполнения и есть объект 
        function shout() {
            console.log(this); // внутри уже потеряла объект и снова находит window - не метод обекта, а функция внутри функции
        }
    }
};



// 1) Просто вызов функции - window или undefined (strict use)
// 2) Метод объекта - this будет объектом
// 3) Фукнция конструктор (new) или класс - this ссылается на вызов функции - новый созданный объекст. см.функцию User - ivan 
 // 4) Назначение самому контекст вызова cм ниже  // call apply bind


let user = {

    name: "John"
};
//эти две вещи надо насильно связать
function sayName(surname) {
    console.log(this);
    console.log(this.name + surname);
};

console.log(sayName.call(user, "Смит")); // выводится в обох случаях объект Джон и потом имя. 
console.log(sayName.apply(user, ['Snow'])); // по сравннеиею с пред.методом здесь можно передать массив данных

// функцикя байнд

function count(number) {

    return this * number; // window
}

let double = count.bind(2); // привязываем двойку и делаем контекстом вызова
console.log(double(3)); // 6 

let btn = document.querySelector('button');

btn.addEventListener('click', function() {
    console.log(this); // здесь мы получаем в консоли тег кнопки 
    this.style.backgroundColor = "red"; // здесь названием найденному тегу стиль после нажатия
    function showThis() {
        console.log(this);
    }
    showThis(); //- здесь опять window т.к. функция в фунцкии, тем и отличается от event target

});

// модальное окно при клике на кнопку "узнать больше"

let more = document.querySelector(".more"),
    overlay = document.querySelector(".overlay"),
    close = document.querySelector(".popup-close");

    more.addEventListener('click', function () {
        overlay.style.display = "block";
        this.classList.add("more-splash");
        document.body.style.overflow = "hidden";  // без промотки во время открытого модального окна
    });

    close.addEventListener('click', function () {
        overlay.style.display = "none";
        more.classList.remove("more-splash"); //здесь уже не this нужен
        document.body.style.overflow = ""; 
    });

  

