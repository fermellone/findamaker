<script lang="ts">
	import { pageTitle } from '$lib/store';
	import type { PageData } from './$types';

	export let data: PageData;

	pageTitle.set("Problems you're solving");

	$: solutions = data.solutions;
</script>

<h1>Solving</h1>
<pre>{JSON.stringify(solutions)}</pre>
