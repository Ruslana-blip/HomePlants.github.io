<template>
  <div class="filter">
    <div class="filter__btns">
      <span class="filter__all" @click="showFilter('all')"> All filters </span>
      <span class="filter__price" @click="showFilter('price')"> Price </span>
      <span class="filter__offer" @click="showFilter('offer')"> Offer types </span>
      <span class="filter__categor" @click="showFilter('categories')"> Categories </span>
      <span class="filter__heigt" @click="showFilter('height')"> Висота (см) </span>
    </div>
    <div class="filter__cont">
      <div class="filter__price" v-if="isFilterPrice">
        <span class="filter__name">{{ $t('price') }}</span>
        <div class="filter__columns">
          <div class="filter__column">
            <label for="from">{{ $t('from') }}</label>
            <input
              type="text"
              id="from"
              placeholder="0 ₴"
              v-model.number="min"
              @blur="filterPlants"
              @keyup.enter="filterPlants"
            />
          </div>

          <div class="filter__column">
            <label for="to">{{ $t('to') }} </label>

            <input
              type="text"
              id="to"
              placeholder="5 000 ₴"
              v-model.number="max"
              @blur="filterPlants"
              @keyup.enter="filterPlants"
            />
          </div>
        </div>
      </div>
      <div class="filter__type" v-if="isOfferTypes">
        <span class="filter__name">{{ $t('type-offer') }}</span>
        <div class="filter__checkboxes">
          <div class="filter__checkbox checkbox">
            <input type="checkbox" id="sales" v-model="isSales" @change="filterPlants" />
            <label for="sales">{{ $t('sale') }}</label>
          </div>
          <div class="filter__checkbox checkbox">
            <input type="checkbox" id="newsPlants" v-model="isNewArrivals" @change="filterPlants" />
            <label for="newsPlants">{{ $t('novelty') }}</label>
          </div>
          <div class="filter__checkbox checkbox">
            <input type="checkbox" id="top" v-model="isTopSales" @change="filterPlants" />
            <label for="top">{{ $t('top-sales') }}</label>
          </div>
        </div>
      </div>
      <div class="filter__categories" v-if="isCategories">
        <span class="filter__name">{{ $t('categories') }}</span>
        <div class="filter__checkboxes">
          <div class="filter__checkbox">
            <input
              type="checkbox"
              id="decorativeFlorentem"
              v-model="categories.isDecorativeFlorentem"
              @change="filterPlants"
            />
            <label for="decorativeFlorentem">{{ $t('flow-plants') }}</label>
          </div>
          <div class="filter__checkbox">
            <input
              type="checkbox"
              id="foliage"
              v-model="categories.isFoliage"
              @change="filterPlants"
            />
            <label for="foliage">{{ $t('foliage') }}</label>
          </div>
          <div class="filter__checkbox">
            <input
              type="checkbox"
              id="orchidaceae"
              v-model="categories.isOrchidaceae"
              @change="filterPlants"
            />
            <label for="orchidaceae">{{ $t('orchids') }}</label>
          </div>
          <div class="filter__checkbox">
            <input
              type="checkbox"
              id="bonsai"
              v-model="categories.isBonsai"
              @change="filterPlants"
            />
            <label for="bonsai">{{ $t('bonsai') }}</label>
          </div>
          <div class="filter__checkbox">
            <input
              type="checkbox"
              id="succulenta"
              v-model="categories.isSucculenta"
              @change="filterPlants"
            />
            <label for="succulenta">{{ $t('succulents') }}</label>
          </div>
          <div class="filter__checkbox">
            <input
              type="checkbox"
              id="citrus"
              v-model="categories.isCitrus"
              @change="filterPlants"
            />
            <label for="citrus">{{ $t('citrus') }}</label>
          </div>
          <div class="filter__checkbox">
            <input
              type="checkbox"
              id="florariums"
              v-model="categories.isFlorariums"
              @change="filterPlants"
            />
            <label for="florariums">{{ $t('florariums') }}</label>
          </div>
          <div class="filter__checkbox">
            <input
              type="checkbox"
              id="exotic"
              v-model="categories.isExotic"
              @change="filterPlants"
            />
            <label for="exotic">{{ $t('exotic') }}</label>
          </div>
        </div>
      </div>
      <div class="filter__height" v-if="isFilterHeight">
        <span class="filter__name">{{ $t('height') }} ({{ $t('sm') }})</span>
        <div class="filter__checkboxes">
          <div class="filter__checkbox">
            <input type="checkbox" id="small" v-model="height.isSmall" @change="filterPlants" />
            <label for="small">20-70</label>
          </div>
          <div class="filter__checkbox">
            <input type="checkbox" id="middle" v-model="height.isMiddle" @change="filterPlants" />
            <label for="middle">70-120</label>
          </div>
          <div class="filter__checkbox">
            <input type="checkbox" id="large" v-model="height.isLarge" @change="filterPlants" />
            <label for="large">120-200</label>
          </div>
        </div>
      </div>
    </div>
    <div class="filter__btnWrapp">
      <button class="filter__btn" @click="resetFilter">
        {{ $t('reset-filter') }}
      </button>
    </div>
  </div>
</template>

<script>
import { useCategoriesStore } from '@/stores/categories'
import { mapActions, mapState } from 'pinia'

export default {
  inheritAttrs: false,
  name: 'TheFilter',
  emits: ['plants-filtered'],
  data() {
    return {
      min: 0,
      max: 5000,
      isSales: false,
      isNewArrivals: false,
      isTopSales: false,
      currentCategory: null,
      categories: {
        isDecorativeFlorentem: false,
        isFoliage: false,
        isOrchidaceae: false,
        isBonsai: false,
        isSucculenta: false,
        isCitrus: false,
        isFlorariums: false,
        isExotic: false
      },
      height: {
        isSmall: false,
        isMiddle: false,
        isLarge: false
      },
      isFilterPrice: false,
      isOfferTypes: false,
      isCategories: false,
      isFilterHeight: false
    }
  },
  computed: {
    ...mapState(useCategoriesStore, ['catalog', 'selectedCategory'])
  },
  methods: {
    ...mapActions(useCategoriesStore, ['getAllPlants', 'getCategoryByName']),
    filterPlants() {
      let filteredPlants = this.catalog.filter((item) => {
        return item.price >= this.min && item.price <= this.max
      })

      if (this.isSales || this.isNewArrivals || this.isTopSales) {
        filteredPlants = filteredPlants.filter((item) => {
          return (
            (this.isSales && item.status === 'Розпродаж') ||
            (this.isNewArrivals && item.status === 'Новинки') ||
            (this.isTopSales && item.status === 'Топ продажів')
          )
        })
      }

      if (
        this.categories.isFlorariums ||
        this.categories.isDecorativeFlorentem ||
        this.categories.isBonsai ||
        this.categories.isCitrus ||
        this.categories.isSucculenta ||
        this.categories.isOrchidaceae ||
        this.categories.isFoliage ||
        this.categories.isExotic
      ) {
        filteredPlants = filteredPlants.filter((item) => {
          return (
            (this.categories.isDecorativeFlorentem && item.category === 'Декоративно-квітучі') ||
            (this.categories.isFoliage && item.category === 'Декоративно-листяні') ||
            (this.categories.isOrchidaceae && item.category === 'Орхідеї') ||
            (this.categories.isBonsai && item.category === 'Бонсай') ||
            (this.categories.isSucculenta && item.category === 'Сукуленти') ||
            (this.categories.isCitrus && item.category === 'Цитрусові рослини') ||
            (this.categories.isFlorariums && item.category === 'Флораріуми') ||
            (this.categories.isExotic && item.category === 'Екзотичні рослини')
          )
        })
      }

      if (this.height.isSmall || this.height.isMiddle || this.height.isLarge) {
        filteredPlants = filteredPlants.filter((item) => {
          return (
            (this.height.isSmall && item.height <= 70) ||
            (this.height.isMiddle && item.height > 70 && item.height <= 120) ||
            (this.height.isLarge && item.height > 120 && item.height <= 200)
          )
        })
      }
      if (filteredPlants.length === 0) {
        this.$router.push({ name: 'TheError' }) // Перенаправляємо на сторінку помилки
      } else {
        this.$emit('plants-filtered', filteredPlants) // Якщо рослини знайдено, передаємо результат
      }
    },
    resetFilter() {
      this.min = 0
      this.max = 5000
      this.isSales = false
      this.isNewArrivals = false
      this.isTopSales = false
      this.categories.isDecorativeFlorentem = false
      this.categories.isFoliage = false
      this.categories.isOrchidaceae = false
      this.categories.isBonsai = false
      this.categories.isSucculenta = false
      this.categories.isCitrus = false
      this.categories.isFlorariums = false
      this.height.isSmall = false
      this.height.isMiddle = false
      this.height.isLarge = false
      this.filterPlants()
    },

    fetchCategory() {
      const category = this.$route.params.category

      this.categories.isDecorativeFlorentem = false
      this.categories.isFoliage = false
      this.categories.isOrchidaceae = false
      this.categories.isBonsai = false
      this.categories.isSucculenta = false
      this.categories.isCitrus = false
      this.categories.isFlorariums = false
      this.categories.isExotic = false
      switch (category) {
        case this.$t('flow-plants'):
          this.categories.isDecorativeFlorentem = true
          break
        case this.$t('foliage'):
          this.categories.isFoliage = true
          break
        case this.$t('orchids'):
          this.categories.isOrchidaceae = true
          break
        case this.$t('bonsai'):
          this.categories.isBonsai = true
          break
        case this.$t('succulents'):
          this.categories.isSucculenta = true
          break
        case this.$t('citrus'):
          this.categories.isCitrus = true
          break
        case this.$t('florariums'):
          this.categories.isFlorariums = true
          break
        case this.$t('exotic'):
          this.categories.isExotic = true
          break
        default:
          this.resetFilter()
      }

      this.filterPlants()
    },
    showFilter(filterType) {
      this.isFilterPrice = false
      this.isOfferTypes = false
      this.isCategories = false
      this.isFilterHeight = false
      if (filterType === 'all') {
        this.isFilterPrice = true
        this.isOfferTypes = true
        this.isCategories = true
        this.isFilterHeight = true
      } else if (filterType === 'price') {
        this.isFilterPrice = true
      } else if (filterType === 'offer') {
        this.isOfferTypes = true
      } else if (filterType === 'categories') {
        this.isCategories = true
      } else if (filterType === 'height') {
        this.isFilterHeight = true
      } else if (filterType === 'no') {
        this.isFilterPrice = false
        this.isOfferTypes = false
        this.isCategories = false
        this.isFilterHeight = false
      }
    },
    handleResize() {
      const width = window.innerWidth
      const isDesktop = width >= 992
      this.isFilterHeight = isDesktop
      this.isCategories = isDesktop
      this.isFilterPrice = isDesktop
      this.isOfferTypes = isDesktop
    }
  },
  watch: {
    '$route.params.category': 'fetchCategory'
  },
  async mounted() {
    this.fetchCategory()
    this.filterPlants()
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style lang="scss" scoped>
.filter {
  font-size: font-rem(18);
  max-height: max-content;
  display: none;
  @media (min-width: $md) {
    display: block;
  }
  @media (min-width: $xxl) {
    font-size: font-rem(20);
    border-radius: 24px;
  }

  &__cont {
    background-color: $ligth-green;
    @media (min-width: $lg) {
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
    }
    @media (min-width: $xl) {
      padding-top: 24px;
    }
  }
  &__btns {
    background-color: $bg-white;
    display: none;
    flex-wrap: wrap;
    gap: 8px;
    @media (min-width: $lg) {
      display: none;
    }
    & span {
      font-size: font-rem(12);
      display: block;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid $secondary-green;
      cursor: pointer;
    }
  }
  &__name {
    font-size: font-rem(20);
    font-weight: 500;
    font-family: 'Lato';
    @media (min-width: $xxl) {
      font-size: font-rem(24);
    }
  }
  &__price,
  &__type,
  &__categories,
  &__height {
    padding: 16px 32px;
  }
  // .filter__columns
  &__columns {
    display: flex;
    gap: 12px;
    margin-top: 16px;
    margin-left: 16px;
  }

  // .filter__column
  &__column {
    border-radius: 4px;
    height: 40px;
    width: 110px;
    outline: 1px solid $secondary-grey;
    position: relative;
    @media (min-width: $xxl) {
      height: 56px;
      width: 146px;
    }
    & label {
      position: absolute;
      top: 0;
      left: 12px;
      background-color: $ligth-green;
      z-index: 4;
      font-size: font-rem(12);
      transform: translateY(-50%);
      padding: 0 4px;
    }
    & input {
      width: 100%;
      padding: 4px 0 4px 16px;
      height: 100%;
      border: none;
      background-color: $ligth-green;
    }
  }

  // .filter__checkboxes
  &__checkboxes {
    margin-top: 24px;
    margin-left: 16px;
  }
  // .filter__checkbox
  &__checkbox {
    @media (min-width: $xxl) {
      font-size: font-rem(20);
    }

    position: relative;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    & input {
      display: none;
    }
    & label {
      margin-left: 32px;
      cursor: pointer;
    }

    & label::before {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 24px;
      height: 24px;
      border: 2px solid $dark-purple-gray;
      border-radius: 2px;
      cursor: pointer;
      transition: all $time;
    }
    & input:checked + label::before {
      background-color: $primary-red-orange;
      border: none;
    }

    & input:checked + label::after {
      content: '';
      z-index: 4;
      position: absolute;
      top: 4px;
      left: 8px;
      width: 6px;
      height: 12px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
  &__height {
    margin-bottom: 32px;
    @media (min-width: $lg) {
      margin-bottom: 0;
    }
  }
  &__btnWrapp {
    @media (min-width: $lg) {
      background-color: $ligth-green;
      padding: 12px 32px 40px 32px;
      border-bottom-left-radius: 24px;
      border-bottom-right-radius: 24px;
    }
  }
  &__btn {
    display: none;
    width: 120px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid $primary-red-orange;
    font-size: font-rem(12);
    color: $primary-red-orange;

    @media (min-width: $lg) {
      display: block;
      // margin: 0 0 40px 32px;
      width: 80%;
      height: 52px;
      font-size: font-rem(20);
      transition: $time;
      &:hover {
        background-color: $primary-red-orange;
        color: $white;
      }
      &:active {
        position: relative;
        top: 2px;
        left: 2px;
      }
    }
    @media (min-width: $xxl) {
      width: 100%;
      font-size: font-rem(24);
    }
  }
}
.checkbox {
  text-transform: uppercase;
}
</style>
