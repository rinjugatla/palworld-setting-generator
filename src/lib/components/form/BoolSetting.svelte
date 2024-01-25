<script lang="ts">
    import type { FormValue, BoolSetting } from "$lib/types";
	import { Checkbox, Label } from "flowbite-svelte";

    /**
     * 設定
     */
    export let setting: BoolSetting;
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
    </Label>
    <Checkbox
        class="mb-2 {!(setting.enabled || forceEnableDisabledItems)
            ? 'text-gray-400'
            : 'text-gray-900'}"
        bind:checked={formValue.value}
        disabled={!(setting.enabled || forceEnableDisabledItems)}>有効化</Checkbox
    >
</div>