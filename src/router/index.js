import { createRouter, createWebHistory } from 'vue-router'

// Import your pages/views
import HomePage from '@/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage, // Home page or main search UI
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
