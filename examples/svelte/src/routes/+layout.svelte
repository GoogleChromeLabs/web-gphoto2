<script lang="ts">
	import '../app.postcss';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	let usbSupported = true;

	onMount(() => {
		try {
			if (!('usb' in navigator)) {
				usbSupported = false;
			}
		} catch (e) {
			console.error('Error checking of USB support:', e);
		}
	});
</script>

<div class="w-full h-full flex flex-col justify-center place-items-center p-4">
	<Header />
	{#if usbSupported}
		<slot />
	{:else}
		⚠ This browser is <a class="btn btn-link" href="https://caniuse.com/webusb,import-maps"
			>not supported</a
		>.
	{/if}
	<Footer />
</div>
