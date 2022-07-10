import { Splide } from "@splidejs/splide";

const topCarousel = new Splide('.top-carousel', {
    type : 'loop',
    label : '',
    role : 'group',
    autoplay : true,
    interval : 10000,
    resetProgress : false,
    pauseOnFocus : false,
    pauseOnHover : false,
    arrows: false,
    keyboard : 'global',
    pagination : true,
    rewind : true,
    speed : 1000,
    perPage : 1,
    classes : {
        arrows: 'splide__arrows top-carousel-arrow',
		arrow : 'splide__arrow top-carousel-arrow__item',
		prev  : 'splide__arrow--prev top-carousel-arrow__item--prev',
		next  : 'splide__arrow--next top-carousel-arrow__item--next',
		pagination : 'splide__pagination top-carousel-pagination__list',
		page : 'splide__pagination__page top-carousel-pagination__bullet',
    }
});

topCarousel.on('pagination:mounted', data => {
    data.items.forEach(item => {
        item.li.classList.add('top-carousel-pagination__item');
    });
});

topCarousel.mount();