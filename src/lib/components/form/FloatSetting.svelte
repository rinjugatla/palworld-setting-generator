<script lang="ts">
	import { defaultSettingValue } from "$lib/common";
	import type { FormValue, IPalworldServerSetting, NumberSetting } from "$lib/types";
	import { Input, Label, Range } from "flowbite-svelte";

    /**
     * 設定
     */
    export let setting: NumberSetting;
    /**
     * 無効な項目を強制的に有効にするか
     */
    export let forceEnableDisabledItems: boolean;
    /**
     * フォーム入力情報
     */
    export let formValue: FormValue;

	/**
	 * デフォルトの値を取得(数値用)
	 * @param settingKey 設定キー
	 */
    const defaultSettingNumberValue = (setting: IPalworldServerSetting): number => {
		const value = defaultSettingValue(setting);
		const typed = value as number;
		return typed;
	};
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
    <Input
        type="number"
        step="0.1"
        id={setting.key}
        min="0"
        bind:value={formValue.value}
        disabled={!(setting.enabled || forceEnableDisabledItems)}
        required={!setting.allow_empty}
    />
    <Range
        id="{setting.key}-range"
        size="md"
        min="0"
        max={Math.max(defaultSettingNumberValue(setting) * 2, 5)}
        step="0.1"
        bind:value={formValue.value}
        disabled={!(setting.enabled || forceEnableDisabledItems)}
    />
</div>