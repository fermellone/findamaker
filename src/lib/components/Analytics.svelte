<script lang="ts">
	import { page } from '$app/stores';

	const meassurementId = 'G-DJ2HTPTK1Z';

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', meassurementId, {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id={meassurementId}">
	</script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', 'G-DJ2HTPTK1Z');
	</script>
</svelte:head>
