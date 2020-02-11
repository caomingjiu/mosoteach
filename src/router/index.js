import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/views/Nav.vue'
import Login from '@/views/Login.vue'
import Registered from '@/views/Registered.vue'
import ChooseRole from '@/views/ChooseRole.vue'
import Forget from '@/views/Forget.vue'
import Text from '@/views/Text.vue'

import Index from '../views/index/Index.vue'


import ClassDetail from '../views/class/ClassDetail.vue'
import Create from '../views/class/Create.vue'
import ClassDetails from '../views/class/ClassDetails.vue'
import ClassActivity from '../views/class/ClassActivity.vue'
import ClassMessage from '../views/class/ClassMessage.vue'
import ClassResources from '../views/class/ClassResources.vue'
import ClassClub from '../views/class/ClassClub.vue'

import User from '../views/my/User.vue'
import Account_Information from '../views/my/Account_Information.vue'
import Account_Security from '../views/my/Account_Security.vue'
import Profile from '../views/my/Profile.vue'
Vue.use(VueRouter)

const routes = [{
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
		path: '/text',
		name: 'text',
		component: Text
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
				component: Index,
			},
			{
				path: 'classdetail',
				name: 'classdetail',
				component: ClassDetail,
				children: [{
						path: '/:id',
						redirect: 'classactivity'
					},
					{
						path: 'classdetails/:id',
						name: 'classdetails',
						component: ClassDetails,
					},
					{
						path: 'classactivity/:id',
						name: 'classactivity',
						component: ClassActivity,
					},
					{
						path: 'classmessage/:id',
						name: 'classmessage',
						component: ClassMessage,
					},
					{
						path: 'classresources/:id',
						name: 'classresources',
						component: ClassResources,
					},
					{
						path: 'classclub/:id',
						name: 'classclub',
						component: ClassClub,
					},
				]
			},
			{
				path: 'create',
				name: 'create',
				component: Create,
			},
			{
				path: 'user',
				name: 'user',
				component: User,
				children: [{
						path: '/',
						redirect: 'account_information'
					},
					{
						path: 'account_information',
						name: 'account_information',
						component: Account_Information,
					},
					{
						path: 'account_security',
						name: 'account_security',
						component: Account_Security,
					},
					{
						path: 'profile',
						name: 'profile',
						component: Profile,
					},
				]
			},
		]
	}
]

const router = new VueRouter({
	routes
})

export default router
