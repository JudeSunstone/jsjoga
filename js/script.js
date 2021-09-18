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

ESlink-plugin-React 
-- тоже добвить глобальность. как и ранее
все настройки будут в файле, если надо, то при помощи документации все можно поменять

это помощник, не указатель
используется как унификатор внешнего вида кода

просмотр проблемы в отдельно консоли, там пишут, что и где

оригинальное использование при помощи командной строки
eslint randomChar.js 
 




*************** QUEUE control 

программа для управление очередью

- если операторв ввел имя, то человек добавлятется в конце очереди
- если оператор ничего не ввел (энетер), то вызываетя первый человек в очереди (и удаляется?)
- если оператор ввел = , то программа завершила работу 

algoritmika 

массив - данные одного типа (например зарплаты или что-то такое)

const queue = [];


while(true) {
    запрос знаечние у пользователя
    const input = prompt("Enter a command"); - вводим типа имя

    if (input === "=") {
        alert("finished");
        break; - чтобы цикл кончился
        } else if (input) { - если что-то ввел, вопринимаем как имя и добавляем в очередт и потом показываем 
               queue.push(input); - добавляется в конец очереди
        } else if (queue.lenght > 0 - чтобы н  было undefined чтобы был хоть один человек) { - если чниего не выолнилось
            const first = queue.shift(); - удаляем и зовет 
            alert(first); - первого человек зовем
        }  else {
            alert("Очередь пуста");
        }


}

showAllQueue(); - mozno objavit gde ugodno, ona dostupna v ljubom meste


function showAllQueue() {
    alert(
        alert(queue.join("\n")); - показать всеъ в очереди? бэкслеш чтобы с новой строки а не через хапятую 
}


в массиве метод pop убирает с конца массива, его можно вызвать (в отдельной константе, например)

пробелыи не те данные могут быть проблемы..
если всех удалить из очереди, то будет undefined






<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>queue app</title>
</head>
<body>
    <script>src.////***</script>
</body>
</html>




REACT



библиотека. для упрощени пользовательских интерфейсов.
содание отзывчивых одностраничных приложений. выглядят ка программы.
взаимодействуют с пользователем. реагируют на изменения интерсейса, действия пользователя.
главная задача - ихменять страницу без перезагрузки. контроль использования памяти браузера.

поделеано на компоненты - независмые друг от друга
могут быть легко изменеыны или удалены (ничего не сломается) плюс помогает избежать загрязненность глобальной видимости и багов из-за этого
в работе испольуем помесь hmtl / js - jsx 
так можно создавать логику и разметку

virtual DOM  - вирутальный ДОМ - реакт работает с ним, а потом вносит изменения с носящий, но только в той части, что надо 
в виртуальном доме у объекта куда меньше свойств, чем у нативного ДОМа

REACT NATIVE - для мобильных телефонов приложения писать

есть reac VR для виртуальной реальности






в реакте используются самые современные возможности js - ES6, 7, 8, 8

let/const - станрадты для ЕС 6, var уже не актуально из=за высплытия
переменная сосздается до того, как включился скрипт
желательно использовать const везде, где можно. есил в работе выясняется, что данные внутри надо менять, то тогда let
видны ограниченно и могут быть использованы только после инициализации

стрелочные фунцкии позвоялют избавиться от ошибок в вызове контекста (функция в функции) - она не имеет своего контекста вызова 

В JavaScript существует три типа контекстов выполнения:

    Глобальный контекст выполнения. Это базовый, используемый по умолчанию контекст выполнения. Если некий код находится не внутри какой-нибудь функции, значит этот код принадлежит глобальному контексту. Глобальный контекст характеризуется наличием глобального объекта, которым, в случае с браузером, является объект window, и тем, что ключевое слово this указывает на этот глобальный объект. В программе может быть лишь один глобальный контекст.
    Контекст выполнения функции. Каждый раз, когда вызывается функция, для неё создаётся новый контекст. Каждая функция имеет собственный контекст выполнения. В программе может одновременно присутствовать множество контекстов выполнения функций. При создании нового контекста выполнения функции он проходит через определённую последовательность шагов, о которой мы поговорим ниже.
    Контекст выполнения функции eval. Код, выполняемый внутри функции eval, также имеет собственный контекст выполнения. Однако функцией eval пользуются очень редко, поэтому здесь мы об этом контексте выполнения говорить не будем.


    В контексте выполнения функции значение this зависит от того, как именно была вызвана функция. Если она вызвана в виде метода объекта, тогда значение this привязано к этому объекту. В других случаях this привязывается к глобальному объекту или устанавливается в undefined (в строгом режиме). 





методы MAP , FILTER

метод перебора массивов, перебирауют и взовращают новый массив так, как указано в коллбеке

let names = ["ivan", "reiji", "kreaaaaa"];

let shortNames = names.filter((name) => {
    return name.lenght < 5  --- возвращает только те желементы, что меньше 5 симвовлов 
});

map для того чтобы транформировать каждый элемнент массива и сформирировать новый с соотв. с методом прописанным

let answers = ["ivAn", "Ivaan", "SeaLLL"]; - запись идет по-разному, и чтобы привести к одинакому написанию, то mapap

answers = answers.map((item) => item.toLowerCase());
 
INTERPOLATION

интерполяция `` нужны именно backtick
`User ${name}, ${age} years old` + полезно для формирования димнамических url путей





если мы хотим, чтоыб в функциях были какие-то параметры по умолчанию (когда юзер свои не пишет?)

ф-я получает данные с свервера
functions fetchData(data, count) {
    console.log(`данные: ${data}  в количестве ${}`)
}
fetchData("something"); - если так ввести, то будет самфин в пол*-ве undefined
раньше были проверки типа чтобы каунт был не индефайнд и прочее
в ЕС6 можно параметры по умолчанию записывать сразу при объявлении функции 

functions fetchData(data, count = 0) {
    console.log(`данные: ${data}  в количестве ${}`)
}
fetchData("something"); 





REST параметр группирует в массив аргументы, которые не были переданы в аргументы функции

функция будет передавать значение максимальное, но мы не знаем, сколько будет значений 
function max (... numbers) {
    console.log(numbers);
}

max (3, 4, 57 - здесь можно добавлять сколько угодно);

также можно комбинировать с обычным объявлением аргументов функций
function max (a, b, ... numbers) {
    console.log(numbers);
}

max (3, 4, 67, 97);
в массив попало только 37 и 97 - потому что что а и б записали в себя первые два 3 т 4 - значения
rest оператор должен быть всегда в конце и только один!! 



SPREAD  оператор разворота 
разворачивает массив на список элементов

const arr1 = [1, 2, 5],
    arr2 = [43, 2, 6];

const res = math.max(...arr1, ...arr2); -- куда угодно  можно даже добавить еще элементы a, 3  
console.log(res); - -- 43

в ES8 был добавлен object spread operator 

const user = {
    name: "default",
    pass: "qwerty",
    rights" "user"
};

const admin = {
    name: "admin",
    pass: "root"
}

const res = Object.assign(user, admin);  -- так мы объединяем два объекта и записываем в первый все свойства второго  и перезаписали бы
если выведем в консоль, но перезаписали данные второго в первый объект
обычно мы не хотим перезаписывать юзера, потому можно поставить пустой объект {} до записываемых и все бужет объединено в новом пустом
это ES6

ES8 -  const res = {...user, ...admin);


const x = 25, y = 10;
const coordinats = {
    x = x,
    y = y
};

сonst coordinats = {
    x, - можно теперь и так сократить, потому что сам найдет выше даннные 
    y
};
---
сonst coordinats = { x, y}; можно и так теперь
----
сonst coordinats = { x, y, 
    calcSq() { - посчитать площадь 
        console.log(this.x*this.y);
    }

};
coordinats.caclSq();



ЕСЛИ КАКАЯ-ТО ЧАСТЬ ПОВТОРЯЕТСЯ, СТАРАЙТЕСЬ ЕЁ ОПТИМИЗИРОВАТЬ 





DESTRUCTURE
деструктуризация - объекты и массивы

const user = {
    name: "default",
    pass: "qwerty",
    rights" "user"
};

const {name, pass, rights} = user;  - вытаскиваем из объекта нжные ключи и данные, в конце показываем, из какого объекта именно.
это сокращает код, чтобы не писать три раза user.name, user.pass, user.rights


если есть объект в объекте, то 
const user = {
    name: {
        first : "sam"
        second:
    },
    pass: "qwerty",
    rights" "user"
};

const {name: {first, second}, pass, rights} = user;  


function connect({
    host = "localhost, - СТАВИМ ТАК ДЕФОЛТНЫЕ ЗНАЧЕНИЯ
    port = 3000,
     user = "default" }) {
         console.log(`host: ${host}`) - будет локалхост 
          console.log(`port: ${port}`) - будет 232

}
connect({
    host: "local", - ЗДЕСЬ ЮЗЕР СТАВИТ СВОИ
    port: 232,
    user: "default"
}) - здесь даже можно оставить пустой объъект и будут дефолтные значения, если вообще ничего не записать - только скобки - то тогда будет ошибка 

это можно исправить 
   user = "default"}  = {}) { -можно тут по умолчанию поставить дефолтный пустой объект, тогда ошибки не будет
         console.log(`host: ${host}`) - будет локалхост 
          console.log(`port: ${port}`) - будет 232

}



деструктуризация для массивов тоже

const numbers = [3, 5, 6, 6];

чтобы вынести отдельно в какую-то переменную
для дестр.массива уже квадратные скобки надо

const [a, b, c] = num; ---- в консоли (3, 5, 6)
если хотим получать не все, то можно пропускать какие-то элементы 
const [, , c] = num; -- 6



а если массив в массиве
const numbers = [[3, 5], [6, 6]];

const [[a, b], [c, d]] = numbers; - не надо так использоваться кучу индексов
если  в консоль, то 3 5 6 6 будет


пример

const county = {
    name: 'England',
    population: 200000,
    gender: {
        male: ["15%", "40%"]
        female : ["30%", "29%"] 
    }
}

country.gender.male[0] - старый вариант

деструктуризация
const {gender: {male: [maleUnder18, maleAdult], female: [femaleUnder18, femaleAdult]}} = country;  --- мы так оздали аж 4 переменных, которые можно использовать


console.log(maleUnder18, femaleAdult); -- 15, 29












HOMEWORK change to newer standarts

var employers = ['Alex', '', 'ludmila', 'Viktor', '', 'oleg', 'iNna', 'Ivan', 'Alex', 'Olga', ' Ann'];

var employersNames = [];
for (var i = 0; i < employers.length; i++) {
	if (employers[i].length > 0 && employers[i].length != '') {
		employersNames.push(employers[i]);
	}
}
for (var i = 0; i < employersNames.length; i++) {
	employersNames[i] = employersNames[i].toLowerCase().trim();
}

var sponsors = {
    cash: [40000, 5000, 30400, 12000],
    eu: ['SRL', 'PLO', 'J&K'],
    rus: ['RusAuto', 'SBO']
};

function calcCash(own) {
    own = own || 0;
    var everyCash = Array.prototype.slice.call(arguments);
    var total = own;
    for (var i = 0; i < everyCash[1].length; i++) {
        total += +everyCash[1][i];
    }
    return total;
}

var money = calcCash(null, sponsors.cash);

function makeBusiness(owner, director, cash, emp) {
    director = director || 'Victor';
    var sumSponsors = sponsors.eu.concat(sponsors.rus, 'unexpected sponsor');
    console.log('We have a business. Owner: ' + owner + ', director: ' + director + '. Our budget: ' + cash + '. And our employers: ' +
    emp);
    console.log('And we have a sponsors: ');
    console.log.apply(null, sumSponsors);
    console.log('Note. Be careful with ' + sponsors.eu[0] + ". It's a huge risk.");
}
makeBusiness.apply(null, ['Sam', null, money, employersNames]);




*****
const employers = ['Alex', '', 'ludmila', 'Viktor', '', 'oleg', 'iNna', 'Ivan', 'Alex', 'Olga', ' Ann'];


const employersNames = employers.filter(employer => employer).map((item) => item.toLowerCase().trim());

https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%BE-%D0%BF%D1%80%D0%BE-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4-filter-%D0%B2-javascript-1fcb239a0d74


let sponsors = {
    cash: [40000, 5000, 30400, 12000],
    eu: ['SRL', 'PLO', 'J&K'],
    rus: ['RusAuto', 'SBO']
};

----
c этого момента ничего уже не понимаю как это поменялось на другое !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function calcCash(own = 0) {

    var everyCash = Array.prototype.slice.call(arguments);
    var total = own;
    for (var i = 0; i < everyCash[1].length; i++) {
        total += +everyCash[1][i];
    }
    return total;
}


var money = calcCash(null, sponsors.cash);

function makeBusiness(owner, director, cash, emp) {
    director = director || 'Victor';
    var sumSponsors = sponsors.eu.concat(sponsors.rus, 'unexpected sponsor');
    console.log('We have a business. Owner: ' + owner + ', director: ' + director + '. Our budget: ' + cash + '. And our employers: ' +
    emp);
    console.log('And we have a sponsors: ');
    console.log.apply(null, sumSponsors);
    console.log('Note. Be careful with ' + sponsors.eu[0] + ". It's a huge risk.");
}
makeBusiness.apply(null, ['Sam', null, money, employersNames]);

------
const {cash, eu, rus} = sponsors;

const sumSponsors = [...eu, ...rus, 'unexpected sponsor'];

const calcCash = (cash = 0) => cash.reduce((a, b) => a + b);  ---- https://www.w3schools.creducem/jsref/jsref_reduce.asp 

const money = calcCash(cash);

const makeBusiness = ({cash, emp, owner = 'Sam', director = 'Victor'}) => {
    console.log(`We have a business. Owner: ${owner} , director: ${director} . Our budget: ${cash} . And our employers: ${emp}
And we have a sponsors: ${sumSponsors}
Note. Be careful with ${eu[0]}. It's a huge risk.`);
};
makeBusiness({cash: money, emp: employersNames});



REACT, MODULES

инкапсуляция  - скрываем внутренности и фнкции пограммы изнутри, ничто не может вмешаться в работу 
модуль и модлуьная структура - независимые структры

полиморфизм  

наследование


классы (Es6), функции. классы и есть функции

function button() {
    return "buttton"; -- возвращает строку эту 
}

class Slider { -- большая буквы, иначе
    constuctor(width, height, count) { // cюда как аргументы передаются свойства , которые мы будем передавать при создании класса
        this.width = width;  --- каждое переданное значение в каждый новый экземпляр класса
        this.height = height;
        this.count = count;
    }  -- нельзя ставить запятые 
    nextSlide() { -- переключаем слайды, записываем как метод 
         console.log("Moving foward"); 
    }
    prevSlide() { -- переключаем слайды, записываем как метод 
         console.log("Moving back"); 
    }
    -- чтобы узнать, что все и правда появилось слайдере
    whoAmI {
        console.log(this.width, this.height, this.count -- кро-во слайдов ); -- надо this потому что каждый раз новые свойства вызываются же
    }

}

------------
const slider = new Slider(600, 400, 5);
      someSlider = new Slider(300, 450, 10); - делаем новый слайдер

slider.whoAmI(); -- 600, 400, 5
someSlider.whoAmI(); 300, 450, 10)
-------------------
сделаем автослайдер. будет наследовать от класса Слайдер + своё

class AutoSlider extends Slider {
    constuctor(width, height, count, auto - чтобы не был бесполезен. зададим этот параметра - true or false почему???) { 
        super(width, height, count); - супер чтобы перешло с родителя
        this.auto = auto;     
    }  
    play() {
    console.log(`autoplay ${this.auto}`); вывводим состояние ауто
    }

}

проверяем!
const slider = new AutoSlider(500, 500, 4, true);
slider.whoAmI(); 
slider.play(); - запуск!


модульность. нсли все лежит по разным файлам, то нужен собрать это все один объединяющий файл 
в es6 есть такая возможность

index.js  - будет собирать

 мы пишем в script.js например - тогда туда надо добавить
 export {button, Slider}; - какие классы экспортируем

 что надо с в собираюзий файл  index.js
import {button, Slider} from "./script"; - путь такой, если и той же папки
const slider = new Slider(300, 400, 5); - здесь же создаем то, что надо 

cущности при импорте и экспорте можно переименовывать 
например  export {button as btn, Slider};
потому в импорте уже тоже надо btn использовать

import {button as btn, Slider as sl} from "./script";
const slider = new sl(300, 400, 5);

импортировать можно также ВСЕ, что идет, например, из файла script
import * as total from "./script"; -- это будет объект. который будет содержать два метода, btn / slider
const slider = new sl(300, 400, 5);
в практике чаще используется экспорт по умолчанию:
 export default Slider; - таким образов в файле импорта больше не надо указывать фигурные скобки 
import Slider from "./script";
экспорт по умолчанию экспортирует лишь одну сущность и может быть только ОДИН в файле
можно миксовать способы разные

если в файле только один класс, то экспорт можно просисать ровно до его объявление в самом коде. а не конце файла. Например:


export deafult (!!) class Slider { -- большая буквы, иначе
    constuctor(width, height, count) { // cюда как аргументы передаются свойства , которые мы будем передавать при создании класса
        this.width = width;  --- каждое переданное значение в каждый новый экземпляр класса
        this.height = height;
        this.count = count;
    }  -- нельзя ставить запятые 
    nextSlide() { -- переключаем слайды, записываем как метод 
         console.log("Moving foward"); 
    }
    prevSlide() { -- переключаем слайды, записываем как метод 
         console.log("Moving back"); 
    }
    -- чтобы узнать, что все и правда появилось слайдере
    whoAmI {
        console.log(this.width, this.height, this.count -- кро-во слайдов ); -- надо this потому что каждый раз новые свойства вызываются же
    }

}

разница в экспорте и мпорте в es6 из локальных файлов и импортов из зависимостей 
import React, {Component} - используем сразу два вариант, как испортировать. по умолчанию и отдельно - 
import React, {Component} from 'react'; - отдельно без сбощика, увы, это работать не будет
нужен вебпак. при правильно настройке все сделает хорошо , именно из-за вебапка мы не ставим .js в   import * as total from "./script"; 
import"./index.css" - это для стилей..
современная версия вебпак даже не трубет конфигурационного файла
 для этого в начале я иниализирую свой проект в терминале npm init 
 package json получаем, затем надо в проект установить вебпак в проект
 npm install webpack webpack-cli --save-dev
 так усанавливаем все зависимости. 
 вебпак - верневой, это все что нужно для арботы с вебпаком 
вебпак-кли  это чтобы мы могли работать в терминале при поомщи вебпака 

на самом сайте пишут, что если мы не будем делать config файл, то нужно соблюдать
правила с папками и названиями наших файлов
в нашем проекте нужна папка dist
node_modules
src - index.js, scropt.js
package-lock.json
package.json

затем в index.js  после 
import {button, Slider} from "./script"; 
const slider = new Slider(300, 400, 5);
пишем
slider.whoAmI();  - проверяем вызывается ли файл после сборки! 

в консоли прописываем npx webpack (каждый раз надо в перезпускать в этом случае, он пересоберет новый файл, если мы что-то добавили )
консоль предупреждает, что мы использовали его без настроек. и рекоменудет настроить. 
теперь в папке dist появился main.js  - сжатый файл, который содержит оба наших скрипта из src
 
дальше объяснение вебпака и его настроек небольшое идёт
режим разработки
плаигны и прочие настройски
дальше плагины babel для старых браузеров

открывает BABEL документацию
npm install --save-dev @babel/core - внутренности -  @babel/cli - чтобы работать в терминале -  @babel/preset-env   - набор настроек для работы -

еще полифилл 
многие новые функции не поеддреживаются в старых бразуерах  и именно благодаря полифиллу это возможно 


Polyfill

    🚨 As of Babel 7.4.0, this package has been deprecated in favor of directly including core-js/stable (to polyfill ECMAScript features) and regenerator-runtime/runtime (needed to use transpiled generator functions):

    import "core-js/stable";
    import "regenerator-runtime/runtime";

The @babel/polyfill module includes core-js and a custom regenerator runtime to emulate a full ES2015+ environment.

This means you can use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign, instance methods like Array.prototype.includes, and generator functions (when used alongside the regenerator plugin). The polyfill adds to the global scope as well as native prototypes like String in order to do this.

For library/tool authors this may be too much. If you don't need the instance methods like Array.prototype.includes you can do without polluting the global scope altogether by using the transform runtime plugin instead of @babel/polyfill.

To go one step further, if you know exactly what features you need polyfills for, you can require them directly from core-js.

Since we're building an application we can just install @babel/polyfill:

npm install --save @babel/polyfill


в отличие от вебпака бабель не умеет еще работать без конфгурации 
ему надо четко сказать, что сделать
потому в проекте создаем файл 
babel.config.js
и туда скопировать настройки с сайта
можно давбить ie: "10"

потом после настрйоки файла в терминале npx babel src **тут указываем папку, откуда брать все файлы** --out-dir  src **куда**  
 
потом надо собрать файл заново
терминал npx webpack 

2 способа создания реакта проекта
начнем со сложного

бабель, вебпак нужен, гит и прочиее - таким мало кто занимается т.к. уйдет очень много времени настроить правильно зависимости и т.д
есть метод. который за нескольк команд даст готовую сборку к работе - create react app
чтобы им воспользоваться надо перейти на npmjs.com create-react-app 
npm i create-react-app в терминал 
советуется устанвоить глобально , т.е. в конце этой стро просто добавить -g
какие команды прописывать - посмотреть документацию на гитхабе

npx creat-reat-app my-app**тут может быть любое название*
может создаваться довольно долго
потмо перейти в папку cd *имя папки*
npm start 
и все запустится 

если ошибка, то нельзя делает это все в той папке, где уже было прописано npm 
может быть конфликт зависимостей с вебпаком, напрмиер 
потом надо очистить консоль и перейти в другую папку и сделать все те же шаги. вуаля.
папку с приложением надо открыть как рабоийй проект в среде разработки и посомтреть
в этой папке будут 
node_modules - там все зависимости проекта 
public  -- здесь будут все статичные файлы favicon.ico index.html - в него и будет помещать реакт придожение  manifest.json 
папка src - в ней все рабочией файлы, которые содержатся цсс и джс файлы 
в app.js лежит jsx 

т.к встроенный гит-репозиторий, т.е есть гитгнор, который не позволяет кушать файлы???? что, простите
описание readme.md
описание проекта в виде package.json 
сейчас везде натсроен вебпакт бабель и прочее
 



JSX

в файле index.html видим довольной пустой факл. есть один блок. id-root
именно туда мы будем помещать и рендерить приложение 

в index.js видим импорты 
раекта, рект-дома (виртуальный), стили цсс, еще App from ./App
seviceworker - он вместе в manifest.json необходимы для создания progressive applictaion 
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

для начала это не оосбоенно важно, можно и удалить 
ReactDOM - с методом render которй помещает на нашу страницу все, что надо 

идём  в App.js
тут испорты (реакт, {component} лого, app.css)

class App extends **наследует* Component **так можно написать потому что было деструктуризовано {} ранее в импорте компонента
дальше начинается вся верстка и структура

в конце по дефолту экспортируется приложение 
именно отсюда оно переходит  в index.js 

в index.js  здесь будет знакомиться с jsx
cперва - самые маленькие структуры и блоки реакта  - рект-элементы
импорт App можно закомментировать, чтоыб не мешал 

**
052 Emmet-React-
https://medium.com/front-end-weekly/emmet-for-react-vue-in-vs-code-acb9abb3ed5f

052 Bootstrap
https://www.bootstrapcdn.com/

052 Font-Awesome
https://www.bootstrapcdn.com/fontawesome/

052 PWA
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

052 React-DevTools
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
**

дальше пишем 
const elem = <h2>Hello World!</h2> - эта строка проходит преобразование через babel и получается то,
что надо - так должно было бы быть  const elem = React.createElement("h2", null, "hello world")
чтобы babel мог превраратить jsx в нужный код, нужно везде и на всех страницах подключать именно React
речь идет об  импортах подключении реакта, не только реактДома

и заменяем App на elem ReactDOM.render(elem, document.getElementById("root"));
 

создаим элемент покрупнее
правило -- 
занимает если элемент несколько строк, то нужны круглые скобки ()

const elem = (
    
    <div>
        
        <h2>Hello World!</h2> 

        <input type="text" plceholder="Type here" />
        <button> 
        </div>

) 

ещё одно важное
правило ----
надо обрачивать всю кончтрукцию помимо скобок в DIV или олюбой другой оборачивающий элемент 

комноненты - это блоки пользовательского интерфейса, которые могут иметь собственное поведение
инпут может изменяться, голдовок тоже, менять поведение и т.д 

сейчас надо создавать оболочку для них (компоненты по фактy это функции, которые возвращают нужное, должно быть написаны с большой буквы)

const Header = ()  => {
    return <h2>Hello World!</h2> 
}

const Field = ()  => {

   
    return <input type="text" plceholder="Type here" />
    ---
     
    здесь можно изменять плейсхолдер, например 
            const helder = "Enter here"
            return <input 
            type="text" 
            placeholder={holder}
            autoComplete ="55"
            
            *каждый атрибут долдн быть в формате camelcase*
            className="first" *** просто class нет!!!!! !!!!!!
            атрибут for ддя сявызки лебла и инпута 
            htmlFor=""
            так резервируют для js слова неокторые. чтобы не возникло каких-то ошибок 
            лучше отделить отпуспами 

            const styledField = {
                width: "300px"
            }

            returp <input
             ...
             style={styledField} - применили стили.. но такое используется редко, есть олее програмессивные методики и сss классы

            />
    />
}

const Button = ()  => {
    const text = "Log in"; 
    const res = () => {
        return "Log in please"
    }
    const p = <p>Log in </p>
    return  <button>{text}</button>  - {} при помощи их помещает текст переменной в кнопку туда можно вместе text вствлять все временные 
    их конст выше в кнопка будет меняться - например пагарфовм станет и т.д  
    можно внутрь туда поместить и 3+7 и будет ответ в самой кнопке 
    объекты так ВНУТРь ЭЛЕМЕНТА поместить НЕЛЬЗЯ 

    добавим немного логики jsx
    const logged = true;
    обычные if/else не работею. нужен тернарные оператор

 
   return  <button>{logged ? "Enter" : text}</button>  знак вопросата вместо иф, а эсле - двоеточие 
    надпист энтер появится в самоей кнопке. ели тру и текст константы если не тру значение будет 

}


мы создали разные компоненты, теперь их надо объединить
 
сconst App = () => {

return ( - скобка по многострочной структуре
    <div> 
        <Header/> - сюда функции с оформлением тегов - самозакрывающиеся
        <Field/>
        и т.д
    </div> - обертка
    )
}

ReactDOM.render( <App/>, document.getElementById("root"));





в реакте позабоитилсь при помощи jsx о безопасноти
пример
const Header = ()  => {
    const scr = '<script>alert("Error!")</script>'; - 
    ВНЕШНниЕ И ВНТУРЕННИЫЕ КАВЫЧКИ надо использовать разные

    return <h2>{scr}</h2> 
    в итоге скрипт простоы выведтся строкой и никакой вредоносной программы не будет
}





JSX PRACTICE

делаем что-то twitter like

1. надо разбить приложения на логические компоненты
2. подумать над структорой проекта
3. работать

чтобы сильно не заморачиватья подключим bootstrap
иконки из набора fontawesome

https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css покдлючить в public index.html 
<lynk rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
<lynk rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css">
в хеад
удаляем автоматически там уже бывшие meta - theme color, mainfest (и meta и сам файд из этой же папки 
    и остальные комментарии)

    тег noscript можно оставить

из папки src можно удалить serviceworker/logo/ app test / yarn lock  и App.js (его мы сделаем в компонентах) + App.css

внутри index.js тоже сервис воркер удаляем


компоненты:
шапка с именно пользователся и стастика
компонентд seacrр panel и фильтрации

post list + post list item отдельные комоненты 

и панель для создания новых твитов плюс кнопка для добавления

работаем далее в папке src
создаем папку components в ней 
в этой папе oponents создаем папку app - будет содержать большую часть приложения и будет передаваться в индекс  (внутри app.css, app.js и index.js)
еще создаем параррльно с app  app-header
search-panel
post-status-filter
post-list
post-list-item
post-add-form

в одной папке с компонентом будет и компонент и его стили  


src index.js import  App from "./components/app/app" второй app не обзяательно, встроенное свойтво вебпака - если оставить только первое app 
и не сказать какую папку искать дальше , то по умолчанию он будет искать index.js 

app.js 

import React from 'react'; - чтоыб перевести jsx в обычный js

будем делать сперва по-простому, потом делать путь логических преобразований 

 const App = () => {
     return (
        <h1>hello</h2>

     )
 }
 export default App;

 переходим в src index.js

 import App from  "./app" (; надо вежб)
 export default App; (все что в app.js - components перенаправляем в components index.js )

далее идем в компоненты и app-header
создаем  app-header.js
index.js (можно и app-header.js импортировать, а моэжно по схеме автора с созданием индекса джс и не указанием второй паки в главноем пути )
app-header.css

тут тоже испортим 

import rect from "react";

const AppHeader = () => {

    return (
        <div className="app-header d-flex">  -- в класспейме прописываем наш класс в начале (к уроку приложены файлы цс со стилями) и из бутстрава дисплей флекс 

            <h1>Regina</h1>
            <h2>5 записей, из них понравилось 0 </h2>

        </div>
    )
}

export default AppHeader;

в index.js (эта же папка app header)
 import AppHEader from "./app-header";
 export deafult AppHeader;

 переходим в src components app.js 

 import AppHeader from "../app-header"; - две точки выход выше 
  const App = () => {
     return (
        <AppHeader/>

     )
 }



 дальше панель для поиска, папка
 search-panel
 в нем 
 search-panel.js
 index.js

 в серч панел js 

import Reac

const SearchPanel = () => {

    return (
        <input 
            className="form-control search-input" -- bootstrap
            type="text"
            placeholder="поиск по записям"
        />

    )

}

export default SearchPanel;
в
этой эе папке search panel index.js  import SearchPanel from './search-panel';
export default SearchPanel;

app > app.js
import SearchPanel from '../search-panel';
и добавляем
  const App = () => {
     return (
        <div className="app"> - обертка
                <AppHeader/>
                <div className="search-nale d-flex">
                    <SearchPanel/>
                </div>
        </div>

     )
 }


 папка post-status-filter
 создадим post-status-filter.js  + index.js
 иппорт реакта 
 const PostStatusFilter = () => {
     return (
         <div className="btn-group">
            <button/>
            <button/>

         </div>
     )
 }
export default PostStatusFilter;

в index.js - 
import PostStatusFilter from ".post-status-filter";
 export default PostStatusFilter;

в app app.js
import PostStatusFilter from '../post-status-filter';
  const App = () => {
     return (
        <div className="app"> - обертка
                <AppHeader/>
                <div className="search-nale d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
        </div>

     )
 }

папка post-list добавляем post-list.js + index.js
импортим в пост=лист.джс реакт
import PostListItem from '../post-list-item'; - будем добавлять записи так новые 
const PostList = () => {
     return (

           <ul className="app-list list-group">
                <PostListItem/>
                <PostListItem/>
                <PostListItem/>
           </ul>
    
     )
 }
export default PostList;
 
 index.ja -- import PostList from './post-list';
 export deafault PostList; 

 папка post-list-item  >> post-list-item.js 
+  index.js

 post-list-item.js 
 >
 import React ....
const PostListItem = () => {
     return (

          <li className="app-list-item d-flex justify-content-between">  
                <span className="app-list-item-label">
                    Hello!!
                </span>
                <div className="d-flex justify-content-center align-items-center"> 
                    <button 
                    type="button" 
                    className="btn-star btn-sm"> -- помещаем звездочку
                        <i className="fa fa-star"></i> - это из фонтавесома 
                     </button>
                      <button  
                      type="button" 
                      className="btn-trash btn-sm"> -- помещаем корзинку
                        <i className="fa fa-trash-o"></i> - это из фонтавесома 
                     </button>
                      
                        <i className="fa fa-heart"></i> - это из фонтавесома  сердечко
                      
                </div>
          </li>
    
     )
 }
 export default PostListItem;
 в index.js import PostListItem from './post-list-item';
 export deafult PostListItem;
 теперь надо импортировать пост лист в app.js

 import PostList from '../post-list';
   const App = () => {
     return (
        <div className="app"> - обертка
                <AppHeader/>
                <div className="search-nale d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList/>
        </div>

     )
 }


 последний компонент post-add-form
 > post-add-form.js
 + index.js

post-add-form.js
inport React

const PostAddForm = () => {
     return (

           <form className="bottom-pael d-flex">
                <input
                    type="text"
                    placeholder="О чем вы думаете сейчас?"
                    className="form-control new-post-label"
                />
                <button
                     type="submit"
                     className="btn btn-outline-secondary"
                /> Добавить </button>
           </form>
    
     )
 }
export default PostAddForm;

index.js < import PostAddForm from './post-add-form'
export default PostAddForm;
 
app app.js

 import PostAddForm from '../post-add-form';

 import './app.css'; - cSS !!! 
   const App = () => {
     return (
        <div className="app"> - обертка
                <AppHeader/>
                <div className="search-nale d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList/>
                <PostAddForm/>
        </div>

     )
 }

структура готова, надо импортитровать css файлы см выше 

папка css - надо разбитые на компоненты файлы тоже надо сделать такое же 

https://www.freecodecamp.org/news/how-to-set-up-a-front-end-development-project/


СВОЙСТВА И СОСТОЯНИЯ КОМПОНЕНТОВ REAC / COMPONENTS

чтобы создать нескколько компонентов функции не обязательно использовать всегда div

function WhoAmI() {

    return (
        <React.Fragment> -- !!! вместо дива  или обернуть ПУСТЫМИ КАВЫЧКАМИ <> .. </>!!!
            <h1>My name is , surname - </h1>
            <a href="">Profile is mine</a>
        </React.Fragment>

    )
}

ReactDOM.render(<WhoAmI />, document.getElmentById('root'));


чтобы передать данные в компоненты надо использовать props

function WhoAmI(props) {

    return (
        <> 
            <h1>My name is {props.name}, surname - {props.surname} </h1>
            <a href="{props.link}">Profile is mine</a>
        </>

    )
}

ReactDOM.render(<WhoAmI name="Sam" surname="Lee" link="wwww.google.com"/>, document.getElmentById('root'));

так мы управляем компонентом, не сразу прописываем значения, я добавляем после  
props - это объект со всеми атрибутами, котоырй будет создан когда передаем и даже если неп редеадим, но тольда не сможем использовать
значения, что мы установили больше изменить нельзя. как делать динамически  это позже 
блоки состоят из элементов. и после того, как они были помещены на страницу их поменять нельзя 
!!!
чтобы его поменять, надо всю функцию в нашем случае/компонент отрендерить заново 



при помощи деструктуризации можно сделать проще 

function WhoAmI({name, surname, link}) {

    return (
        <> 
            <h1>My name is {name}, surname - {surname} </h1>
            <a href="{link}">Profile is mine</a>
        </>

    )
}

ReactDOM.render(<WhoAmI name="Sam" surname="Lee" link="wwww.google.com"/>, document.getElmentById('root'));

const All () => {
    return (
        <>
            <WhoAmI name="Sam" surname="Lee" link="wwww.google.com"/>
            <WhoAmI name="Lea" surname="Wow" link="wwww.google.com"/>
            <WhoAmI name="Kath" surname="Lath" link="wwww.google.com"/>
        </>

    )
}
ReactDOM.render(<All/>, document.getElmentById('root'));

мы создали много разных объектов/людей, но объединили в одну структуру
один и тот же компонент, но разные свойства

мы на страницу сразу получаем три разных конмтрукции


ИСПОЛЬЗУЯ ФУНЦКИИ МЫ НЕ МОЖЕМ ХРАНИТЬ РАЗНЫЕ СОСТОЯНИЯ КОМПОНЕНТОВ (динамическое)
а вот в Классах можем

import React, {Component} from 'react';
сlass WhoAmI extends Component {
    constructor(props) {
        super(props);
        this.state = {  - задает свойство в контрукторе. state в виде объекта. вытаскивает только то. что нужно
            years: 26


        }   
        
    }
    render() { - ренлерим структура на странице и будет возвращать верстку

        const {name, surnale, link} = this.props; - деструктуризация, данные
        const{years} = this.state;
        return (
            <> 
                <h1>My name is {name}, surname - {surname} years {this.state.years} </h1>
                <a href="{link}">Profile is mine</a>
            </>

         )

    }
}; 

функция больше не нужна

const All () => {
    return (
        <>
            <WhoAmI name="Sam" surname="Lee" link="wwww.google.com"/>
            <WhoAmI name="Lea" surname="Wow" link="wwww.google.com"/>
            <WhoAmI name="Kath" surname="Lath" link="wwww.google.com"/>
        </>

    )
}
ReactDOM.render(<All/>, document.getElmentById('root'));

как же динамически менять данные в компонентах
props - атрибуты только для чтения и меня динамически не получится 
при помощи state см выше можно хранит разные текущие компоненты (слайд, время)
сложно менять state. обработчик события.
чтобы использовать в реакте, надо в элементе в качестве атрибута записать его в формате камелскейс 




import React, {Component} from 'react';
сlass WhoAmI extends Component {
    constructor(props) {
        super(props);
        this.state = {  - задает свойство в контрукторе. state в виде объекта. вытаскивает только то. что нужно
            years: 26
        } 
        1 -- this.nextYear = this.nextYear.bind(this); - привязака жесткая контекста к событию  
        
    }
   1--  способ сзвязывания котекста с обработчиком событий
   
   nextYear() {
        console.log(1); КАК ПРАВИЛЬНО МЕНЯТЬ STATE !!!! !!!!!! 
        this.state.years++ - будет ошибка! прямым образом поменять не получится
        правильно -- this.setState(state => ({
            years: ++state.years    ++ префикс чтобы сразу получить результат
        }))    -- команда setState перезаписывает объект с нашими состояниями, выполняется АСИНХРОННО
   1--  }

   2 --- 
   this.nextYear = () => {  стрелочная функция потому что сохрянет контекст родителя
        this.setState(state => ({
            years: ++state.years  
        }))  
   }
   3 ---
   экспериментальная возможность
   classFields?
   state = {  - задает свойство в контрукторе. state в виде объекта. вытаскивает только то. что нужно
            years: 26
        } 

   теперь можно функцию (и state!) записывать не только в объект при помощи конструктора в вполне отдельно 
        nextYear = () => {  стрелочная функция потому что сохрянет контекст родителя
                this.setState(state => ({
                    years: ++state.years  
                }))  
        }


   render() { - рендерим структура на странице и будет возвращать верстку

        const {name, surnale, link} = this.props;
        const{years} = this.state;
        return (
            <> 
                <button onClick={this.nextYear}>++<button/> -- создаем кнопку и добавляем обработчик потом создаем нужную функцию,т.е this то нужен метод класса
                в этом виде не будет работать, т.к. this надо привязать конткретно к обработчику события компонента !!!!!!!!!!!
                !!!!!!!!!!!!
                !!!!!!!!
                . есть 3 способа. 1 -  bind.  2 - использовать в контрукторе
                <h1>My name is {name}, surname - {surname} years {this.state.years}  </h1>
                <a href="{link}">Profile is mine</a>
            </>

         )

    }
}; 


const All () => {
    return (
        <>
            <WhoAmI name="Sam" surname="Lee" link="wwww.google.com"/>
            <WhoAmI name="Lea" surname="Wow" link="wwww.google.com"/>
            <WhoAmI name="Kath" surname="Lath" link="wwww.google.com"/>
        </>

    )
}
ReactDOM.render(<All/>, document.getElmentById('root'));














056 Свойства и состояния компонентов. События в React _ Практика


в предыдущий проект добавляем доработки
 const PostStatusFilter = () => {
     return (
         <div className="btn-group">
            <button type="button" className='btn btn-info'> Все </button>  - добавляем кнопку и классы
            <button type="button" className='btn btn-outline-secondary'> Понравилось </button> 

         </div>
     )
 }
export default PostStatusFilter;


https://www.taniarascia.com/react-architecture-directory-structure/







plugins 
extensions vs-code

JS Quick Console - сntrl shift l - console log quickly
!!!!!!!!!!!
!!!!!
!
!

open in browser - opens in diff browsers when you right-click


NODE js версия LTS и реальных проектах






ЗАДАЧИ с СОБЕСЕДОВАНИЯ


реализовать метод forEach в виде функции
классическая задача

const arr = [1, 2, 3, 4, 5];
arr.forEach.(function (item) {

    console.log(item); // 1, 2, 3, 4, 5
})

1. function forEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}
forEach([1, 2, 3, 4], function (item) {
    console.log(item * 2);
});

вопросы - что будет в первый аргумент, 
надо задавать вопросы, осмыслить задание, а не просто сходу решать



2. Хитрая. Написать функцию sum(3) (6) // первая функция возвращает что-то и туда идет второе значение. (6) это тоже функиця

function sum (num1) {
    return function (num2) {
        returm num1 + num2;
    }
}

const result = sum(5) (7);
console.log(result);

это функциональное.прогр.

2.2 подвид задачи
еще хитре

sum(6)(3)(7)..();
через рекурсию решается

ответа пока нет


3. Классический problem solving

написать функцию, которая принимает две строки и определяет, является ли одна тсрока 
анаграммой другой - из букв одной строки можно сделать доугое слово mama - amma

уточнять какие входные значния. всеглада ли приходятся строки. или еще какие-то вариант. числа/буквы

functiom isAnagram(str1, str2) {
    наивный способ - перебрать все что можно. берем сиволсы первой строки второй, смотрим, совпадает ли


    if (str1.lenght !== str2.lenght) {
        return false;
    }

 взять и посмотреть, опр.букву и посмотреть, сколько из во второй, если отчиаются -уже не анаграмма

        const dict1 = {};
        //создаем объект, где перечислены все буквы 1 строки и записано. сколько раз буква встречается

        for (let i = 0; i < str1.lenght; i++) {
            const symbol = str1[i];

            if (dict[symbol]) {
                dict1[symb] +-1;
            } else {
                dict1[sym] = 1;
            }
        }
}
   const dict2 = {};
        //создаем объект, где перечислены все буквы 1 строки и записано. сколько раз буква встречается

        for (let i = 0; i < str1.lenght; i++) {
            const symbol = str1[i];

            if (dict2[symbol]) {
                dict2[symb] +-1;
            } else {
                dict2[sym] = 1;
            }
        }



fuc

перебирает ключи объекта и сравниваем их кол-во, если не совпадает, то фолс

for (let key in dict1) {
    if (dict1[key] !== dict2[key]) {
        return false;
    }
}
return true; - если все совпадает 



isAnagram('amma', 'mama'); //true
isAnagram('qwer', 'asda'); //false

берем самый простой вариант
это первй способ и простой и прмолинейный





function isAnagram(str1, str2) {
    if (str1.leght !== str2.lenght) {
        return false;
    }

    const dict = createDict(str1);

    for ;et i = 0; i <str2.legth; i++) {
        const sym = str2[i];
        dict[sym] -=1;
    }

    for (let key in dict) {
        if (dict[key] !== 0) {
            return false;
        }
    }
    return true;
}

первый вариант более понятный, второй - меньше памяти берет - не создаем еще один объект






`` шаблонные строки позволяют делать перенос строк + интерполяция 
просто так их юзать не надо, т.к. дольше обрабатывает
https://www.youtube.com/watch?v=hGL1gtJpRiA

https://www.youtube.com/watch?v=hGL1gtJpRiA
к объекту можно обращаться через точку и [] obj.a - obj[a]

а null  - тип данных выхывающий вопросы xD



https://www.youtube.com/watch?v=qnAi0-o5FlY

--num
num-- 

разница в том, что перед - сперва выполняет действие
а если после - сперва выводит данное число num, а потом уже результат действия

плюс перед строкой превращает строку в число +"10" 

как писать усолвие (автоматически в скобках true / false if(rain)


https://youtu.be/vBYSrXoXysA
while связано с общим контекстом, а цикл for нет 
do while - код сперва выполняется, а потмо проверяется условие 

http://dmitrysoshnikov.com/2009/06/

https://262.ecma-international.org/12.0/

https://habr.com/ru/post/159313/
https://ru.hexlet.io/courses/javascript_101/lessons/javascript_num/theory_unit
https://ru.hexlet.io/courses/introduction_to_programming/lessons/functions/theory_unit



figma font fascia
https://www.figma.com/community/plugin/746097413727734148/Font-Fascia


https://ru.bem.info/

https://www.free-css.com/free-css-templates?start=108

https://ru.hexlet.io/courses/javascript_101/lessons/javascript_num/theory_unit

https://ru.hexlet.io/courses/introduction_to_programming/lessons/functions/theory_unit

https://bootcamp.algoritmika.org/verstka_course alg.gift  



https://css-tricks.com/a-step-by-step-process-for-turning-designs-into-code/ как оценивать дизайн, чтобы перевести его в код 
взгляд на дизайн и что надо замечать

https://css-tricks.com/how-to-get-a-pixel-perfect-linearly-scaled-ui/ - вариант пиксель перфект 

https://glo-academy.org/teach/control/lesson/view/id/211390543 


<<<<<<< HEAD

<!DOCTYPE html>
<html lang="ru">
=======
--------------------------------------------------------------------------------------------------------
homework


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<<<<<<< HEAD
    <h1>Статистика Банка России</h1>
       <h3> Количество банков в России с 2001 по 2020 годы</h3>
    <p>
            Согласно статистики Банка России количество банков в Российской Федерации по состоянию на 01.01.2020 года
            составляет – 484, то есть за прошедший год их количество сократилось на 42 (484 - 442 = 42). Если взять
            статистику за последние 10 лет, то их количество сократилось более чем на половину (на 01.01.2009 года –
            1108
            банков, на 01.01.2020 – 442) (Развёрнутую статистику за предыдущие 10 лет можно посмотреть по количеству
            банков)
            Общее количество действующих банков России в разрезе Федеральных округов и в г.Москве за 2018 и 2019 годы
            выглядит так:
    </p>
    
    <table border="1px">
        <tr>
            <td></td>
            <th>Количество действующих банков в разрезе регионов России</th>
            <th>На 01.01 2019 г.</th>
            <th>На 01.01 2020 г.</th>
        </tr>
        <tr>
            <td>1.</td>
            <td>ЦЕНТРАЛЬНЫЙ ФЕДЕРАЛЬНЫЙ ОКРУГ</td>
            <td>272</td>
            <td>253</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>СЕВЕРО-ЗАПАДНЫЙ ФЕДЕРАЛЬНЫЙ ОКРУГ </td>
            <td>41</td>
            <td>37</td>
        </tr>
        <tr>
            <td>3. </td>
            <td>ЮЖНЫЙ ФЕДЕРАЛЬНЫЙ ОКРУГ </td>
            <td>25</td>
            <td>24</td>
        </tr>
        <tr>
            <td>4. </td>
            <td>СЕВЕРО-КАВКАЗСКИЙ ФЕДЕРАЛЬНЫЙ ОКРУГ </td>
            <td>12 </td>
            <td>10</td>
            
        </tr>
        <tr>
            <td>5. </td>
            <td>ПРИВОЛЖСКИЙ ФЕДЕРАЛЬНЫЙ ОКРУГ </td>
            <td>67</td>
            <td>57</td>
        </tr>
    </table>
    <p>
        Из таблицы видно, что за 2019 год сокращение количества банков в РФ продолжилось, затронув 7 из 8 федеральных
        округов.
 
        Тенденция по сокращению банков продолжилась и в 2020 году. Только за январь 2020 года лицензии на осуществление
        банковских операций отозваны ещё у 4 банков. Так, например, в январе 2020 года Банком России были отозваны
        лицензии у таких банков как:
    </p>
    <ol>
        <li>АКБ «АПАБАНК» (АО) (рег. № 2404, г. Москва - Приказ Банка России от 31.01.2020 № ОД-166)</li>
        <li>АО «НВКбанк» (рег. № 931, г. Саратов - Приказ Банка России от 24.01.2020 № ОД-111)</li>
        <li>ПАО КБ «ПФС-БАНК» (рег. № 2410, г. Москва - Приказ Банка России от 17.01.2020 № ОД-64)</li>
        <li>ООО КБ «Нэклис-Банк» (рег. № 1671, г. Москва - Приказ Банка России от 10.01.2020 № ОД-6)</li>
   
    </ol>
    <p>
        Надо отметить, что основное количество банков зарегистрировано в основном в европейской части страны, и очень
        мало банков за Уралом. Диспропорция ещё и в том, что 51,4 % банков России зарегистрированы в Москве
        (227*100/442).
    </p>
</body>
</html>





<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Таблица вкладов</title>
</head>
<body>
     <table border="1px">
        <thead>
            <tr>
                <th colspan="2">Банк и название вклада</th>
                <th>Сумма</th>
                <th>Срок</th>
                <th>Ставка</th>
            </tr>    
        </thead>
        <tbody>
             <tr>
                <td> МКБ </td>
                <td><u>Новогодние мечты</u></td>
                <td>От 50 000 руб. до 1 000 000 руб</td>
                <td>395 дней</td>
                <td>7,5 %</td>
            </tr>           
            <tr>
                <td>Премьер БКС</td>
                <td><u> Инвестиционный </u></td>
                <td>От 50 000 руб.</td>
                <td>181 день</td>
                <td>до 7,5 %</td>
            </tr>
            <tr>
                <td rowspan="4">Открытие</td>
                <td> <u>Надежный промо</u><sup>*</sup> </td>
                <td>От 750 000 руб.</td>
                <td>367 дней</td>
                <td>5,56%</td>
            </tr>
            <tr> 
                <td><u>Накопительный</u></td>
                <td>От 1 руб.</td>
                <td>от 1 месяца</td>
                <td>до 9 %</td>
            </tr>
        </tbody>
    </table>

   <p><font size="1" color="grey" face="Arial">* Доступен только для старых клиентов </font> </p>
</body>
</html>


https://youtu.be/wm8hhQyIR9o





=======
    <main>
        <header>
            <img src="https://s.algoritmika.org/fiv66v" alt="mario banner" class="logo">
        </header>

        <section>
            <h1>Mario</h1>
            <p> Mario is a video game character created by Shigeru Miyamoto. He is Nintendo's mascot and the most famous video game character of all time. The Mario series has over 200 video games and have sold over 200 million copies making the Mario series the best selling video game franchise of all time. Starting from the arcade game Donkey Kong, Mario has gone on to be well known throughout the world and has starred in almost every video game genre from, platformer, role playing, sports, geography, history, fighting and racing games. He was created by Shigeru Miyamoto to boost Nintendo to the top of the video game industry. </p>
            <table style="border: 1px solid black;">
                <tr>
                    <td style="border: 1px solid black">Created:</td>
                    <td style="border: 1px solid black">1980</td>
                    </tr>
                <tr>
                    <td style="border: 1px solid black" >Creators:</td>
                    <td style="border: 1px solid black" >Shigeru Miyamoto</td>
                    </tr>
                <tr>
                    <td style="border: 1px solid black">Series:</td>
                    <td style="border: 1px solid black">Super Mario series </td>
                    </tr>
                <tr>
                    <td style="border: 1px solid black">Genres:</td>
                    <td style="border: 1px solid black"> Adventure </td>
                    </tr>
                <tr>
                    <td style="border: 1px solid black" >Species:</td>
                    <td style="border: 1px solid black">Human</td>
                    </tr>
              
            </table>
             
        </section>
        <section>
            <h2>Conception and Creation </h2>
            <p>When Nintendo was working on Miyamoto's game, Donkey Kong Miyamoto had to create a character to play with. So after coming up with the idea of a carpenter so that people could recognize who he is. Mario's clothes were made the way they are now because of limitations of the Donkey Kong game. Miyamoto gave Mario a mustache because he couldn't draw a mouth. He gave Mario a big nose so that he would appear human. He then gave Mario a hat because he didn't want to draw hair. The overalls were given as Mario's clothing so his arms could be seen swinging back and forth when walking. Later Miyamoto decided to change Mario's occupation to a plumber because of his overalls and showed this in the arcade game Mario Bros., and the setting being in the sewers. Before Mario Bros. Nintendo wanted to give Mario a better name then Jumpman. So they decided to name him Mario after Nintendo of America's Italian landlord Mario Segale for their similar appearances.</p>
        </section>
        <section>
            <h2>Girlfriend, Ape and Construction Site</h2>
            <p>Mario first appeared in the arcade game Donkey Kong which becomes the second best selling arcade game of all time. The ape Donkey Kong had kidnappped Mario's girlfriend, Pauline and took her to the top of a construction site. Mario had to climb the large structure to try and rescue Pauline. Donkey Kong threw barrels and other objects down the girders to try and stop the carpenter. Every time Mario got to the top, Donkey Kong took Pauline higher up of the place. Eventually Mario was able to make the girders that Donkey Kong stood on come down and he fell and got knocked unconscious. Mario took Pauline with him and they finished their date</p>
            
            <img src="https://s.algoritmika.org/1myfutc" alt="here must be a illustration, but developer is too lazy to deal with it without  layout">
            <p> <font color="grey"> Mario in his first game trying to rescue Pauline from the ape, Donkey Kong. </font> </p>
        </section>
        <section>
            <h2>Big Ape's Son</h2>
            <p>Mario later took Donkey Kong to a jungle and put him in a cage for revenge for kidnapping Pauline. Donkey Kong Jr., DK's son tries to rescue his father and is the only playable character. DK Jr. climbs vines and platforms to tries to grab the keys to the cage. Mario sends enemies to attack Jr. Jr. retaliates by dropping fruits on the enemies. Every time Jr. unlocked DK's cage Mario would take him to another location. Eventually DK Jr. rescues his father from the cage and Mario leaves the two where they are.</p>
           
           <img src="https://s.algoritmika.org/l3e7no" alt="here must be a illustration, but developer is too lazy to deal with it without  layout">
            <p> 
                <font color="grey">  Donkey Kong Jr. trying to rescue his father Donkey Kong from Mario. </font> 
                </p>

        <section>
            <h2>Mario brothers 1</h2>
            <p>Mario's occupation is later changed from a carpenter to a plumber. He is joined by another plumber, his brother Luigi to help kill the strange creatures in the sewers of New York City. Mario and Luigi kill many Shellcreepers , Sidesteppers, and Fighter Flies, and go further into the sewers. Eventually the brothers go into a pipe leading them to a parallel universe.</p>
                <img src="https://s.algoritmika.org/h2yt2v" alt="here must be a illustration, but developer is too lazy to deal with it without  layout">
                <p> <font color="grey">  Donkey Kong Jr. trying to rescue his father Donkey Kong from Mario. </font> </p>
        </section>
        <section>
            <h2>Saving the Mushroom</h2>
            <p>In Super Mario Bros. Mario and Luigi arrive in a new land called the Mushroom Kingdom. Mario finds out that the land has been attacked by Koopas. The King of Koopas, Bowser has used black magic to turn the kingdom's citizens into different objects such as brick blocks or ? blocks. Mario heads across the kingdom to save Princess Peach Toadstool who was kidnapped by Bowser because she can stop the black magic. Mario and Luigi can use Super Mushrooms to become bigger and use Fire Flowers to shoot fireballs. Mario goes through the land and defeats the False Bowsers in each castle saving the Mushroom Retainers. Mario finally arrives at the last castle and faces the real Bowser in battle. He is defeated the same way by using the axe to cut the bridge knocking him into lava sending him to a fiery death. Mario then frees the princess. In the original Super Mario Bros. 2 the story, graphics and gameplay are the same. Somethings are different like Poison Mushrooms and wind and Bloopers swimming in the sky.</p>
            <img src="https://s.algoritmika.org/fv3nnf" alt="here must be a illustration, but developer is too lazy to deal with it without  layout">
            <p> <font color="grey">  Donkey Kong Jr. trying to rescue his father Donkey Kong from Mario. </font> </p>
        </section>
        <section>
            <h2>In Subcon</h2>
            <p>Mario had a dream of walking up a staircase. He opened the door at the top and saw a large land before him. A voice spoke to him and said it is Subcon, the land of dreams. The voice told Mario to stop the evil Wart. Mario woke up in the middle of the night wandering of this strange dream. While on a picnic with his friends Mario and friends went into a cave and appeared in the land Mario spoke of. They went on the adventure to stop Wart. When they freed the people of Subcon Mario awoke from his dream wondering if it had ever happened.</p>
             <img src="https://s.algoritmika.org/1amu070" alt="here must be a illustration, but developer is too lazy to deal with it without  layout">
               <p> 
                   <font color="grey">  Donkey Kong Jr. trying to rescue his father Donkey Kong from Mario. </font>
                   </p>
        </section>
        <section>
            <h2>Saving the Mushroom World</h2>
            <p>Bowser has sent his army led by his Koopalings to take over the seven kingdoms of the Mushroom World. Each Koopaling has stolen a king's wand and transformed him into an animal. Mario must restore peace to the lands and defeat the Koopalings. While going through all the lands Bowser uses this time to kidnap Princess Peach. Mario recieves the info from a letter sent by Bowser. Mario travels through Dark Land defeating the Koopa Army to reach Bowser's Castle and save the Princess.</p>
            <img src="https://s.algoritmika.org/1qyt4a7" alt="here must be a illustration, but developer is too lazy to deal with it without  layout">
            <p> 
                <font color="grey">  Donkey Kong Jr. trying to rescue his father Donkey Kong from Mario. </font> 
            </p>
        </section>

    </main>
    


</body>
</html>



-----
GIT
oull fetch push merge conflict 

You can fix this by fetching and merging the changes made on the remote branch with the changes that you have made locally:

$ git fetch origin
# Fetches updates made to an online repository
$ git merge origin YOUR_BRANCH_NAME
# Merges updates made online with your local work

Or, you can simply use git pull to perform both commands at once:

$ git pull origin YOUR_BRANCH_NAME
# Grabs online updates and merges them with your local work

https://docs.github.com/en/get-started/using-git/dealing-with-non-fast-forward-errors


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ol>
         <li class="black">black #000000</li>
        <li class="silver">silver #C0C0C0</li>
        <li class="gray">gray #808080</li>
        <li class="white">white #FFFFFF </li>
        <li class="maroon">maroon #800000</li>
        <li class="red">red #FF0000</li>
        <li class="purple">purple #800080</li>
        <li class="fuchsia">fuchsia #FF00FF</li>
        <li class="green">green #008000</li>
        <li class="lime">lime #00FF00 </li>
        <li class="olive">olive #808000</li>
        <li class="yellow">yellow #FFFF00</li>
        <li class="navy">navy #000080</li>
        <li class="blue">blue #0000FF </li>
        <li class="teal">teal #008080 </li>
        <li class="aqua">aqua #00FFFF</li>
    </ol>
</body>
</html>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  font-family: Montserrat, Helvetica, sans-serif;
  padding-left: 0;
}

ol {
     padding-left: 0;
}
li {
    padding: 10px 10px;
    list-style-position: inside
}
.black, .silver, .gray, .maroon, .red,  .purple, .green, .olive, .navy, .blue, .teal {
    color: white;
}

.black {
    background-color: #000000 ;
}
.silver {
    background-color: #C0C0C0; 
}

.gray {
    background-color: #808080;
}

.white {
    background-color: #FFFFFF; 
}
.maroon {
    background-color: #800000;
}
.red {
   background-color: #FF0000;
}  
.purple  {
  background-color: #800080;
}
.fuchsia {
    background-color:  #FF00FF;
}
.green {
   background-color: #008000;
} 
.lime {
   background-color: #00FF00;
} 
.olive {
    background-color: #808000;
 }
 .yellow {
    background-color:  #FFFF00;
 }
 .navy {
     background-color: #000080;
 }
.blue { 
    background-color:  #0000FF ;
}
.teal{
    background-color:  #008080;
} 
.aqua {
    background-color: #00FFFF;
}

цвета colors 









<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Steve Jobs Biography</title>
</head>
<body>
    <h1> Steve Jobs Biography</h1> 

    <table>
        <tr>
            <td>Birthday:</td>
            <td>February 24, 1955</td>
        </tr>
        <tr>
            <td>Nationality:</td>
            <td>American</td>
        </tr>
        <tr>
            <td>Born In:</td>
            <td>San Francisco</td>
        </tr>
        <tr>
            <td>Died On:</td>
            <td>October 5, 2011</td>
        </tr>
        <tr>
            <td>Cause Of Death:</td>
            <td>Cancer</td>
        </tr>
        <tr>
            <td>Founder/Co-Founder:</td>
            <td>Apple Inc, Pixar Animation Studios, Next Computer, Inc</td>
        </tr>
        <tr>
            <td>Discoveries/Inventions:</td>
            <td>IPod, IPhone, IPad, Macintosh</td>
        </tr>
    </table>

    <p>
        Popularly known as the ‘Father of the Digital World’, Steve Jobs an American entrepreneur, investor, co-founder of Apple Inc. Not the one to be satisfied with a single achievement, he moved on to make history in the world of consumer electronics with his foray into the music and cellular industry. The founder of Apple Inc, Pixar Animation Studios and NeXT Inc, Jobs gave information technology its life and blood. A master of innovation, he was known for his perfectionist attitude and futuristic vision. He foresaw trend in the field of information technology and worked hard to embrace the same in his line of products. With about 346 US patents by his side, Steve Jobs created a revolution in his field with his novel ideas and unique concepts. During his years at the Apple, he administered the development of the iMac, iTunes, iPod, iPhone, and iPad. He was the mastermind behind the working of the company's Apple Retail Stores, iTunes Store and the App Store. Interestingly, with so much to fall back upon, it is quite amusing to know that this legendary innovator was not much educated, in fact a college dropout.
    </p>

    <h3>Childhood and Early Life</h3>

    <p>Born on February 24, 1955, Steve Paul Jobs was the adopted son of Paul Reinhold and Clara Jobs. His biological parents were Abdulfattah ‘John’ Jandali and Joanne Carole Schieble, who could not raise Steve, as their parents objected to their relationship.
    </p>

    <p>Ever since a young age, Jobs was exposed to the world of mechanics. He would spent long hours with his father, dismantling and rebuilding electronic devices in the family garage. It was these experiences that gave the little boy tenacity and mechanical prowess.
    </p>

    <p>Academically, after passing his high school in 1972, he enrolled at the Reed College but dropped out of the same in a time frame of six months to pursue creative classes, including a course on calligraphy.
    </p>


    <h3>Career</h3>

    <ul> 
        <li>His first move professionally was that of a technician at Atari, Inc. in Los Gatos, California, in 1973.
        In mid-1974, Jobs went to India to meet Neem Karoli Baba for spiritual enlightenment. Before he could meet Neem Karoli Baba, the Baba died and after a brief hiatus of about seven months, Jobs returned to Atari to create a circuit board for the arcade video game Breakout.</li>
        <li>Along with Wozniak, he developed a circuit board eliminating about 50 chips from the machine thereby making the same compact. Next was the development of the digital ‘blue box’, which allowed free-long distance calls. It was the positive response of the blue box that instilled in him the need to make it big in electronics.</li>
        <li>In 1976, along with Wozniak, he founded ‘Apple Computer Company’. Initially, the company mainly aimed at selling circuit boards. Same year, Wozniak invented the Apple I computer.</li>
        <li>In 1985, difference of opinion between him and the company’s CEO John Sculley led to Jobs resigning from his own founded company. In the same year, he founded NeXT Inc. The company was famous for its technical strengths especially its object-oriented software development system.</li>
        <li>In 1986, he bought the Graphics Group (later renamed Pixar) from Lucasfilm's computer graphics division. ‘Toy Story’ was the first animation film that was released after the acquirement.</li>
        <li>Interestingly, in 1996, when Apple acquired NeXT Inc, he returned to his own co-founded company as a de facto chief in the company and was formally named interim chief executive.</li>
        <li>In 1998, Apple iMac was introduced to the world. It was the direct result of his return to Apple. iMac went through a changeover in look in the following year and the world was introduced the Graphite grey Apple iMac. Since then, there have been various variations that iMac has gone through.</li>
        <li>In 2000, he became the permanent CEO of Apple, adopting the title, iCEO. History was in the making as the company soon branched out bringing about improved digital appliances.</li>
        <li>In 2001, the company sortied into the world of music with the introduction of iPod, iTunes digital music software and iTunes Store. The device was an instant hit and enhanced the sales and reputation of the company by leaps and bounds. The first generation of iPod gave way to revised consumer-friendly devices such as iPod classic, iPod Nano, iPod Touch and iPod shuffle. </li>
        <li>In 2007, he forayed into cellular phone business with the launch of iPhone and rest as they say is history. With its multi touch display, own mobile browser, in-built iPod, the iPhone revolutionized the way the world looked towards a cellular device.</li>
        <li>In the following years, he worked on the iPhone to come up with improvised versions. In 2008, iPhone 3G was released with three chief features: support for GPS, 3G data and tri-band UMTS/HSDPA; in 2009, iPhone 3GS was launched.</li>
        <li>In 2010, he launched iPhone 4, which was a sleeker model than its successors and included enhanced features like five megapixel camera, secondary front facing camera with 4G capability.</li>
        <li> In 2011, iPhone 4S was released which included Siri, a virtual assistant that is capable of voice recognition. In the same year, he resigned as the CEO of Apple but continued to serve as the chairman of the company’s board.</li>
    </ul>

    <h3> Family and Personal Life </h3>
    <ul>
        <li>He was blessed with a daughter Lisa Brennan Jobs from his love partner Chrisann Brennan in 1978. Though he denied being the girl's father initially, he later acknowledged Lisa as his child.</li>
        <li>He tied the knot with Laurene Powell on March 18, 1991. The couple was blessed with three children - a son, Reed, and two daughters, Erin and Eve.</li>
        <li>In 2003, he was diagnosed with pancreatic cancer. He succumbed to the disease on October 5, 2011. A funeral was held two days later. He was buried in an unmarked grave at Alta Mesa Memorial Park, the only non-denominational cemetery in Palo Alto.</li>
        </ul>

        <h3>Top 10 Facts You Did Not Know About Steve Jobs</h3>
        <ul>
        <li>Steve Jobs asked William Hewlett, co-founder of Hewlett-Packard for some parts to complete a school project when he was 12. Impressed, Hewlett offered Jobs an internship at his company.</li>
        <li>Jobs and his friend Steve Wozniak built and sold digital blue boxes for hacking telephone systems before they started Apple.</li>
        <li>He admitted to have used LSD in his younger years and claimed that the drug made him think differently.
        Jobs was a pescetarian which meant he ate fish but no other meat.</li>
        <li>He named his company “Apple” because it came before Atari in the phone book—Atari was the name of the company Jobs worked for prior to creating Apple.</li>
        <li>He was notorious for his lack of hygiene—it is said that he never bathed and walked around the office bare foot while working at Atari.</li>
        <li>Steve Jobs always parked in the handicap parking zone.</li>
        <li>He denied paternity of his first child who was born to a girlfriend, claiming he was sterile.</li>
        <li>He acted as a mentor to Google founders Sergey Brin and Larry Page when the duo had newly started Google.
        Steve Jobs' last words were "Oh wow. Oh wow. Oh wow".</li>
    </ul>
</body>
</html>


@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  font-family: Montserrat, Helvetica, sans-serif;
  width: 720px;
}
h1, h2, h3 {
    font-weight: 900;
}

td, p, ul {
    background-color: #f0fff8; 
    border: 1px solid #80ced6;
    border-radius: 10px;
}
Li {
    list-style: square;
}
td {
     padding: 10px;
}
p, ul {
     padding: 30px;
}
table {
    width: 100%;
     border-collapse: collapse;
}


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>ИА «Панорама» сообщает</h1>  
  <h3>20 дек 2020</h3>
  <p>Полиция Улан-Удэ пресекла несанкционированную игру в футбол «головой» Ленина</p>
  <hr>
  <h3>19 дек 2020</h3>
  <p>Участники шоу «Дом-2» объявили себя обманутыми дольщиками</p>
  <hr>
  <h3>12 дек 2020</h3>
  <p> Польская ракета-носитель взорвалась после удара о небесную твердь</p>
  <hr>
  <h3> 09 дек 2020</h3>
  <p> В рамках программы по колонизации Луны «Роскосмос» построит на спутнике колонию общего режима</p>
</body>
</html>


@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
    font-family: 'Montserrat', Arial, sans-serif;
    font-size: 16px;
}
h1 {
    font-size:  44px;
} 
h3 {
    font-size:  12px;
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="card">
    <div class="card-container">
        <div class="card-chip">
          <img src="https://s.algoritmika.org/a70yh9" alt="chip" class="card-chip-img">
        </div>
        <div class="card-number">
          <span>4500 6812 5512 6089</span>
        </div>
        <div class="card-name">
          <span>ALEKSEEV IVAN</span>
        </div>
        <div class="card-valid">
          <span class="card-valid-name">
          Valid thru: <br>
          </span>
          <span class="card-valid-date">
            07/22
          </span>
        </div>
    </div>
  </div>
  
</body>
</html>

body {
  color: white;
  padding-left: 10px;
}

.card {
    background-color: #833ae0;
    border-radius: 15px;
    width: 330px;
    height: 200px;
}
.card-container {
    margin-left: 15px;
}
.card-chip {
    padding-top: 35px; 
}

.card-chip-img {
    height: 50px;
} 

.card-number {
    font-size:  25px;
    font-family: Courier New;
}

.card-name {
    font-size:  20px;
    font-family: monospace; 
    font-weight: bold;
    padding-bottom: 5px;
}

.card-valid {
    padding-bottom: 30px;
    font-family:  Tahoma, serif;
    font-size: 15px;
}
.card-valid-name {
    font-size: 10px;
}




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
  <div class="main">
    <main>
      <p class="date">yesterday, 20:20</p>
      <h1>What are HTML color codes?</h1>
      <p class="author">Kate Olsen</p>
      <p>Color codes are ways of representing the colors we see everyday in a format that a computer can interpret and display. Commonly used in websites and other software applications, there are a variety of formats, including Hex color codes, RGB and HSL values, and HTML color names, amongst others.</p>
      <h2>RGB COLOR CODES</h2>

      <p>
        Red Green Blue (RGB) is a color model that represents colors as mixtures of three underlying components (or channels), namely, red, green, and blue. Each color is described by a sequence of three numbers (typically between 0.0 and 1.0, or between 0 and 255) that represent the different intensities (or contributions) of red, green, and blue, in determining the final color.

      </p>
      <p>
        For example, rgb(255, 0, 0) is displayed as red, because red is set to its highest value (255) and the others are set to 0. rgb(0, 0, 0) is displayed as black, all color parameters must be set to 0. rgb(255, 255, 255) is displayed as white, all color parameters must be set to 255

      </p>

      <h2>HEX COLOR CODES</h2>
      <p>
        Hex color codes are represented by three byte hexadecimal numbers (meaning they consist of six digits), with each byte, or pair of characters in the Hex code, representing the intensity of red, green and blue in the color respectively

      </p>
      <p>
        Hex code byte values range from 00, which is the lowest intensity of a color, to FF which represents the highest intensity. The color white, for example, is made by mixing each of the three primary colors at their full intensity, resulting in the Hex color code of #FFFFFF.
      </p>
      <p>
        Black, the absence of any color on a screen display, is the complete opposite, with each color displayed at their lowest possible intensity and a Hex color code of #000000.
      </p>
      <p>
        The three primary colors, red, green and blue, are made by mixing the highest intensity of the desired color with the lowest intensities of the other two: #FF0000 - red, #00FF00 - green, #0000FF - blue.
      </p>
      <p>
        With modern browsers supporting the full spectrum of 24-bit color, there are 16,777,216 different color possibilities. Use our color picker to explore all 16.7 million of them, or if that’s too many, check out our color charts for a selection of palettes focused on flat design, Material design and web safe colors.
      </p>
    </main>
  </div>
  <div class="aside">
    <aside>
      <div class="ref">
        <h4>References</h4>
        <hr>
        <ul>
          <li>
            <a href="https://www.w3schools.com/colors/colors_hexadecimal.asp">
              The HEX Calculator
            </a>
          </li>
          <li>
            <a href="https://www.w3schools.com/html/html_colors.asp"> 
            HTML Colors</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/colors/colors_names.asp"> 
              HTML Color Names</a>
            </li>
          <li>
            <a href="
            https://www.w3schools.com/html/html_colors_rgb.asp">
              Try RGB Color Values
            </a>
            </li>
          <li>
            <a href="
            https://www.w3schools.com/html/html_colors_hex.asp">
              Try HEX Color Values
            </a>
            </li>
        </ul>
      </div>

      <table class="table">
          <tr>Color keywords</tr>
          <hr>
          <thead>
            <tr>
              <th>COLOR NAME		</th>
              <th>HEX COLOR CODE</th>
              <th>RGB COLOR CODE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WHITE	</td>
              <td>#FFFFFF</td>
              <td>RGB(255, 255, 255)</td>
            </tr>
            <tr>
              <td>SILVER		</td>
              <td>#C0C0C0</td>
              <td>RGB(192, 192, 192)</td>
            </tr>
            <tr>
              <td>GRAY</td>
              <td>#808080	</td>
              <td>RGB(128, 128, 128)</td>
            </tr>
            <tr>
              <td>BLACK		</td>
              <td>#000000</td>
              <td>RGB(0, 0, 0)</td>
            </tr>
            <tr>
              <td>RED</td>
              <td>#FF0000	</td>
              <td>RGB(255, 0, 0)</td>
            </tr>
            <tr>
              <td>MAROON</td>
              <td>#800000</td>
              <td>	RGB(128, 0, 0)</td>
            </tr>
            <tr>
              <td>YELLOW</td>
              <td>#FFFF00	</td>
              <td>RGB(255, 255, 0)</td>
            </tr>
            <tr>
              <td>OLIVE</td>
              <td>#808000	</td>
              <td>RGB(128, 128, 0)</td>
            </tr>
            <tr>
              <td> LIME	</td>
              <td>#00FF00</td>
              <td>RGB(0, 255, 0)</td>
            </tr>
            <tr>
              <td>GREEN</td>
              <td>#008000	</td>
              <td>RGB(0, 128, 0)</td>
            </tr>
            <tr>
              <td>AQUA</td>
              <td>#00FFFF	</td>
              <td>RGB(0, 255, 255)</td>
            </tr>
            <tr>
              <td>TEAL		</td>
              <td>#008080</td>
              <td>RGB(0, 128, 128)</td>
            </tr>
            <tr>
              <td> BLUE		</td>
              <td> #0000FF</td>
              <td>RGB(0, 0, 255)</td>
            </tr>
            <tr>
              <tr>
                <td>NAVY</td>
                <td>#000080</td>
                <td>RGB(0, 0, 128)</td>
              </tr>
              <td>FUCHSIA </td>
              <td>#FF00FF</td>
              <td>RGB(255, 0, 255)</td>
            </tr>
            <tr>
              <td> PURPLE	</td>
              <td>#800080</td>
              <td>RGB(128, 0, 128)</td>
            </tr>
        </tbody>
      </table>
    </aside>
  </div>
</div>
</body>
</html>


@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
    font-family: 'Roboto', sans-serif; 
    font-size: 12px;
}
.container {
    display: flex;
}

main {
    width: 600px;
    padding: 20px;
}
p {
    font-size: 20px;
    margin: 20px 0;
}

.date {
    font-size: 10px;
}
.author {
    font-size: 12px;
    background-color: azure;
}
h1 {
    font-size: 36px;
}
h2 {
    font-size: 24px;
}

.ref, .table {
    color: #333;
    background-color: #EEE;
    padding: 20px;
}
a {
    color: #833ae0;
}
li {
    list-style: none;
    padding: 0px;
}

**не доделано еще



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="container">
    <header>
      <div class="logo">
        Бюрократ
      </div>
      <nav class="nav">
        <ul>
          <li><a href="#">Статьи</a></li>
          <li><a href="#">Советы</a></li>
          <li><a href="#">О журнале</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <div class="banner">
          <h1>
            Валютный контроль на практике
          </h1>
          <h2>
            Как получать деньги за услуги от иностранных клиентов
          </h2>
      </div>
        <p>
          Я программист, разрабатываю сайты. В ноябре 2018 года ко мне обратился один немецкий стартап. Мы обсудили условия и договорились, что они переведут оплату в долларах мне на счёт. До этого я никогда не работал с иностранной валютой.
        Я думал, что клиент просто сделает обычный банковский перевод на мою карту. Оказалось, прежде чем начать деньги можно будет использовать, они должны пройти валютный контроль.
      </p>
      <h2> Что такое валютный контроль</h2>
      <p>В России все валютные операции подчиняются закону «О валютном регулировании и валютном контроле». От покупки валюты в обменнике до расчётов с иностранными компаниями — всё это валютные операции, и они должны учитываться государством.
      </p>
      <p>
        Когда платёж приходит из-за границы, Правительство и Центральный банк должны быть уверены, что деньги получены законным путём. Они запрашивают у получателя документы, которые подтвердят, что он получил оплату за легальный товар или услугу, а не за продажу оружия, организацию теракта или незаконную сделку. Процесс проверки законности полученных денег называется валютным контролем.</p>
      <p>
        Чтобы валютный контроль проходил быстрее, Центральный банк разрешает коммерческим банкам самим проверять законность платежей. Сотрудники банка, в который пришёл платёж, проверяют все подтверждающие документы, и затем передают всю информацию в Центральный банк РФ.
      </p>
      <img src="https://s.algoritmika.org/5t0403" alt="illustration">
      <p class="img-comment">Чтобы принимать платежи в валюте, нужно открыть валютный счёт. В Тинькофф-банке счёт можно открыть в личном кабинете. Валютные счета банк обслуживает бесплатно.
      </p>
    </main>
  </div>

</body>
</html>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');


body {
    font-family: Georgia, sans-serif;
    font-size: 16px;
    box-sizing: border-box;
}
.container {
    width: 1000px;
    margin: 20px;
}
header {
    display: flex;
    justify-content: space-between;
}
.logo {
    font-size: 25px;
    font-weight: 900;
}
nav {
    margin: 0  0 10px 0;
}
nav ul {
    list-style: none;
}
li {
    display: inline-block;
    margin-left: 20px;
}
a {
    color: black;
}
main {
    width: 700px;
}
.banner {
    background-color: #0000ff;
    color: white;
    width: 1000px;
    font-family: 'Roboto', sans-serif;
    padding-top: 5px;
    padding-left: 10px;
    padding-bottom: 30px;
    margin-bottom: 50px;
   
}
.banner h2 {
    font-size: 33px;
    margin: 30px 0;
    /*display: inline-block;*/
    font-weight: 400;
    width: 500px;
}

h1 {
    font-size: 65px;
    margin: 44px 0;
    width: 700px;
}

p {
    margin: 20px 0;
    font-size: 20px;
}

h2 {
    font-size: 40px;
    margin: 33px 0;
    font-family: 'Roboto', sans-serif;
}

img {
   width: 1000px; 
}
.img-comment {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    margin: 14px 0;
    font-weight: 600;
}



-------------------
	
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">

  <header>
    <nav class="nav">
      <img src="https://mars.algoritmika.org/uploads/2020/06/oZKohI2BXbg_0_1591710903.jpg" alt="logo" class="nav-logo">
      <ul class="nav-links">
        <li>Main</li>
        <li>Projects</li>
        <li>Articles</li>
        <li>About</li>
        <li>Contacts</li>
      </ul>
      <p class="avatar">РГ</p>
    </nav>
  </header>

  <main>
    <section> 
      <h1>JavaScript</h1>
    <p class="author">Sam Rubik</p>
     
    <p>  
      JavaScript is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.
    </p>
    <p>
    Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it for client-side page behavior, and all major web browsers have a dedicated JavaScript engine to execute it.
    </p>
    <p>
    As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM). However, the language itself does not include any input/output (I/O), such as networking, storage, or graphics facilities, as the host environment (usually a web browser) provides those APIs.
    </p>
    <p>
    JavaScript engines were originally used only in web browsers, but they are now embedded in some servers, usually via Node.js. They are also embedded in a variety of applications created with frameworks such as Electron and Cordova.
    </p>
    <p>
    Although there are similarities between JavaScript and Java, including language name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design.
    </p>
    </section>

    <aside class="aside"> 
    Frameworks:
    <ul class="aside-frameworks">
      <li>Angular</li>
      <li> AngularJS</li>
      <li>Apache Royale</li>
      <li>Backbone.js</li>
      <li>Dojo</li>
      <li>Ember.js</li>
      <li>Enyo</li>
      <li>Express.js</li>
      <li>Google Web Toolkit</li>
      <li> jQuery (library)</li>
      <li>Knockout</li>
      <li>JavaScript</li>
      <li>MooTools</li>
      <li>Node.js</li>
      <li>React (JavaScript library)</li>
      <li> SAP OpenUI5</li>
      <li>Prototype & script. aculo.us</li>
      <li>qooxdoo</li>
      <li>SproutCore</li>
      <li>Svelte</li>
      <li> Vue.js</li>
    </ul>    
    </aside>
  </main>

</div>
</body>
</html>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
    font-family: 'Roboto', sans-serif; 
    font-size: 20px;
}

.container {
    width: 780px;
    margin: auto;
}
.nav {
    display: flex;
}
.nav-links {
    display: flex;
}
li {
    list-style: none;
    padding: 0 20px 0 20px;
}
.nav-logo {
    display: block;
    width: 50px;
    height: 50px;
}
.avatar {
    background-color:#833ae0;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    color: white;
}
main {
    display: flex;
}
section {
    width: 80%;
}
h1 {
    font-size: 30px;
}
.author {
    font-size: 12px;
    padding: 5px;
    background-color: Lavender; 
    width: 200px;
}

aside {
    width: 20%;
    background-color: Lavender;
   
}

aside ul {
    display: flex;
}

.aside-frameworks {
    flex-direction: column;
}
.aside li {
    padding-left: 0;
    margin-left: 0;
}

---------------------------------------
	таблица, инормация при наведении на строку
	наведение 
	
<!DOCTYPE html>
<html>
<head>
    <title>Голубые фишки</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="my.css">
</head>

<body>
  <table>
    <thead>
        <tr>
        <th>Голубые фишки</th>
        <th>Цена на 14.10.2020</th>
        <th>Число акций в 1 лоте</th>
        <th>Размер покупки</th>
        </tr> 
        </thead>
        <tbody>
            <tr>
            <td>АЛРОСА ао</td> 
            <td>91,89</td>
            <td>10</td> 
            <td>918,9</td>
            </tr>
            <tr>
            <td>СевСт-ао</td> 
            <td>960,2</td>
            <td>10</td> 
            <td>9602</td>
            </tr>
            <tr>
            <td>FIVE-гдр</td> 
            <td>2009,5</td>
            <td>1</td> 
            <td>2009,5</td>
            </tr>
            <tr>
            <td>ГАЗПРОМ ао</td> 
            <td>251,5</td>
            <td>10</td> 
            <td>2515</td>
            </tr>
            <tr>
            <td>ГМКНорНик</td> 
            <td>20362</td>
            <td>1</td> 
            <td>20362</td>
            </tr>
            <tr>
            <td>ЛУКОЙЛ</td> 
            <td>6530</td>
            <td>1</td> 
            <td>6530</td>
            </tr>
            <tr>
            <td>Магнит ао</td> 
            <td>3345</td>
            <td>1</td> 
            <td>3345</td>
            </tr>
            <tr>
            <td>МТС-ао</td> 
            <td>319,45</td>
            <td>10</td> 
            <td>3194,5</td>
            </tr>
            <tr>
            <td>НЛМК ао</td> 
            <td>146,84</td>
            <td>10</td> 
            <td> 146,84</td>
            </tr>
            <tr>
            <td>Новатэк ао</td> 
            <td>1305,6</td>
            <td>10</td> 
            <td>13056</td>
            </tr>
            <tr>
            <td>Роснефть</td> 
            <td>481,15</td>
            <td>10</td> 
            <td>4811,5</td>
            </tr>
            <tr>
            <td>Сбербанк</td> 
            <td>262,4</td>
            <td>10</td> 
            <td>2624</td>
            </tr>
            <tr>
            <td>Сургнфгз</td> 
            <td>53,805</td>
            <td>100</td> 
            <td>5380,5</td>
            </tr>
            <tr>
            <td>Татнфт ао</td> 
            <td>806</td>
            <td>10</td> 
            <td>8060</td>
            </tr>
            <tr>
            <td class="yandex-info">YandexclA
                <p class="yandex-info add">
                    HИИ блаблабла
                </p>    
            </td> 
            <td>2703,4</td>
            <td>1</td> 
            <td>2703,4</td>
            </tr>
    </tbody>
    <tfoot>
    <tr>
      <td colspan="3"> Итого</td>
      <td>86780,7</td>
    </tr> 
    </tfoot>
  </table>    

</body>
</html>

table {
    border-collapse:collapse;
    }
    
table tbody tr:nth-child(odd){
	background-color: #D7C8EB;
}

table tbody tr:nth-child(even){
	background-color: #F1ECF8;
}

thead, tfoot {
    background-color: #A84AE9;
    color: white;
}
th {
    font-weight: 400; /*если прописываю это в строке выше  - 13 - вместо thead - th, то почему-то остается жирным шрифтом. почему?*/
}

td, th {
    padding: 5px 20px;
}

table tr:hover td, thead:hover {
	background: grey; 
}
    /*это как-то лучше можно сделать? селекторы лучше сгруппировать, т.е.*/


/*блок с инфой при наведении */
.yandex-info {
    position: relative; 
}

.add {
    position: absolute;
    left: 120px;
    bottom: -50px;
    background: #F1ECF8;
    padding: 5px;
    display: none;
    width: 140px; 
    /*как лучше здесь задать ширину? оно переносится почему-то на другую 
    строчку, если не прописать ширину*/
}

.yandex-info:hover .add {
    display: block;
}





article - sovial network соцсеть статья

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">

  <header>
    <nav class="nav">
      <img src="https://mars.algoritmika.org/uploads/2020/06/oZKohI2BXbg_0_1591710903.jpg" alt="logo" class="nav-logo">
      <ul class="nav-links">
        <li>Main</li>
        <li>Projects</li>
        <li>Articles</li>
        <li>About</li>
        <li>Contacts</li>
      </ul>
      <p class="avatar">
        РГ
      </p>
    </nav>
  </header>

  <main>
    <section> 
      <h1>JavaScript</h1>
    <p class="author">Sam Rubik</p>
     
    <p>  
      JavaScript is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.
    </p>
    <p>
    Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it for client-side page behavior, and all major web browsers have a dedicated JavaScript engine to execute it.
    </p>
    <p>
    As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM). However, the language itself does not include any input/output (I/O), such as networking, storage, or graphics facilities, as the host environment (usually a web browser) provides those APIs.
    </p>
    <p>
    JavaScript engines were originally used only in web browsers, but they are now embedded in some servers, usually via Node.js. They are also embedded in a variety of applications created with frameworks such as Electron and Cordova.
    </p>
    <p>
    Although there are similarities between JavaScript and Java, including language name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design.
    </p>
    </section>

    <aside class="aside"> 
    <p>Frameworks:</p>
    <ul class="aside-frameworks">
      <li>Angular</li>
      <li>AngularJS</li>
      <li>Apache Royale</li>
      <li>Backbone.js</li>
      <li>Dojo</li>
      <li>Ember.js</li>
      <li>Enyo</li>
      <li>Express.js</li>
      <li>Google Web Toolkit</li>
      <li> jQuery (library)</li>
      <li>Knockout</li>
      <li>JavaScript</li>
      <li>MooTools</li>
      <li>Node.js</li>
      <li>React (JavaScript library)</li>
      <li> SAP OpenUI5</li>
      <li>Prototype & script. aculo.us</li>
      <li>qooxdoo</li>
      <li>SproutCore</li>
      <li>Svelte</li>
      <li> Vue.js</li>
    </ul>    
    </aside>
  </main>

</div>
</body>
</html>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
    font-family: 'Roboto', sans-serif; 
    font-size: 20px;
}

.container {
    width: 780px;
    margin: auto;
}
.nav {
    display: flex;  
     position: relative;
}
.nav-links {
    display: flex;
    padding: 0; /*Почему-то не совпадает с наложением немного*/
}
.nav-links li:hover {
    position: relative;
    left: 5px;
    bottom: 5px;
    color: #833ae0;;
}
li {
    list-style: none;
    padding: 0 25px 0 25px;
}
.nav-logo {
    display: block;
    width: 50px;
    height: 50px;
}
.avatar {
    background-color:#833ae0;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    color: white;
    margin: 0;
    display: flex;    
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;

}

main {
    display: flex;
}
section {
    width: 80%;
}
h1 {
    font-size: 30px;
}
.author {
    font-size: 12px;
    padding: 5px;
    background-color: Lavender; 
    width: 200px;
}

aside {
    width: 20%;
    background-color: Lavender;
    padding: 20px;
}

aside ul {
    display: flex;
    padding: 0;
}

.aside-frameworks {
    flex-direction: column;
}
.aside li {
    padding: 0;
    margin-left: 0;

}
aside p {
    margin: 0;
}


https://gnatkovsky.com.ua/poyavlenie-bloka-pri-navedenii-s-pomoshhyu-css.html




homework 3 cards flexbox card


body {
  color: white;
  padding-left: 10px;
  margin-top: 10px;
}

.container {
    display: flex;
}

.card {
    background-color: #833ae0;
    border-radius: 10px;
    width: 330px;
    height: 200px;
    margin-left: 15px;
    margin-bottom: 15px;
  
}
.card-container {
    margin-left: 15px; 
    margin-right: 15px; 
}
.card-chip {
   padding-top: 35px;
    margin-left: -5px;
    
}
.card-chip-img {
    height: 50px;
} 
.card-number {
    font-size:  25px;
    font-family: Courier New;
    margin-top: -5px;
}

.card-name {
    font-size:  20px;
    font-family: monospace; 
    font-weight: bold;
    padding-bottom: 10px;
}

.card-valid {
    padding-bottom: 30px;
    font-family:  Tahoma, serif;
    font-size: 15px;
}
.card-valid-name {
    font-size: 9px;
}
.card-valid-date  {
    display: inline-block; 
    margin-top: -1px; 
    font-size: 20px;
 }
.card-pay img {
    height: 40px;
}
.card-bottom, .card-chip  {
    display: flex;
    justify-content: space-between;
}

.sber {
    background-color: green;
}

.vtb {
    background-color: blue;
}

.tinkoff {
    background-color: black;
}


.bank-logo {
    height: 35px;
    padding-top: 0;
}

/*если картинки банков были бы по-настоящему svg, то у них можно поменять цвет текста на белый, как надо?*/




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>


    <div class="container"> 

        <div>
            <div class="card">
                <div class="card-container">
                    <div class="card-chip">
                    <img src="https://s.algoritmika.org/a70yh9" alt="chip"  class="card-chip-img">
                    </div>
                    <div class="card-number">
                    <span>4500 6812 5512 6089</span>
                    </div>
                    <div class="card-name">
                    <span>ALEKSEEV IVAN</span>
                    </div>
                    <div class="card-bottom"> 
                        <div class="card-valid">
                            <span class="card-valid-name">
                            Valid thru: <br>
                            </span>
                            <span class="card-valid-date">
                            07/22
                            </span>
                        </div>
                        <div class="card-pay">
                                <img src="https://s.algoritmika.org/19u7id9" alt="payment">
                            </div>
                    </div>
                    
                </div>
            </div>


           <div class="card sber">
                <div class="card-container">
                    <div class="card-chip">
                    <img src="https://s.algoritmika.org/a70yh9" alt="chip"  class="card-chip-img">
                    <img src="https://free-png.ru/wp-content/uploads/2019/05/Logotip-Sberbank-thumb.png" alt="sberbank logo" class="card-chip bank-logo"> 
                    </div>
                    <div class="card-number">
                    <span>4500 6812 5512 6089</span>
                    </div>
                    <div class="card-name">
                    <span>ALEKSEEV IVAN</span>
                    </div>
                    <div class="card-bottom"> 
                        <div class="card-valid">
                            <span class="card-valid-name">
                            Valid thru: <br>
                            </span>
                            <span class="card-valid-date">
                            07/22
                            </span>
                        </div>
                        <div class="card-pay">
                                <img src="https://s.algoritmika.org/kfjlqn" alt="payment">
                            </div>
                    </div>
                    
                </div>
            </div>

        </div>


       <div>

               <div class="card tinkoff">
                <div class="card-container">
                     <div class="card-chip">
                    <img src="https://s.algoritmika.org/a70yh9" alt="chip"  class="card-chip-img">
                    <img src="https://toplogos.ru/images/logo-tinkoff-bank.png" alt="tinkoff logo" class="card-chip bank-logo"> 
                    </div>
                    <div class="card-number">
                    <span>4500 6812 5512 6089</span>
                    </div>
                    <div class="card-name">
                    <span>ALEKSEEV IVAN</span>
                    </div>
                    <div class="card-bottom"> 
                        <div class="card-valid">
                            <span class="card-valid-name">
                            Valid thru: <br>
                            </span>
                            <span class="card-valid-date">
                            07/22
                            </span>
                        </div>
                        <div class="card-pay">
                                <img src="https://s.algoritmika.org/19u7id9" alt="payment">
                            </div>
                    </div>
                    
                </div>
            </div>


              <div class="card vtb">
                <div class="card-container">
                     <div class="card-chip">
                    <img src="https://s.algoritmika.org/a70yh9" alt="chip"  class="card-chip-img">
                    <img src="https://upload.wikimedia.org/wikipedia/ru/thumb/c/cc/VTB24_Logo.svg/1024px-VTB24_Logo.svg.png" alt="vtb logo" class="card-chip bank-logo"> 
                    </div>
                    <div class="card-number">
                    <span>4500 6812 5512 6089</span>
                    </div>
                    <div class="card-name">
                    <span>ALEKSEEV IVAN</span>
                    </div>
                    <div class="card-bottom"> 
                        <div class="card-valid">
                            <span class="card-valid-name">
                            Valid thru: <br>
                            </span>
                            <span class="card-valid-date">
                            07/22
                            </span>
                        </div>
                        <div class="card-pay">
                                <img src="https://s.algoritmika.org/kfjlqn" alt="payment">
                            </div>
                    </div>
                    
                </div>
            </div>

        </div>


       


        
    <div> <!-- обертка родитель, чтобы поставить флекс -->
  
</body>
</html>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<main class="main">

    <div class="container">
        <div class="news">
            <div class="fact"> 
                <span>89%</span> людей не проверяют информацию в интернете
                
            </div>
            <div class="news-text">
                <h1>Польская ракета-носитель взорвалась после удара о небесную твердь</h1>
                <p> Неудачей завершился первый космический запуск польской ракеты-носителя Bursztyn (Янтарь), проходивший на космодроме в Катовице. Как передают очевидцы, аппарат вначале успешно поднялся в небо и готов был преодолеть атмосферу, но неожиданно взорвался, после этого горящие обломки упали на землю. Жертв и разрушений удалось избежать.
                </p>
                <p>По результатам инцидента была созвана чрезвычайная комиссия. Изучив снимки с польского спутника Titan, и осмотрев обломки космического аппарата, учёные пришли к выводу, что ракета-носитель потерпела крушение не из-за термического воздействия слоёв атмосфера, а в результате сильного удара на скорости 10 км/с «в препятствие необъяснимого происхождения», названное в официальном отчёте небесной твердью.
                </p>
            </div>
        </div>
    </div>

</main>

</body>
</html>


@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
}

.container {
   /* width: 520px;
   если это поставить, то получается не так, как в макете, хотя просят ширину поставить 520, не понимаю..*/
}

h1 {
    font-size: 25px;
    font-weight: 800;
}

.fact {
    margin: 0 25px;
}

.fact span {
    color: red;
    font-size: 40px;
    font-weight: 800;
}
.news {
    display: flex;
    align-items: center;
}


блок блоки



при наведении блок 





<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hover</title>
</head>
<body>
  <div class="photo-with-tip">
    <img class="photo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/220px-Alan_Turing_Aged_16.jpg" alt="Turing">
    <p class="tip">Alan Turing</p>

  
  </div>
</body>
</html>


.photo-with-tip {
    position: relative;
}

.tip {
    display: none;
    position: absolute;
    top: -10px;
    left: 50px; /*почему сюда если поставить проценты, то текст не в середину left: фо;*/
    background-color: white;
    min-height: 30px;
    text-align: center;
    border-radius: 10%;

}
.photo-with-tip:hover .tip {
    display: block;
}


https://metanit.com/web/html5/2.6.php

BIG O 0

https://www.youtube.com/watch?v=OMnOVADHwLA git merge 




блок при наведении
.photo-with-tip {
    position: relative;
}

.tip {
    display: none;
    position: absolute;
    top: -10px;
    left: 50px; 
    background-color: white;
    min-height: 30px;
    text-align: center;
    border-radius: 10%;

}
.photo-with-tip:hover .tip {
    display: block;
}

/*.photo-with-tip  {
    display: flex;
    flex-direction: column-reverse;
    width: 200px;
}
.tip {
    display: none;
}


.photo-with-tip:hover .tip {
    display: block;
}*/

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hover</title>
</head>
<body>
  <div class="photo-with-tip">
    <img class="photo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/220px-Alan_Turing_Aged_16.jpg" alt="Turing">
    <p class="tip">Alan Turing</p>

  
  </div>
</body>
</html>





новости новость блок news

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<main class="main">

    <div class="container">
        <h1>ИА «Панорама» сообщает</h1>


        <div class="news">
            <div class="news-date">20 дек 2020</div>
            <div class="news-text">
                <a href="#" class="news-text-link">
                    Полиция Улан-Удэ пресекла несанкционированную игру в футбол «головой» Ленина
                </a>
            </div>
        </div>


         <div class="news">
            <div class="news-date">19 дек 2020</div>
            <div class="news-text">
                <a href="#" class="news-text-link">
Участники шоу «Дом-2» объявили себя обманутыми дольщиками
                </a>
            </div>
        </div>

         <div class="news">
            <div class="news-date">12 дек 2020</div>
            <div class="news-text">
                <a href="#" class="news-text-link">
                    Польская ракета-носитель взорвалась после удара о небесную твердь
                </a>
            </div>
        </div>


         <div class="news">
            <div class="news-date">09 дек 2020</div>
            <div class="news-text">
                <a href="#" class="news-text-link">
                    В рамках программы по колонизации Луны «Роскосмос» построит на спутнике колонию общего режима
                </a>
            </div>
        </div>
        

    </div>

</main>
</body>
</html>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<main class="main">

    <div class="container">
        <div class="news">
            <div class="fact"> 
                <span>89%</span> людей не проверяют информацию в интернете
                
            </div>
            <div class="news-text">
                <h1>Польская ракета-носитель взорвалась после удара о небесную твердь</h1>
                <p> Неудачей завершился первый космический запуск польской ракеты-носителя Bursztyn (Янтарь), проходивший на космодроме в Катовице. Как передают очевидцы, аппарат вначале успешно поднялся в небо и готов был преодолеть атмосферу, но неожиданно взорвался, после этого горящие обломки упали на землю. Жертв и разрушений удалось избежать.
                </p>
                <p>По результатам инцидента была созвана чрезвычайная комиссия. Изучив снимки с польского спутника Titan, и осмотрев обломки космического аппарата, учёные пришли к выводу, что ракета-носитель потерпела крушение не из-за термического воздействия слоёв атмосфера, а в результате сильного удара на скорости 10 км/с «в препятствие необъяснимого происхождения», названное в официальном отчёте небесной твердью.
                </p>
            </div>
        </div>
    </div>

</main>

</body>
</html>








@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

main {
    
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    box-sizing: border-box;
}

.container {
    background-color: lightgray;
    padding: 40px 40px;
    width: 400px;
    margin: auto;
}
h1 {
    font-size: 26px;
}
.news {
    display: flex;
    border-bottom: 1px solid gray;
    padding: 20px 0;
}
.news-date {
    font-weight: 700;
    font-size: 15px;
    width: 50%;
}
.news-text {
    margin-left: 30px;
    width: 400px;

}

.news:last-child {
    border-bottom: 0px solid gray;
}


-----------------
	1 вариант
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
}

.container {
   /* width: 520px;
   если это поставить, то получается не так, как в макете, хотя просят ширину поставить 520, не понимаю..*/
}

h1 {
    font-size: 25px;
    font-weight: 800;
}

.fact {
    margin: 0 25px;
}

.fact span {
    color: red;
    font-size: 40px;
    font-weight: 800;
}
.news {
    display: flex;
    align-items: center;
    width: 520px;
}

2 вариант 

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
}

h1 {
    font-size: 25px;
    font-weight: 800;
}

.fact {
    margin: 0 25px;
    width: 100px;
    display: flex;
    flex-direction: column;
}

.fact span {
    color: red;
    font-size: 40px;
    font-weight: 800;
}
.news {
    display: flex;
    align-items: center;
    /*width: 520px;*/
}
.news-text {
    width: 520px;
}




https://metanit.com/web/html5/2.7.php  
https://metanit.com/web/html5/2.8.php


футер как прибить footer sticky
https://proweb63.ru/help/all-about-css/css-footer-pribit 


h/w adaptive

<!DOCTYPE html>
<html lang="ru">
  <head>
    <link rel="stylesheet" href="style.css">
    <title>DOM</title>
    <meta charset="UTF-8">
  </head>
  <body>
    <main>
      <div class="container">
          <div class="wrapper">
              <div class="card">
                <img src="https://thumbs.dreamstime.com/b/coding-concept-html-code-coding-programming-concept-html-source-code-tilted-vector-illustration-155503904.jpg" 
                alt="html studying example" class="card-pic">
                 <div class="card-info">
                   <h2>HTML</h2>
                   <p>
                    The language for building web pages.
                   </p>
                 </div>
                <button class="card-button"> 
                  Learn HTML
                </button>
              </div>

              <div class="card">
                <img src="https://thumbs.dreamstime.com/b/coding-concept-html-code-coding-programming-concept-html-source-code-tilted-vector-illustration-155503904.jpg" 
                alt="html studying example" class="card-pic">
                 <div class="card-info">
                   <h2>HTML</h2>
                   <p>
                    The language for building web pages.
                   </p>
                 </div>
                <button class="card-button"> 
                  Learn HTML
                </button>
              </div>

              <div class="card">
                <img src="https://thumbs.dreamstime.com/b/coding-concept-html-code-coding-programming-concept-html-source-code-tilted-vector-illustration-155503904.jpg" 
                alt="html studying example" class="card-pic">
                 <div class="card-info">
                   <h2>HTML</h2>
                   <p>
                    The language for building web pages.
                   </p>
                 </div>
                <button class="card-button"> 
                  Learn HTML
                </button>
              </div>

          </div>
        
      </div>
    </main>
    <footer>
          <div class="container">
                <div class="wrapper">
              <div class="footer-info">
                <p>2017-2020</p>
                <br>
                <p>If you have any questions or suggestions, please contact us hello@algoritmika.org <br>
      or call at +7 (495) 256-30-41
                </p>
              </div>
              <div class="footer-socials">
                <ul>
                  <li>
                    <a href="#">
                      <img src="https://mars.algoritmika.org/uploads/2020/06/brands-and-logotypes_0_1592126153.png" 
                      alt="insta logo">
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="https://mars.algoritmika.org/uploads/2020/06/vk_0_1592126148.png" 
                      alt="vk">
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="https://mars.algoritmika.org/uploads/2020/06/facebook_0_1592126152.png" 
                      alt="fb">
                    </a>
                  </li>
                </ul>
              </div>
              
            </div>
        </div>
          
    </footer>
  </body>
</html>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

*{
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
}
body {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  /*justify-content: space-between; почему этим 
  не прибить футер к низу страницы именно так?
  main и футер дети body же 
  а получается через высоту (ниже) и флекс 1 0 / 0 0 auto в main / footer*/
  height: 100%;
}
main {
  flex: 1 0 auto;
}
.container {
  margin: auto;
  max-width: 1110px;
  margin-bottom: 50px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}
.card {
  width: 30%;
  margin: 10px; /* в процентах задавть будет плохо?*/
}
.card-pic {
  width: 100%;
}
h2 {
  font-size: 12px;
}
p {
  margin: 10px 0;
  font-size: 10px;
}
button {
  background-color: #ba99e4;
  border-width: 0px;
  border-radius: 5px;
  width: 100%;
  padding: 5px;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 7%; /*есть ли тут смысл проценты ставить? как понять, чем вообще пользоваться*/
}
footer {
  background-color:#eee;
  margin-bottom: 0;
  flex: 0 0 auto;
}
footer p {
  margin: 0 0 10px 0;
}
footer .wrapper {
    padding: 10px;
}
ul {
  list-style: none;
  display: flex;
}
footer img {
  width: 20px;
  margin-left: 5px;
}
@media (max-width: 767px) {
  main .wrapper {
    flex-direction: column;
  }
  .card {
    width: 50%;
    margin: 40px auto;
  }
  footer ul {
    flex-wrap: wrap;
    
  }
}
/*не понимаю по какой логике здесь что-то делать*/
@media (max-width: 559px) {
    .card {
        width: 50%;
        margin: 10px auto;
  }
}



let fullName = 'Alan Turing';
console.log(fullName.length -1);
console.log(--fullName.length);
/*это слишком хитро*/

/*вариант 2, где только имя*/
console.log(fullName.indexOf(" "));


В переменной fullName хранится полное имя пользователя. Выведите в консоль количество букв в имени. Пробел не является буквой.




let fullname = "Reiji Black";
let initial1 = fullname[0];
let initial2 = fullname[fullname.indexOf(" ") + 1];
console.log(initial1 + initial2);
/*вариант лучше*/ 
console.log(`${fullname[0]}${fullname[fullname.indexOf(" ") + 1]}`);


Создайте переменную fullName и запишите в неё через пробел имя и фамилию пользователя. Напишите программу, которая, используя значение переменной fullName, выводит в консоль инициалы пользователя.


JS задачи



Напишите программу, которая просит пользователя ввести цену в формате «530.90» и выводит в консоль цену в формате «530 руб. 90 коп.». 

let sum = prompt("Введите сумму в рублях в формате 000.00");
let i = sum.indexOf(".");
let rub = sum.substr(0,i);
let cop = sum.substr(i+1, sum.length); //i+1 - следующий индекс

console.log(`${rub} руб. ${cop} коп.`);



Используя шаблонную строку, выведите в консоль сообщение вида “Рады снова видеть вас, [firstName] [lastName]”.
В переменной firstName хранится имя пользователя, а в переменной lastName — фамилия.
Используя шаблонную строку, выведите в консоль сообщение вида “Рады снова видеть вас, [firstName] [lastName]”.

let firstName = 'Alan';
let lastName = 'Turing';
console.log(`Рады снова видеть вас, ${firstName} ${lastName}.`);



В переменной fullName хранится полное имя пользователя. Выведите в консоль количество букв в имени. Пробел не является буквой.


let fullName = 'Alan Turing';
console.log(fullName.length -1);
console.log(--fullName.length);
/*это слишком хитро*/

/*вариант 2, где только имя*/
console.log(fullName.indexOf(" "));
 */


Напишите программу, которая выводит в консоль инициалы пользователя.
Создайте переменную fullName и запишите в неё через пробел имя и фамилию пользователя. Напишите программу, которая, используя значение переменной fullName, выводит в консоль инициалы пользователя.


let fullname = "Reiji Black";
let initial1 = fullname[0];
let initial2 = fullname[fullname.indexOf(" ") + 1];
console.log(initial1 + initial2);
/*вариант лучше*/ 
console.log(`${fullname[0]}${fullname[fullname.indexOf(" ") + 1]}`);

Запросите у пользователя ввод полного имени, и поменяйте фамилию и имя местами.
Запросите у пользователя ввод полного имени в формате «ИМЯ ФАМИЛИЯ». Выведите его полное имя в консоль, изменив порядок, т.е. В формате «ФАМИЛИЯ ИМЯ».

let fullName = prompt("Напишите Ваше ИМЯ ФАМИЛИЯ, а мы вернём Вам Вашу ФАМИЛИЮ ИМЯ. Выгодная сделка! Не упустите!");
let i = fullName.indexOf(" ");
let name = fullName.substring(0,i);
let surname = fullName.substring(i+1, fullName.length);

console.log(surname + " " + name);


Переведите значение переменной в метры в секунду и выведите в консоль.
В переменной kmhSpeed хранится значение скорости автомобиля в «километрах в час». Объявить переменную msSpeed и записать в неё то же значение скорости, переведённое в «метры в секунду». Вывести в консоль значение переменной msSpeed.

let kmhSpeed = 75;
let msSpeed = kmhSpeed*1000/3600;
console.log(msSpeed);

Проверь сам
Напишите программу, которая находит 6-ую цифру произведения чисел 12345 и 98765.

console.log(String(12345*98765)[5]); 



let number = 12345 * 98765;
console.log(number);
let figure6 = String(number)[5];
console.log(figure6);


Напишите программу для вывода суммы цифр.
Напишите программу, которая просит пользователя ввести четырёхзначное число, а потом выводит в консоль сумму цифр введённого числа.

let number = prompt("Введите 4 цифры");
let sum = +number[0] + +number[1] + +number[2] + +number[3];
console.log(sum);

Напишите программу для вычисления суммы зарплаты без учёта налога.
Напишите программу для вычисления суммы зарплаты без учёта налога. Программа запрашивает у пользователя сумму и выводит в консоль ту же сумму, но без учёта налога в 13%.


let salary = prompt("введите сумму вашей зарплаты"); // потом математика будет приводить данные в цислу
let netto = salary - salary*13/100;
console.log(netto);

// 2 вариант

console.log(prompt("введите сумму вашей зарплаты")*0.87);


Проверьте возраст пользователя.
Запросите у пользователя его возраст. 
Если пользователю меньше 18, то выведите браузерное оповещение с текстом «Access denied». 
В противном случае выведите сообщение «Access granted».

let age = prompt("Введите цифру своего возраста");

if (age < 18) {
    console.log("Access denied");
} else {
    console.log("Access granted");
}


Напишите 5 выражений с разными операторами сравнений.
Напишите 5 выражений с разными операторами сравнений для переменной value, результат выполнения которых будет равен true для value = 10 и false для value = 20.

let value = 20;
console.log(value == 10);
console.log(value <= 10);
console.log(value < 15);
console.log(value != 20);
console.log(value == 10);


switch
	
let id = prompt('введите id товара:');
if (id === '1') {
  alert('В наличии 10 шт.');
}
else if (id === '2') {
  alert('В наличии 256 шт.');
 }
else if (id === '3') {
  alert('В наличии 53 шт.');
 }
  else if (id === '4') {
  alert('В наличии 3 шт.');
 }
else {
  alert('Нет в наличии');
}

switch(id) {
    case '1':
        alert('В наличии 10 шт.');
        break;
    case '2':
        alert('В наличии 256 шт.');
        break;
    case '3':
        alert('В наличии 53 шт.');
        break;
    case '4':
        alert('В наличии 3 шт.');
        break;
    default: 
        alert('Нет в наличии');
        break;
}
		

		
		Напишите программу, которая запрашивает у пользователя его пол (в виде буквы M или F), и записывает в переменную gender словами male или female.
		
//let gender  = prompt("Введите  ваш пол M или F") === "M" ? "male" : "female";

gender  = prompt("Введите  ваш пол M или F");
// проверка
if (gender !="M" && gender!="F" ) { // если нужно действие (console.log) - if !
    console.log("not right =(");
} else {
   gender = gender == "M" ? "male" : "female"; 
   console.log(gender);
   //кладем переменную (gender), потому оператор тренарный подходит 
}
	
		
	Напишите функцию, которая принимает имя пользователя в качестве параметра.
Напишите функцию, которая принимает имя пользователя в качестве параметра и выводит в консоль сообщение 
«[Имя пользователя] is active now».
Вызовите её для 3 разных имён.

function userActive(name) {
    console.log(`${name} is active now`);
}
userActive("Rei");
userActive("Jude");
userActive("Ji");
		
		
		вывести нибольшее чсило из трех
		
		function biggestInt(a, b, c) {
    if(a>b && a>c) {
        console.log(a);
    } else if (b>a && b>c) {
         console.log(b);
    } else {
         console.log(c);
    }
}
biggestInt(5, 10, 30);
		
		
	Напишите функцию, которая выводит сообщение с суммой на всех счетах в рублях.
Напишите функцию, которая принимает баланс на счетах в рублях и долларах, и выводит сообщение с суммой на всех счетах в рублях.	
		
		
	let balance1 = 1200;
let balance2 = 20;
let balance1 = 1200;
let balance2 = 20;

function allSumInRub(balance1, balance2) { ///здесь можно заменить на a и b арнгуменыт 
//или они должны совпадать 
//с названием переменной
    let res = balance1 + balance2*75;
    console.log(`Сумма на всех вкладах: ${res} руб `);
}
allSumInRub(balance1, balance2);




		Напишите функцию min(), которая получает в качестве параметров два числа и возвращает наименьшее из них.
		
function min(a, b) {
    let res;
    if (a<=b) {
        res = a;
    } else {
        res = b;
    }
    return res;
}
console.log(min(5, 6));
		
		
		
		Напишите функцию calc, которая получает в качестве параметра два числа и знак математической операции, а возвращает результат выполнения этой операции.
Например, calc(4, 6, '+');  // вернёт 10
		
		
		
		function calc(a, b, c) {
    let res;
    switch(c) {
        case "+": 
            res = a+b;
            break;
        case "-":  
            res = a+b;
            break;
          case "/":  
            res = a/b;
            break;
          case "*":  
            res = a*b;
            break;
         default:
            console.error("not right parameter");
            return null;

    }
    return res;
}


function calc(a, b, c) {
    if(typeof x == "NaN" || typeof y == "NaN"){
        console.error("bad input");
        return null;
    }
    if(c === "+") {
        return x+y; // return прекращает действие
    }
    if (c === "-") {
        return x-y; 
    } 
    //... здесь можно написать else 
    //но тогда везде должно else if
    console.error("not right parameter");
    return null;
}

console.log(calc(4, 6, '+'));  // 10	
		
		
		
		Напишите функцию, которая проверяет, является ли билет «счастливым».
Напишите функцию isLucky, которая получает шестизначное число и проверяет, что сумма первых трёх цифр равняется сумме вторых трёх цифр.
Функция должна возвращать true, если билет счастливый, и false, если билет несчастливый.

const isLucky = (num) => {
    if(typeOf num == "NaN") {
        console.error("invalid input");
        return null;
    }
    num = num.toString();
    if(num.length !=6) {
        console.error("incorrect arg");
        return null;
    }
    let a = Number(num[0])+Number(num[1])+Number(num[2]));
    let b = Number(num[3])+Number(num[4])+Number(num[5]));
    if(a==b) {
        return true;
    } else {
        return false;
    }
    /*if(num[0]+num[1]+num[2] == num[3]+num[4]+num[5]) {
        return true;
    } else {
        return false;
    }*/
};


КТО ХОЧЕТ СТАТЬ МИЛЛИОНЕРОМ КРИВОЕ
		
		function question {
    let resp = prompt("Какое растение существует на самом деле\n
        A: лох чилийский \n
        B: лох идийский \n
        C: лох греческий \n
        D: лох русский \n
        50/50: подсказка
        );
}

resp = resp.toLocaleLowerCase(); //50/50
if(resp == "50/50"){
    resp=prompt("Какое растение существует на самом деле\n
        A: лох чилийский \n
        B: лох идийский \n
        C: лох греческий \n");
    resp = resp.toLocaleLowerCase();
}
if(resp == "b") {
    return true;
} else {
    return false;
}

function game() {
    if(question1() && question2()) {
        alert("Win");
    } else {
        alert("lose")
    }
}
game();
		
		чуть менее криво
		
	
		Напишите программу для проверки, является ли год високосным.
Запросите у пользователя год. Выведите в консоль сообщение, является ли введённый год високосным.
let userDate = prompt("введите дату");

function isLeap(year) {
    if(isNaN(year*1)) {
        alert("bad input"); //проверка не работает, но программа работает
    } else if(year % 4 == 0 || year % 100 == 0 && year % 400 != 0) {
        alert("Год является високосным");
    } else {
        alert("Год не является високосным");
    }
}

isLeap(userDate);
		
		
Напишите программу, которая выводит в консоль название месяца.
Запросите у пользователя номер месяца и выведите в консоль его название.

let monthNumber = prompt("Введите номер месяца");

monthNumber = monthNumber*1; // приведение и типу - number для проверки в свиче
//console.log(typeof monthNumber, monthNumber); - проверка данных
if (monthNumber > 0) {
    switch(monthNumber) {
    case 1:
        alert('Январь');
        break;
    case 2:
        alert('Ферваль');
        break;
    case 3:
        alert('Март');
        break;
    case 4:
        alert('Апрель');
        break;
     case 5:
        alert('Май');
        break;
     case 6:
        alert('Июнь');
        break;
     case 7:
        alert('Июль');
        break;
     case 8:
        alert('Август');
        break;
     case 9:
        alert('Сентябрь');
        break;
     case 10:
        alert('Октябрь');
        break;
     case 11:
        alert('Ноябрь');
        break;
    case 12:
        alert('Декабрь');
        break;
} } else {
    alert("Введено некорректное число")
}

	
		
Напишите функцию isEven(), которая принимает в качестве параметра число и возвращает true, если оно чётное, или false, если оно нечётное.
	
 let num = prompt("введите число");

 function isEven(num) {

    if(isNaN(num*1)) { //проверка на число 
        console.log("not valid argument");
        } else if (num % 2 == 0) {
        console.log(true);
        //return true;
       } else {
        //return false;
        console.log(false);
       }
    }

isEven(num);	
		

		
		Напишите функцию fourth(), которая принимает в качестве параметра число и выводит в консоль это число, возведённое в четвёртую степень.
		
		
function fourth(num) {
    if(isNaN(num*1)) { //проверка на число 
        console.log("not valid argument");
    } else {
    console.log(num ** 4);
    // Math.pow(num, 4)
    }
}
    
fourth(2);
fourth("dsf");

	Напишите функцию isValidNumber(), которая получает в качестве параметра номер телефона. Функция возвращает true, если номер телефона состоит из 11 цифр и начинается с +7.
		
		
1 вариант

function isValidNumber(tel) {
    let head = tel.substr(0,2);
    let tail = tel.substr(2); // считает до конца
    //console.log(head, " ", tail)
    if(
        head != "+7" || isNaN(tail*1) || tail.length !=10
    ) 
    {
        return false;
    } 
        return true;

}

console.log(isValidNumber("+75555555555")) ;
console.log(isValidNumber("+755555555"));
console.log(isValidNumber("+dfsdf"));
		
		
	// вариант 2
		



function isValidNumber(tel) {
    if( ! (
    tel.length == 12 
    && tel[0] == "+" 
    && tel[1] == "7" 
    && !isNaN(tel.substr(1)*1)
    ) 
    ){
         return false;
    } else {
        return true;
    }

}
console.log(isValidNumber("+75555555555")) ;
console.log(isValidNumber("+755555555"));
console.log(isValidNumber("+dfsdf"));


		
		Увеличивайте двузначное число до тех пор, пока оно не станет трёзначным.
Запросите у пользователя ввод двузначного числа. Увеличивайте это число на 7 до тех пор, пока оно не станет трёхзначным. Итоговое значение выведите в консоль.

let num = +prompt("Введите двузначное число");

while(num<100) {
    num = num + 7; //num +=7
    console.log(num);
}
console.log(num);
	
		
	Напишите программу, которая N раз выведет в консоль сообщение «I know how to use cycles».
Напишите программу, которая N раз выведет в консоль сообщение «I know how to use cycles».
Число N программа запрашивает у пользователя.

let n = prompt("введите число");
let i = 0;
while(i<n) { //приведение данных случается, потому прописывать проверку на NaN и прочее
// не надо, они происходит на автоматически
    console.log("I know how to use cycles");
}
		
		

Напишите программу, которая выводит в консоль все трёхзначные числа, которые заканчиваются на 0.
		
let i = 100; // здесь надо начинать с нужного нам числа, иначе будет false 
while(i<1000) {
    console.log(i);
    i += 10; //кратно 10 - делится на 0
}
// можно через if но занимает больше времени i%10   i++ (ибо добавлять по одному будет - больше числен выводит)
		
Напишите программу для вывода среднего из трёх чисел.
Запросите у пользователя ввод трёх двузначных чисел одним сообщением. Выведите в консоль среднее, т. е. не наибольшее и не наименьшее. Если пользователь ввёл несколько одинаковых чисел, выведите сообщение об ошибке

Напишите программу, которая выводит в консоль сумму всех нечётных двузначных чисел.

let i = 10;
let count = 0;

while(i<100) {
    if(i % 2 != 0) {
        count = count + i; //сумма, т..е если count ++ то 
        //будет сколько всего цифр, а нам надо сумму
    }
    i++;
}
console.log(count);
		
		
		

*/
