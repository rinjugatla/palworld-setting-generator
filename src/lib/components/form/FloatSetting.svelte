<script lang="ts">
	import { defaultSettingValue, formLabelTextColor } from "$lib/common";
	import type { FormValue, IPalworldServerSetting, NumberSetting } from "$lib/types";
	import { Input, Label, Range } from "flowbite-svelte";
	import AdditionalInfo from "./AdditionalInfo.svelte";

    /**
     * 設定
     */
    export let setting: NumberSetting;
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

<div>
    <Label
        for={setting.key}
        class="mb-2 {textColor}">
            {setting.description}
            {#if showSettingKey}
                {setting.key}
            {/if}
            {#if !setting.allow_empty}
                <span class="text-red-500">*</span>
            {/if}
            <AdditionalInfo {textColor} {setting} />
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
        min={'min' in setting ? setting.min : 0}
        max={'max' in setting ? setting.max : defaultSettingNumberValue(setting) * 5}
        step="0.1"
        bind:value={formValue.value}
        disabled={!(setting.enabled || forceEnableDisabledItems)}
    />
</div>