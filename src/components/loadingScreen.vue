<template>

<div id="loadingScreenContainer">
  <img src="/Hare_Portrait.webp" alt="harePic">
  <h3>Loading...</h3>
</div>

</template>

<script setup>



</script>

<style>

#loadingScreenContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(27, 27, 27);
  border-radius: 20px;
  margin: auto;
  margin-top: 60px;
  width: max-content;
  padding: 40px;
  user-select: none;
  pointer-events: none;
}


#loadingScreenContainer > img {
  width: 300px;
  height: auto;
  background-color:  rgb(46, 46, 46);
  margin: 10px;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
}

#loadingScreenContainer > h3{
  font-size: 2.8em;
}


</style>