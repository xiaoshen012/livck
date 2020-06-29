import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Fenlei from '@/components/fenlei'
import My from '@/components/my'
import Seek from '@/components/seek'
import Godo from '@/components/godo'
import Details from '@/components/details'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:"/fenlei",
      name:"fenlei",
      component: Fenlei
    },
    {
      path:"/my",
      name:"my",
      component: My
    },
    {
      path: '/seek',
      name: 'seek',
      component: Seek
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    },
    {
      path: '/godo',
      name: 'godo',
      component: Godo
    },
    {
      path:"/",
      redirect:"Home"
    }
  ]
})
