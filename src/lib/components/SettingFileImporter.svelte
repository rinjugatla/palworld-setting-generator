<script lang="ts">
	import { Dropzone, Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { readAsTextAsync } from '$lib/common';
	import type { FormValues } from '$lib/types';

	/**
	 * フォームの入力値
	 */
	export let formValues: FormValues;

	/**
	 * デフォルトの設定ファイル名
	 */
	const settingFilename = 'PalWorldSettings.ini';
	/**
	 * 設定ファイルの読み込みを行ったか
	 */
	let isLoadedSettinfFIle = false;

	/**
	 * 設定ファイルから
	 * @param file
	 */
	const updateSettingFileParameters = async (file: File) => {
		if ((file === null) | (file === undefined)) {
			return;
		}

		const pairs = await analyzeSettingFile(file);
		for (const key in pairs) {
			const hasKey = key in formValues;
			if (!hasKey) {
				continue;
			}

			const value = pairs[key];
			switch (formValues[key].type) {
				case 'planetext':
				case 'string':
					formValues[key].value = value;
					break;
				case 'bool':
					// 単純にBoolean(value)するとすべてtrueになるので注意
					formValues[key].value = JSON.parse(value.toLowerCase());
					break;
				case 'int':
				case 'float':
					// 1.0000を1に補正
					formValues[key].value = Number(value.toString());
				default:
			}
		}

		isLoadedSettinfFIle = true;
	};

	/**
	 * 設定ファイルを解析
	 * @param file 設定ファイル
	 */
	const analyzeSettingFile = async (file: File) => {
		if (file === null) {
			return;
		}

		const text = await readAsTextAsync(file);
		const parameterText = getParameterText(text);
		const parameterPairs = getParameterKeyValuePairs(parameterText);
		return parameterPairs;
	};

	/**
	 * 設定ファイルから設定テキスト全体を取得
	 * [/Script/Pal.PalGameWorldSettings]
	 * OptionSettings=(Difficult...の
	 * Difficult...から最後の)前までのテキスト
	 * @param settingFileText 設定ファイル全体
	 */
	const getParameterText = (settingFileText: string) => {
		const pattern = /=\((?<parameters>.*?)\)/;
		const match = settingFileText.match(pattern);
		if (!match) {
			return null;
		}

		const text = match.groups['parameters'];
		return text;
	};

	/**
	 * 設定テキストからパラメータ部分を取得
	 * @param parameterText 設定テキスト
	 */
	const getParameterKeyValuePairs = (parameterText: string) => {
		const regex = new RegExp(
			'((?<key>[a-zA-Z_]+)="?(?<value>.*?)"?,|(?<key_last>[a-zA-Z_]+)="?(?<value_last>.*?)"?$)',
			'g'
		);

		const pairs: { [key: string]: string } = {};
		let match;
		while ((match = regex.exec(parameterText)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (match.index === regex.lastIndex) {
				regex.lastIndex++;
			}

			const key = match.groups['key'] ?? match.groups['key_last'];
			const value = match.groups['value'] ?? match.groups['value_last'];

			pairs[key] = value;
		}

		return pairs;
	};

	/**
	 * D&Dでファイル読み込み
	 * @param event
	 */
	const dropHandle = async (event: DropEvent) => {
		event.preventDefault();

		let settingFile: File = null;
		if (event.dataTransfer.items) {
			[...event.dataTransfer.items].forEach((item, i) => {
				if (item.kind !== 'file') {
					return;
				}
				if (settingFile != null) {
					return;
				}

				settingFile = item.getAsFile();
			});
		} else {
			[...event.dataTransfer.files].forEach((file, i) => {
				if (settingFile != null) {
					return;
				}

				settingFile = file;
			});
		}

		if (settingFile === null) {
			return;
		}

		await updateSettingFileParameters(settingFile);
	};

	/**
	 * ファイル選択でファイル読み込み
	 * @param event
	 */
	const handleChange = async (event: Event) => {
		const files = event.target.files;
		if (files.length === 0) {
			return;
		}

		await updateSettingFileParameters(files[0]);
	};
</script>

<div class="m-2">
	{#if isLoadedSettinfFIle}
		<div class="mb-2">
			<Alert color="green" border dismissable={isLoadedSettinfFIle}>
				<InfoCircleSolid slot="icon" class="h-4 w-4" />
				設定ファイルの読み込みが完了しました。
			</Alert>
		</div>
	{/if}
	<Dropzone
		id="dropzone"
		on:drop={async (e) => {
			await dropHandle(e);
		}}
		on:dragover={(e) => {
			e.target.value = '';
			isLoadedSettinfFIle = false;
			e.preventDefault();
		}}
		on:click={(e) => {
			e.target.value = '';
			isLoadedSettinfFIle = false;
		}}
		on:change={async (e) => {
			await handleChange(e);
		}}
		defaultClass="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
	>
		<svg
			aria-hidden="true"
			class="mb-3 h-10 w-10 text-gray-400"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
			/></svg
		>
		<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
			<span class="font-semibold">Click to upload</span> or drag and drop
		</p>
		<p class="text-xs text-gray-500 dark:text-gray-400">{settingFilename}</p>
	</Dropzone>
</div>
