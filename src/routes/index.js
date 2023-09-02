import { createRouter, createWebHistory } from "vue-router";

//componentes
import taskList from "../components/taskList.vue";
import taskDetail from "../components/taskDetail.vue";
import taskForm from "../components/taskForm.vue";
import about from "../components/about.vue";
import notFound from "../components/notfound.vue";
import loadingScreen from "../components/loadingScreen.vue";

const routes = [
  {
    path: "/",
    name: "tasks",
    component: taskList,
  },
  {
    path: "/tasks/new",
    name: "task-new",
    component: taskForm,
  },
  {
    path: "/tasks/:id",
    name: "task-detail",
    component: taskDetail,
  },
  {
    path: "/about",
    component: about,
  },
  {
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
