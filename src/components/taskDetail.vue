<script setup >
import taskComponent from './taskComponent.vue';
import {viewIdTask} from '../services/taskService'
import {updateIdTask} from '../services/taskService'
import {deleteIdTask} from '../services/taskService'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue';

const router = useRouter()
const route = useRoute()


const task = await viewIdTask(route.params.id)

const orgininalTask = {
  title: task.title,
  description: task.description
}

task.title = ref(task.title)
task.description = ref(task.description)


async function updateTask(){
  router.push('/')
  await updateIdTask(route.params.id,{
    title: task.title.value,
    description: task.description.value
  })

}
async function deleteTask(){
  router.push('/')
  await deleteIdTask(route.params.id,{
    title: task.title.value,
    description: task.description.value
  })
}


function cancel(){
  task.title.value = orgininalTask.title
  task.description.value = orgininalTask.description
}
</script>

<template>

<div id="taskFormContainer">
  <form @submit.prevent="updateTask" id="taskForm">
    <h2>Update Note</h2>
    <input type="text" v-model="task.title.value" @submit="mostarTexto" id="input-title" placeholder="Update Title">
    <textarea id="input-description" v-model="task.description.value" placeholder="Update Description"></textarea>
    <div id="button-container" >
    <button id="saveButton" 
    :disabled="!task.title.value || !task.description.value || task.title.value === orgininalTask.title && task.description.value === orgininalTask.description  "
    >Update</button>
    <button id="cancelButton" @click.prevent="cancel" 
    :disabled="task.title.value === orgininalTask.title && task.description.value === orgininalTask.description " >Cancel</button>
    <button id="deleteButton" @click.prevent="deleteTask"
    :disabled="task.title.value !== orgininalTask.title || task.description.value !== orgininalTask.description"
    >Delete</button>
  </div>
  </form>
  <taskComponent id="taskMain" :title='task.title' :description='task.description' />
</div>
<span id="message" hidden>Note update sucees</span>
</template>


<style>

#taskMain{
  font-size: 1.8em;
  margin: auto;
  margin-top: 6vh;
  width: 40vw;
  height: 75vh;
}

#button-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}


</style>