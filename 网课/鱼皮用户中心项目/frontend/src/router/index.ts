import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user/login',
      name: 'userLogin',
      component: HomeView,
    },
    {
      path: '/user/register',
      name: 'userRegister',
      component: HomeView,
    },
    {
      path: '/admin/userManage',
      name: 'adminUserManage',
      component: HomeView,
    },
  ],
})

export default router
