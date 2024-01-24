<script lang="ts">
	import { Section } from 'flowbite-svelte-blocks';
	import {
		Button,
		type SelectOptionType,
	} from 'flowbite-svelte';
	import { palworldServerSettings } from '$lib/palworld-server-serttings';
	import type { FormValues, IPalworldServerSetting, IPalworldServerSettings } from '$lib/types';
	import Title from '$lib/components/Title.svelte';
	import OfficialGuide from '$lib/components/OfficialGuide.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import ServerSettingOptions from '$lib/components/ServerSettingOptions.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PlanetextSetting from '$lib/components/form/PlanetextSetting.svelte';
	import StringSetting from '$lib/components/form/StringSetting.svelte';
	import IntSetting from '$lib/components/form/IntSetting.svelte';
	import FloatSetting from '$lib/components/form/FloatSetting.svelte';
	import BoolSetting from '$lib/components/form/BoolSetting.svelte';
	import SettingTextPreview from '$lib/components/SettingTextPreview.svelte';

	// フォーム
	let formElement: Element;
	// 無効化された項目を有効化
	let forceEnableDisabledItems = false;
	// 選択中のサーババージョン
	let selectedServerVersion: string;
	// 選択中のサーババージョンの設定
	let selectedSettings: IPalworldServerSettings;
	// フォームの入力値
	let formValues: FormValues = {};
	// サーバ設定ファイルテキスト
	let settingText: string;

	/**
	 * 最新のサーババージョン
	 */
	const latestServerVersion = (): string => {
		const latestVersion = palworldServerSettings[0].version;
		return latestVersion;
	};

	/**
	 * デフォルトの選択肢を取得
	 * @param settingKey 設定キー
	 */
	const defaultSettingValue = (settingKey: string) => {
		const setting = selectedSettings.filter((setting) => setting.key === settingKey)[0];
		const value = setting.values.filter((value) => value.defalut)[0].value;
		return value;
	};

	// リアクティブされないことがあるので再定義
	const initCurrentServerSettings = () => {
		selectedSettings = palworldServerSettings.filter(
			(settings) => settings.version === selectedServerVersion
		)[0].settings;
	};

	/**
	 * フォームの入力値を初期化
	 */
	const initFormValues = () => {
		formValues = {};
		selectedSettings.forEach((setting) => {
			formValues[setting.key] = {
				key: setting.key,
				value: defaultSettingValue(setting.key),
				type: setting.type,
				allow_empty: setting.allow_empty,
				max: formValueMax(setting),
				min: formValueMin(setting)
			};
		});
	};

	/**
	 * フォームの最小値
	 * @param setting 設定
	 */
	const formValueMin = (setting: IPalworldServerSetting): (null | number)=> {
		switch (setting.type) {
			case 'planetext':
			case 'string':
			case 'bool':
				return null
			case 'int':
			case 'float':
				const min = 'min' in setting ? setting.min! : 0;
				return min;
			default:
				return null;
		}
	}

	/**
	 * フォームの最小値
	 * @param setting 設定
	 */
	const formValueMax = (setting: IPalworldServerSetting): (null | number)=> {
		switch (setting.type) {
			case 'planetext':
			case 'string':
			case 'bool':
				return null
			case 'int':
			case 'float':
				const min = 'max' in setting ? setting.max! : null;
				return min;
			default:
				return null;
		}
}

	/**
	 * サーババージョンの変更
	 */
	const changedSelectVersion = (e: Event) => {
		initFormValues();
	};

	/**
	 * 設定ファイルを作成
	 */
	const generateSettingFile = () => {
		const fileName = 'PalWorldSettings.ini';
		const fileType = 'text/plain';

		const text = settingText;
		console.log(text);
		const blob = new Blob([text], { type: fileType });

		const tempA = document.createElement('a');
		tempA.download = fileName;
		tempA.href = URL.createObjectURL(blob);
		tempA.dataset.downloadurl = [fileType, tempA.download, tempA.href].join(':');
		tempA.style.display = 'none';
		document.body.appendChild(tempA);
		tempA.click();
		document.body.removeChild(tempA);
		setTimeout(function () {
			URL.revokeObjectURL(tempA.href);
		}, 1500);
	};

	/**
	 * 初期化
	 */
	const init = () => {
		selectedServerVersion = latestServerVersion();
		initCurrentServerSettings();
		initFormValues();
	};

	init();
</script>

<div class="m-5">
	<Section name="crudcreateform">
		<Title />
		<OfficialGuide />
		<Contact />
		<ServerSettingOptions 
			{palworldServerSettings} 
			bind:selectedServerVersion={selectedServerVersion} 
			bind:forceEnableDisabledItems={forceEnableDisabledItems} 
			on:changeSelectVersion={changedSelectVersion}/>

		<form bind:this={formElement} on:submit|preventDefault={generateSettingFile}>
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
				{#each selectedSettings as setting}
					{#if setting.type === 'planetext'}
						<PlanetextSetting {setting} {forceEnableDisabledItems} bind:formValue={formValues[setting.key]} />
					{:else if setting.type === 'string'}
						<StringSetting {setting} {forceEnableDisabledItems} bind:formValue={formValues[setting.key]} />
					{:else if setting.type === 'int'}
						<IntSetting {setting} {forceEnableDisabledItems} bind:formValue={formValues[setting.key]} />
					{:else if setting.type === 'float'}
						<FloatSetting {setting} {forceEnableDisabledItems} bind:formValue={formValues[setting.key]} />
					{:else if setting.type === 'bool'}
						<BoolSetting {setting} {forceEnableDisabledItems} bind:formValue={formValues[setting.key]} />
					{/if}
				{/each}

				<SettingTextPreview {selectedServerVersion} {selectedSettings} bind:settingText={settingText} {formValues} />

				<div class="sm:col-span-2">
					<Button type="submit" class="w-full">設定ファイルを作成</Button>
				</div>
			</div>
		</form>
	</Section>
	
	<Footer />
</div>
