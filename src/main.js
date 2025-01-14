import '@/assets/scss/main.scss'
import 'swiper/swiper-bundle.css'
import i18n from './i18n'
// Зміна значення змінної
document.documentElement.style.setProperty('--swiper-theme-color', '#090909') // Новий колір
document.documentElement.style.setProperty('--swiper-pagination-progressbar-size', '2px')
document.documentElement.style.setProperty('--swiper-pagination-progressbar-top', '-35px')
document.documentElement.style.setProperty('--swiper-pagination-progressbar-left', '0px')
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { register } from 'swiper/element/bundle'
register()
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
