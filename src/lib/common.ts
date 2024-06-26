import type { IPalworldServerSetting } from "$lib/types";
import type { SelectOptionType } from "flowbite-svelte";

/**
 * 複数の選択肢を取得
 * @param settingKey 設定キー
 */
export const selectionItems = (setting: IPalworldServerSetting): SelectOptionType<any>[] => {
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
export const defaultSettingValue = (setting: IPalworldServerSetting) => {
    const value = setting.values.filter((value) => value.defalut)[0].value;
    return value;
};

/**
 * フォームのテキストの色
 * 
 * デフォルト動作だと初期値で無効化されたLabelは有効化されても
 * 濃い色に戻らないのでここでフォームの状態によって色を調整する
 * @param setting: 設定
 * @param forceEnableDisabledItems 無効化された項目を強制的に有効化するか
 */
export const formLabelTextColor = (setting: IPalworldServerSetting, forceEnableDisabledItems: boolean) => {
    const textColor = !(setting.enabled || forceEnableDisabledItems) ? 'text-gray-400' : 'text-gray-900';
    return textColor;
}

/**
 * 非同期でテキストファイルを読み込み
 * @param file テキストファイル
 * @returns テキスト
 */
export const readAsTextAsync = (file: File): Promise<string> => {
    // Always return a Promise
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // Wait till complete
        reader.onloadend = function (e: any) {
        const content = e.target.result;
        resolve(content);
        };
        // Make sure to handle error states
        reader.onerror = function (e: any) {
            reject(e);
        };
        reader.readAsText(file);
    });
}