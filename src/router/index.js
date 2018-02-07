import Vue from 'vue'
import Router from 'vue-router'
import forms from '@/components/forms/forms'
import form from '@/components/forms/form'
import login from '@/components/user/login'
import register from '@/components/user/register'
import welcome from '@/components/user/welcome'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/forms',
      name: 'forms',
      component: forms,
      meta: {
        auth: true
      }
    },
    {
      path: '/forms/:id',
      name: 'form',
      component: form,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: welcome
    },
    {
      path: '*',
      redirect: '/welcome'
    }
  ]
})

export default router
