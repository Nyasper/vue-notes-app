<template>
	<section v-if="!error && !loading">
		<h1>Welcome, {{ user.username }}!</h1>
		<section v-if="notes.size === 0 && !loading">
			<h2 class="createMessage">
				There are no notes created, start by
				<router-link :to="{ name: 'noteCreate' }">creating one</router-link>
			</h2>
		</section>
		<section v-else>
			<NotesList :notes />
			<h2 v-if="notes.size > 0">total notes: {{ notes.size }}</h2>
		</section>
	</section>

	<section v-else>
		<h2>Something went wrong</h2>
	</section>
</template>

<script setup lang="ts">
	import { AuthStore } from '@/stores/authStore';
	import { NotesStore } from '@/stores/notesStore';
	import NotesList from '@/components/notesList.vue';

	const { notes, error, loading } = NotesStore;
	const { user } = AuthStore;
</script>

<style scoped>
	.createMessage {
		font-size: 2.5em;
		color: rgb(255, 255, 255);
	}

	.createMessage > a {
		color: rgb(166, 187, 224);
		text-decoration: underline;
	}

	h2 {
		text-align: center;
	}

	@media only screen and (max-width: 768px) {
		h1 {
			position: absolute;
			font-size: 26px;
			width: max-content;
			z-index: -1;
			top: 0px;
			left: 65px;
		}
	}
</style>
