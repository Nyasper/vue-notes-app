<template>
<nav >
  <ul id="nav-container">
    <li id="li-container">
      <img src="/Hare_Icon.webp" alt="hare-icon">
      <router-link to="/">All Notes</router-link>
      <router-link to="/tasks/new">Create Note</router-link>
      <router-link id="about" to="/about">About</router-link>
    </li>
  </ul>
</nav>
</template>

<style>

#nav-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 2vh 0;
  height: 10vh;
  width: 100%;
}


  #li-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: max-content;
    background-color: rgb(27, 27, 27);
    border-radius: 20px;
  }

  #li-container a{
    font-size: 2rem;
    padding: 2px 8px;
    margin: 0 20px;
    border-bottom: 2px rgba(0, 0, 0, 0) solid;
    border-radius: 8px;
  }

  #li-container a:hover{
    border-bottom: 2px white solid;
    transition: .35s ease all;
  }

  #li-container > img{
    width: 96px;
    padding: 0 10px;
  }
</style>