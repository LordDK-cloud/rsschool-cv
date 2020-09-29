let init = 0;

//TODO Загрузка прелоадера
window.addEventListener("load", function () {

   let preload = document.querySelector(".preloader")

   setTimeout(function() {

      preload.setAttribute("style", "opacity:0; overflow:hidden;")

      setTimeout(() => {
         preload.style.display = 'none'
         document.querySelector('body').removeAttribute("style")
      }, 1000);

   }, 0);
});



//TODO Тест на поддержку браузером формат изображений webp
function testWebP(callback) {

   var webP = new Image();
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

   if (support == true) {
      document.querySelector('body').classList.add('webp');
   } else {
      document.querySelector('body').classList.add('no-webp');
   }

});


//TODO Анимация менюшки(которая снизу, на главном экране)
function seriesLinks(arrs) {
   arrs.forEach(item => {
     
      item.setAttribute("data-count", `0`)

      item.addEventListener('click', (e) => {
         let is            = e.target,
             thisIndexCard = is.dataset.card,
             indexCardUp   = document.querySelector(`[data-card="${+thisIndexCard - 1}"]`),
             UpIndexCard   = indexCardUp.dataset.card


         if (is.dataset.card != 1) {

            is.dataset.count = +is.dataset.count - 100 
            is.setAttribute('style', `transform:translateY(${is.dataset.count}%)`)

            indexCardUp.dataset.count = + indexCardUp.dataset.count + 100
            indexCardUp.setAttribute('style', `transform:translateY(${indexCardUp.dataset.count}%)`)

            is.dataset.card = UpIndexCard
            indexCardUp.dataset.card = thisIndexCard

            arrs.forEach(btn => {

               btn.dataset.card == 1 ? btn.classList.add('active') : btn.classList.remove('active')

            })

         }

      });
   });
};

//TODO анимация меню(хедера)
function headerMenu(menuLinks) {

   //Наша полосочка и массив ссылок
   let drag          = document.querySelector('.drag'),
      firstMenuItem  = document.querySelector(".menu__item-link")

   drag.setAttribute('style', `transform:translateX(${firstMenuItem.getBoundingClientRect().left - scrollWidth/2}px);width:${firstMenuItem.getBoundingClientRect().width}px`)

   //перебираем каждую ссылку и вешаем событие
   menuLinks.forEach(item => {
      item.addEventListener('click', (e)=>{

         let is   = e.target,
         coord = item.getBoundingClientRect()


         drag.setAttribute('style', `transform:translateX(${coord.left}px);width:${coord.width}px`)
      })
   })
}

//TODO Наш попап
function allText() {
   let sectionMenuMore = document.querySelectorAll('.section-menu__more')

   sectionMenuMore.forEach(link => {
      link.addEventListener('click', e => {
         e.preventDefault()

         let is = e.target,
             parentIs = is.parentElement,
             modal = document.querySelector(".modal"),
             close = document.querySelector('.btn-close'),
             modalText = document.querySelector('.modal-text')

         modal.classList.toggle('modal--active')
         modal.setAttribute('tabindex', '2')
         
         modalText.innerHTML = parentIs.dataset.alltext
         
         close.addEventListener('click', ()=>{
            modal.classList.remove('modal--active')
            modal.removeAttribute("tabindex")
         })

         document.addEventListener('keydown', function (e) {
            if (e.key === "Escape") {
               modal.classList.remove('modal--active')
               modal.removeAttribute("tabindex")
            }
         })

         // parentIs.innerHTML = parentIs.dataset.alltext
      })
   })
}

//TODO Делаем правильную высоту нужным нам блокам c помощью соотношений высоты и ширины
function postsHeight(post, percent){
   let posts = document.querySelectorAll(`.${post}`),
       postW = posts[0].getBoundingClientRect().width,
       postH = postW / 100 * +percent

   posts.forEach(item => {
      item.style.cssText += `height:${postW + postH}px`
   })
}

//TODO парсим текст в карточках (section agro-perfect)

function agro_perfect_text(){
   let text = document.querySelectorAll('.agro-perfect__text')

   text.forEach(item => {
      let textContent = item.innerHTML,
          arr = textContent.split(' '),
          i = 0,
          stringText = "";
      
      arr.forEach(el => {
         i += 1;

         if (i <= 12) {
            stringText += `${el} `;
         }

      });

      item.innerHTML = stringText
      
   })
}



//TODO Узнаем ширину полосы прокрутки 
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width     = '50px';
div.style.height    = '50px';

document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();


//TODO Функция плавного скролла (кроссбраузерная)
function anchor() {

   //TODO! Функция получения координат
   function getCoords(elem) {
      var box = elem.getBoundingClientRect();

      return box.top + pageYOffset
   }
   //TODO! Функция скролла
   function anchorScroll() {

      //TODO! Получаем все ссылки на которые будет вешать плавный скролл
      let links = document.querySelectorAll(".scroll-to")


      //TODO! Проходимся по всем ссылкам и вешаем на них событие
      links.forEach(link => {
         link.addEventListener("click", e => {

            //TODO! удаляем активный класс у меню при нажатии
            let menu = document.querySelector("nav.menu"),
                burger = document.querySelector(".burger");
            menu.classList.remove("menu--active");
            burger.classList.remove("burger--active");

            //TODO! Убираем стандартное поведение ссылки
            e.preventDefault()
            //TODO! Вычисляем на какую ссылку мы нажали
            let is = e.target,
               //TODO! Получаем атрибут шреф и сразу вытягиваем айди секции, на который нам нужно сделать скролл, удалив решетку
               href = is.getAttribute("href").replace(/[#]/, ''),
               //TODO! Находим айтем, на который нам нужно сделать скролл в разметке
               item = document.querySelector(`[id=${href}]`);

            //TODO! Отступ от начала документа
            let margin = item.getBoundingClientRect().top + pageYOffset,
            //TODO! Отступ от начала документа до самой менюхи(если более точно, то до позиции скролла)
               menuOffset = pageYOffset;

            //TODO! Записываем сетИнтервал в переменную, чтоб потом в нужное время мы могли ее остановить и прервать
            let map = setInterval(scrollAnchor, 1);

            //TODO! Вот собственно функция, которая делает анимацию
            function scrollAnchor() {

               //TODO! Проверка на то, что поз нашего скролла находится между отступом секции, к которой скроллим. Тоесть грубо говоря такое неравенство margin < menuOffset < margin
               if (margin >= (menuOffset - 40) && margin <= (menuOffset + 40)) {

                  //TODO! Если проверка сработало, вырубаем нашу анимацию и отдыхаем
                  clearInterval(map)

               }

               //TODO! А если нет, тогда если отступ секции больше позиции, в которой мы сейчас находимся, то просто скроллим себя по 13 пикселей до тех пор, пока не попадем в первую проверку
               if (margin > menuOffset) {

                  //TODO! Это вообще для плавности, замедляем анимацию скролла, вы можете это проигнорить. Смотрите на блок елсе
                  if (margin >= (menuOffset - 350) && margin <= (menuOffset + 350)) {

                     menuOffset += 7;

                     window.scrollTo(0, menuOffset)

                  } else {

                     menuOffset += 13;

                     window.scrollTo(0, menuOffset)

                  }

               //TODO! Ну тут тоже самое, только наоборот, мы скроллим себя вверх
               } else if (margin < menuOffset) {

                  if (margin >= (menuOffset - 350) && margin <= (menuOffset + 350)) {

                     menuOffset -= 7;

                     window.scrollTo(0, menuOffset)

                  } else {

                     menuOffset -= 13;

                     window.scrollTo(0, menuOffset)

                  }

               }

            }

         })
      })

   }

   anchorScroll()
}

//TODO burger and menu mobile
function burger() {

   let burger = document.querySelector(".burger"),
       menu = document.querySelector("nav.menu");

   burger.addEventListener("click", ()=>{
      burger.classList.toggle("burger--active")
      menu.classList.toggle("menu--active")
   })
}

function map2Gis(){
   var map;

   DG.then(function () {

      //TODO Создаем свою иконку для карты 2гис
      var myIcon = DG.icon({
         iconUrl: 'images/marker2gis.png',
         iconSize: [39, 49],
         alt: 'agro foot find us here',
      });
      map = DG.map('map', {
         center: [54.98, 82.89],
         zoom: 13,
         zoomControl: 0,
         fullscreenControl: 0,
      });
      DG.marker([54.98, 82.89], { icon: myIcon }).addTo(map);

   });
}

function toScrolled(name) {

   let item = document.querySelector(name);
   let coord = item.getBoundingClientRect().top + pageYOffset - 600;
   let topCoord = pageYOffset;

   if ( topCoord >= coord && init == 0 ) {
      map2Gis();
      init = 1;
   }
}


document.addEventListener('DOMContentLoaded', function () { 

   //TODO Создаем все наши переменные
   let cardLinks      = document.querySelectorAll('.card__menu-link'),
       headerLinks    = document.querySelectorAll('.menu__item-link'),
       author         = document.querySelector(".author"),
       commSlider;
    
   //TODO! Красивая анимация пунктов меню в мейн скрине внизу (в мини галерее на гридах)
   seriesLinks(cardLinks)
   //TODO! Полосочка под каждым элементом в меню-списке
   headerMenu(headerLinks)
   //TODO! Генерация в модальном окне текста
   allText()
   //TODO! функция вычислений соотношений сторон
   postsHeight('gallery__img', '-7')
   postsHeight('blog__post', '7')
   //TODO! scroll to anchor
   anchor()
   //TODO! burger and menu
   burger()
   agro_perfect_text()
   window.addEventListener('scroll', () => {

      toScrolled('footer')

   })

   //TODO Инициализируем слайдер
   commSlider = new Swiper('.swiper-container', {
      pagination: {
         el        : '.comm-pagination'   ,
         type      : 'bullets'            ,
         clickable : 1                    ,
      },
   });

   //TODO ставим правильно расположение пагинации у слайдера
   document.querySelector(".comm-pagination").setAttribute('style', `transform:translate(0, -${author.getBoundingClientRect().height / 2 - 8}px)`);

   //TODO листенер для настройки доступности нашего слайдера из комментариев (навигация по нажатию стрелок)
   document.addEventListener("keydown", (e)=> {

      //TODO! Стрелка влево
      if (e.keyCode == '37') {
         commSlider.slidePrev()
      }
      //TODO! Стрелка вправо
      else if (e.keyCode == '39') {
         commSlider.slideNext()
      }

   })

   
});



svg4everybody({}); //TODO! Полифилл для свг-спрайтов

//TODO! Полифилл для css-переменных
/* cssVars({
    include: 'style:not([data-ignore])',
    onlyLegacy: false
   });
*/
