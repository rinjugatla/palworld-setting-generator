<script lang="ts">
	import { Button } from "flowbite-svelte";
	import type { EventHandler } from "svelte/elements";

    /**
     * 生成された設定ファイルテキスト
     */
    export let settingText: string;

    /**
	 * 設定ファイルをダウンロード
	 */
	export const downloadSetting = () => {
		const fileName = 'PalWorldSettings.ini';
		const fileType = 'text/plain';

		const text = settingText;
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
</script>

<div class="sm:col-span-2">
    <Button type="submit" class="w-full">設定ファイルを作成</Button>
</div>