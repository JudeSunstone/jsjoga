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
        win(mark, buyBeer, giveMoney); // цепочка, если 1 события, то еще два происходят - оба коллбэк, кол-во может увеличиваться, это неудобно
    }, 
    function(miss) {
        console.error(miss);
        loose();
    };
    );

    /// переделываем в промисы PROMISE

    let drink = 1;

function shoot(arrow) {
    console.log("You are doing it..");
    let promise = new Promise(function(resolve, reject){ // созздание промиса через конструктор
        setTimeout(function(){
            Math.random() > .5 ? resolve({}) : reject("You missed");
    
        }, 300);
    });
    return promise;
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

shoot({})
        .then(mark => console.log("Вы попали в цель!"))
        .then(win)
        .catch(loose) //это все методы и точки с запятыми не нужны, можно в 1 строку, then может быть много
        







        
      //суть ПРОСМИСОВ - во заимодействии с свервером и ajax запросах
// пример взаимодействия с предыдущей работы с формой
// NB!!!!! Разобраться с этим, потому что много неясных моментов

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
function sendForm(elem) {
    elem.addEventListener("submit", function(e) { //не забыть про ивент, мы с ним работаем
    //чтобы отменить стандартоное повдеение браузера - перезагрузку когда нажимаешь кнопку отправки формы даже при Аязке  - т.к модальное окно?
         e.preventDefault();
             elem.appendChild(statusMessage);
             let formData = new FormData(elem);

             function postData(data) {
                 return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                        request.open("POST", server.php) // отправляем данные на сервер, поэтому такой метод
                        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded') // урлл для формы
    // не всегда нужен джсон, можно и форм-дата 
                        request.onreadystatechange = function(){
                        if (request.readyState < 4) {
                            resolve() //вывод сообщения пользователю

                        } else if (request.readyState = 4) {
                            if (request.status == 200 && request.status <3)
                            resolve()
                        } else {
                            reject()
                        }
                                
                            }
}
request.send(data)
})
    
function clearInput() {
    for (let i = 0; i < input.length; i++) {
        input[i].value = ""; // очистка полей  после отправки инпутов
}
    }
    
postData(formData)  
    .then(() =>   statusMessage.innerHTML = message.loading) //вывод сообщения пользователю
    .then(() => {
        thanksModal.style.display = "block"; //в цсс должно быть
        mainModal.stule.display = "none";
        statusMessage.innerHTML = " ";
    })
    .catch(() => statusMessage.innerHTML = message.failure )
    .then(clearInput) // then после catch выполняет ВСЕГДА
});

sendForm(form);
sendForm(formBottom);
    










 

// Слайдер на сайте
//его суть - жкономия места на странице. оформление может быть разное. говорят, что каждый разработчик должен написать свой слайдер :)
// слайдер должен подстарвиться под кол=во слайдов, что есть внутри + под адаптивность (с конкретными величинами - не универсален)
let slideIndex = 1, // переменная, которая отвечает за тот слайд, который показывают в текущий момент - это будет меняться
    slides = document.querySelectorAll(".slider-item"),
    prev =  document.querySelector(".prev"),
    next = document.querySelector(".next),
    dotsWrap =  document.querySelector(".slider-dots"),
    dots =  document.querySelectorAll(".dot");

    // функция, которая скрывает все, кроме первого слайда. принимает аргумент, который показывает тот слайд, который мы хотим

    showSlides(slideIndex); //ее млэно и до вызвать

    function showSlides(n) { //один агрумент, чтобы в будущем нам было возможно переключить слайды
        
        if (n > slides.length) {
            slideIndex = 1; // если последняя картика, то переключается на первый
        }
        if (n < 1) {
            slideIndex = slides.length; //если с первого. то кидает на последний слайд при нажатии стрелки, например
        }

        slides.forEach((item) => item.style.display = "none"); //перебираем. передаем один агрумент в фунцкию
        // 2 способ  - делаем то же самое! но чуть менее современно
        // for (let i = 0; i < lides.lenght; i++) {slides[i].style.display = "none";    } 
        dots.forEach((item) => item.classList.remove("dot-active")) //когда переберем, то будет названчать точкам класс "актив" только тем, что нужны и соотвествует текущему слайду // remove уже класс, потому точку не надо
        

        slides[slideIndex - 1].style.display = "block"; // нумерация начинается в объектах с нуля, потому мы пишем минут, чтобы slideIndex = 1 работало
        dots[slideIndex - 1].classList.add ("dot-active"); 
    };

    function plusSlides(n) {
        showSlides(slideIndex += n); //функция, которая переключает картинки - по индексу? узнаем, какой надо показать и сразу вызываем функцию - в качестве аргумента
    }

    function currentSlide(n) {
        showSlides(slideIndex = n); // точка соединяется со слайдом?..какой именно, кликаем на 4 точку, передается цифра 4
    }

    prev.addEventListener('click', function(){ //реализуем с пред.функциями 
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1); //увеличиваем слайдИндекс на 1. Можно и больше цифры, кстати, по два слайда и т.д
    });

    dotsWrap.addEventListener("click", function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.taget == dots[i-1]) { //из-за того, что объект начинается с нуля, то нам надо добавить на одну итерацию больше в цикле (+1) к кол-ву точек,
                currentSlide(i);
            }
        }}
    });


    // КАЛЬКУЛЯТОР

    // считается, что конверсия на сайтах, где есть калькулятор почти на 25% выше

    let persons = document.querySelectorAll(."counter-block-input") [0], //первый инпут из калькулятора
        restDays = document.querySelectorAll(."counter-block-input") [1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0, //изначальная сумма
        daysSum = 0,
        total = 0; // последнее значение, что нужно


        totalValue.innerHTML = 0; //в хтмл меняет заданную сумму на ноль

        //отслеживать, что вводит пользователь input / change

        persons.addEventListener("change", function() { //нельзя стрелочные функции, потому что ббудет нужен контекст вызова
            personsSum = +this.value; //при контекст можем получить элемент после change
            total = (daysSum + personsSum)*4000; //формулу прежоставляет заказчик

            if(restDays.value == "") {
                totalValue.innerHTML = 0; //если не азполнено одно из полей - второе, то сумма не будет меняться (0)
            } else {
                totalValue.innerHTML = total; // если оба поля заполнены, то выводим сумму в свое отдельное поле
            }

        });

        restDays.addEventListener("change", function() { //нельзя стрелочные функции, потому что ббудет нужен контекст вызова
            daysSum = +this.value; //при контекст можем получить элемент после change
            total = (daysSum + personsSum)*4000; //формулу прежоставляет заказчик

            if(persons.value == "") {
                totalValue.innerHTML = 0; //если не азполнено одно из полей - второе, то сумма не будет меняться (0)
            } else {
                totalValue.innerHTML = total; // если оба поля заполнены, то выводим сумму в свое отдельное поле
            }

        }); // !!!!!!!! здесь БАГ - если заполнить только второе поле без первого - сумма будет показываться. ПОЧЕМУ?

        
        // в коде при выпадающем листе есть значки value. их и будем использовать - в консиоли разработчика видно
       // при выборе баз должно срабтывать только тогда, когда всё заполнено
        place.addEventListener("change", function(){
            if (restDays.value == "" && persons.value == "") {
                totalValue.innerHTML = 0; 
            } else {
                let a = total; //содаем доп.переменную. выбор базы - модификатор нашей стоимости. если так не сделать, то каждый раз как будем менять, будет заново умножаться?..
                totalValue.innerHTML = a * this.options[this.selectedIndex.value]   //value достаетм у опшнов
            }
        });





// LOCAL STORAGE 



// - позволяет работать с данными без сервера, хранить их в браузере пользователя?
// это свойство глобального объекта window, объекти уникальный для каждого домена по соображениям безопасности
// может работать только с одной вкладкой
// в панели разработчика можно смотреть локал сторадж, там есть ключ и значения 
// это настройка сайта, чтобы запомнить решения какие-то, принятые пользователем, посомтреть, гед пользователь остановился смотреть видео - запомнить или как была заполнена форма
// около 5 мб памяти. Малеьнкая база данных, встроенная в браузер

// Еще стоит сказать, что у браузера существует клон localStorage, который называется sessionStorage. Их разница только в том, что последний хранит данные только для одной вкладки (сессии) и просто очистит свое пространство как только мы закроем вкладку


localStorage.setItem("number", 1) //в параметрах - ключ и его значение

// чтобы вятнуть знаечния из ключа

console.log(localStorage.getItem("number")); // в консоли будет 1
localStorage.removeItem("number"); //удаляем значение
localStorage.clear(); // полнстью очищаем все хранилище

// чтобы в форме помнило логин и пароль - rememmber me 
window.addEventListener("DOMContentLoeaded", function() {

    let checkbox = document.getElementByID("rememberME"),
        change = document.getElementById("change"),
        form = document.getElementsByTagName("form") [0]; //только первый

    if(localStorage.getItem("isChecked") === "true") { //если оно тру, то даже после обновления всегда будет отменным
        checkbox.checked = true; // checked - cвойство чекбокса
    }; //значение отдается в виде строки, потому пишем в качныках

    if(localStorage.getItem("bg") === "changed") {
        form.style.backgroundColor = "#FF4766"
    };

    checkbox.addEventListener("click", function() {
        localStorage.setItem("isChecked", true); // когда нажимает, то значение появляет, но при обновлении он тоже остается, хотя должен исчезнуть
    });

    change.addEventListener("click", function() {
        localStorage.setItem("bg", "changed");
        form.style.backgroundColor = "#FF4766";
    });
    
    let persone = {
        name: "Al",
        age: 30,
        tech: ["mobile", "notebook"]
    } // получи объект при получении это обхекта .. в виде надпписи. надо превратить в обхект, понятный для браузера
    //поэтому надо превриться в такой обхект, что будет понятен серверу или базе данных . - json
    let searializedPErsone = JSON.stringify(persone);
    localStorage.setItem("Al", searializedPErsone); //сохранили объект 

    console.log(JSON.parse((localStorage.getItem("Alex"))); // надо вернуть в объект, который спонятен для Js
}; 

    
}); 


// ОШИБКИ - разные, как избежать

// на работающих сайтах можно всегда найти ошибки - куски кода не работают. Но это нормально.
// конструкция try catch  -служит для перехвата ошибок. два блока - трай и кэтч


try {
    console.log("Начинаем работу") //если запустить в консоль. то просто выполняется эта часть, т.к. первая, если ошибка, по пойдет блок кэтч
    console.log(a)
    console.log("результат") //сюда не доходит, потому что словили ошибку, а в консоли пишут, какую именно - рефернс эррор
} catch(error)  { // передает как аргумент и может рассказать о проблеме
    console.log(error);  //все ошибки, потом можно рооедлить нато, что именно нам надо 
    console.log(error.name); // если нет ошибок, то это игнорируется. неём - имя ошибки , референс, синтакс..
    console.log(error.message); // описание ошибки, а из нот девайнд
    console.log(error.stack); // набор вызовов, которые  привелии к этой ошибке at.. и строчка кода
    console.log("Мы получили оишбку: ${error.name}");
}


console.log("A я буду работать дальше")
// оно будет работать послеш ошибки вполне спокойно после этой всеё конструкции
// так можно проверить на ошибки



//создаем эмуляию джсон-объекта, чтобы проверить, как работает еесли ошибка с свервера, анпример

let json = {"id: 2"} //представим, что данные приходят от сервера, будем парсить в обычный объект

try {
    let user = JSON.parse(json); // если вместо джсон поставить дата, то будет ошибка и все ее типы
    console.log(user);

    if (!user.name) { //оно же из данных не пришло - ися
        throw new Error("в этих данных нет имени"); // throw это для создания своих ошибок, чтобы при различных усовиях выкидывать в кэтч
    }

} catch(error)  { // передает как аргумент и может рассказать о проблеме
    console.log(error);  //все ошибки, потом можно рооедлить нато, что именно нам надо 
    console.log(error.name); // если нет ошибок, то это игнорируется. неём - имя ошибки , референс, синтакс..
    console.log(error.message); // описание ошибки, а из нот девайнд
    console.log(error.stack); // набор вызовов, которые  привелии к этой ошибке at.. и строчка кода
    console.log("Мы получили оишбку: ${error.name}");
} finally { //не обязательная часть, выполнится всегда  - задача завершить выполнение операции при любом варианте развития
    console.log("а я выполнюсь всегда-всегда)

}
console.log("A я буду работать дальше");







//frameworks

/// J-query


//сначала пожключаем локально, скачав или через облако, скопировав ссылку с сайта
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

//нативный вариант и бибилотека
// нативный 
document.getElementByID("btn");
// j-query 
$("#btn"); // доллар - это основной знакчок дж-квери, берет все, что подходит под то условие. аналогична обычному циклу forEach
// етсь селекторы дж-квери и прочее, можно посмотреть 
// есть эффекты-анимации, коллюэки, события манпуляции с ДОМ, аякс и другое http://jquery.page2page.ru/index.php5/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0 

$(document).ready(function() {
    //добавляет в заданный хтмл класс актив, чтобы при наведении мышкой выделялось и когда мышка выходит - пропадало выделение 
    $(".list-item:first").hover(function() { //первый (фильтр) элемент
        $(this).toggleClass("active");
    });
    $(".list-item:eq(2)").on("click", function() {//получаем второй элемент + добавляем обработчик собитий
         $(".image:even").fadeToggle("slow");  //добавим втроенную в дж-квери анимацию //фильтр, четный элемент. Написать параметры анимации можно словами и цифрами
    }); 

    $(".list-item:eq(4)").on("click", function() { //делаем свою анимацию
        $(".image:odd").animate(
            {
                opacity: "toggle",
                height: "toggle"
            }, 30000
        );
    }); //код меньше при написании. чистный джс только когда небольшие задачи, без подключения библиотеки, т.к весит меньше, а в принципе сейчас делает всё то же самое
    //доллар по сути - это метод форИч - document.querySelectorForAll(".").gorEach();
    // работа с классами теперь .classList
    // обработчик on - это addEventListener теперь
    // работа с Ajax было удобно, а теперь в нативное джс есть fetch
    // анимации к дж-квери - а ьеперь это можно делать в ЦСС3 и это лучше, а в нативке есть анимации адаптированные - но, метод еще немого экспериментальный, но в целом как в дж-квери
    // сейчас много нативки, но дж-квери тоже пользуется, многие бибилотеки и вордпресс, например, бутстрап. ОСновы знать надо.
});



// ANGULAR


//single page application  - работает на одной странице. например, гугл почта работает как приложение, все подргужается автоматически, хтмл и джаваскрип, и цсс. работает постоянно
// Ангуляр - это фреймворк (большое и готовое, цельное решение, а бибиотека - набоо отдельных жлементов для создания цельной картины - кусочки лего, а фреймвор - готовый лего) на основе тайпскрипта
// англяур тяжелый,  много ресурсов берет по сравнению с остальными фреймворками, по трендам испоьзования утуспает реакту
// гугл поддерживает. где: букинг  ипрочее

// чтобы начать работу:
// 1. установить node js + npm пакетами 
// 2. ознакомиться с трайпскриптом
// 3. сборщик модулей - вебпак. Будет много файлов при разработке на Англуяре, потому в конце надо будет это собирать в один большой файл при помощи вебпака
// 4. MVC - щаблон проектирования. разделение логики приложения на визульаную часть - v, контролирующая часть - c, m - выполянющую какую-то действие
// 5. Ангуляр - на фо сайте етсть норм документация. сообщество большое тоже. 


// в файле app.module.ts
import { Component } from "@angular/core";

@Component ( {
    selector: "my-app",
    template: "<label>Введите имя: </label>"
                <input [(ngModel)]="name" placeholder="name">
                <h1>Welcome {{name}}!</h1>
})

export class AppComponent {
    name = "";
//};


// REACT 
//как и Вью - библиотека! собрать по частям, добавляя определенные пакеты
// в работе используется смесь хтмл и джаваскрипт, потом преобразуется в джс, что ломает логику обычной верстки
// разработчик - фейсбук, по трендами и вакансиям - нормально

// чтобы работать, надо:
 // 1. node js
// 2. babel в ангуляре тоже может, но тут более атуален, т.к. собирает по кусочкам проект. 
// это софтк. который переписывает ES6 в ES5 - который более универсален
//большая часть реакта написана на современном стандарте, поэтому это необходимо
// 3. препроцессор JSX
//4. React - документация на сайте хорошая + туториалы 





// VUE

// самый "чистый! и легкий из всех этих инструментов, очень легко читаем
// хтмл. скрипты и стили разделены соотественно
// для работы:
// node js, babel, webpack, vue

// самое простое - ангуляр, проекты больше
// гибость, настройка проекта под себя, натвиный дж-с + хмтл - реакт
// чистый, красивый код быстро - vue







// Инкапсуляция, геттеры и сеттеры

// инкапсуляция - отделение кода программы от интерфецса ? чтобы пользователь не видел. защита от вмешательства пользователя, чтобы ничего не мог поменять

function User (name, age) {
    this.name = name;
    this.age = age;

    this.say = function () {
        console.log(`имя пользователя ${this.name}, возраст: ${this.age}`); //this для конкретного пользователя!
    };
};

let user = new User ("Rei", 25);
console.log(user.name);
console.log(user.age);
user.say();
 
user.age = 30; //если добавим это здесь, то выходные данные поменяются, потмоу код не идеальный. как будто двигатель в салоен, что кажды может деталь поменять, а нельзя
user.name = "alex";
user.say(); 


//новый вариант

function User (name, age) {
    this.name = name;
    let userAge = age; 

    this.say = function () {
        console.log(`имя пользователя ${this.name}, возраст: ${this.userAge}`); //this для конкретного пользователя!
    };
};

let user = new User ("Rei", 25);
console.log(user.name);
console.log(user.userAge); //в этом варианте мы получим undefined. именно для этоно - чтобы работать с данными - нужны геттеры и сеттеры и чтбы пользователь ничего не мог менять

user.say();
 
// делаем правильно:

function User (name, age) {
    this.name = name;
    let userAge = age; 

    this.getAge = function() { // так мы получаем возраст, записанный в объекте и ничего снаружи его поменять тоже не может. геттер.

        return userAge;
    };

    this.setAge = function(age) { //mетод устанавливает значение. в него помещается какая-то переменная 
// преимущество сеттеров. когда устанавливает user.age = 30, то мы не можем менять значение и проверять, цифры ли тут
        if (typeOf age === "number" && age > 0 && age < 110) {
            userAge = age;
        } else {
            console.log("error");
        }
};
    this.say = function () {
        console.log(`имя пользователя ${this.name}, возраст: ${this.userAge}`); //this для конкретного пользователя!
    }; 
};

let user = new User ("Rei", 25);
console.log(user.name);
console.log(user.userAge); //в этом варианте мы получим undefined. именно для этоно - чтобы работать с данными - нужны геттеры и сеттеры и чтбы пользователь ничего не мог менять
user.say(); // здеьс имя Иван. а возраст undefined
console.log(user.getAge()); // здесь 25
user.setAge(30);
console.log(user.getAge()); // проверяем, что теперь меняется на 30 



///
/* В объектно-ориентированном программировании свойства и методы разделены на 2 группы:

    Внутренний интерфейс – методы и свойства, доступные из других методов класса, но не снаружи класса.
    Внешний интерфейс – методы и свойства, доступные снаружи класса.

Если мы продолжаем аналогию с кофеваркой – то, что скрыто внутри: трубка кипятильника, нагревательный элемент и т.д. – это внутренний интерфейс.

Внутренний интерфейс используется для работы объекта, его детали используют друг друга. Например, трубка кипятильника прикреплена к нагревательному элементу.

Но снаружи кофеварка закрыта защитным кожухом, так что никто не может добраться до сложных частей. Детали скрыты и недоступны. Мы можем использовать их функции через внешний интерфейс.

Итак, всё, что нам нужно для использования объекта, это знать его внешний интерфейс. Мы можем совершенно не знать, как это работает внутри, и это здорово.

Это было общее введение.

В JavaScript есть два типа полей (свойств и методов) объекта:

    Публичные: доступны отовсюду. Они составляют внешний интерфейс. До этого момента мы использовали только публичные свойства и методы.
    Приватные: доступны только внутри класса. Они для внутреннего интерфейса. 
    
    Защищённые поля не реализованы в JavaScript на уровне языка, но на практике они очень удобны, поэтому их эмулируют.
    


    Защищённые свойства обычно начинаются с префикса _.

Это не синтаксис языка: есть хорошо известное соглашение между программистами, что такие свойства и методы не должны быть доступны извне. Большинство программистов следуют этому соглашению.

Так что наше свойство будет называться _waterAmount:


Давайте сделаем свойство power доступным только для чтения. Иногда нужно, чтобы свойство устанавливалось только при создании объекта и после этого никогда не изменялось.

Это как раз требуется для кофеварки: мощность никогда не меняется.

Для этого нам нужно создать только геттер, но не сеттер:


Приватное свойство «#waterLimit»
Новая возможность
Эта возможность была добавлена в язык недавно. В движках JavaScript пока не поддерживается или поддерживается частично, нужен полифил.

Есть новшество в языке JavaScript, которое почти добавлено в стандарт: оно добавляет поддержку приватных свойств и методов.

Приватные свойства и методы должны начинаться с #. Они доступны только внутри класса.

Например, в классе ниже есть приватное свойство #waterLimit и приватный метод #checkWater для проверки количества воды:





https://learn.javascript.ru/modules-intro

Модуль – это просто файл. Один скрипт – это один модуль.

Модули могут загружать друг друга и использовать директивы export и import, чтобы обмениваться функциональностью, вызывать функции одного модуля из другого:

    export отмечает переменные и функции, которые должны быть доступны вне текущего модуля.
    import позволяет импортировать функциональность из других модулей.

По мере роста нашего приложения, мы обычно хотим разделить его на много файлов, так называемых «модулей». Модуль обычно содержит класс или библиотеку с функциями.

В модулях всегда используется режим use strict. 
Каждый модуль имеет свою собственную область видимости. Другими словами, переменные и функции, объявленные в модуле, не видны в других скриптах.
Модули должны экспортировать функциональность, предназначенную для использования извне. А другие модули могут её импортировать.

Если нам нужно сделать глобальную переменную уровня всей страницы, можно явно присвоить её объекту window, тогда получить значение переменной можно обратившись к window.user. Но это должно быть исключением, требующим веской причины.


Так как модули поддерживают ряд специальных ключевых слов, и у них есть ряд особенностей, то необходимо явно сказать браузеру, что скрипт является модулем, при помощи атрибута <script type="module">.

Вот так:
Результат
say.js
index.html

<!doctype html>
<script type="module">
  import {sayHi} from './say.js';



Если один и тот же модуль используется в нескольких местах, то его код выполнится только один раз, после чего экспортируемая функциональность передаётся всем импортёрам.

Во-первых, если при запуске модуля возникают побочные эффекты, например выдаётся сообщение, то импорт модуля в нескольких местах покажет его только один раз – при первом импорте


Если модуль импортируется в нескольких файлах, то код модуля будет выполнен только один раз, объект admin будет создан и в дальнейшем будет передан всем импортёрам.

Все импортёры получат один-единственный объект admin:

// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

// Оба файла, 1.js и 2.js, импортируют один и тот же объект
// Изменения, сделанные в 1.js, будут видны в 2.js


Объект import.meta содержит информацию о текущем модуле.

Содержимое зависит от окружения. В браузере он содержит ссылку на скрипт или ссылку на текущую веб-страницу, если модуль встроен в HTML:

В модуле «this» не определён
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>

Модули являются отложенными (deferred)

Модули всегда выполняются в отложенном (deferred) режиме, точно так же, как скрипты с атрибутом defer (описан в главе Скрипты: async, defer). Это верно и для внешних и встроенных скриптов-модулей.

Другими словами:

    загрузка внешних модулей, таких как <script type="module" src="...">, не блокирует обработку HTML.
    модули, даже если загрузились быстро, ожидают полной загрузки HTML документа, и только затем выполняются.
    сохраняется относительный порядок скриптов: скрипты, которые идут раньше в документе, выполняются раньше.

Как поб��чный эффект, модули всегда видят полностью загруженную HTML-страницу, включая элементы под ними.

В реальной жизни модули в браузерах редко используются в «сыром» виде. Обычно, мы объединяем модули вместе, используя специальный инструмент, например Webpack и после выкладываем код на рабочий сервер.

Одно из преимуществ использования сборщика – он предоставляет больший контроль над тем, как модули ищутся, позволяет использовать «голые» модули и многое другое «своё», например CSS/HTML-модули.

Сборщик делает следующее:

    Берёт «основной» модуль, который мы собираемся поместить в <script type="module"> в HTML.
    Анализирует зависимости (импорты, импорты импортов и так далее)
    Собирает один файл со всеми модулями (или несколько файлов, это можно настроить), перезаписывает встроенный import функцией импорта от сборщика, чтобы всё работало. «Специальные» типы модулей, такие как HTML/CSS тоже поддерживаются.
    В процессе могут происходить и другие трансформации и оптимизации кода:
        Недостижимый код удаляется.
        Неиспользуемые экспорты удаляются («tree-shaking»).
        Специфические операторы для разработки, такие как console и debugger, удаляются.
        Современный синтаксис JavaScript также может быть трансформирован в предыдущий стандарт, с похожей функциональностью, например, с помощью Babel.
        Полученный файл можно минимизировать (удалить пробелы, заменить названия переменных на более короткие и т.д.).

Если мы используем инструменты сборки, то они объединяют модули вместе в один или несколько файлов, и заменяют import/export на свои вызовы. Поэтому итоговую сборку можно подключать и без атрибута type="module", как обычный скрипт:



Экспорт до объявления

Мы можем пометить любое объявление как экспортируемое, разместив export перед ним, будь то переменная, функция или класс.

Например, все следующие экспорты допустимы:

// экспорт массива
export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// экспорт константы
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// экспорт класса
export class User {
  constructor(name) {
    this.name = name;
  }
}



Обратите внимание, что export перед классом или функцией не делает их функциональным выражением. Это всё также объявление функции, хотя и экспортируемое.

!!!!!!!!!
Большинство руководств по стилю кода в JavaScript не рекомендуют ставить точку с запятой после объявлений функций или классов.

Также можно написать export отдельно.

Здесь мы сначала объявляем, а затем экспортируем:

// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // список экспортируемых переменных


Обычно мы располагаем список того, что хотим импортировать, в фигурных скобках import {...}, например вот так:

// 📁 main.js
import {sayHi, sayBye} from './say.js';

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!

Но если импортировать нужно много чего, мы можем импортировать всё сразу в виде объекта, используя import * as <obj>. Например:

// 📁 main.js
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');

Экспортировать «как»

Аналогичный синтаксис существует и для export.

Давайте экспортируем функции, как hi и bye:

// 📁 say.js
...
export {sayHi as hi, sayBye as bye};

Теперь hi и bye – официальные имена для внешнего кода, их нужно использовать при импорте:

// 📁 main.js
import * as say from './say.js';

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!



На практике модули встречаются в основном одного из двух типов:

    Модуль, содержащий библиотеку или набор функций, как say.js выше.
    Модуль, который объявляет что-то одно, например модуль user.js экспортирует только class User.

По большей части, удобнее второй подход, когда каждая «вещь» находится в своём собственном модуле.

Естественно, требуется много файлов, если для всего делать отдельный модуль, но это не проблема. Так даже удобнее: навигация по проекту становится проще, особенно, если у файлов хорошие имена, и они структурированы по папкам.


Ставим export default перед тем, что нужно экспортировать:

// 📁 user.js
export default class User { // просто добавьте "default"
  constructor(name) {
    this.name = name;
  }
}

Заметим, в файле может быть не более одного export default.

…И потом импортируем без фигурных скобок:

// 📁 main.js
import User from './user.js'; // не {User}, просто User

new User('John');

Импорты без фигурных скобок выглядят красивее. Обычная ошибка начинающих: забывать про фигурные скобки. Запомним: фигурные скобки необходимы в случае именованных экспортов, для export default они не нужны.
Именованный экспорт 	Экспорт по умолчанию
export class User {...} 	export default class User {...}
import {User} from ... 	import User from ...

Технически в одном модуле может быть как экспорт по умолчанию, так и именованные экспорты, но на практике обычно их не смешивают. То есть, в модуле находятся либо именованные экспорты, либо один экспорт по умолчанию.

Обратите внимание, что инструкции import/export не работают внутри {...}.



Инструкции экспорта и импорта, которые мы рассматривали в предыдущей главе, называются «статическими». Синтаксис у них весьма простой и строгий.

Во-первых, мы не можем динамически задавать никакие из параметров import.

Путь к модулю должен быть строковым примитивом и не может быть вызовом функции. Вот так работать не будет:

import ... from getModuleName(); // Ошибка, должна быть строка

Во-вторых, мы не можем делать импорт в зависимости от условий или в процессе выполнения.

if(...) {
  import ...; // Ошибка, запрещено
}

{
  import ...; // Ошибка, мы не можем ставить импорт в блок
}

Всё это следствие того, что цель директив import/export – задать костяк структуры кода. Благодаря им она может быть проанализирована, модули могут быть собраны в один файл специальными инструментами, а неиспользуемые экспорты удалены. Это возможно только благодаря тому, что всё статично.

Но как мы можем импортировать модуль динамически, по запросу?
Выражение import()

Выражение import(module) загружает модуль и возвращает промис, результатом которого становится объект модуля, содержащий все его экспорты.

Использовать его мы можем динамически в любом месте кода, например, так:

let modulePath = prompt("Какой модуль загружать?");

import(modulePath)
  .then(obj => <объект модуля>)
  .catch(err => <ошибка загрузки, например если нет такого модуля>)

Или если внутри асинхронной функции, то можно let module = await import(modulePath).

Например, если у нас есть такой модуль say.js:

// 📁 say.js
export function hi() {
  alert(`Привет`);
}

export function bye() {
  alert(`Пока`);
}

…То динамический импорт может выглядеть так:

let {hi, bye} = await import('./say.js');

hi();
bye();

А если в say.js указан экспорт по умолчанию:

// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}

…То для доступа к нему нам следует взять свойство default объекта модуля:

let obj = await import('./say.js');
let say = obj.default;
// или, одной строкой: let {default: say} = await import('./say.js');

say();

Вот полный пример:


Динамический импорт работает в обычных скриптах, он не требует указания script type="module".


Экспорт

Ключевое слово export, стоящее перед объявлением переменной (посредством var, let, const), функции или класса экспортирует их значение в остальные части программы 1. В нашем примере calculator/lib/calc.js содержит следующий код:

// calculator/lib/calc.js
let notExported = 'abc';
export function square(x) {
    return x * x;
}
export const MY_CONSTANT = 123;

Этот модуль экспортирует функцию square и значение MY_CONSTANT.
Импорт

main.js, другой модуль, импортирует square с calc.js:

// calculator/main.js
import { square } from 'lib/calc';
console.log(square(3));


https://idg.net.ua/blog/uchebnik-css/ispolzovanie-css/otnositelnyj-i-absolyutnyj-put-k-fajlu !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 


main.js ссылается на calc.js посредством идентификатора модуля — строки «lib/calc». По умолчанию интерпретацией идентификатора модуля является относительный путь к импортируемому модулю. Обратите внимание, что, при необходимости, вы можете импортировать несколько значений:

// calculator/main.js
import { square, MY_CONSTANT } from 'lib/calc';

Вы также можете импортировать модуль как объект, значениями свойств которого будут экспортированные значения:

// calculator/main.js
import 'lib/calc' as c;
console.log(c.square(3));

Если вам неудобно использовать имена, определенные в экспортируемом модуле, вы можете переименовать их при импорте:

// calculator/main.js
import { square as squ } from 'lib/calc';
console.log(squ(3));

Экспорт по умолчанию

Иногда модуль экспортирует только одно значение (большой класс, например). В таком случае удобно определить это значение как экспортируемое по умолчанию:

// myapp/models/Customer.js
export default class { // анонимный класс
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
};

Синтаксис импорта таких значений аналогичный обычному импорту без фигурных скобок (для простоты запоминания: вы не импортируете что-либо с модуля, а импортируете сам модуль):

// myapp/myapp.js
import Customer from 'models/Customer';
let c = new Customer(0, 'Jane');

Встроенные модули

Другим вариантом использования может быть предотвращение того, чтобы переменные становились глобальными. На данный момент, например, для этой цели лучше всего использовать самовызывающуюся функцию 2:

<script>
    (function () {  // начало самовызывающейся функции
        var tmp = …;  // не станет глобальной
    }());  // конец самовызывающейся функции
</script>

В ECMAScript 6 вы можете использовать анонимный внутренний модуль:

<script>
    module {  // анонимный внутренний модуль
        let tmp = …;  // не станет глобальной
    }
</script>

Кроме того, что такая конструкция проще с точки зрения синтаксиса, ее содержание автоматически отображается в strict mode 3.

Обратите внимание, что не обязательно осуществлять импорт внутри модуля. Инструкция import может использоваться в контексте обычного скрипта.
Альтернатива встроенному экспорту

Если не хотите вставлять export-ы в код, то можно все экспортировать позже, например, в конце:

let notExported = 'abc';
function square(x) {
    return x * x;
}
const MY_CONSTANT = 123;

export { square, MY_CONSTANT };

Также можно переименовывать значения во время экспорта:

export { square as squ, MY_CONSTANT as SOME_CONSTANT };

Осуществление реэкспорта

Можно реэкспортировать значения из другого модуля:

export { encrypt as en } from 'lib/crypto';

Также вы можете реэкспортировать все сразу:

export * from 'lib/crypto';

API загрузки модулей ECMAScript 6

В дополнение к декларативному синтаксису для работы с модулями, в стандарте также присутствует программный API. Он позволяет делать две вещи: программно работать с модулями и скриптами и настраивать загрузку модулей.
Импорт модулей и загрузка скриптов

Вы можете программно импортировать модули, используя синтаксис, напоминающий AMD:

System.import(
    ['module1', 'module2'],
    function (module1, module2) {  // успешное выполнение
        …
    },
    function (err) {  // ошибка
        …
    }
);

Среди прочего, это делает возможной условную загрузку модулей.

System.load() работает аналогично с System.import(), но загружает файлы скриптов вместо импорта модулей.
Настройка загрузки модулей

API загрузки модулей имеет различные хаки для настройки. Несколько примеров их возможностей:

    настройка отображения идентификатора модуля;
    проверка валидности модуля при импорте (к примеру, посредством KSLint или JSHint);
    автоматическая трансляция модулей при импорте (они могут содержать код CoffeeScript или TypeScript);
    использовать существующие модули (AMD, Node.js).

Вы должны сами реализовать эти вещи, но хаки для них предусмотрены в стандарте.
Используем модули ECMAScript 6

Два наиболее свежих проекта, дающих возможность использовать модули ECMAScript 6:

    ES6 Module Transpiler: позволяет писать свои модули, используя некую часть стандарта ECMAScript 6 (грубо говоря, ECMAScript 5 + экспорт + импорт), и компилирует их в модули AMD или CommonJS. Статья Райана Флоренца (Ryan Florence) детально объясняет этот подход.

    ES6 Module Loader: позволяет использовать API загрузки модулей ECMAScript 6 в современных браузерах. Чтобы открыть для себя мир модулей, используйте API:

    System.baseURL = ‘/lib’; System.import(‘js/test1’, function (test1) { test1.tester(); });

В реальных модулях вы используете ECMAScript 5 + экспорт + импорт. Например:

export function tester() {
    console.log('Привет!');
}

Остальные проекты:

    require-hm: плагин для RequireJS, позволяющий загружать модули ECMAScript 6 (только ECMAScript 5 + экспорт + импорт). Статья Каолана Макмахона (Caolan McMahon) объясняет, как он работает. Предупреждение: плагин использует более старый синтаксис.
    Traceur (компилятор ECMAScript 6 в ECMAScript 5): частично поддерживает модули, возможно, в конечном счете будет поддерживать их полностью.
    TypeScript TypeScript (грубо говоря, ECMAScript 6 и поддержка статической типизации): компилирует модули из внешних файлов (которые могут использовать большую часть ECMAScript 6) в AMD или CommonJS.





    */



// модули призваны прятать код от пользователя, позволяют избежать загряжзнения глобального пространства
// пользы - независимость, чистота глобального пространства (мало переменнных) + избежать конфликта потовряющимим именами + повторное использование!

// все фунции из проекта (мэйн) можно ращбить на части и потом соединить
//создадим модуль с табами - делаем отдельный джаваскрипт, помещает туда весь код табов

//чтобы использовать этот код в другом файле добавляем функцию

function tabs () {
    //код
}; 

module.exports = tabs;  // посде этого можно эту фунцию везде использовать. скобки не нужны, мы не вызываем её

// когда мы все из мейна удаляем, то этот код надо заменить чем-то

// внутри 

window.addEventListener('DOMcontentLoaded', function () {
    'use strict'; 
    let calc = require("./parts/calc.js"), //все табы в папке партс
calc();
form(); //потом вызываем модуль

});

// далее работа в cmd  - !!!! по видео не получается пока что подключиться туда cd webpackTest 
// папку вебпак тест надо создать в саомм проекте, и вебпаком его просто называть нельзя, была бы ошибка
// потом в терминал написать npx webpack и запустить
// потом все запускается, в папке dist (??) образуется bundle.js
// в hmtl потом в конце файла подключить в скрипте "../dist/bundle.js"

// настроиваем сборщик дальше. в папке есть файл webpack.config.js  - это другой, старый метод, сейчас можно делать, как было скзаано ранее

// рассматриваем старый путь сборки:
// mode - 3 штуки, на сайте написано. для раззработки, продакшена, никакой - от этого зависит скорость работы и подключаемые плагины
// точка входа - entry  - откуда файл начинает работа, т.е. файл. где прописаны все зависимости нашего кода (script.js), например. Если несколько файлов, то нужно заключить в объект app : ссылка
// output (объект) - куда будут все зависимости. сздаем название файла, котоырй в итоге и получится (filename: bundle.js  - f.e) если не пропишем путь к файлу. то будет в папке dist (path: __dirname) - если надо куда-то + "/dist/js"
//  watch: true - будет автоматически собирать наши файлы и отслеживать проект
// devtool: "source map" - собрали в проект js, минифицировали т.д, но вдруг в этом коде ошибка или кто-то еще хочет что-то сделать., не копаясь в исходниках. потому нуэна технология, которая хранит информацию об исъодниках и их месторасполжении
// например, в панели разработчика можно увидеть источнки / source, откуда получаются файлы и скрипты на странице, например, вебпак - там можем видеть как выглядел изначально до сжатия и минифицирования
// в документации вебпака можно уввидеть размые режими и чем отличаются. обычно обычно суорс мап
// потом идет большой объект module
// в частности можно установить babel как модуль вебпака 
//объявляем в обхекте свой объкт rules - test *- проврка, чтобы файлы были джаваскриптовыми /\.js$/  - регулярка
// use: объект, где loader - babel-loader?optional[]=runtime; - это надо напрписать в терминале npm babel-loader   ----  options: { presets - шаблонные натсройки для плаигна - самый популярный дыльше - цели, чтобы все работало во всех версиях: [ [@babel/env], { targets: { edge: "17", firefox: "60", chrome: "67". safari: "11.1", ie: "11"}} useBuiltIns: "usage"]}
// plugins: [ new UglifyJSPlugin()] }; -- помещаем в массив свли плагины, по сути вебпак - тоже плагин.. см чуть ране, как плдключать, а здесь вызываем
// эти настройки есть в документации. также есть в документации модули разные для вебпака.. coffescript, typescript, sass, babel less, stylus etc


// в файл script.js (в src) прописываем при помощи E6
// если хотим коду сказать, что сейчас будет какое-то выражение, которое надо экспортировать

export let one = 1; //должно быть имя

let two = 2;

export {two};
export function sayHello() { //экзпортировать можно только функции с именем, анонимные никак
    console.log("Hello!");
}

// index.js
import {one, two} from ".script"; //в той же папке src находится, потому только точка перед назанием пути
import { Linter } from "eslint";

console.log("$(one) and $(two)");

//чтобы в терминале завершить операцию watch надо нажать ctrl + C
//далее переходим в папку, где лежат эти файлы (упомянутые названия выше) cd ... (broserifyTEst в данном случае)
// npx webpack 











// BABEL
// переделывает ES6 в ЕS5 - чтобы все сайты могли поддерживать
// старый пример 
let drink = 1;

function shoot(arrow) {
    console.log("You are doing it..");
    let promise = new Promise(function(resolve, reject){ // созздание промиса через конструктор
        setTimeout(function(){
            Math.random() > .5 ? resolve({}) : reject("You missed");
    
        }, 300);
    });
    return promise;
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

shoot({})
        .then(mark => console.log("Вы попали в цель!"))
        .then(win)
        .catch(loose) //это все методы и точки с запятыми не нужны, можно в 1 строку, then может быть много


// чтобы работать с бабелем, надо установить node js, затем перейти в терминал, там инициализировать npm init там бдует описание проекта. его пропускаем, потом соглашаемся
// у нас появляется папка package.json там будут отображаться все заши зависимости, версия и т.д
// самое классическое и рациональное использование:

// https://babeljs.io/setup#installation  - там разные методы, конечно 
// npm install --save-dev - образается разработке  babel-loader @babel/core - это весь фукнционал бабеля, устанавливаем
// потом надо поставить бабел полифилл - это для полной функциональности, чтобы работало ВСЁ и везде

// затем надо создать файл по образцу Create babel.config.json configuration file
// {
 /*  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']  // описание, таргетс еще можно добавить (какие браузеры, можно на сайте найти, версии можно посмотреть например на caniuse)
          }
        }
      }
    ]
  }
} */
// usebuiltins  - полифилл применять умным способам. вес может сильо увеличится, а эта строчка сам выбирает какие полфиллы нужны конкретны нам, чтобы не было слишком много всего 
// потом его надо запустить. его несколько способов
// есть вариант собрать, анпмриер, как через вебпэк в файл bundle.js а потом перевести в Бабел формат
// но есть загвоздка, но при проверке снова появляются зависимости и прочее, нам это не надо (как в файле script.js=)
// иначе ещё раз придется запускать вебпак, чтобы все реквайры превратились в скрипт, а потом опять бабель, чтобы переделало наконец-то
// в реальных проектах всё немного иначе ю/node_modules/.bin/babel src --out-dir lib -если нпм больше 5.2, то не надо
// npx babel parts --out-dir parts -- берем все файлы из нашей папки партс и они првратятся в старый формат и обратно в нее положатся
// следующий этап - собрать все эти зависимости и файлы в один cd bundle и запускаем браузерифай (так опнимаю, это вместо вебпака только если всё это делаем?)
// в термрминал пишем browserify** потом файл, откуда вытягается весь скрипт /scropt.js/ --out bundle.js куда мы собираем
// в основном полифилл для промисов делает много текста

// есть более иррафицональный метод - взять babel-polyfill и подключить именно его и подключить всё? перед всеми зависимостиями поставить require(@babel/polyfill) -- script.js
// получился бы тоже рабочий файл, но тогда файл будет весить гораздо больше и лучше так не делать




// РАБОТАЕМ С ГОТОВЫМ КОДОМ
// переиспользование - это важно 
// слайдеры - много вариантов, их моэно исподьховать. например, owl carousel/ slick - менее гибкий, но очень хорошая документация, fotorama - для фотографий, galleria тоже, в гитхабе тоже можно искать слайдеры, но в нем могут быть ошибки, потому что тоже пишут люди
// например, на сайте галлериа есть образец кода, который нужно добавить себе, также нужно скачать файлы с сайта, открыть папку, перенести в нужную папку и добавить картинки для слайдера + надо сделать стилизация слайдра, чтобы было видно
// чтобы сделать слайдер более гибким - стоит искать в разделе options 
// например в данном случае копируем после функции нужные свойста, их можно менять, добавлять высоту, ширину и т.д lightbox - модальное коно с увеличенным изображением

// табы  
// плагины могут требовать разные версии j-query 
// можно просто загуглить и настроить под себя. код на чистом у нас есть, на библиотеках и фреймворках он меньше
// разные готовые решения на nisnom.com 


https://www.freecodecamp.org/news/what-is-web3/ 



//REACT

/* Рекомендуемый набор инструментов

Команда React в первую очередь рекомендует следующие решения:

    Если вы изучаете React или создаёте новое одностраничное приложение, используйте Create React App.
    Если вы создаёте серверный сайт с Node.js, попробуйте Next.js.
    Если вы создаёте статический контент-ориентированный сайт, попробуйте Gatsby.
    Если вы создаёте библиотеку компонентов или интегрируетесь с существующей кодовой базой, попробуйте более гибкие наборы инструментов.
 */

// создавать одностраничные приложения, взаимодействуют с пользователем, реагируют, работают с сервером, получать данные и хзаписывать их туда
// реакт построен на модульных структурах - на компонентах, отдельные независимые части, которые можно использовать где угодно
// потом их можно собирать разными сборщиками. Галп, вебпак и др.

// установка:
// нужен node jsЯ
// npm install -g create-react-app  - ставим глобально сборку реакта, так можем в любой папке отедбнл делать свое приложение
// в любой папке в виндовсе кликнуть провую кнопку и шифт, дабавить эту строку и будет магия
// перезодим в ту папку, которую будем создавать сd
// (npx) create-react-app my-app
// Create React App не обрабатывает бэкенд логику или базы данных, он только предоставляет команды для сборки фронтенда, поэтому вы можете использовать его с любым бэкэндом. «Под капотом» используются Babel и webpack
// после установки надо войти в папку приложения cd my-app и npm start
// потом запускаем, открывается страница, там уже встроен бабель, вебпак и т.д
// надо поставить в срабочей среде плагин сокращения jsx, jsxhint?
// в папке: node modules - все зависимости  проекта,  public - index и неск доп файлов  src - все-все нужные файлы в работе. источники - цсс и прочее  gitignore - файлы, которые не хотим пушить на гитхаб, например здесь - node modules т.к она много весит, около 200мб
// package-json - тоже все плагины и зависимости содержит , readme - описание проекта, если вместо npm - yarn, то появится ярн лок
//в public index.html смотрим на id=root в него и будет помещать рект приложение, в src index.js - главный файл, где будут собираться модули и картинки и прочее со всех мест
// в нем главная функция - ReactDOM.render - встраивает на страницу наше приложение в казанный блок, т.е в ИД-root 
// import React from "react" - главное, где сождержатся все скрипты, с которыми работать 
// reactDOM - jотвечает за создание дом-элементов на странице

// JSX

/* это и есть нативный js по факту. в реакте ВСЕ функции и классы  нужно писать с Большой буквы

function Greet() {
    return( 
        <h1>Hello World!</h1>
    )
}
подставить функцию на страницу - заменив в строке app ReactDOM.render (<App /> document.getElementById('root'));
registerServiceWorker();

ReactDOM.render (<Greet /> document.getElementById('root')); - так просто в странице теперь один заголовок
registerServiceWorker();
---
далее можно 
function Greet() {

    let phrase = "World!"
    return( 
        <h1>Hello {phrase} </h1> - в жти фиигурные скобки можно записать что угодно, выражения, функции и т.д 4+4 - hello 8
    )
}
ReactDOM.render (<Greet /> document.getElementById('root')); - так просто в странице теперь один заголовок
registerServiceWorker();

при запущенном npm страница обновляется автоматически!

можем использовать и присваивать атрибуты верстки

function Greet(props) {
    return( 
        <h1>Hello {props.phrase}! My name is {props.name}</h1> - в эти фиигурные скобки можно записать что угодно, выражения, функции и т.д 4+4 - hello 8
    )
}
ReactDOM.render (<Greet phrase="World" name ="Reiji" - подставвляем атрибут - /> document.getElementById('root')); - так просто в странице теперь один заголовок
registerServiceWorker();

props - это объект со всеми атрибутами, который мы передаем дальше 

элемент - h1, после помещения на страницу поменять уже нельзя. один раз создали и всё.  
чтобы обновлять элемент можно использовать сетинтервал и сеттаймер. причем реакт обновляет именнно то, что было изменено.
для этого используется внутренний кэш. также можно передать вызов в пемеренную или функцию и рендерить ей уже там

 сonst element = <Greet phrase="World" name ="Reiji" - подставвляем атрибут - />
  
ReactDOM.render (element, document.getElementById('root'));
registerServiceWorker();



функция грит и есть наш независимый компонент в реакте. она независима и может использоваться несколько раз, можно так объединить части интерфейса в одну конструкцию. в один большой вызов



function GreetAll() {
    return (
        <div>
        <Greet phrase="World" name ="Reiji"/>
        <Greet phrase="World" name ="Rei"/>
        <Greet phrase="World" name ="Ji"/>
        </div>
    )
}
ReactDOM.render (<GreetAll/>, document.getElementById('root')); 
registerServiceWorker();

это всё фуцнкицонально, создавали функции, но на ходу - динамчисеки менять мы их не можем, но в реакте можно делать ооп, обектиный тип


class App extends (от чего наследуется) React.Component {

    render() (метод! это функция потому должен быть return) {
            return (

                <div className="wrapper" - прописать класс, камелкейс>
                <Clock />
                </div>
            )
    }
}
ReactDOM.render (<App /> - вызываем самое главное приложение, document.getElementById('root')); 
registerServiceWorker();

в src/app.css прописываем все стили нужные
в app.js прописаны свои параметры. а мы будем писать свои

import Rect. { Component } from  "react";
import logo from "./logo.svg";

- здесь пишем своё
class Clock extends React.Component {

    constructor(props) {
        super(props); - супер говорит. что все пропсы, что были у React.Component будут наследоваться и у класса Clock
    }
рендер нужен везде 
    render() {
        return (
            <div>
                <h1> Текущее время </h1>
            </div>
        )
    }
}

export deafault Сlock;


в файле src/index.js - import Clock from "./App"; 
в scr index.js во враппер дописываем  <Clock />
class App extends (от чего наследуется) React.Component {

    render() (метод! это функция потому должен быть return) {
            return (

                <div className="wrapper" - прописать класс, камелкейс>
                <Clock /> !!!
                </div>
            )
    }
}
ReactDOM.render (<App /> - вызываем самое главное приложение, document.getElementById('root')); 
registerServiceWorker();

для того, чтобы сделать постоянно обновляющееся время, то через пропс тут ничего не получится. динамически менять их нельзя
так мы должнызадать свойство собственное, как в нативном дж

class Clock extends React.Component { // когда рект рендерит домструктура, он создает жлемент Клок
    в нес сразу иниализируется положение с датой
    потом происходит рендер и таймер появляется на странице с текущим временем из самого рендера
    после того как таймер появился на странице вызывается метод ДидМоунт и бразуер говорить, что надо вызывать метод Тик каждую секунжду
    когда вызывается метод тик, положение - state - с датой обновляется
    если таймер исчезнет со страницы, то вызовется ВиллАнмаунт, который очистит интервал и таймер остановится

    constructor(props) {
        super(props);
        this.state = {date: new Date()} 
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        )
    }

    compenentWillUnmount() {
        clearInterval(this.timerId)     

    }

    tick () {

    this.setState({  // setState вызовет рендер снова для обновляения на странице, рендер сам помнит какую часть надо обновить

        date: new Date()  то же самое, что и ранее, будет выполняться каждый секунду
    })

    render() {
        return (
            <div>
                <h1> Текущее время {this.state.date.toLocaleTimeString() * время в текущем часовом поясе} </h1>
                **после это время отобратися, но не динамически. оно один раз появилось и всё

            </div>
        )
    }
}

у компонентов реакта есть два неглавных метода - методы жизненного цикла компонентов. их называют хуками - hooks?

первый производит дейтсвие. когда компонент появляется на странице - mounting
второй - когда жлемент исчезает со страницы - unmounting?

когда компонент отрендерлся, таймер должен запуститься
P.S. после методов класс и конструктора точка с запятой не нужны, иначе будет ошибка 
 




сделаем основу будущего приложения, чтобы, например, следить за тренировками и следить за временем

внутри конструкторов классов мы можем применять только тернарные  условия
напишем функиональный конструктор, которй будет следить за текущим временем

до кода ранее надо добавить:
function ShowBanner(props) {
    if (props.time > 45) { если больше 45 секунд, то показать след.класс
        return (
            <div className="rest_block">Отдых</div>
        )
    } else {
        return(
            <div className="work_block">Время рабоать!</div>
        )
    }
}

class Clock extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {date: new Date()} 
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        )
    }

    compenentWillUnmount() {
        clearInterval(this.timerId)     

    }

    tick () {

    this.setState({  

        date: new Date() 
    })

    render() {
        return (
            <div>
                <ShowBanner time="this.state.date.getSeconds" />
                <h1> Текущее время {this.state.date.toLocaleTimeString()} </h1>
            </div>
        )
    }
}

готов компонент таймера. после 45 секунд надпись меняется над часами. не забываем импортировать


новый компонент - новый файл
джаваскрипт. например, button.js

не забываем ипорты и экспорты этих частей

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css" 

class Button extends React.Component {

    constructor(props) {
        super(props) 
        this.myClick = this.myClick.bind(this);
    }

    myClick() {
        documnet.getElementByClassName("wrapper")[0].style.backgroundColor="blue";
    }
//чтоьы использовать обработчики событий их надо привязать к классу, контексту, bind - пишем в конструкторе
есть еще варианты, как привязать, но не рекомендуются
чтобы использовать надо в return добавить onClick

    render() {
        return (
            <button onClick{this.myClick} className="clicker"> Изменить дизайн </button>
        )
    }
}
 export deafault Button;
затем в src index.js надо импортировать import Button from "./Button.js" //js писать не обязательно, babel сам понимает
потом его надо использовать в App - самом главном классе, после Clock добавляем Button 
//появилась кнопка, при нажатии на неё изменяется цвет объекта/фона



https://addons.mozilla.org/en-US/firefox/addon/react-devtools/ addon?







JSX — подробности



Фундаментально, JSX является синтаксическим сахаром для функции React.createElement(component, props, ...children).


JSX код:

<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>


компилируется в:

React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)


Также можно использовать самозакрывающую форму для тегов, у которых нет потомков. Например:

<div className="sidebar" />


компилируется в:

React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
Протестировать, как различные конструкции JSX компилируются в JavaScript, можно в онлайн компиляторе Babel




Мы привязали <App /> в качестве первого компонента. Во-первых, обратите внимание, что этот тег пишется с заглавной буквы — хотя это и не обязательно, 
но это считается хорошим тоном в работе с Реакт-компонентами. Во-вторых, этот тег самозакрывающийся. 
Теги в Реакте должны быть закрыты, либо добавочным закрывающим тегом (напр. </div>), либо быть самозакрывающимся (напр. <hr>
     превратился бы в <hr />). Так работает JSX, иначе выскочит ошибка.

https://css-live.ru/articles/na-osvoenie-react-mne-potrebovalas-vsego-nedelya-a-chem-vy-xuzhe.html

Единственным подвохом последнего примера может показаться непонятный дополнительный div вокруг <Header /> и <Nav />. Это потому, что мы должны всегда возвращать один элемент. У нас не может быть два сестринских элемента, вот и приходится оборачивать их в один div.
Для этой части разберём пару вещей, весьма важных для понимания того, как обращаться и работать с элементами, которые изменяются.

    Первое — это состояние. Оно — принадлежность компонента, а значит, его область видимости ограничена компонентом, и мы будем обращаться к нему так: {this.state.foo}. Можно обновить состояние, вызвав this.setState().
    Второе касается того, как передавать (предназначенные только для чтение) данные от родителя к компоненту (вроде того, как приложение было родителем для header в первом примере). 
    Мы зовём это props, как в слове «property» (свойство), и будем использовать его прямо в компоненте посредством {this.props.foo}. Дочерние элементы компонента не могут менять эти данные.

Каждый раз, когда мы меняем что-либо из этих двух вещей и наш компонент зависит от этого, Реакт будет перерисовывать те части вашего компонента, которые ему понадобится

Прелесть виртуальной DOM в том, что Реакт ищет только те ноды в DOM, которые нужно обновить.

Теперь я прочитала кучу всего про состояние, но думаю, Весу удалось выразиться яснее всех, поэтому я перефразирую его: Если вы привыкли к jQuery, то все данные у вас хранятся в DOM. Реакту это ни к чему, он хранит данные в объекте (состоянии), а затем отрисовывает вещи, в зависимости от объекта. Это как главный эталон, от которого всё зависит.

Реакт показывает лучшие результаты работы, когда мы обновляем состояния и перерисовываем низкоуровневые компоненты. По сути мы хотим, чтобы эти компоненты оставались без состояния и брали данные из высокоуровневых компонентов. Компоненты на верхних уровнях иерархии (вроде нашего приложения) работают отлично именно тогда, когда запоминают состояния. Таким образом они управляют большей частью логики взаимодействия и передают состояние вниз с помощью props. Тем не менее, моменты, при которых у каждого компонента будет собственное состояние, не исключены. Однако, важно помнить, что соседние компоненты должны «общаться» не напрямую, а через родительский компонент.

Поэтому нам нужно по максимуму сохранять состояние в компоненте. На самом деле, вам не стоит беспокоиться о том, когда что-то перерисовывается. Всё, что вам важно учитывать — когда изменяется состояние, а об отображении Реакт позаботится сам.

Из такой идеологии разработки напрямую следует то, почему я также не советую использования props в getInitialState, и здесь можно подробнее почитать о том, почему это считается антипаттерном.





ARRAY 
массив 
https://www.freecodecamp.org/news/the-javascript-array-handbook/






TEST TEST TESTING




тестирование кода через console.log 
можно даже целый код вставлять в эту конструкцию
но есть минусы
-сознательно выбираем, что выводится на экран
- если большой код и много логов, то вручную это сложно

devtools - тоже полезно

один из лучших способов - написание модульных тестов 
проверка в атоматическом режиме чтобы убедиться, что ничего не сломалось после наших изменений
когда надо писать тесты:
когда большой развивающийся проект, после каждого обновоения заново, тест если хорошо написаны. помогают
написание тестов порой занимает столько же времени, сколько и программы
лендинги и статические проекты - нет особенно смысла

есть бибилиотека тестирования mocha chai
node.js  npm install -global mocha
https://mochajs.org/


https://www.chaijs.com/
 $ npm install chai 

 мока - это оснва, чтобы тесты работали, а чай - дополнение к ней (в 3 разных стилях)
 делать тест можно в консоли, а можно подюклчить на страницу


 создадим папку test.js 





fucnction sayName(name) {
    let message = "My name is" + name
    return message
}
здесь тест
т.к чай подключили глобально, то можено использовать в проекте
assert guide 
тут можем увидеть, что чтобы полкдлючить определенный стиль теста , нам надо его активировать в коде


****это добавили позже

let arr = [5, 3, -5, 5];
let result = arr.reduce(function (sum, elem) {
    return sum + elem;  // 
})
let assert = require('chai').assert //копирю сс веб-страницы чая
describe("arr", function() {
    it("получаем сумму чисел массива", function() {
        assert.equal(result, 13)   // 
        //проверку проходит, если рузльтат будет равен 13, если нет, то показывает оишбку. и где и в чем эта ошибка
    });
});


****

let assert = require('chai').assert //копирю сс веб-страницы чая

теперь переходим к ситнтаксису Мока бибилитеки, начинаем с описания блока теста
describe("sayName - блок кода, что тестируем", function() {
    - описываем то, что тестируем --
    it("получаем фразу с новым именем", function() {
        assert.typeOf(sayName("Ivan"), "string")   // из чай опять опять берем ассерты и проверяем, дейсвительно ли фуенция возврвается СТРОКУ с новым именем

    });
});

как запустить - открываем консоль и пишем mocha test
проходит время небольшое и мы видим, что тест пройден

однако намного удобнее запукать тест при изменении файлов

пишем в тесрминале mocha --watch  //так будут зщапускать автоматически при изменениях

чтобы выйти из этого режима, надо нажать ctrl c


запускаем тесты на сайте
для этого надо подлюкчить стили и библиотеку мока и чай
для этого воспользуемся обалчными сервисами cdn - mocha там ищем 
берем .css  и mocha.min.js
в ътмл в конце пишем через link rel sylesheet  цсс и через тег script src - js
то же самое для ЧАЙ

также в конце страницы (хтмл) делаем блок для отображения результатов теста
<div id="mocha"></div> - именно с таким id

после подключения скриптов их надо настроить
<script> 
mocha.setup("bdd");

let assert = chai.assert;
</script>

подключаем сам файл
<script src="js/test.js"> 
</script>

запускаем саму Моку
<script> 
mocha.run();
</script>

это все можно оптимизировать, но для наглядности так

наш скрипт загружаетя только после загрузки dom
чтобы тест сработал правильно, то это надо изменить 
самый простой вариант - удаление обработчика событий, но есть варианты  

тестируем в файле тест, что мы подключили, там ничего нет, 

describe("таймер", fucntion(){
    it("возвращает ли объект эта функция". function(){
        assert.typeOf(getTimerRemainning(),  "object") - проверяем ту функцию, что хотим здесь, вторым аргументом передаем объект 
        сохраняем и смотрим на страницу
    })
}) 

возникает конфликт стилей, их можно просто отключить 
если выдает ошибку, то будет ее большое описание  

если функция принимала параметры в себе, то в тесте это тоже должно отображаться, иначе будут ошибки 


мы также можем проверять  переменные 

decsribe("Общая сумма", function() {
    it("изначально равен 0", function(){
        assert.equal(total,0)
    })
})

browser sync чтобы тест сразу отображались 
https://browsersync.io/ 

существует много фреймворков для тестирования. вы можете подобрать то, что удобно себе
есть  jest 
 */


REACT 

ES Linter


/*
помогает избежать ошибки в написании кода. предупреждая о них
старший брат jshint, позволяет рабоать не только с js, react + препроцессор реакта jsx
чтобы нормально работало, надо отключить jshint
через консольно, работать, видимо, лучше, потому node js 
npm install -g eslint

на сайте есть getting atrted + туториал

нужен config файл, если не будет, то плагин будет ругаться и выдавать ошибку 
обноч в каждом проекте он есть но мы можем использоват глобаьную настройку 
мы тут будем в одном файле делать его только, вручную натсраивать тогда надо 

есть вариант проще. в командной строке  eslint --init
будет вопрос какой стиль использовать
можно предоставить айл, в соотствестии с которым проинспектируют и будут настройки с соответвии
или самом выбрать вопроты на вопросы по стилю

выбираем верисию, которую используем  (последний, напмриер)
будем ли мы испольовать модули? да
где запускаем код. в браузере или ноде? оба
сommоn js? y
jsx? y
react? y
табы, двойные кавычки и т.д 
надо ли точку с запятой да
в каком формате сохранить настройки // можно json

когда перейдем папку, в которой выполняи все это, то появится файл .eslint.json (там все настройки, можно менять с соответствиее с докуентацией)
чтобы было глобально, то нужно поместить в корневую папку, где все проекты и т.д
поскольу в работе исползуем новейшее, то еслинт будет ругаться, потому донастроим

например плагины eslint-plugin-babel -  надо установить
npm install elint-plugin-babel // --save-dev (если в свой проект отдельно) если глбально то дабвить -g








*/







 

