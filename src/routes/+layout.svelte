<script lang="ts">
	import '../app.pcss';
	import GoogleAdsense  from '$lib/components/google-ads/Adsense.svelte';

	let promotionEnabled: boolean;
</script>

<GoogleAdsense  enabled={promotionEnabled} />

<slot />
