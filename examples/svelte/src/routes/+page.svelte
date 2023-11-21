<script lang="ts">
	import {
		connectCamera,
		updateConfig,
		config,
		imageURL,
		captureImage,
		capturePreview,
		connected,
		disconnectCamera
	} from '$lib/camera';

	//Todo: REMOVE THIS
	import { testCameraConfig } from '$lib/testing';

	import Card from '$lib/components/Card.svelte';
	import Setting from '$lib/components/Setting.svelte';
	import { onMount } from 'svelte';

	// Handling searching through the configuration
	let filteredConfig = {};
	let searchText = '';
	$: {
		filteredConfig = {};
		let configuration = $config?.children;
		let lowercaseSearchText = searchText.toLowerCase();
		for (let sectionKey in configuration) {
			let section = configuration[sectionKey];
			let filteredChildren = Object.fromEntries(
				Object.entries(section.children).filter(
					([childKey, child]) =>
						child.name.toLowerCase().includes(lowercaseSearchText) ||
						child.label.toLowerCase().includes(lowercaseSearchText)
				)
			);
			if (Object.keys(filteredChildren).length > 0) {
				filteredConfig[sectionKey] = {
					...section,
					children: filteredChildren
				};
			}
		}
	}

	// This is for streaming
	let streaming = false;
	let canvas: any;
	async function getPreview() {
		while (streaming && canvas) {
			try {
				const blob = await capturePreview();
				const img = await createImageBitmap(blob);
				const canvasCtx = canvas.getContext('bitmaprenderer');
				canvasCtx.transferFromImageBitmap(img);
			} catch (err) {
				console.error('Could not refresh preview :', err);
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		}
		console.log('Done streaming. Streaming: ', streaming, 'Canvas: ', canvas);
	}
	async function startPreview() {
		if (streaming) return; // If already streaming, return

		console.log('Starting preview');
		streaming = true;
		getPreview();
	}
	function stopPreview() {
		console.log('Stopping preview');
		streaming = false;
	}
</script>

{#if !$connected}
	<button class="btn btn-primary btn-lg" on:click={connectCamera} on:keydown={connectCamera}>
		Connect Camera
	</button>
{:else}
	<button
		class="btn btn-error hover:bg-error/80 text-white btn-lg"
		on:click={disconnectCamera}
		on:keydown={disconnectCamera}
	>
		Disconnect Camera
	</button>
{/if}

{#if $connected}
	<div class="grid grid-cols-3 gap-4 p-4 text-white">
		<Card title="Configuration">
			{#if $config && $config.children}
				<div class="w-full flex flex-row justify-center place-items-center">
					<div class="pr-4">Search</div>
					<input type="text" class="input input-bordered" bind:value={searchText} />
				</div>
				<div class="max-h-[500px] overflow-y-auto">
					{#each Object.entries(filteredConfig) as [categoryName, category]}
						<h1 class="text-3xl capitalize pt-4">{categoryName}</h1>
						<div class="h-[1px] bg-gray-400 w-72 mb-1" />
						{#each Object.entries(category.children) as [name, config]}
							<Setting {name} {config} updateFunction={updateConfig} />
						{/each}
					{/each}
				</div>
			{/if}
		</Card>
		<Card title="Fetching image">
			<button class="btn btn-primary w-full h-24" on:click={captureImage} on:keydown={captureImage}>
				Fetch image
			</button>
			<div
				class="border mt-4 border-white rounded-md aspect-square flex justify-center place-items-center"
			>
				{#if $imageURL}
					<img src={$imageURL} alt="Preview to adjust settings" />
				{:else}
					Preview image
				{/if}
			</div>
		</Card>
		<Card title="Preview video">
			{#if !streaming}
				<button
					class="btn btn-primary w-full h-24"
					on:click={startPreview}
					on:keydown={startPreview}
				>
					Start streaming
				</button>
			{:else}
				<button
					class="btn btn-error hover:bg-error-80 w-full h-24"
					on:click={stopPreview}
					on:keydown={stopPreview}
				>
					Stop streaming
				</button>
			{/if}
			<div class="m-4" />

			<div
				class="border mt-4 border-white rounded-md p-8 aspect-square flex justify-center place-items-center"
			>
				<canvas bind:this={canvas} class="center" class:hidden={!streaming} />
				{#if !streaming}
					Preview stream
				{/if}
			</div>
		</Card>
	</div>
{/if}
