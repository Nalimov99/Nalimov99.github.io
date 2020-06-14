window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    let info = document.querySelector('.info-header'),
        tab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for(let i = a; i < tab.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(a) {
        if(tabContent[a].classList.contains('hide')) {
            tabContent[a].classList.add('show');
            tabContent[a].classList.remove('hide');
        }
    }

    info.addEventListener('click', function(e){
        let target = e.target;
        if(target && target.matches('.info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if(target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                }
            }
        }
    });

    //Timer
    let deadline = new Date(2020, 4, 13);

    function getTimeReamaning(endTime) {
        let t = endTime - new Date(),
            sec = Math.floor((t/1000) % 60),
            min = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/(1000*60*60));
        return {
            'total' : t,
            'sec' : sec,
            'min' : min,
            'hours' : hours
        };
    }

    function changeClock(id, end) {
        let hours = id.querySelector('.hours'),
            min = id.querySelector('.minutes'),
            sec = id.querySelector('.seconds');

        let t = setTimeout(function changeTime(){
            let a = getTimeReamaning(end);
            if(a.total != 0 && a.total > 0 ) {
                hours.textContent = a.hours;
                min.textContent = a.min;
                sec.textContent = a.sec;
                t = setTimeout(changeTime, 1000);
            }
            else {
                clearInterval(t);
                hours.textContent = '00';
                min.textContent = '00';
                sec.textContent = '00';
                let begin = document.querySelector('.timer-action');
                begin.textContent = 'Акция началась!!!';
                begin.style.color = '#c78030';
                begin.style.textTransform = 'Uppercase';
                begin.style.textDecoration = 'Underline';
                begin.style.fontSize = '46px';
            }
        }, 1000);
    }

    let timer = document.getElementById('timer');

    changeClock(timer, deadline);



    //TAB

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    let infoMain = document.querySelector('.info');
    infoMain.addEventListener('click', function(e) {
        
        if(e.target && e.target.matches('.description-btn')) {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';   
        }
    });

    //ES6

    // let footer = document.querySelector('.footer');

    // class Options {
    //     constructor(height = 100, width = 100, bg = '#ffffff', fontSize = 14, textAlign = 'center') {
    //         this.height = height;
    //         this.width = width;
    //         this.bg = bg;
    //         this.fontSize = fontSize;
    //         this.textAlign = textAlign;
    //     }
    //     createElement(textContent = '') {
    //         let elem = document.createElement('div');

            
    //         elem.style.cssText = `height: ${this.height}px;
    //         width: ${this.width}px;
    //         background-color: ${this.bg};
    //         font-size: ${this.fontSize};
    //         text-align: ${this.textAlign};
    //         margin: auto 10px;`;
    //         elem.textContent = `${textContent}`;

    //         footer.insertBefore(elem, footer.firstChild);
    //     }

        
    // }

    // let p = new Options(400, 200, 'red', 22, 'center');
    // p.createElement('HELLO');

    //FORM

    let mainForm = document.querySelector('.main-form'),
        inpute = mainForm.getElementsByTagName('input'),
        stateMessage = {
            load: 'Загрузка...',
            done: 'Отлично! Мы вам перезвоним!',
            fail: 'Произошла ошибка. Попробуйте позже'
        },
        innerMessage = document.createElement('div');

        mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            mainForm.appendChild(innerMessage);
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'applitaction/json; charset=urf-8');

            let formData = new FormData(),
                obj = {};
                

            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);
            request.send(json);

            request.addEventListener('readystatechange', () => {
                if(request.readyState < 4) {
                    innerMessage.textContent = stateMessage.load;
                } else if(request.readyState === 4 && request.status == 200) {
                    innerMessage.textContent = stateMessage.done;
                } else {
                    innerMessage.textContent = stateMessage.fail;
                }
            });
        });
});