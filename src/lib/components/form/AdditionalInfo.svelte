<script lang="ts">
    import type { IPalworldServerSetting } from '$lib/types';

    /**
     * テキストカラー
     */
    export let textColor: string;
    /**
     * 設定
     */
    export let setting: IPalworldServerSetting;
</script>

{#if setting.additional_info}
    {#each setting.additional_info.split('\n') as info}
        <div class="text-xs {textColor}">
            {info}
        </div>
    {/each}
{/if}