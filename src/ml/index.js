import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'english',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('english').create({
      title: 'Hello {0}!',
      nav: {
          home: 'Home',
          game: 'Game',
          about: 'About'
      }
    }),
 
    new MLanguage('russian').create({
      title: 'Привет {0}!',
      nav: {
          home: 'Главная',
          game: 'В игру',
          about: 'О нас'
      }
    })
  ]
})