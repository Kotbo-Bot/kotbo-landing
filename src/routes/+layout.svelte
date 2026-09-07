<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { initLocale } from '$lib/i18n/state.svelte';

	let { children } = $props();

	onMount(initLocale);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
