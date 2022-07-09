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
    keyboard : 'global',
    pagination : true,
    rewind : true,
    speed : 1000,
    perPage : 1,
    classes : {
		pagination : 'splide__pagination carousel-pagination__list',
		page : 'splide__pagination__page carousel-pagination__dots',
    }
});

topCarousel.on('pagination:mounted', data => {
    data.items.forEach(item => {
        item.li.classList.add('carousel-pagination__item');
    });
});

topCarousel.mount();