<script lang="ts">
	import { Section } from 'flowbite-svelte-blocks';
	import {
		Button,
		type SelectOptionType,
	} from 'flowbite-svelte';
	import { palworldServerSettings } from '$lib/palworld-server-serttings';
	import { palworldFormDesignSettings } from '$lib/form-design-settings';

	import type { FormValues, IPalworldServerSetting, IPalworldServerSettings, 
		IPalworldFormDesignSettings, IPalworldFormPlaceRowSettings } from '$lib/types';
	import Title from '$lib/components/Title.svelte';
	import OfficialGuide from '$lib/components/OfficialGuide.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import ServerSettingOptions from '$lib/components/ServerSettingOptions.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SettingTextPreview from '$lib/components/SettingTextPreview.svelte';
	import DownloadSettingFile from '$lib/components/DownloadSetting.svelte';
	import SettingRow from '$lib/components/form/SettingRow.svelte';
	import SettingSection from '$lib/components/form/SettingSection.svelte';

	// フォーム
	let downloadElement: DownloadSettingFile;
	// 無効化された項目を有効化
	let forceEnableDisabledItems = false;
	// 設定キーを表示するか
	let showSettingKey = false;
	// 選択中のサーババージョン
	let selectedServerVersion: string;
	// 選択中のサーババージョンの設定
	let selectedSettings: IPalworldServerSettings;
	// フォームの入力値
	let formValues: FormValues = {};
	// サーバ設定ファイルテキスト
	let settingText: string;
	//　選択中のサーババージョンのフォームデザイン
	let selectedFormDesignSettings: IPalworldFormPlaceRowSettings[];

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
		selectedFormDesignSettings = palworldFormDesignSettings.filter(
			(settings) => settings.version === selectedServerVersion
		)[0].places;
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
			bind:showSettingKey={showSettingKey}
			bind:formValues={formValues}
			on:changeSelectVersion={changedSelectVersion}/>

		<form on:submit|preventDefault={() => {downloadElement.downloadSetting()}}>
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
				{#each selectedFormDesignSettings as row}
					<SettingRow formPlaceRow={row} {selectedSettings} {forceEnableDisabledItems} {showSettingKey} bind:formValues={formValues}/>
				{/each}

				<SettingTextPreview {selectedServerVersion} {selectedSettings} bind:settingText={settingText} {formValues} />

				<DownloadSettingFile {settingText} bind:this={downloadElement}/>
			</div>
		</form>
	</Section>
	
	<Footer />
</div>
