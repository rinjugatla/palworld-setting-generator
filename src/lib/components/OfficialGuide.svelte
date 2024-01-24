<script lang="ts">
	import { Alert } from "flowbite-svelte";
	import { InfoCircleSolid } from "flowbite-svelte-icons";
</script>

<Alert class="mb-4" border>
    <InfoCircleSolid slot="icon" class="h-4 w-4" />
    <p class="font-bold text-blue-900">
        <a
            href="https://tech.palworldgame.com/optimize-game-balance"
            target="_blank"
            rel="noopener noreferrer">公式サーバ設定解説</a
        >
    </p>
    <p>
        設定解説で解説されていない項目についてはまだ機能が実装されていないか、設定が有効ではないとして無効化しています。
    </p>
</Alert>