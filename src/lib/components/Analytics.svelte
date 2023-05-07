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

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<!-- Google Analytics -->
	<!-- Google Analytics -->
	<!-- Google Analytics -->
	<!-- Google Analytics -->
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

	<!-- Google Tag Manager -->
	<!-- Google Tag Manager -->
	<!-- Google Tag Manager -->
	<!-- Google Tag Manager -->
	<script>
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-MC6KZNK');
	</script>
	<!-- End Google Tag Manager -->
</svelte:head>

<!-- Google Tag Manager (noscript) -->
<noscript
	><iframe
		title="Google Tag Manager"
		src="https://www.googletagmanager.com/ns.html?id=GTM-MC6KZNK"
		height="0"
		width="0"
		style="display:none;visibility:hidden"
	/></noscript
>
<!-- End Google Tag Manager (noscript) -->
