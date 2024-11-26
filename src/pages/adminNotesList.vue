<template>
	<section
		v-if="AdminStore.status.success && !AdminStore.status.loading.loading"
	>
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
	</section>

	<section
		v-else-if="!AdminStore.status.success && !AdminStore.status.loading.loading"
	>
		<h2>Something went wrong: {{ AdminStore.status.message }}</h2>
	</section>
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router';
	import { AdminStore } from '@/stores/adminStore';
	import NoteItem from '@/components/noteItem.vue';
	import { ref } from 'vue';

	const { getUserInfo } = AdminStore;
	const userId = useRoute().params.userId as string;
	const userInfo = getUserInfo(userId);
	const error = ref<string | null>(null);
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
