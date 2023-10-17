<script setup >


</script>

<template>
  <div id="hareIMGContainer">
    <a href="https://github.com/Nyasper/Proyecto-1---app-Notas" target="_blank">
      <img src="/Hare_Portrait.webp" alt="hare-portrait">
      <p>GITHUB</p>
    </a>   
    <div id="about-container">
    <h2>Acerca de Este Proyecto</h2>
    <h3>Español<br></h3>
    <p class="aboutText">
      Este es mi primer proyecto, es una aplicación para crear, editar, actualizar y eliminar(CRUD) notas. Las tecnologías que utilicé para realizar este proyecto fueron las siguientes: 
      En el frontend utilicé VUE JS con CSS para la interfaz, y realice las peticiones a la API de mi backend con la librería 'Axios'.
      En el backend utilicé NODE JS con la librería ´Express jS´, con esta librería cree una api que recibe las peticiones del Frontend y con la ayuda de la librería ´Mongoose´ envía una consulta a la base de datos MongoDB trayendo la información de las notas(título y contenido).
    </p>
    <h3>Inglish<br></h3>
    <p class="aboutText">
      This is my first project, it is an application to create,edit,update and delete(CRUD) notes. The technologies that I used to carry out this project were the following:
       On the frontend I used VUE JS with CSS for the interface, and I made my backend API requests with the 'Axios' library.
       In the backend I used NODE JS with the ´Express jS´ library, with this library I created an api that receives the requests from the Frontend and with the help of the ´Mongoose´ library sends a query to the MongoDB database bringing the information of the notes (title and content).
    </p>
  </div>
  </div>
</template>


<style scoped>

#hareIMGContainer{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background-color: rgb(27, 27, 27);
  border-radius: 20px;
  margin: auto;
  margin-top: 80px;
  padding: 10px;
  max-width: 80%;
}

#about-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

#hareIMGContainer > a > p{
  text-align: center;
  font-size: 1.6em;
  margin-top: 5px;
}

#hareIMGContainer img {
  height: 560px;
  background-color:  rgb(46, 46, 46);
  padding: 20px;
  border-radius: 10px;
}


#hareIMGContainer  h2{
  font-size: 2.8em;
  margin: 30px 10px;
}

.aboutText {
  margin: 30px 10px;
  font-size: 1.2em;
}

</style>