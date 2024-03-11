<script setup>
	import Navbar from './components/navbar.vue';
</script>

<template>
	<navbar />
	<Suspense>
		<main id="mainContainer">
			<RouterView />
		</main>
	</Suspense>
</template>

<style>
	* {
		padding: 0;
		margin: 0;
		color: white;
	}

	body {
		background-color: rgb(46, 46, 46);
	}

	ul {
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	input,
	textarea {
		background-color: rgb(46, 46, 46);
		padding: 5px 10px;
		border-radius: 20px;
		border: 1px solid white;
		font-size: 1.1em;
	}

	button {
		padding: 15px 20px;
		font-size: 1.1em;
		font-weight: 600;
		border: 2px solid white;
		color: white;
		background-color: rgb(46, 46, 46);
		cursor: pointer;
		border-radius: 40px;
	}

	button:hover {
		background-color: rgb(41, 41, 41);
		border: 2px solid rgb(255, 255, 255);
	}

	button:disabled {
		color: black;
	}

	button:disabled:hover {
		cursor: no-drop;
		background-color: transparent;
		border: 2px solid rgb(24, 24, 24);
	}

	h1 {
		font-size: 3em;
		text-align: center;
		margin: 30px;
	}

	#mainContainer {
		width: 90%;
		margin: 0 auto;
		padding: 20px;
		border-radius: 20px;
		background-color: rgb(27, 27, 27);
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		justify-content: center;
	}
</style>
