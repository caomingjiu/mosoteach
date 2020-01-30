import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/views/Nav.vue'
import Login from '@/views/Login.vue'
import Registered from '@/views/Registered.vue'
import ChooseRole from '@/views/ChooseRole.vue'
import Forget from '@/views/Forget.vue'

import Index from '../views/index/Index.vue'


import ClassDetail from '../views/class/ClassDetail.vue'
import Create from '../views/class/Create.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/registered',
    name: 'registered',
    component: Registered
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  },
  {
    path: '/chooserole/:id',
    name: 'chooserole',
    component: ChooseRole
  },
  {
  		path: '/nav',
  		name: 'nav',
  		component: Nav,
  		children: [{
  				path: '/',
  				redirect: 'index'
  			},
  			{
  				path: 'index',
  				name: 'index',
  				component:Index,
  			},
			{
				path: 'classdetail',
				name: 'classdetail',
				component:ClassDetail,
			},
			{
				path: 'create',
				name: 'create',
				component:Create,
			}
  		]
  	}
]

const router = new VueRouter({
  routes
})

export default router
