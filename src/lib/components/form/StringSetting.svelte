<script lang="ts">
	import type { FormValue, StringSetting } from "$lib/types";
	import { Input, Label, Select } from "flowbite-svelte";
    import { formLabelTextColor, selectionItems } from '$lib/common';
	import AdditionalInfo from "./AdditionalInfo.svelte";

    /**
     * 設定
     */
    export let setting: StringSetting;
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
    export let formValue: FormValue;
    /**
     * テキストカラー
     */
    let textColor: string;
    $: textColor = formLabelTextColor(setting, forceEnableDisabledItems);
</script>

<div>
    <Label
        for={setting.key}
        class="mb-2 {!(setting.enabled || forceEnableDisabledItems)
            ? 'text-gray-400'
            : 'text-gray-900'}">
            {setting.description}
            {#if showSettingKey}
                {setting.key}
            {/if}
            {#if !setting.allow_empty}
                <span class="text-red-500">*</span>
            {/if}
            <AdditionalInfo {textColor} {setting} />
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
            disabled={!(setting.enabled || forceEnableDisabledItems)}
            bind:value={formValue.value}
        />
    {/if}
</div>