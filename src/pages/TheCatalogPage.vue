<template>
  <div class="plant" v-if="currentPlants.length">
    <div class="plant__container">
      <TheCatalogItem :showPlants="currentPlants" class="plant__item" />
      <TheFilter class="plant__filter" @plants-filtered="setFilteredPlants" />
    </div>
    <TheNavigation @show-page="updatePage" :total-plants="filteredPlants" :cards-per-page="12" />
  </div>
  <div class="loader__wrapper" v-else-if="loading">
    <div class="loader"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'
import TheNavigation from '@/components/TheNavigation.vue'
import TheFilter from '@/components/TheFilter.vue'
import TheCatalogItem from '@/components/TheCatalogItem.vue'
export default {
  name: 'TheCatalogPage',
  components: {
    TheNavigation,
    TheFilter,
    TheCatalogItem
  },
  data() {
    return {
      filteredPlants: [],
      currentPlants: [],
      loading: true
    }
  },
  computed: {
    ...mapState(useCategoriesStore, ['catalog'])
  },
  methods: {
    ...mapActions(useCategoriesStore, ['getAllPlants']),

    setFilteredPlants(plants) {
      this.filteredPlants = plants
      this.updatePage(1)
    },
    updatePage(page) {
      const start = (page - 1) * 12
      const end = start + 12
      this.currentPlants = this.filteredPlants.slice(start, end)
    }
  },
  async mounted() {
    await this.getAllPlants()
    this.setFilteredPlants(this.catalog)
  }
}
</script>

<style lang="scss" scoped>
.plant {
  margin-top: 14px;
  margin-bottom: 24px;
  // .plant__container
  &__container {
    display: flex;
    font-family: 'Lato';
    flex-direction: column-reverse;
    @media (min-width: $lg) {
      margin-top: 100px;
      flex-direction: row;
      font-size: font-rem(18);
      margin-bottom: 80px;
      gap: 32px;
    }
    @media (min-width: 1920px) {
      gap: 72px;
    }
  }
  &__item {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    @media (min-width: $md) {
      gap: 32px;
    }

    @media (min-width: $lg) {
      justify-content: center;
      flex: 1 1 70%;
    }
    @media (min-width: 1920px) {
      gap: 72px;
      flex: 1 1 auto;
    }
  }
  // .plant__filter
  &__filter {
    display: none;
    @media (min-width: $md) {
      display: block;
      flex: 1 1 30%;
    }
    @media (min-width: 1920px) {
      flex: 1 1 384px;
    }
  }
}

/* HTML: <div class="loader"></div> */
.loader__wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  width: 120px;
  height: 20px;
  border-radius: 20px;
  background: linear-gradient($orange 0 0) 0/0% no-repeat lightblue;
  animation: l2 2s infinite steps(10);
}
@keyframes l2 {
  100% {
    background-size: 110%;
  }
}
</style>
