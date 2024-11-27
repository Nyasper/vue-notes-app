<template>
	<div id="aboutContainer">
		<div class="imgContainer">
			<a
				href="https://github.com/Nyasper/Proyecto-1---app-Notas"
				target="_blank"
			>
				<img src="/github.svg" alt="svg-icon" id="svgIcon" />
				<p>GITHUB</p>
			</a>
			<button @click="switchLang" id="changeLangButton">
				{{ content.buttonSwitchLanguage[currentLang] }}
			</button>
		</div>

		<div class="textContainer">
			<h1>{{ content.h1[currentLang] }}</h1>
			<p>
				{{ content.p1[currentLang] }}
			</p>
			<p>
				{{ content.p2[currentLang] }}
			</p>

			<h2>{{ content.h2[currentLang] }}</h2>
			<ul>
				<li v-for="(item, i) in content.ul.li" :key="i">
					{{ item[currentLang] }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const content = {
		buttonSwitchLanguage: {
			en: 'Switch to Spanish',
			es: 'Cambiar al inglés',
		},
		h1: {
			en: 'About',
			es: 'Acerca de',
		},
		p1: {
			en: 'In this application you can create an account and log in to create, edit, update, and delete (CRUD) notes that have a "title" and a "description".',
			es: 'En esta aplicación puedes crear una cuenta e iniciar sesión para crear, editar, actualizar y eliminar notas (CRUD) que tengan un "título" y una "descripción".',
		},
		p2: {
			en: 'This project was created with Vue.js for the frontend, Hono.js with Cloudflare Workers for the backend, and Turso for the database.',
			es: 'Este proyecto se creó con Vue.js para el frontend, Hono.js con Cloudflare Workers para el backend y Turso para la base de datos.',
		},
		h2: {
			en: 'Main Features of the Application:',
			es: 'Características principales de la aplicación:',
		},
		ul: {
			li: [
				{ en: 'Register and login.', es: 'Registrarse e iniciar sesión.' },
				{
					en: 'View, create, edit, and delete notes associated with your user.',
					es: 'Ver, crear, editar y eliminar las notas asociadas a su usuario.',
				},
				{
					en: 'Admin mode, where you can view and delete other users. This feature is not available for normal users.',
					es: 'Modo admin, en dónde puede ver otros usuarios y eliminarlos. Ésta funcionalidad no esta disponible para los usuarios normales.',
				},
			],
		},
	};

	const currentLang = ref<Lang>('en');
	const switchLang = () => {
		currentLang.value = currentLang.value !== 'en' ? 'en' : 'es';
	};
	type Lang = 'en' | 'es';
</script>

<style scoped>
	#aboutContainer {
		width: 80%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: rgb(27, 27, 27);
		padding: 10px;
		gap: 30px;
	}

	.imgContainer {
		a {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 1.1em;
			margin: 0 auto;
		}

		#svgIcon {
			height: 120px;
			background-color: rgb(46, 46, 46);
			padding: 10px;
			border-radius: 10px;

			&:hover {
				background-color: rgb(19, 19, 19);
			}
		}

		#changeLangButton {
			font-size: 1em;
			display: block;
			padding: 15px;
			margin: 10px auto;
		}
	}

	.textContainer {
		display: flex;
		flex-direction: column;

		h1 {
			font-size: 3em;
			margin: 0;
			margin-bottom: 30px;
		}

		p,
		li {
			font-size: 1.1em;
			line-height: 1em;
			margin: 0;
			padding: 0;
		}

		p:not(:first-of-type) {
			/* aplies this styles to all p exept the first */
			margin-top: 10px;
		}

		h2 {
			margin: 0;
			margin-top: 30px;
			font-size: 2.1em;
			text-align: center;
		}

		ul {
			margin: 0;
			padding: 0;

			li {
				margin: 5px 0;
				padding: 0;
				list-style: disc;
				font-size: 21px;
			}
		}
	}

	@media only screen and (max-width: 768px) {
		#aboutContainer {
			flex-direction: column-reverse;
			width: 90%;
			margin: 0 auto;
		}

		.textContainer {
			margin: 0 auto;
			margin-bottom: 30px;
			width: 100%;
			padding: 0;

			h1 {
				font-size: 2.6em;
				margin: 0;
				margin-bottom: 30px;
			}

			p {
				font-size: 1.3em;
				line-height: 1.2em;
				margin: 0;
				padding: 0;
			}
			p:not(:first-of-type) {
				/* aplies this styles to all p exept the first */
				margin-top: 10px;
			}

			h2 {
				font-size: 1.8em;
				margin: 0;
				margin-top: 35px;
			}

			ul {
				margin: 0;
				margin-top: 10px;
				margin-left: 20px;

				li {
					margin: 5px 0;
					padding: 0;
					list-style: disc;
					font-size: 21px;
				}
			}
		}

		.imgContainer {
			width: 100%;
			display: flex;
			flex-direction: column-reverse;
			gap: 0;

			a {
				font-size: 1em;
			}

			#svgIcon {
				height: 50px;
			}

			#changeLangButton {
				display: block;
				margin: 0 auto;
				margin-bottom: 30px;
			}
		}
	}
</style>
