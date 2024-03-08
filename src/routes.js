import { createRouter, createWebHistory } from "vue-router";
import { isLogged, isAdmin } from "./services/userService";



//componentes
import about from "./components/about.vue";
import notFound from "./components/notfound.vue";
import loadingScreen from "./components/loadingScreen.vue";

//Pages
import homePage from "./pages/home.vue";
import register from "./pages/register.vue"
import login from "./pages/login.vue"
import tasksList from "./pages/tasksList.vue";
import taskDetail from "./pages/taskDetail.vue";
import taskCreate from "./pages/taskCreate.vue";
import adminPage from "./pages/adminPage.vue";


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
      if (!(await isLogged())) return { name: 'login' }
    }
  },
  {
    name: "taskCreate",
    path: "/tasks/create",
    component: taskCreate,
    beforeEnter: async (to, from) => {
      if (!(await isLogged())) return { name: 'login' }
    }
  },
  {
    name: "taskDetail",
    path: "/tasks/:id",
    component: taskDetail,
    beforeEnter: async (to, from) => {
      if (!(await isLogged())) return { name: 'login' }
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
      if ((await isLogged())) return { name: 'tasksList' }
    }
  },
  {
    name: "login",
    path: "/login",
    component: login,
    beforeEnter: async (to, from) => {
      if ((await isLogged())) return { name: 'tasksList' }
    }
  },
  {
    name: "admin",
    path: "/admin",
    component: adminPage,
    beforeEnter: async (to, from) => {
      if (!(await isAdmin())) return { name: 'tasksList' }
    }
  },
  {
    name: "loading",
    path: "/loading",
    component: loadingScreen,
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

export default router;
