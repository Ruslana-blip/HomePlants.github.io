<template>
  <section class="slider">
    <div class="slider__container">
      <h2 class="slider__title">{{ $t('novelty') }}</h2>
      <swiper-container
        ref="sliderName"
        :slides-per-view="slidesPerView"
        :loop="true"
        :pagination="{
          type: 'progressbar',
          el: '.swiper-pagination-progressbar'
        }"
        space-between="72"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }"
        :breakpoints="{
          320: {
            slidesPerView: 1.8,
            spaceBetween: 24
          },
          440: {
            slidesPerView: 2,
            spaceBetween: 24
          },
          576: {
            slidesPerView: 2.3,
            spaceBetween: 30
          },
          992: {
            slidesPerView: 2.5,
            spaceBetween: 72
          },
          1050: {
            slidesPerView: 3,
            spaceBetween: 72
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 72
          }
        }"
      >
        <swiper-slide v-for="value in values" :key="value.id" class="slider__wrapp">
          <TheSliderItem :value="value" :new-arrivals="title" />
        </swiper-slide>
      </swiper-container>
      <div
        class="swiper-pagination-progressbar-slider swiper-pagination-progressbar"
        ref="progressBar"
      ></div>
      <div class="slider__navigation">
        <div class="swiper-button-prev prev"></div>
        <div class="swiper-button-next next"></div>
      </div>
    </div>
  </section>
</template>

<script>
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import { register } from 'swiper/element/bundle'
import TheSliderItem from './TheSliderItem.vue'
export default {
  name: 'TheSlider',
  components: {
    TheSliderItem
  },
  props: {
    values: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    sliderName: {
      type: String
    },
    slidesPerView: {
      type: Number
    }
  },
  mounted() {
    register()
  }
}
</script>

<style lang="scss" scoped>
.slider {
  margin-bottom: 120px;
  @media (min-width: $md) {
    margin-bottom: 180px;
  }
  @media (min-width: $lg) {
    margin-bottom: 210px;
  }
  @media (min-width: $xl) {
    margin-bottom: 280px;
  }
  &__wrapp {
    width: 160px;
    @media (min-width: $sm) {
      width: 240px;
    }
    @media (min-width: $md) {
      font-size: font-rem(18);
      width: 280px;
    }
    @media (min-width: $xl) {
      width: 320px;
    }
    @media (min-width: $xxl) {
      width: 384px;
    }
  }
  // .slider__container
  &__container {
    position: relative;
    transform: none;
    perspective: none;
    overflow: visible;
  }

  &__title {
    position: absolute;
    top: -52px;
    left: 0px;
    margin-left: 15px;
    transform: translateY(-50%);
    font-size: font-rem(28);
    font-weight: 400;
    text-transform: uppercase;
    color: $secondary-black;
    @media (min-width: $sm) {
      font-size: font-rem(34);
      top: -60px;
    }
    @media (min-width: $md) {
      top: -98px;
      font-size: font-rem(40);
    }
  }
  &__navigation {
    width: 232px;
    height: 64px;
    position: absolute;
    top: -84px;
    right: 15px;
    transform: translate(0%, -100%);
  }
}

.swiper-pagination-progressbar {
  position: absolute;
  top: -35px !important;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: $grey;
  @media (min-width: $md) {
    top: -72px;
  }
}

.prev,
.next {
  display: none;
  justify-content: center;
  align-items: center;
  border: 1.5px solid $main-black;
  border-radius: 16px;
  width: 50px;
  height: 50px;
  @media (min-width: $lg) {
    display: flex;
    &::after {
      content: '';
      background-size: cover;
      background-position: center;
      height: 18px;
      width: 9px;
    }
  }
  @media (min-width: $xl) {
    width: 54px;
    height: 54px;
  }
}
.prev {
  // left: 82.6%;
  &::after {
    background-image: url('@/assets/images/newPlants/arrow-left.svg');
  }
}
.next {
  // right: 15px;
  &::after {
    background-image: url('@/assets/images/newPlants/arrow-rigth.svg');
  }
}
</style>
