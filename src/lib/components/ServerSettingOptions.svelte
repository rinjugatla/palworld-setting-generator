<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import type { IPalworldServerVersionSettings } from "$lib/types";
	import { Alert, Checkbox, Label, Select, type SelectOptionType } from "flowbite-svelte";

    // 変数
    /**
     * 複数バージョンのサーバ設定
     */
    export let palworldServerSettings: IPalworldServerVersionSettings[];
    /**
     * 選択中のサーババージョン
     */
	export let selectedServerVersion: string;
    /**
     * 無効化された項目を有効化するか
     */
    export let forceEnableDisabledItems: boolean;

    // イベント
    const dispatch = createEventDispatcher();
    /**
     * バージョンが変更された際に発火
     */
    const changeSelectVersion = (e: Event) => {
        dispatch('changeSelectVersion', {event: e});
    }

    /**
	 * サーババージョンをすべて取得
	 */
	const selectionVersions = (): SelectOptionType<any>[] => {
		const versions = palworldServerSettings.map((serverSettings) => serverSettings.version);
		const items: SelectOptionType<any>[] = [];
		versions.forEach((version) => {
			items.push({
				value: version,
				name: version
			});
		});

		return items;
	};
</script>

<Alert class="mb-4" border color="dark">
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
            <Label for="ServerVersion" class="mb-2">サーババージョン</Label>
            <Select
                items={selectionVersions()}
                bind:value={selectedServerVersion}
                on:change={changeSelectVersion}
            />
        </div>
        <div class="sm:col-span-2">
            <Label for="EnableAllItems" class="mb-2">無効化された項目を有効化</Label>
            <Checkbox class="mb-2" bind:checked={forceEnableDisabledItems}>有効化</Checkbox>
        </div>
    </div>
</Alert>