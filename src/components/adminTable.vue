<template>
	<section class="table-wrapper">
		<table>
			<thead>
				<tr>
					<th>Id</th>
					<th>Username</th>
					<th>Admin Status</th>
					<th>Notes</th>
					<th>Created At</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="[id, data] in adminData" :key="id">
					<td class="id-col">{{ id }}</td>
					<td class="user-col">{{ data.username }}</td>
					<td>
						<span :class="['badge', data.admin ? 'badge-admin' : 'badge-user']">
							{{ data.admin ? 'Admin' : 'User' }}
						</span>
					</td>
					<td>
						<RouterLink :to="{ name: 'adminNotesList', params: { userId: id } }" class="notes-link"
							>{{ data.notes.length }} notes
						</RouterLink>
					</td>
					<td class="date-col">{{ data.created }}</td>
					<td>
						<button v-if="!data.admin" @click.prevent="deleteUserFunc(id)" class="delete-btn">
							Delete User
						</button>
						<span v-else class="na-text">-</span>
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

<style scoped>
	.table-wrapper {
		width: 100%;
		overflow-x: auto;
		margin: 20px 0;
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
		background-color: rgb(22, 22, 22);
		font-size: 0.95rem;
	}

	th, td {
		padding: 16px 20px;
		vertical-align: middle;
	}

	th {
		background-color: rgb(30, 30, 30);
		color: rgba(255, 255, 255, 0.85);
		font-weight: 600;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.8px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	tr {
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		transition: background-color 0.2s ease;
	}

	tr:last-child {
		border-bottom: none;
	}

	tr:hover {
		background-color: rgba(255, 255, 255, 0.02);
	}

	.id-col {
		font-family: monospace;
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.user-col {
		font-weight: 600;
		color: #f3f4f6;
	}

	.date-col {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.85rem;
	}

	.notes-link {
		color: #60a5fa;
		text-decoration: none;
		font-weight: 600;
		display: inline-flex;
		align-items: center;
		padding: 4px 8px;
		background-color: rgba(96, 165, 250, 0.1);
		border-radius: 6px;
		transition: background-color 0.2s;
	}

	.notes-link:hover {
		background-color: rgba(96, 165, 250, 0.2);
		text-decoration: underline;
	}

	.badge {
		display: inline-block;
		padding: 4px 8px;
		font-size: 0.75rem;
		font-weight: 700;
		border-radius: 6px;
		text-transform: uppercase;
		letter-spacing: 0.4px;
	}

	.badge-admin {
		background-color: rgba(245, 158, 11, 0.1);
		color: #f59e0b;
		border: 1px solid rgba(245, 158, 11, 0.2);
	}

	.badge-user {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
		border: 1px solid rgba(16, 185, 129, 0.2);
	}

	.delete-btn {
		padding: 6px 12px;
		font-size: 0.8rem;
		font-weight: 600;
		border: 1px solid rgba(239, 68, 68, 0.4);
		color: #ef4444;
		background-color: rgba(239, 68, 68, 0.1);
		cursor: pointer;
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.delete-btn:hover {
		background-color: #ef4444;
		color: white;
		border-color: #ef4444;
	}

	.na-text {
		color: rgba(255, 255, 255, 0.3);
		font-style: italic;
	}
</style>

