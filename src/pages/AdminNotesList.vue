<template>
	<article v-if="!error">
		<section>
			<h2>username: {{ userInfo?.username }}</h2>
			<h3>admin: {{ userInfo?.admin }}</h3>
		</section>

		<section>
			<h3>Notes: {{ userInfo?.notes.length }}</h3>
			<ul
				v-if="userInfo?.notes && userInfo.notes.length > 0"
				class="adminNotesContainer"
			>
				<RouterLink
					v-for="note in userInfo.notes"
					:to="{ name: 'adminNoteDetail', params: { key: note.id } }"
				>
					<NoteItem :note="note" />
				</RouterLink>
			</ul>
		</section>
	</article>

	<article v-else>
		<h2>Something went wrong</h2>
	</article>
</template>

<script setup lang="ts">
	import { AdminStore } from '@/stores/AdminStore';
	import { useRoute } from 'vue-router';
	const { error, loading, getUserInfo } = AdminStore;
	import NoteItem from '@/components/NoteItem.vue';
	const userId = useRoute().params.userId as string;
	const userInfo = getUserInfo(userId);
</script>

<style scoped>
	.createMessage {
		font-size: 2.5em;
		color: rgb(163, 48, 48);
	}

	.noData {
		text-align: center;
		margin-top: 100px;
		font-size: 4.5em;
	}
	.adminNotesContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
</style>
