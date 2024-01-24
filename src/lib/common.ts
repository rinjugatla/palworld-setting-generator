import type { IPalworldServerSetting } from "$lib/types";
import type { SelectOptionType } from "flowbite-svelte";

/**
 * 複数の選択肢を取得
 * @param settingKey　設定キー
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