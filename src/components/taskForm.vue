<template>
  <div id="taskFormContainer">
  <form @submit.prevent="saveTask" id="taskForm">
    <h2>Add a Note</h2>
    <input type="text" placeholder="Add a Title" v-model="title" id="input-title" required>
    <textarea  id="input-description" placeholder="Add a Description" v-model="description" ></textarea>
    <button id="saveButton" :disabled="!title">Save</button>
  </form>
  <taskComponent :title='title' :description="description" id="addNote" />
</div>
</template>

<script setup>
import { ref } from 'vue'
import {createTask} from '../services/taskService.js'
import taskComponent from './taskComponent.vue';
import { useRouter } from 'vue-router'

const router  = useRouter()
const title = ref('')
const description = ref('')


async function saveTask(){
  await createTask({
    title:title.value,
    description:description.value
  })
  router.push('/')
  console.log('enviado')
}

</script>

<style>


#taskFormContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 80vh;
  width: 100%;
  gap: 10px;
}


#taskForm{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-left: 30vh;
  min-width: 30%;
  min-height: max-content;
}



#addNote{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 40%;
  overflow: auto;
}


#addNote > h2{
  font-size: 2.4em;
  margin-top: 10px;
  overflow-wrap: break-word;
  display: block;
  max-width: 90%;
  
}
#addNote > p{
  font-size: 1.5em;
  overflow-wrap: break-word;
  display: block;
  max-width: 90%
}

#input-title{
  padding: 10px;
  height: 60px;
  background-color: rgb(94, 94, 94);
  font-size: 26px;
}

#input-title:focus{
  background-color: rgb(57, 57, 57);

}

#input-description{
  margin-top: 10px;
  padding: 10px;
  height: 60px;
  font-size: 26px;
  background-color: rgb(94, 94, 94);
}

#input-description:focus{
  background-color: rgb(57, 57, 57);

}

#saveButton,
#deleteButton,
#cancelButton{
  padding: 10px;
  height: 60px;
  font-size: 26px;
  margin: 15px;
  border-radius: 20%;
  background-color: rgb(94, 94, 94);
}

#saveButton:hover,
#deleteButton:hover,
#cancelButton:hover{
  background-color: rgb(57, 57, 57);

}


#saveButton:disabled,
#deleteButton:disabled,
#cancelButton:disabled{
  background-color: rgba(0, 0, 0, 0.456);
  border: none;
  color: rgb(64, 64, 64);
}


#taskFormContainer > form > h2{
  font-size: 30px;
  padding: 10px;
  margin: 10px;
}


</style>