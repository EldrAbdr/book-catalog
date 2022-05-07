import {Swiper} from "swiper";
import "swiper/css";

export default function MySwiper(props) {
    new Swiper(props.class, {
        slidesPerView : props.slidePerView,
        slidesPerGroup: props.slidesPerGroup,
        loop: true,
        freeMode: true,
        navigation: {
            nextEl: props.nextEl,
            prevEl: props.prevEl,
        }
    })

    return (
        <div className="containerSlider">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                    </div>
                    <div className="swiper-slide">123123</div>
                    <div className="swiper-slide">123123</div>
                    <div className="swiper-slide">123123</div>
                </div>
            </div>
        </div>
    );
}

/*const swiper = new Swiper(".mySwiper-projects", {
  slidesPerView: 1,
  spaceBetween: 0,
  slidesPerGroup: 1,
  breakpoints: {
    430: {
      slidesPerView: 2,
      spaceBetween: 20,
      slidesPerGroup: 2,
    },
    650: {
      slidesPerView: 3,
      spaceBetween: 20,
      slidesPerGroup: 3,
    },
    910: {
      slidesPerView: 4,
      spaceBetween: 20,
      slidesPerGroup: 4,
    }
  },
  pagination: {
    el: ".projects__pagination-fraction",
    type: "fraction",
  },
  navigation: {
    nextEl: ".projects__pagination-arrow_right",
    prevEl: ".projects__pagination-arrow_left",
  },
});

*/