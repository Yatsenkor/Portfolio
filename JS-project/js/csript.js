window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item');

    const tabsParant = document.querySelector('.tabheader__items');
    console.log(tabsParant)

    const tabsContent = document.querySelectorAll ('.tabcontent');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach (item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent (i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent ();
    showTabsContent ();


    tabsParant.addEventListener( 'click', (event) =>{
        const target = event.target;

        if (target && event.target.classList.contains('tabheader__item')){
            console.log('click')
            tabs.forEach((item, i) => {
                if (target == item){
                    hideTabContent();
                    showTabsContent(i);
                }
            });
        }
    });

    //timer

    const deadline = '2020-09-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t /(1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / (1000 * 60 ) % 60)),
              seconds =Math.floor((t/1000 % 60));

        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero (num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);


            updateClock();

            function updateClock () {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0){
                    clearInterval(timeInterval);
                }

            }
    }

    setClock('.timer', deadline);

    //modal

    const openTrigger = document.querySelectorAll('[data-modal]');
    
    const windowModal = document.querySelector('.modal');

    function openModal() {
        windowModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            clearInterval(modaltimerId);
    }
    openTrigger.forEach( btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal (){
        windowModal.style.display = 'none';
        document.body.style.overflow = '';
    }

  

    windowModal.addEventListener('click', (event) =>{
        if(event.target === windowModal || event.target.getAttribute('data-close') == ""){
            closeModal ();
        }
    });
    
    document.addEventListener('keydown', (event) =>{
        if(event.code === "Escape"){
            closeModal();
        }
    });

    const modaltimerId = setInterval(openModal, 5000);


    function showModalByScroll (){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();
        window.removeEventListener('scroll',showModalByScroll) ;
       }
    }
    window.addEventListener('scroll',showModalByScroll) ;



// Используем классы для карточек

    class MenuItem {
        constructor (src, alt, title, descr, price, parent, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parse = price;
            this.parentSelector = document.querySelector(parent);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.parse = this.parse * this.transfer;
        }

        rendet(){
            const element = document.createElement('div');

            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
               this.classes.forEach(className => element.classList.add(className));  
            }
            element.innerHTML = 
                `<img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.parse}</span> грн/день</div>
                </div>`;

            this.parentSelector.append(element);


        }
    }    
    new MenuItem(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).rendet();

    new MenuItem(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).rendet();

    new MenuItem(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item'
    ).rendet();


        // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: "./img/form/spinner.svg",
        sucsses:"Спасибо! Скоро с вами  свяжутся",
        failure:"Что-то пошло не так"
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData (form) {
        
        form.addEventListener('submit', (event) =>{
           event.preventDefault(); 

           let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            
          
           
            const formData = new FormData(form);
            
            const obj ={};
            formData.forEach((value, key) =>{
                obj[key] = value;
            });
            

        fetch('server.php',{
            method:'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify(obj)

        }).then(data => data.text()
        ).then( data => {
            console.log(data);
            showThanksModal(message.sucsses); 
            statusMessage.remove();
        }).catch(() =>{
        showThanksModal (message.failure); 
        }).finally(() =>{
            form.reset();
        });
            function showThanksModal(message){
                const prevModalDialog = document.querySelector('.modal__dialog');

                prevModalDialog.classList.add('hide');

                openModal();

                const thankModal = document.createElement('div');
                thankModal.classList.add('modal__dialog');

                thankModal.innerHTML =`
                <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
                </div>
                `;

                document.querySelector('.modal').append(thankModal);

                setTimeout(() =>{
                    thankModal.remove();
                    prevModalDialog.classList.add('show');
                     prevModalDialog.classList.remove('hide');
                    closeModal();
                }, 4000);
            } 
        });
        fetch('http://localhost:3000/menu')
            .then( data => data.json())
            .then(res => console.log(res));
    }
});

