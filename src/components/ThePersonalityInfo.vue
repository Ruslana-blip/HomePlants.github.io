<template>
  <div class="inputs">
    <div class="inputs__field" :style="{ width: width + 'px' }">
      <label for="name">{{ $t('name') }}</label>
      <Field
        :rules="validateName"
        type="text"
        id="name"
        name="name"
        class="inputs__input"
        v-model="user.name"
      />
      <ErrorMessage name="name" class="inputs__error" />
    </div>
    <div class="inputs__field" :style="{ width: width + 'px' }">
      <label for="lastName">{{ $t('surname') }}</label>
      <Field
        :rules="validateName"
        type="text"
        id="lastName"
        name="lastName"
        class="inputs__input"
        v-model="user.lastName"
      />
      <ErrorMessage name="lastName" class="inputs__error" />
    </div>
    <div class="inputs__field" :style="{ width: width + 'px' }">
      <label for="number">{{ $t('number') }}</label>
      <Field
        :rules="validateNumber"
        type="tel"
        id="number"
        name="number"
        class="inputs__input"
        v-model="user.number"
      />
      <ErrorMessage name="number" class="inputs__error" />
    </div>
    <div class="inputs__field" :style="{ width: width + 'px' }">
      <label for="email">E-mail</label>
      <Field
        :rules="validateEmail"
        id="email"
        class="inputs__input"
        type="email"
        name="email"
        v-model="user.email"
      />
      <ErrorMessage name="email" class="inputs__error" />
    </div>
  </div>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'

import { mapState } from 'pinia'
import { useUsersStore } from '@/stores/users'
export default {
  name: 'ThePersonalityInfo',
  components: {
    Field,
    ErrorMessage,
    VeeForm
  },
  data() {
    return {}
  },
  props: {
    width: {
      type: Number
    }
  },

  computed: {
    ...mapState(useUsersStore, ['user']),
    isDataExists() {
      return Boolean(localStorage.getItem('user'))
    }
  },

  methods: {
    validateEmail(email) {
      if (!email) return "Це поле є обов'язковим"
      const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      if (!validEmailRegex.test(email)) {
        return 'Введіть будь ласка валідний email'
      }
      return true
    },

    validateName(name) {
      if (!name) return 'Це поле є обов’язковим.'
      const validNameRegex = /^[A-Za-zА-Яа-яІіЇїЄє'`]+$/
      if (!validNameRegex.test(name)) {
        return 'Ім’я може містити лише букви та апостроф.'
      }
      return true
    },
    validateNumber(number) {
      if (!number) return 'Це поле є обов’язковим.'
      const validPhoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
      if (!validPhoneRegex.test(number)) {
        return 'Номер повинен містити 13 символів'
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
// .inputs__field
.inputs {
  display: flex;
  flex-wrap: wrap;
  column-gap: 35px;
  row-gap: 24px;
  margin-bottom: 30px;
  @media (min-width: $lg) {
    column-gap: 72px;
    row-gap: 46px;
    margin-bottom: 46px;
  }
  &__field {
    width: 100%;
    border-radius: 4px;
    height: 56px;
    outline: 1px solid $secondary-grey;
    position: relative;
    font-family: 'Roboto';
    color: $dark-purple-gray;
    padding: 4px 0 4px 16px;
    @media (min-width: $sm) {
      flex: 1 1 calc(50% - 35px);
    }
    @media (min-width: $md) {
      margin: 0 auto;
      // flex: 0 1 80%;
    }
    @media (min-width: $lg) {
      flex: 1 0 calc(50% - 72px);
    }
    & label {
      position: absolute;
      top: 0;
      left: 12px;
      z-index: 3;
      font-size: font-rem(12);
      transform: translateY(-50%);
      background-color: $bg-white;
      padding: 0 4px;
    }
  }
  // .inputs__input
  &__input {
    width: 100%;
    height: 100%;
    background-color: $bg-white;
    border: none;
  }
  // .inputs__error
  &__error {
    margin-top: 8px;
    font-size: font-rem(12);
    color: $secondary-red;
    display: flex;
    justify-content: end;
  }
}
</style>
