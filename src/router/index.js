import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/views/Nav.vue'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/nav',
    name: 'nav',
    component:Nav,
	children: [
		{
			path: 'index',
			name: 'index',
			component: Index,
		},
		]
  }
]

const router = new VueRouter({
  routes
})

export default router
