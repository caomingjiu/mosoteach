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
import ClassDetails from '../views/class/ClassDetails.vue'
import ClassActivity from '../views/class/ClassActivity.vue'
import ClassMessage from '../views/class/ClassMessage.vue'
import ClassResources from '../views/class/ClassResources.vue'
import ClassClub from '../views/class/ClassClub.vue'

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
				children: [
					{
							path: '/',
							redirect: 'classactivity'
						},
				{
					path: 'classdetails',
					name: 'classdetails',
					component:ClassDetails,
				},
				{
					path: 'classactivity',
					name: 'classactivity',
					component:ClassActivity,
				},
				{
					path: 'classmessage',
					name: 'classmessage',
					component:ClassMessage,
				},
				{
					path: 'classresources',
					name: 'classresources',
					component:ClassResources,
				},
				{
					path: 'classclub',
					name: 'classclub',
					component:ClassClub,
				},
				]
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
