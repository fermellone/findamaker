<script lang="ts">
	import { page } from '$app/stores';

	$: problemId = $page.params.problemId;
</script>

<h1>{problemId}</h1>
