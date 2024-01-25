<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
</script>

<Alert class="mb-4" border color="blue">
	<InfoCircleSolid slot="icon" class="h-4 w-4" />
	<a href="/support">開発支援のお願い</a>
</Alert>
