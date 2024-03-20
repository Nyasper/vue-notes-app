import { createRouter, createWebHistory } from "vue-router";
import { auth } from "./services/userService";
import { useAuthStore } from "./stores/authStore";




//componentes
import about from "./components/about.vue";
import notFound from "./components/notfound.vue";

//Pages
import homePage from "./pages/home.vue";
import register from "./pages/register.vue"
import login from "./pages/login.vue"
import tasksList from "./pages/tasksList.vue";
import taskDetail from "./pages/taskDetail.vue";
import taskCreate from "./pages/taskCreate.vue";
import adminPage from "./pages/adminPage.vue";
import userDetailAdminPage from "./pages/userDetailAdminPage.vue";


const routes = [
  {
    name: "home",
    path: "/",
    component: homePage,
  },
  {
    name: "tasksList",
    path: "/tasks",
    component: tasksList,
    beforeEnter: async (to, from) => {
      if (!(await auth()).logged) return { name: 'login' }
    }
  },
  {
    name: "taskCreate",
    path: "/tasks/create",
    component: taskCreate,
    beforeEnter: async (to, from) => {
      if (!(await auth()).logged) return { name: 'login' }
    }
  },
  {
    name: "taskDetail",
    path: "/tasks/:id",
    component: taskDetail,
    beforeEnter: async (to, from) => {
      if (!(await auth()).logged) return { name: 'login' }
    }
  },
  {
    name: "about",
    path: "/about",
    component: about,
  },
  {
    name: "register",
    path: "/register",
    component: register,
    beforeEnter: async (to, from) => {
      if ((await auth()).logged) return { name: 'tasksList' }
    }
  },
  {
    name: "login",
    path: "/login",
    component: login,
    beforeEnter: async (to, from) => {
      if ((await auth()).logged) return { name: 'tasksList' }
    }
  },
  {
    name: "admin",
    path: "/admin",
    component: adminPage,
    beforeEnter: async (to, from) => {
      if (!(await auth()).admin) return { name: 'tasksList' }
    }
  },
  {
    name: "adminDetail",
    path: "/admin/:username",
    component: userDetailAdminPage,
    beforeEnter: async (to, from) => {
      if (!(await auth()).admin) return { name: 'tasksList' }
    }
  },
  {
    name: "adminTaskDetail",
    path: "/admin/:username/:id",
    component: taskDetail,
    beforeEnter: async (to, from) => {
      if (!(await auth()).admin) return { name: 'login' }
    }
  },
  {
    path: "/:patchMatch(.*)*",
    component: notFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from) => {
  const { setAuthState } = useAuthStore()
  const authState = await auth()
  setAuthState(authState)
})

export default router;
