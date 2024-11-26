<template>
	<nav class="bottomMargin">
		<button
			type="button"
			ref="navShowButtonRef"
			id="hamburgerButton"
			@click="openPanel"
			:aria-expanded="sidePanelOpen ? 'true' : 'false'"
			aria-controls="sidePanel"
		>
			<img
				src="/hamburgerIcon.svg"
				alt="Open nav menu"
				id="hamburgerIcon"
				:class="sidePanelOpen && 'sidePanelOpened'"
			/>
		</button>
		<ul
			class="navContainer"
			:class="sidePanelOpen && 'menuOpen'"
			ref="subMenuRef"
		>
			<li
				v-for="navItem in filteredNavBarItems"
				:class="{ hiddenElement: !sidePanelOpen }"
			>
				<router-link class="anchorItem" :to="{ name: navItem.routeName }">
					{{ navItem.innerText }}
				</router-link>
			</li>
			<li
				v-if="AuthStore.isAuth.value"
				class="logoutButton"
				:class="{ hiddenElement: !sidePanelOpen }"
			>
				<p class="anchorItem" @click="logoutButton">Logout</p>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	import { computed, ref, useTemplateRef, type ComputedRef } from 'vue';
	import { AuthStore } from '@/stores/authStore';
	import router from '../routes';
	import { useDocumentEvent } from '@/composables/useDocumentEvent';

	async function logoutButton() {
		const ask = confirm('Logout?');
		if (ask) {
			const response = await AuthStore.logoutUser();
			router.push({ name: 'login' });
			// window.location.reload();
		}
	}

	const navBarItems: ComputedRef<NavBarItem[]> = computed(() => [
		{
			innerText: 'My Notes',
			routeName: 'notesList',
			condition: AuthStore.isAuth.value,
		},
		{
			innerText: 'New Note',
			routeName: 'noteCreate',
			condition: AuthStore.isAuth.value,
		},
		{
			innerText: 'Login',
			routeName: 'login',
			condition: !AuthStore.isAuth.value,
		},
		{
			innerText: 'Register',
			routeName: 'register',
			condition: !AuthStore.isAuth.value,
		},
		{
			innerText: 'Admin',
			routeName: 'admin',
			condition: AuthStore.isAdmin.value,
		},
		{ innerText: 'About', routeName: 'about', condition: true },
	]);

	const filteredNavBarItems = computed(() => {
		return navBarItems.value.filter((item) => item.condition);
	});

	// mobile
	const sidePanelOpen = ref(false);
	const openPanel = () => {
		sidePanelOpen.value = !sidePanelOpen.value;
	};

	// subMenu|hamburgerMenu logic
	const showMenuButton = useTemplateRef('navShowButtonRef');
	const subMenuRef = useTemplateRef('subMenuRef');

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as Node | null;
		if (
			showMenuButton.value &&
			subMenuRef.value &&
			!showMenuButton.value.contains(target) &&
			!subMenuRef.value.contains(target)
		) {
			sidePanelOpen.value = false;
		}
	};

	const closeSubMenuOnClick = (event: MouseEvent) => {
		const target = event.target as Node | null;
		if (subMenuRef.value && subMenuRef.value.contains(target)) {
			sidePanelOpen.value = false;
		}
	};
	useDocumentEvent('click', closeSubMenuOnClick);
	useDocumentEvent('click', handleClickOutside);

	interface NavBarItem {
		innerText: string;
		routeName: string;
		condition: boolean;
	}
</script>

<style scoped>
	#hamburgerButton {
		display: none;
		position: fixed;
		width: max-content;
		height: max-content;
		padding: 0;
		margin: 0;
		margin-left: 5px;
		border: none;
	}

	#hamburgerIcon {
		display: none;
		margin: 0;
		padding: 0;
		width: 55px;
		border: 1px solid white;
		background-color: rgb(27, 27, 27);
		border-radius: 10px;
	}

	.bottomMargin {
		padding-bottom: 65px;
	}

	.navContainer {
		height: 100px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		width: max-content;
		margin-top: 20px;
		margin-bottom: 4 0px;
		margin-left: auto;
		margin-right: auto;
		background-color: rgb(27, 27, 27);
		border-radius: 20px;
	}

	.navContainer > li,
	.logoutButton {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.anchorItem {
		font-size: 2rem;
		padding: 2px 8px;
		margin: 0 20px;
		border-bottom: 2px rgba(0, 0, 0, 0) solid;
		border-radius: 8px;
	}

	.anchorItem:hover {
		border-bottom: 2px white solid;
		transition: 0.35s ease all;
	}

	.logoutButton {
		cursor: pointer;
	}

	.sidePanelOpened {
		width: 100%;
	}

	@media only screen and (max-width: 768px) {
		#hamburgerButton {
			display: block;
		}

		#hamburgerIcon {
			display: block;
		}

		.navContainer {
			position: fixed;
			right: 200%;
			background-color: red;
			display: flex;
			width: max-content;
			height: auto;
			background-color: transparent;
			flex-direction: column;
			align-items: center;
			justify-content: left;
		}

		.navContainer li {
			display: none;
			margin: 5px 0;
			padding: 5px 1px;
		}

		.menuOpen {
			background-color: rgb(27, 27, 27);
			border: 1px solid white;
			padding: 0;
			margin: 0;
			margin-left: 20px;
			top: 5px;
			left: 55px;
		}

		.menuOpen li {
			display: block;
			width: 100%;
			margin: 5px auto;
		}
	}
</style>
