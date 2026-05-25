<template>
	<div class="toast-container">
		<TransitionGroup name="toast">
			<div
				v-for="toast in ToastStore.toasts"
				:key="toast.id"
				class="toast-item"
				:class="toast.type"
				@click="ToastStore.removeToast(toast.id)"
			>
				<div class="toast-icon">
					<!-- Success SVG icon -->
					<svg
						v-if="toast.type === 'success'"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="20 6 9 17 4 12"></polyline>
					</svg>

					<!-- Error SVG icon -->
					<svg
						v-else-if="toast.type === 'error'"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="8" x2="12" y2="12"></line>
						<line x1="12" y1="16" x2="12.01" y2="16"></line>
					</svg>

					<!-- Info SVG icon -->
					<svg
						v-else
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="16" x2="12" y2="12"></line>
						<line x1="12" y1="8" x2="12.01" y2="8"></line>
					</svg>
				</div>
				<div class="toast-content">
					<p class="toast-message">{{ toast.message }}</p>
				</div>
				<button class="toast-close" aria-label="Close message">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
			</div>
		</TransitionGroup>
	</div>
</template>

<script setup lang="ts">
	import { ToastStore } from '@/stores/toastStore';
</script>

<style scoped>
	.toast-container {
		position: fixed;
		top: 20px;
		right: 20px;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 400px;
		width: calc(100% - 40px);
		pointer-events: none;
	}

	.toast-item {
		display: flex;
		align-items: center;
		padding: 14px 18px;
		border-radius: 10px;
		background: rgb(22, 22, 22);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #fff;
		cursor: pointer;
		pointer-events: auto;
		user-select: none;
		position: relative;
		overflow: hidden;
		transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
	}

	.toast-item:hover {
		border-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}

	.toast-item.success {
		border-left: 4px solid #10b981; /* subtle green border indicator */
	}

	.toast-item.error {
		border-left: 4px solid #ef4444; /* subtle red border indicator */
	}

	.toast-item.info {
		border-left: 4px solid #3b82f6; /* subtle blue border indicator */
	}


	.toast-icon {
		margin-right: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.success .toast-icon {
		color: #10b981;
	}

	.error .toast-icon {
		color: #ef4444;
	}

	.info .toast-icon {
		color: #3b82f6;
	}

	.toast-content {
		flex-grow: 1;
		padding-right: 8px;
	}

	.toast-message {
		margin: 0;
		font-size: 0.95rem;
		font-weight: 500;
		line-height: 1.4;
		word-break: break-word;
	}

	.toast-close {
		background: transparent;
		border: none;
		color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		border-radius: 4px;
		transition: color 0.2s, background-color 0.2s;
	}

	.toast-close:hover {
		color: #fff;
		background-color: rgba(255, 255, 255, 0.1);
	}

	/* Transitions */
	.toast-enter-active {
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.toast-leave-active {
		transition: all 0.25s ease-in;
		position: absolute; /* needed for smooth move transitions */
	}

	.toast-enter-from {
		transform: translateX(100%) translateY(0);
		opacity: 0;
	}

	.toast-leave-to {
		transform: translateX(100%);
		opacity: 0;
	}

	/* ensure items below slide up smoothly when an item is removed */
	.toast-move {
		transition: transform 0.35s ease;
	}
</style>
