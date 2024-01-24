<script lang="ts">
    import { palworldServerSettings } from '$lib/palworld-server-serttings';
	import type { FormValues, IPalworldServerSettings } from "$lib/types";
	import { Alert, Label, Textarea } from "flowbite-svelte";
	import { InfoCircleSolid } from "flowbite-svelte-icons";

    /**
     * 選択中のサーババージョン
     */
    export let selectedServerVersion: string;
    /**
     * 選択中のサーババージョン
     */
    export let selectedSettings: IPalworldServerSettings;
    /**
     * 設定テキスト
     */
    export let settingText = "";
    /**
     * フォームの入力値
     */
    export let formValues: FormValues;

    $: {
        // 変更検知のため読み出し
        formValues;

        settingText = updateServerSettingText();
    }

    /**
	 * フォームの設定値からサーバの設定用テキストを作成(prefixを合わせた内容)
	 */
	const updateServerSettingText = (): string => {
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
		selectedSettings.forEach((value) => {
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
</script>


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
            bind:value={settingText}
            readonly
            />	
    {/if}
</div>