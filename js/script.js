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
        more.classList.remove("more-splash"); //здесь уже не this нужен а more
        document.body.style.overflow = ""; 
    });

//var - let diff

function makeArray() {
    var items = [];

    for (var i = 0; i <10; i++) {

        var item = function() {
            console.log(i);
        };
        items.push(item); // запушить в объект результаты
    }
    return items;

}

var arr = makeArray();

arr[1]();
arr[7](); // в результате будет 10, т.к в теле цикла вар дойдет до конца и будет десяткой - создается одна на весь цикл! в каждой итоериции не создается заново
// если в теле цикла var i = 0 поменять на let, то будут разные числа из оюъекта, а не итоговый результат - это отличие поведения в функциях и циклах вар и лет

// стрелочные функции

let fun = () => {
    console.log(this);
};

fun();
// анонинмна, без имени, только в переменную. не может управлять обработчиками событий и рекурсии. Своего контекста вызова нет.

let obj = {
    number: 5,
    sayNumber: function() {
        let say = () => {
            console.log(this);
    };
    say();
} ;

}

obj.sayNumber();
 // сжейнамебер - контект объект (второй случай), т.к. метод объекта. функция внутри метода должна терять свой контекст.
 // сроелочная функция тут возвращает объект, потому что нет своего контекста вызова, потому береет у родителя, а родитель - 
 // функция saymuber, а у нее контекст вызова сам объект.
// где? set interval ajax set time out, eventListener



let btn = document.querySelector(".button");
btn.addEventListener ("click", function() {
    let show = () => {
        console.log(this);
    };
    show(); // нет своего контекста вызова, потому берет у родителя, а это у функции выше, в функция выше - именно кнопка (код) 
    //это всегда эоемент, на который мы повесили этот обработчик
    
});


// default parameters

//ES5
function calcOrDouble(number, basis) {
    basis = basis || 2;
    console.log(number*basis);
};
//ES6
function calcOrDouble(number, basis = 2) {
    console.log(number*basis);
};

calcOrDouble(3,5); //15
calcOrDouble(6); //12 


// Основное отличие между ними: функции, объявленные как Function Declaration, создаются интерпретатором до выполнения кода. метод работает после выполнения запроса

//Поэтому их можно вызвать до объявления, например:

sayHi("Вася"); // Привет, Вася

function sayHi(name) {
  alert( "Привет, " + name );
};

//А если бы это было объявление Function Expression, то такой вызов бы не сработал:

sayHi("Вася"); // ошибка!

var sayHi = function(name) {
  alert( "Привет, " + name );
}; // function expresson - это объвление функции не сразу, а через что-то, например, переменную
// Это из-за того, что JavaScript перед запуском кода ищет в нём Function Declaration (их легко найти: они не являются частью выражений и начинаются со слова function) и обрабатывает их.

//А Function Expression создаются в процессе выполнения выражения, в котором созданы, в данном случае – функция будет создана при операции присваивания sayHi = function...
// Как правило, возможность Function Declaration вызвать функцию до объявления – это удобно, так как даёт больше свободы в том, как организовать свой код.

// Можно расположить функции внизу, а их вызов – сверху или наоборот.
// Функции в JavaScript являются значениями. Их можно присваивать, передавать, создавать в любом месте кода.

//Если функция объявлена в основном потоке кода, то это Function Declaration.
//Если функция создана как часть выражения, то это Function Expression.

//Между этими двумя основными способами создания функций есть следующие различия:
//Function Declaration 	Function Expression
//Время создания 	До выполнения первой строчки кода. 	Когда управление достигает строки с функцией.
//Можно вызвать до объявления 	Да (т.к. создаётся заранее) 	Нет
//Условное объявление в if 	Не работает 	Работает

//SPREAD - разворачивае тмассив данных


let video = ["youtube", "vimeo"],
    blogs = ["wordress", "lj"],
    internet = [video, blogs, "vk", "fb"]; //в таком виде передаются не данные из массива
let video = ["youtube", "vimeo"],
    blogs = ["wordress", "lj"],
    internet = [...video, ...blogs, "vk", "fb"]; //здесь разворачивает данные массива

function log (a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(a + b + c);
};

let numbers = [2, 5, 7];
log(...munbers); // 2 5 7


//сервер 

// get - получить, post - отдать данные
// mamp / open server - если занят порт, то поискать, как поменять

//JSON - javascrpt object notation - обмен данными
// набор пар ключ-значения в парных кавычках

let options = {
    width: 1266;
    height: 768;
    background: "red",
    font: {
        size: "16px",
        color: "#fff"
    }
};
//эти данные отправить на сервер в виде объекта мы не можем, потому нужны методы jsonа - это сами методы
// джаваскрипта встроенные. превращает данные в строку, их ужн можно передать

console.log(JSON.stringify(options)); 
/// все свойства в двойных кавычках всегда - главное отличие обычных и json объектов
console.log (JSON.parse(JSON.stringify(options))); // превращаем в обычный объект при помощи парс и можем с ним работать
//именно так клиентская часть общается с сервером.. преимущества: мало весит, простота чтения, до джсон был xml



// AJAX
// быстрее, без перезагрузки страницы - асинхронность
// конвертер - отдельный файл для сервера (имитация) current.json

let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => { //контекст здесь не нужен, потому стрелочка функция
    let request = new XMLHttpRequest(); // это объект, у него есть свои методы - для работы в асинхронностью

    //request.open(method, url, async, login, pass); // method get / post, url - put' k nashemu serveru - nevazno, gde on. async - по умолчанию тру. при фалс - пока сервер не ответит, не  может взаимодействовать с сервером , логин-пароль если надо только
    request.open("GET", "js/current.json"); // login/pass not needed настройка что и зачем мы делаем
    request.setRequestHeader('content-type', 'application/json: charset=utf-8') //настройка хттп запросов. метод. натсройки запросов. тип контента. тут указывает, что это джсон в кодировке
    //request.send(body); //хттп запрос состоит из заголовка и тела. данные с формы, которые отпр.на сервер
    request.send(); // тело запроса, например форма - данные в бади и отправляем на сервер, не в заголовоках

    // методы XMLHttpReques - самые частые
    // status - http код - отвечает в каком состоянии находится сервер (магаз закрыт)
    //statusText - ok/not found - текстовый ответ
    //responseText или response - текст ответа сервера (те товары, котоыре можно купить в магазе)
    // readyState - текущее состоянии запроса. содержит запрос неск эапов в работе. всего 5. можно найти список

    request.addEventListener('readystatechange', function() { // событие "лоад" не такое гибкое, а вреади можно смотреть, как запрос реагирует и можно отправить уведомления, метод работает с резльатотм реаст стейта
        if (request.readyState === 4 && request.status == 200) { // 4 запрос - все получено и готово
            let data = JSON.parse(request.response); //делает ответ сервера в данные

            inputUsd.value = inputRub.value / data.usd;
        } else {
            inputUsd.value = "Что-то пошло не так.."
        }
    });

});

// работа с сервером. Встроенный в Вс код позволяет работать только с методом ГЕТ. Мамп или опен сервер - с методом пост

// работа с формой, чтобы отправить данные:

let message = { // это для оповщениея пользователя, можно и картинки, не только словами. 
    loading: "Загрузка =)"
    success: "Спасибо, скоро мы с Вами свяжемся!"
    failure: "Что-то пошло не так .. "
};

let form = document.querySelector(".main-form"), // получаем элементы, с которыми будем работать
    input = form.getElementsByTagName("input"),
    statusMessage = document.createElement("div"); // оповещение пользователя. создаем класс и добавляем, в цсс офоормлен стиль по классу (статус)

    statusMesaage.classList.add("status");

// NB! вешают обработчик не на кнопку, а на форму! нам нужно отследивать, когда форма отправляется на сервер.
form.addEventListener("submit", function(event) { //не забыть про ивент, мы с ним работаем
    //чтобы отменить стандартоное повдеение браузера - перезагрузку когда нажимаешь кнопку отправки формы даже при Аязке  - т.к модальное окно?
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open("POST", server.php) // отправляем данные на сервер, поэтому такой метод
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded') // урлл для формы
    // не всегда нужен джсон, можно и форм-дата

    // чтобы отправлять данные, нужно, чтобы в фаорме стояли атрибуты ИМЯ - этобудет ключ, а значение введет пользователь
    let formData = new FormData(form);
    request.send(formData); // те данные, что отправил пользователь с виде body запрос

    request.addEventListener("readystatechange", function() {
        if (request.readyState < 4) {
            statusMessage.innerHTML = message.loading; //вывод сообщения пользователю

        } else if (request.readyState = 4 && request.status == 200) {
            // здесь можно делать уже при загрузке всего - что угодно! прогремс бар?
            statusMessage.innerHTML = message.success; 
        } else {
            statusMessage.innerHTML = message.failure; 
        }

    });

    for (let i = 0; i < input.length; i++) {
        input[i].value = ""; // очистка полей  после отправки инпутов
    }
    
    
    // JSON вариант


 // это отправили для пхп данные, но если сервер на ДЖ или спец.азадча, то надо джсон
 // request.setRequestHeader('content-type', 'application/json: charset=utf-8') надо это и 
 // let obj = {
 //   formData.forEach(function(value, key) {
 //       obj[key] = value; // это не толкько для превращения в джсон объект
    });
    //let json = JSON.stringify(obj);
 };
});

// PROMISE

//чтобы работало везде, нужно найти polyfill  на сайет babel docs устновить

// чтобы промис работал, надо много условий, которые будут выполняться только после чего-то определнного (см. callback функция, но если их будет много - будет коллюэк-хелл :) )
//

let drink = 1;

function shoot(arrow, headshot, fail) {
    console.log("You are doing it..");

    setTimeout(function(){
        Math.random() > .5 ? headshot({}) : fail("You missed");

    }, 300)
};

function(win) {
    console.log("You won!");
    (drink == 1) ? buyBeer() : giveMoney();
} //; в примере у автора нет точки с запятой после эой и еще след двух функций. Почему?

function(loose) {
    console.log("Play again!")
}

function buyBeer() {
    console.log("Вам купили пиво")
}

function giveMoney() {
    console.log("you got money!")
}

shoot({}, 
    function(mark) {
        console.log("You got it");
        win(mark, buyBeer, giveMoney); // цепочка, если 1 события, то еще два 
    }, 
    function(miss) {
        console.error(miss);
        loose();
    };
    )
