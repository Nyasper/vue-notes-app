<script setup lang="ts">
	import Navbar from './components/navbar.vue';
	import statusBar from './components/statusBar.vue';
</script>

<template>
	<Navbar />
	<statusBar />
	<main id="mainContainer">
		<RouterView />
	</main>
</template>

<style scoped>
	#authState {
		position: absolute;
		top: 110px;
		right: 20px;
		background: rgb(20, 20, 20);
		border-radius: 20px;
		padding: 15px;
	}

	.bien {
		color: green;
	}
	.mal {
		color: rgb(146, 33, 33);
	}
</style>
