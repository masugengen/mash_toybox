/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-new */


import Swiper, {Navigation, Pagination, Autoplay, EffectFade, Keyboard, A11y, Controller} from 'swiper';

new Swiper('.top-carousel', {
  modules: [Navigation, Pagination, Autoplay, EffectFade, Keyboard, A11y, Controller],
  loop: true,
  keyboard: {
    enabled: true
  },
  /*
   * autoplay: {
   *   delay: 5000,
   *   disableOnInteraction: false
   * },
   */
  speed: 1000,
  pagination: {
    el: '.top-carousel-pagination',
    bulletClass: 'top-carousel-pagination__bullet',
    bulletActiveClass: 'top-carousel-pagination__active',
    clickable: true
  },
  on: {
    init() {
      const autoplayBtn = ():void => {
        const root = document.querySelector('.top-carousel-playbtn__btn');
        const rootTxt = root.querySelector('.top-carousel-playbtn__btn-txt');

        if (!root.classList.contains('is-carousel-nowstop' || 'is-carousel-nowplay')) {
          root.classList.add('is-carousel-nowplay');
        }

        if (root.classList.contains('is-carousel-sliding')) {
          return;
        }

        root.addEventListener('click', () => {
          if (root.classList.contains('is-carousel-nowplay')) {
            root.classList.add('is-carousel-sliding');
            root.classList.remove('is-carousel-nowplay');
            rootTxt.textContent = '再生する';
            root.classList.add('is-carousel-nowstop');
            root.classList.remove('is-carousel-sliding');
            // @ts-ignore
            this.autoplay.stop();

            return;
          }

          if (root.classList.contains('is-carousel-nowstop')) {
            root.classList.add('is-carousel-sliding');
            root.classList.remove('is-carousel-nowstop');
            rootTxt.textContent = '停止する';
            root.classList.add('is-carousel-nowplay');
            root.classList.remove('is-carousel-sliding');
            // @ts-ignore
            this.autoplay.start();
          }
        });
      };

      autoplayBtn();
    }
  }
});
