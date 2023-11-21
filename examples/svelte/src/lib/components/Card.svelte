<script lang="ts">
	export let title: string;
</script>

<div class="block p-6 border rounded-lg shadow-xl bg-base-200 border-gray-700">
	<h5 class="mb-2 text-3xl font-bold tracking-tight text-white text-center">
		{title}
	</h5>
	<div class="h-[1px] bg-gray-400 mx-8 mb-4" />

	<slot />
</div>
