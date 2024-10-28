import { createRouter, createWebHistory } from 'vue-router';
import { checkLocalTokenValidity } from './services/axios';
import { auth } from './services/userService';
import { useAuthStore } from './stores/authStore';

//componentes
import about from './pages/about.vue';
import notFound from './components/notfound.vue';

//Pages
import homePage from './pages/home.vue';
import register from './pages/register.vue';
import login from './pages/login.vue';
import tasksList from './pages/allTasks.vue';
import taskDetail from './pages/taskDetail.vue';
import taskCreate from './pages/taskCreate.vue';
import adminPage from './pages/adminPage.vue';
import userDetailAdminPage from './pages/userDetailAdminPage.vue';

const routes = [
	{
		name: 'home',
		path: '/',
		component: homePage,
	},
	{
		name: 'tasksList',
		path: '/tasks',
		component: tasksList,
	},
	{
		name: 'taskCreate',
		path: '/tasks/create',
		component: taskCreate,
	},
	{
		name: 'taskDetail',
		path: '/tasks/:id',
		component: taskDetail,
	},
	{
		name: 'about',
		path: '/about',
		component: about,
	},
	{
		name: 'register',
		path: '/register',
		component: register,
	},
	{
		name: 'login',
		path: '/login',
		component: login,
	},
	{
		name: 'admin',
		path: '/admin',
		component: adminPage,
	},
	{
		name: 'adminDetail',
		path: '/admin/:username',
		component: userDetailAdminPage,
	},
	{
		name: 'adminTaskDetail',
		path: '/admin/:username/:id',
		component: taskDetail,
	},
	{
		path: '/:patchMatch(.*)*',
		component: notFound,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from) => {
	const { setUserState } = useAuthStore();
	if (checkLocalTokenValidity()) {
		const token = localStorage.getItem('token');
		const user = await auth(token);
		if (user) {
			setUserState(user);
			return userIsAuthMiddlewares(to, user);
		}
	}
	setUserState(null);
	return userNOTAuthMiddlewares(to);
});

function userIsAuthMiddlewares(to: any, user: any) {
	switch (to.name) {
		case 'register':
			return { name: 'tasksList' };
		case 'login':
			return { name: 'tasksList' };
		case 'admin':
			return user.admin ? undefined : { name: 'tasksList' };
		case 'adminDetail':
			return user.admin ? undefined : { name: 'tasksList' };
		case 'adminTaskDetail':
			return user.admin ? undefined : { name: 'tasksList' };
		default:
			return;
	}
}

function userNOTAuthMiddlewares(to: any) {
	switch (to.name) {
		case 'tasksList':
			return { name: 'login' };
		case 'taskCreate':
			return { name: 'login' };
		case 'taskDetail':
			return { name: 'login' };
		case 'admin':
			return { name: 'login' };
		case 'adminDetail':
			return { name: 'login' };
		case 'adminTaskDetail':
			return { name: 'login' };

		default:
			return;
	}
}

export default router;
