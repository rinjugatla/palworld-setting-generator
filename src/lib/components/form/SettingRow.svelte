<script lang="ts">
	import type { FormValues, IPalworldFormPlaceRowSettings, IPalworldServerSettings } from "$lib/types";
	import BoolSetting from "./BoolSetting.svelte";
	import FloatSetting from "./FloatSetting.svelte";
    import IntSetting from "./IntSetting.svelte";
	import PlanetextSetting from "./PlanetextSetting.svelte";
	import SectionRow from "./SectionRow.svelte";
	import StringSetting from "./StringSetting.svelte";
    /**
     * フォーム配置設定
     */
    export let formPlaceRow: IPalworldFormPlaceRowSettings;
    /**
     * 選択中の設定
     */
    export let selectedSettings: IPalworldServerSettings;
    /**
     * 無効な項目を強制的に有効にするか
     */
    export let forceEnableDisabledItems: boolean;
    /**
     * 設定キーを表示するか
     */
    export let showSettingKey: boolean;
    /**
     * フォーム入力情報
     */
    export let formValues: FormValues;
</script>

{#each formPlaceRow as place}
{@const setting = selectedSettings.filter(setting => setting.key === place?.key)[0]}
{@const column_width = formPlaceRow.length === 1 ? 'sm:col-span-2' : 'w-full'}
<div class={column_width}>
    {#if place.type === 'section'}
        <SectionRow fieldSetting={place} />
    {:else}
        {#if setting.type === 'planetext'}
            <PlanetextSetting {setting} {forceEnableDisabledItems} {showSettingKey} bind:formValue={formValues[setting.key]} />
        {:else if setting.type === 'string'}
            <StringSetting {setting} {forceEnableDisabledItems} {showSettingKey} bind:formValue={formValues[setting.key]} />
        {:else if setting.type === 'int'}
            <IntSetting {setting} {forceEnableDisabledItems} {showSettingKey} bind:formValue={formValues[setting.key]} />
        {:else if setting.type === 'float'}
            <FloatSetting {setting} {forceEnableDisabledItems} {showSettingKey} bind:formValue={formValues[setting.key]} />
        {:else if setting.type === 'bool'}
            <BoolSetting {setting} {forceEnableDisabledItems} {showSettingKey} bind:formValue={formValues[setting.key]} />
        {/if}
    {/if}
</div>
{/each}