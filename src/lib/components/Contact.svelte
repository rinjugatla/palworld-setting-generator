<script lang="ts">
	import { Alert } from "flowbite-svelte";
	import { InfoCircleSolid } from "flowbite-svelte-icons";
</script>

<Alert class="mb-4" border color="blue">
    <InfoCircleSolid slot="icon" class="h-4 w-4" />
    <p>問い合わせ先</p>
    <div class="flex">
        <div class="mr-2">
            <a
            href="https://github.com/rinjugatla/palworld-setting-generator"
            target="_blank"
            rel="noopener noreferrer">GitHub</a
        >
        </div>
        <div class="mx-2">
            <a
            href="https://twitter.com/rin_jugatla"
            target="_blank"
            rel="noopener noreferrer">Twitter/X: @rin_jugatla</a>
        </div>
        <div class="mx-2">
            Discord: @rinjugatla
        </div>
    </div>
</Alert>