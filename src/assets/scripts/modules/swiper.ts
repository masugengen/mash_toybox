/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-new */

import Swiper, {Navigation, Pagination, Autoplay, EffectFade, A11y, Keyboard, Controller} from 'Swiper';

new Swiper('.top-carousel', {
  modules: [Navigation, Pagination, Autoplay, EffectFade, A11y, Keyboard, Controller],
  loop: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  speed: 1000,
  pagination: {
    el: '.top-carousel-pagination',
    bulletClass: 'top-carousel-pagination__bullet',
    bulletActiveClass: 'top-carousel-pagination__active',
    clickable: true
  },
  a11y: {
    paginationBulletMessage: '{{index}}枚目のスライドを表示する'
  },
  on: {
    init() {
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
        } else if (root.classList.contains('is-carousel-nowstop')) {
          root.classList.add('is-carousel-sliding');
          root.classList.remove('is-carousel-nowstop');
          rootTxt.textContent = '停止する';
          root.classList.add('is-carousel-nowplay');
          root.classList.remove('is-carousel-sliding');
          // @ts-ignore
          this.autoplay.start();
        }
      });
    },
    slideChangeTransitionEnd() {
      const carouselItem = document.querySelectorAll('.swiper-slide');

      carouselItem.forEach((element) => {
        if (!element.classList.contains('swiper-slide-active')) {
          element.querySelector('.top-carousel-link').setAttribute('tabindex', '-1');
        }

        if (element.classList.contains('swiper-slide-active')) {
          element.querySelector('.top-carousel-link').removeAttribute('tabindex');
        }
      });
    }
  }
});
