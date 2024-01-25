<script lang="ts">
	import type { FormValue, NumberSetting } from "$lib/types";
	import { Input, Label } from "flowbite-svelte";

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
        id={setting.key}
        min={'min' in setting ? setting.min : 0}
        max={'max' in setting ? setting.max : null}
        bind:value={formValue.value}
        disabled={!(setting.enabled || forceEnableDisabledItems)}
        required={!setting.allow_empty}
    />
</div>