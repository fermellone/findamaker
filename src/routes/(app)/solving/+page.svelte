<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: solutions = data.solutions;
</script>

<h1>Solving</h1>
<pre>{JSON.stringify(solutions)}</pre>
