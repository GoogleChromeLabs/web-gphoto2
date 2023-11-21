<script lang="ts">
	import type { Config } from 'web-gphoto2';
	export let name: string;
	export let config: Config;
	export let updateFunction: (name: string, value: string) => void;
</script>

<div class="">
	<div class="form-control w-full max-w-xs">
		<label class="label pb-0">
			<span class="label-text capitalize">{name} - {config.label}</span>
		</label>
		{#if config.type === 'text' || config.type === 'datetime' || config.readonly}
			<input
				type="text"
				value={config.value}
				class="input input-bordered w-full max-w-xs select-none pointer-events-none"
			/>
		{:else if config.type === 'radio' || config.type === 'menu'}
			<select
				class="select select-bordered w-full max-w-xs"
				bind:value={config.value}
				on:change={() => updateFunction(name, config.value)}
			>
				{#each config.choices as choice}
					<option value={choice}>{choice}</option>
				{/each}
			</select>
		{:else if config.type === 'toggle'}
			<div
				class="h-12 w-80 flex justify-center place-items-center border border-white border-opacity-20 rounded"
			>
				<input
					type="checkbox"
					class="toggle"
					disabled={config.readonly}
					bind:value={config.value}
					on:change={() => updateFunction(name, config.value)}
				/>
			</div>
		{:else if config.type === 'range'}
			<div
				class="h-12 w-80 flex justify-center place-items-center border border-white border-opacity-20 rounded"
			>
				<input
					type="range"
					disabled={config.readonly}
					min={config.min}
					max={config.max}
					step={config.step}
					bind:value={config.value}
					on:input={() => updateFunction(name, config.value)}
					class="range"
				/>
				<div class="w-10 text-center">{config.value}</div>
			</div>
		{/if}
	</div>
</div>
