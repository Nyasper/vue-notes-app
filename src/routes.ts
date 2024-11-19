import { createRouter, createWebHistory } from 'vue-router';
import type {
	RouteLocationNormalizedGeneric,
	RouteRecordRaw,
} from 'vue-router';
import { AuthStore } from './stores/authStore';
import About from './pages/about.vue';

const routes: RouteRecordRaw[] = [
	{
		name: 'home',
		path: '',
		component: About,
	},
	{
		name: 'about',
		path: '/about',
		component: About,
	},
	{
		name: 'register',
		path: '/register',
		component: () => import('./pages/register.vue'),
		meta: { requireAuth: false },
		beforeEnter: ifNotAuth,
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('./pages/login.vue'),
		meta: { requireAuth: false },
		beforeEnter: ifNotAuth,
	},
	{
		name: 'notesList',
		path: '/notes',
		component: () => import('./pages/allNotes.vue'),
		meta: { requireAuth: true },
	},
	{
		name: 'noteCreate',
		path: '/notes/create',
		component: () => import('./pages/noteCreate.vue'),
		meta: { requireAuth: true },
	},
	{
		name: 'noteDetail',
		path: '/notes/:key',
		component: () => import('./pages/noteDetail.vue'),
		meta: { requireAuth: true },
	},
	{
		name: 'admin',
		path: '/admin',
		component: () => import('./pages/adminPage.vue'),
		meta: { requireAuth: true, requireAdmin: true },
	},
	{
		name: 'adminNotesList',
		path: '/admin/:userId',
		component: () => import('./pages/adminNotesList.vue'),
		meta: { requireAuth: true, requireAdmin: true },
	},
	{
		name: 'adminNoteDetail',
		path: '/admin/:userId/:key',
		component: () => import('./pages/noteDetail.vue'),
		meta: { requireAuth: true, requireAdmin: true },
	},
	{
		path: '/:pathMatch(.*)*', // => 404 not found
		component: () => import('./pages/notFound.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to) => {
	await AuthStore.getUserInfo();
	if (to.meta.requireAuth) {
		if (!AuthStore.isAuth.value) {
			return { name: 'login' };
		}

		// require admin
		if (to.meta.requireAdmin) {
			if (!AuthStore.isAdmin.value) {
				// if user is logged but not is admin
				if (AuthStore.isAuth.value) {
					return { name: 'notesList' };
				}
			}
		}
	}
});

async function ifNotAuth(to: RouteLocationNormalizedGeneric) {
	await AuthStore.getUserInfo();
	if (AuthStore.isAuth) return { name: 'notesList' };
}

export default router;

declare module 'vue-router' {
	interface RouteMeta {
		requireAuth: boolean;
		requireAdmin?: boolean;
	}
}
