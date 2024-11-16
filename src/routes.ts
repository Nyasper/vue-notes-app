import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { AuthStore } from './stores/AuthStore';

const routes: RouteRecordRaw[] = [
	{
		name: 'about',
		path: '/about',
		component: () => import('./pages/About.vue'),
	},
	{
		name: 'register',
		path: '/register',
		component: () => import('./pages/Register.vue'),
		meta: { requireAuth: false },
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('./pages/Login.vue'),
		meta: { requireAuth: false },
	},
	{
		name: 'notesList',
		path: '/notes',
		component: () => import('./pages/AllNotes.vue'),
		meta: { requireAuth: true },
	},
	{
		name: 'noteCreate',
		path: '/notes/create',
		component: () => import('./pages/NoteCreate.vue'),
		meta: { requireAuth: true },
	},
	{
		name: 'noteDetail',
		path: '/notes/:key',
		component: () => import('./pages/NoteDetail.vue'),
		meta: { requireAuth: true },
	},
	{
		name: 'admin',
		path: '/admin',
		component: () => import('./pages/AdminPage.vue'),
		meta: { requireAuth: true, requireAdmin: true },
	},
	{
		name: 'adminNotesList',
		path: '/admin/:userId',
		component: () => import('./pages/AdminNotesList.vue'),
		meta: { requireAuth: true, requireAdmin: true },
	},
	{
		name: 'adminNoteDetail',
		path: '/admin/:userId/:key',
		component: () => import('./pages/NoteDetail.vue'),
		meta: { requireAuth: true, requireAdmin: true },
	},
	{
		path: '/:pathMatch(.*)*', // => 404 not found
		component: () => import('./pages/Notfound.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// router.beforeEach(async (to) => {
// 	// require auth
// 	if (to.meta.requireAuth && !AuthStore.isAuth.value) {
// 		return { name: 'login', query: { redirect: to.fullPath } };
// 	}

// 	// require admin
// 	if (to.meta.requireAdmin) {
// 		if (!AuthStore.isAdmin.value) {
// 			// Si el usuario está autenticado pero no es administrador
// 			if (AuthStore.isAuth.value) {
// 				return { name: 'notesList', query: { redirect: to.fullPath } };
// 			}
// 			// Si no está autenticado (esto ya se verificó antes, pero se incluye por claridad)
// 			return { name: 'login', query: { redirect: to.fullPath } };
// 		}
// 	}

// 	// if (!to.meta.requireAuth && AuthStore.isAuth)
// 	// 	return { name: 'notesList', query: { redirect: to.fullPath } };
// });

export default router;

declare module 'vue-router' {
	interface RouteMeta {
		requireAuth: boolean;
		requireAdmin?: boolean;
	}
}
