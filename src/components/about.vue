<script setup>
  import { ref } from 'vue'
  const en = ref(true)

  const switchLanguage = ()=> en.value = !en.value

</script>

<template>
  <!-- ENGLISH -->
	<div  v-if="en" id="aboutContainer">
		<div id="imgContainer">
			<a
				href="https://github.com/Nyasper/Proyecto-1---app-Notas"
				target="_blank"
			>
				<img src="/github.svg" alt="svg-icon" id="svgIcon" />
				<p>GITHUB</p>
			</a>
      <button @click="switchLanguage">Cambiar a Español</button>
		</div>
		<div id="textContainer">
			<h1>About</h1>
			<p class="aboutText">
				This is my first project, it is an application to create, edit, update
				and delete(CRUD) notes that have a title and a description. Incorporates
				a login system to facilitate note management associated with registered
				users. The technologies I used to carry out this project were VUE JS to
				develop the entire interface, and for requests to my API backend uses
				the 'Axios' library.
        <h3>Main Features of the Application:</h3>
          <ul>
           <li>
             Register and Login.
           </li>
           <li>
             View, Create, Edit, and Delete Notes associated with your user.
           </li>
         </ul>
			</p>
		</div>
	</div>
<!-- SPANISH -->
  <div v-else id="aboutContainer">
		<div id="imgContainer">
			<a
				href="https://github.com/Nyasper/Proyecto-1---app-Notas"
				target="_blank"
			>
				<img src="/github.svg" alt="svg-icon" id="svgIcon" />
				<p>GITHUB</p>
			</a>
      <button @click="switchLanguage" >Switch to English</button>
		</div>
		<div id="textContainer">
			<h1>About</h1>
			<p class="aboutText">
				Este es mi primer proyecto, es una aplicación para crear, editar,
				actualizar y eliminar(CRUD) notas que tienen un titulo y una
				descripcion. Incorpora un sistema de inicio de sesión para facilitar la
				gestión de notas asociadas a usuarios registrados. Las tecnologías que
				utilicé para realizar este proyecto fueron VUE JS para desarrollar toda
				la interfaz, y para las peticiones a la API de mi backend utilize la
				librería 'Axios'.
        <h3>Caracteristicas Principales de la Aplicacion:</h3>
				<ul>
          <li>
            Registrarse e Iniciar Sesion.
          </li>
          <li>
            Ver, Crear, Editar, y Eliminar las Notas asociadas a su usuario.
          </li>
        </ul>
			</p>
		</div>
	</div>
</template>

<style scoped>
	h1 {
		font-size: 4.6em;
	}

  h3{
    margin: 10px 0;
  }

  li{
    margin: 5px 0;
    list-style: disc;
  }

  button{
    display: block;
    margin: 10px auto;
  }

	#aboutContainer {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: rgb(27, 27, 27);
		padding: 10px;
	}

	#imgContainer {
		width: 30%;
	}

	#imgContainer > a {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 1.1em;
		gap: 10px;
		width: max-content;
		margin: 0 auto;
	}

	#svgIcon {
		height: 200px;
		width: auto;
		background-color: rgb(46, 46, 46);
		padding: 20px;
		border-radius: 10px;
	}

	#svgIcon:hover {
		background-color: rgb(19, 19, 19);
	}

	#textContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 60%;
		margin: 5px 20px;
	}

	#aboutContainer > a > p {
		text-align: center;
		font-size: 1.6em;
		margin-top: 5px;
	}

	#aboutContainer h2 {
		font-size: 2.8em;
		margin: 30px 10px;
	}

	.aboutText {
		margin: 30px 10px;
		font-size: 1.2em;
	}
</style>
