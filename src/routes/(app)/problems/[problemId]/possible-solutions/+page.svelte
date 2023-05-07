<script lang="ts">
	import { page } from '$app/stores';
	import { pageTitle } from '$lib/store';

	$: problemId = $page.params.problemId;
	pageTitle.set('Possible solutions');
</script>

<h1>{problemId}</h1>
