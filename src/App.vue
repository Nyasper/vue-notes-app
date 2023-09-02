<script setup>
import Navbar from './components/navbar.vue'
import { onMounted , ref } from 'vue';

</script>


<template>
  <navbar />
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style>
*{
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  color:white;
}

body{
  background-color: rgb(46, 46, 46);
}
</style>
