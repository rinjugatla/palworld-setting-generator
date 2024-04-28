<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import type { FormValues, IPalworldServerVersionSettings } from "$lib/types";
	import { Alert, Checkbox, Label, Select, type SelectOptionType } from "flowbite-svelte";
	import SettingFileImporter from './SettingFileImporter.svelte';

    /**
     * 無効化された項目を有効化するか
     */
    export let forceEnableDisabledItems: boolean;
    /**
     * 設定キーを表示するか
     */
    export let showSettingKey: boolean;
    /**
	 * フォームの入力値
	 */
	export let formValues: FormValues;
</script>

<Alert class="mb-4" border color="dark">
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
            <Checkbox bind:checked={forceEnableDisabledItems}>無効化された項目を有効化</Checkbox>
        </div>
        <div class="sm:col-span-2">
            <Checkbox bind:checked={showSettingKey}>設定キーを表示</Checkbox>
        </div>
        <div class="sm:col-span-2">
            <Label class="mb-2">設定ファイル読み込み</Label>
            <SettingFileImporter 
            bind:formValues={formValues}/>
        </div>
    </div>
</Alert>