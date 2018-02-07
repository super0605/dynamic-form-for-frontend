// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import { appInit } from './firebase'
import { store } from './store'

import {
  Vuetify,
  VApp,
  VAlert,
  VCard,
  VCheckbox,
  VForm,
  VSelect,
  VTextField,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VTabs,
  VToolbar,
  VExpansionPanel,
  VDatePicker,
  VDialog,
  VDivider,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(VueFire)
Vue.use(VeeValidate)
Vue.use(Vuetify, {
  components: {
    VApp,
    VAlert,
    VCard,
    VCheckbox,
    VForm,
    VSelect,
    VTextField,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VTabs,
    VToolbar,
    VExpansionPanel,
    VDatePicker,
    VDialog,
    VDivider,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

appInit(router)
  .then(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
  })
