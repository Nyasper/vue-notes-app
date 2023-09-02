<script setup>
import { viewAllTaks } from '../services/taskService';
import taskComponent from './taskComponent.vue';
import { useRouter } from 'vue-router'
const router = useRouter()

const tasks = await viewAllTaks()


</script>


<template>
  <h1 class="title">All Notes</h1>
  <ul id="taskContainer" v-if="tasks">
      <taskComponent v-for="task in tasks" :title='task.title' :description='task.description' :key="task._id" @click="router.push(`/tasks/${task._id}`)"/>
  </ul>
  <h2 v-else class="noData">
    ERROR 404 <br>NO DATA FOUND.
  </h2>
</template>
<style>

.title{
  text-align: center;
  margin: 30px;
}


.noData{
  text-align: center;
  margin-top: 100px;
  font-size: 5em;
}
#taskContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>