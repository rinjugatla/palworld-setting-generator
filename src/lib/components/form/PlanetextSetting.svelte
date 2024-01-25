<script lang="ts">
	import type { StringSetting, FormValue } from "$lib/types";
	import { Input, Label, Select } from "flowbite-svelte";
    import { selectionItems } from '$lib/common';

    /**
     * 設定
     */
    export let setting: StringSetting;
    /**
     * 無効な項目を強制的に有効にするか
     */
    export let forceEnableDisabledItems: boolean;
    /**
     * フォーム入力情報
     */
    export let formValue: FormValue;
</script>

<div class="sm:col-span-2">
    <Label
        for={setting.key}
        class="mb-2 {!(setting.enabled || forceEnableDisabledItems)
            ? 'text-gray-400'
            : 'text-gray-900'}">
            {setting.description}
            {#if !setting.allow_empty}
                <span class="text-red-500">*</span>
            {/if}
    </Label>
    {#if setting.values.length === 1}
        <Input
            type="text"
            id={setting.key}
            bind:value={formValue.value}
            disabled={!(setting.enabled || forceEnableDisabledItems)}
            required={!setting.allow_empty}
        />
    {:else}
        <Select
            class="mt-2"
            items={selectionItems(setting)}
            bind:value={formValue.value}
            disabled={!(setting.enabled || forceEnableDisabledItems)}
        />
    {/if}
</div>