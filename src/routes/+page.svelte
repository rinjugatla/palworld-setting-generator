<script lang="ts">
	import { Section } from 'flowbite-svelte-blocks';
	import {
		Label,
		Input,
		Button,
		Select,
		Checkbox,
		Range,
		type SelectOptionType,
		Alert
	} from 'flowbite-svelte';
	import { palworldServerSettings } from '$lib/palworld-server-serttings';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import type { FormValues, IPalworldServerSettings } from '$lib/types';

	const handleSubmit = () => {
		alert('Form submited.');
	};

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

	/**
	 * 最新のサーババージョン
	 */
	const latestServerVersion = (): string => {
		const latestVersion = palworldServerSettings[0].version;
		return latestVersion;
	};

	/**
	 * 複数の選択肢を取得
	 * @param settingKey　設定キー
	 */
	const selectionItems = (settingKey: string): SelectOptionType<any>[] => {
		const setting = selectedVersionSettings.filter((setting) => setting.key === settingKey)[0];
		const items: SelectOptionType<any>[] = [];
		setting.values.forEach((value) => {
			const name = value.defalut ? `${value.value}(デフォルト)` : value.value.toString();
			items.push({
				value: value.value,
				name: name
			});
		});
		return items;
	};

	/**
	 * デフォルトの選択肢を取得
	 * @param settingKey 設定キー
	 */
	const defaultSettingValue = (settingKey: string) => {
		const setting = selectedVersionSettings.filter((setting) => setting.key === settingKey)[0];
		const value = setting.values.filter((value) => value.defalut)[0].value;
		return value;
	};

	const defaultSettingBoolValue = (settingKey: string): boolean => {
		const value = defaultSettingValue(settingKey);
		const typed = value as boolean;
		return typed;
	};

	const defaultSettingNumberValue = (settingKey: string): number => {
		const value = defaultSettingValue(settingKey);
		const typed = value as number;
		return typed;
	};

	// 無効化された項目を有効化
	let forceEnableDisabledItems = false;
	let selectedServerVersion: string;
	let selectedVersionSettings: IPalworldServerSettings;
	let formValues: FormValues = {};
	$: {
		selectedVersionSettings = palworldServerSettings.filter(
			(settings) => settings.version === selectedServerVersion
		)[0].settings;
	}

	// リアクティブされないことがあるので再定義
	const initCurrentServerSettings = () => {
		selectedVersionSettings = palworldServerSettings.filter(
			(settings) => settings.version === selectedServerVersion
		)[0].settings;
	};

	const initFormValues = () => {
		formValues = {};
		selectedVersionSettings.forEach((setting) => {
			formValues[setting.key] = {
				key: setting.key,
				value: defaultSettingValue(setting.key),
				type: setting.type
			};
		});
	};
	const changedSelectVersion = (e: Event) => {
		initFormValues();
	};

	const init = () => {
		selectedServerVersion = latestServerVersion();
		initCurrentServerSettings();
		initFormValues();
	};

	init();
</script>

<div class="m-5">
	<Section name="crudcreateform">
		<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Palworldサーバ設定</h2>
		<Alert class="mb-4" border>
			<InfoCircleSolid slot="icon" class="h-4 w-4" />
			<p class="font-bold text-blue-900">
				<a
					href="https://tech.palworldgame.com/optimize-game-balance"
					target="_blank"
					rel="noopener noreferrer">公式サーバ設定解説</a
				>
			</p>
			<p>
				設定解説で解説されていない項目についてはまだ機能が実装されていないか、設定が有効ではないとして無効化しています。
			</p>
		</Alert>

		<Alert class="mb-4" border color="dark">
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
				<div class="sm:col-span-2">
					<Label for="ServerVersion" class="mb-2">サーババージョン</Label>
					<Select
						items={selectionVersions()}
						bind:value={selectedServerVersion}
						on:change={changedSelectVersion}
					/>
				</div>
				<div class="sm:col-span-2">
					<Label for="EnableAllItems" class="mb-2">無効化された項目を有効化</Label>
					<Checkbox class="mb-2" bind:checked={forceEnableDisabledItems}>有効化</Checkbox>
				</div>
			</div>
		</Alert>

		<form on:submit={handleSubmit}>
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
				{#each selectedVersionSettings as setting}
					{#if setting.type === 'planetext'}
						<div class="sm:col-span-2">
							<Label for={setting.key} class="mb-2">{setting.description}</Label>
							{#if setting.values.length === 1}
								<Input
									type="text"
									id={setting.key}
									bind:value={formValues[setting.key].value}
									disabled={!(setting.enabled || forceEnableDisabledItems)}
									required={!setting.allow_empty}
								/>
							{:else}
								<Select
									class="mt-2"
									items={selectionItems(setting.key)}
									bind:value={formValues[setting.key].value}
									disabled={!(setting.enabled || forceEnableDisabledItems)}
								/>
							{/if}
						</div>
					{:else if setting.type === 'string'}
						<div class="sm:col-span-2">
							<Label for={setting.key} class="mb-2">{setting.description}</Label>
							{#if setting.values.length === 1}
								<Input
									type="text"
									id={setting.key}
									bind:value={formValues[setting.key].value}
									disabled={!(setting.enabled || forceEnableDisabledItems)}
									required={!setting.allow_empty}
								/>
							{:else}
								<Select
									class="mt-2"
									items={selectionItems(setting.key)}
									disabled={!(setting.enabled || forceEnableDisabledItems)}
									bind:value={formValues[setting.key].value}
								/>
							{/if}
						</div>
					{:else if setting.type === 'int'}
						<div class="sm:col-span-2">
							<Label for={setting.key} class="mb-2">{setting.description}</Label>
							<Input
								type="number"
								id={setting.key}
								bind:value={formValues[setting.key].value}
								disabled={!(setting.enabled || forceEnableDisabledItems)}
								required={!setting.allow_empty}
							/>
						</div>
					{:else if setting.type === 'float'}
						<div class="sm:col-span-2">
							<Label for={setting.key} class="mb-2">{setting.description}</Label>
							<Input
								type="number"
								step="0.1"
								id={setting.key}
								bind:value={formValues[setting.key].value}
								disabled={!(setting.enabled || forceEnableDisabledItems)}
								required={!setting.allow_empty}
							/>
							<Range
								id="{setting.key}-range"
								size="md"
								min="0"
								max={Math.max(defaultSettingNumberValue(setting.key) * 2, 5)}
								step="0.1"
								bind:value={formValues[setting.key].value}
								disabled={!(setting.enabled || forceEnableDisabledItems)}
							/>
						</div>
					{:else if setting.type === 'bool'}
						<div class="sm:col-span-2">
							<Label for={setting.key}>{setting.description}</Label>
							<Checkbox
								class="mb-2"
								bind:checked={formValues[setting.key].value}
								disabled={!(setting.enabled || forceEnableDisabledItems)}
								>有効化</Checkbox
							>
						</div>
					{/if}
				{/each}

				<div class="sm:col-span-2">
					<Button type="submit" class="w-full">設定ファイルを作成</Button>
				</div>
			</div>
		</form>
	</Section>
</div>
