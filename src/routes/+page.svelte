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
		Alert,
		Textarea
	} from 'flowbite-svelte';
	import { palworldServerSettings } from '$lib/palworld-server-serttings';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
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
				name: value.description as string
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

	/**
	 * デフォルトの値を取得(論理値用)
	 * @param settingKey 設定キー
	 */
	const defaultSettingBoolValue = (settingKey: string): boolean => {
		const value = defaultSettingValue(settingKey);
		const typed = value as boolean;
		return typed;
	};



	// フォーム
	let formElement: Element;
	// 無効化された項目を有効化
	let forceEnableDisabledItems = false;
	// 選択中のサーババージョン
	let selectedServerVersion: string;
	// 選択中のサーババージョンの設定
	let selectedVersionSettings: IPalworldServerSettings;
	// フォームの入力値
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

	/**
	 * フォームの入力値を初期化
	 */
	const initFormValues = () => {
		formValues = {};
		selectedVersionSettings.forEach((setting) => {
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

		const text = createServerSettingFileText();
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

	let serverSettingFileText = '';
	$: {
		// 変更検知のため読み出し
		formValues;

		serverSettingFileText = createServerSettingFileText();
	}
	/**
	 * フォームの設定値からサーバの設定用テキストを作成(prefixを合わせた内容)
	 */
	const createServerSettingFileText = (): string => {
		const settingFormat = selectedServerSettingFormat();
		const formText = createFormSettingText();
		const serverSettingText = settingFormat.replace(':GENERATE_SETTINGS:', formText);
		return serverSettingText;
	};

	/**
	 * フォームの設定値からサーバ設定用のテキストを作成(値部分)
	 */
	const createFormSettingText = (): string => {
		const formatedValues: string[] = [];
		// フォーム入力値は辞書型で順不同なので順番を保証する
		selectedVersionSettings.forEach((value) => {
			const formValue = formValues[value.key];
			let formated = '';
			// TODO: FormValueをinterfaceからclassにしてclass側でフォーマットする
			switch (formValue.type) {
				case 'planetext':
					// 書式: key=planetext
					formated = formValue.value.toString();
					break;
				case 'string':
					// 書式: key="string"
					formated = `\"${formValue.value.toString()}\"`;
					break;
				case 'int':
					// 書式: key=123
					const intNumber = Math.trunc(Number(formValue.value));
					formated = intNumber.toString();
					break;
				case 'float':
					// 書式: key=1.000000
					const floatNumber = parseFloat(formValue.value as string);
					formated = floatNumber.toFixed(6);
					break;
				case 'bool':
					// 書式: key:True
					const bool = formValue.value as boolean;
					formated = bool ? 'True' : 'False';
					break;
				default:
					console.warn('未対応');
					break;
			}

			formatedValues.push(`${formValue.key}=${formated}`);
		});

		const text = formatedValues.join(',');
		return text;
	};

	/**
	 * 選択中のサーババージョンのサーバ設定書式
	 */
	const selectedServerSettingFormat = () => {
		const format = palworldServerSettings.filter(
			(settings) => settings.version === selectedServerVersion
		)[0].server_setting_file_format;
		return format;
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
				{#each selectedVersionSettings as setting}
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

				<div class="sm:col-span-2">
					<Label for="server-setting-text m-2">設定ファイルテキスト</Label>
					{#if Object.values(formValues).filter(value => value.allow_empty === false && value.value === '').length > 0 || 
						Object.values(formValues).filter(value => value.max != null && Number(value.value) > value.max).length > 0 || 
						Object.values(formValues).filter(value => value.min != null && value.min > Number(value.value)).length > 0}
						<Alert color="yellow" border>
							<InfoCircleSolid slot="icon" class="w-4 h-4" />
							設定値が不正です。必須項目の確認と入力可能な範囲を超えた数値がないか確認してください。
						</Alert>	
					{:else}
						<Textarea
							id="server-setting-text"
							rows="15"
							bind:value={serverSettingFileText}
							readonly
							/>	
					{/if}
				</div>

				<div class="sm:col-span-2">
					<Button type="submit" class="w-full">設定ファイルを作成</Button>
				</div>
			</div>
		</form>
	</Section>
	
	<Footer />
</div>
