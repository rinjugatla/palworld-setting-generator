<script lang="ts">
	import { onMount } from "svelte";

    let loaded = false;
    onMount(() => {
        loaded = true;
        console.log(loaded);
    })
</script>

<svelte:head>
	<script crossorigin="anonymous" async src={loaded ? 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4388498410633493' : null}></script>
</svelte:head>