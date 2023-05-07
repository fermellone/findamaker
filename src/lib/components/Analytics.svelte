<script lang="ts">
	import { page } from '$app/stores';

	const meassurementId = 'G-1MYLNDXZ07';

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
		gtag('config', 'G-1MYLNDXZ07');
	</script>
</svelte:head>
