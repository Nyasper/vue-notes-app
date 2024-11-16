<template>
	<section>
		<table border="1">
			<thead>
				<tr>
					<th>Id</th>
					<th>Username</th>
					<th>Admin</th>
					<th>Notes Count</th>
					<th>Created</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="[id, data] in adminData" :key="id">
					<td>{{ id }}</td>
					<td>{{ data.username }}</td>
					<td>{{ data.admin }}</td>
					<td>
						<RouterLink :to="{ name: 'adminNotesList', params: { userId: id } }"
							>{{ data.notes.length }}
						</RouterLink>
					</td>
					<td>{{ data.created }}</td>
					<td v-if="!data.admin">
						<button @click.prevent="deleteUserFunc(id)">delete</button>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script setup lang="ts">
	import type { UserAdminMapReadonly } from '@/models/adminData.model';

	const { adminData } = defineProps<Props>();

	interface Props {
		adminData: UserAdminMapReadonly;
		deleteUserFunc: (id: string) => Promise<void>;
	}
</script>
