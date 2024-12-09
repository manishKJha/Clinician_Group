import { createRouter, createWebHistory } from 'vue-router'
import ClinicianTree from '../views/clinicianTree.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'clinicianTree',
      component: ClinicianTree,
    }
  ],
})

export default router
