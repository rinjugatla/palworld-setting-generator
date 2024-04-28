// パルワールドサーバ設定json
export interface IPalworldServerVersionSettings {
    version: string;
    server_setting_file_format: string;
    settings: IPalworldServerSettings;
}

export type IPalworldServerSetting = (BoolSetting | NumberSetting | StringSetting);
export type IPalworldServerSettings = IPalworldServerSetting[];

export interface BoolSetting {
    key: string;
    description: string;
    additional_info?: string;
    type: "bool";
    enabled: boolean;
    allow_empty: boolean;
    values: {
        value: boolean;
        defalut?: boolean;
        description?: string;
    }[];
}

export interface NumberSetting {
    key: string;
    description: string;
    additional_info?: string;
    type: "float" | "int";
    enabled: boolean;
    allow_empty: boolean;
    min?: number;
    max?: number;
    values: {
        value: number;
        defalut?: boolean;
        description?: string;
    }[];
}

export interface StringSetting {
    key: string;
    description: string;
    additional_info?: string;
    type: "planetext" | "string";
    enabled: boolean;
    allow_empty: boolean;
    values: {
        value: string;
        defalut?: boolean;
        description?: string;
    }[];
}

// その他
export interface FormValues {
    [key: string]: FormValue
}

export interface FormValue {
    key:  string;
    value: string | number | boolean;
    type: FormValueType;
    allow_empty: boolean;
    max?: number | null;
    min?: number | null;
}

export type FormValueType = "planetext" | "string" | "float" | "int" | "bool";

// フォームデザイン

/**
 * フォーム配置
 */
export interface IPalworldFormDesignSettings {
    version: string;
    places: IPalworldFormPlaceRowSettings[];
}

/**
 * フォーム配置 行内に何を表示するか
 */
export type IPalworldFormPlaceRowSettings = IPalworldFormFieldSetting[];

/**
 * フォーム設定 表示するフォーム
 */
export interface IPalworldFormFieldSetting {
    /**
     * 基本的に表示する設定キー
     */
    key?: string;
    /**
     * パスワード生成などを将来的に作りたい
     * normalの場合は設定キーに紐づく通常のフォームを表示
     */
    type: "normal" | "section";
    /**
     * sectionの場合は設定
     * 画面に表示する文字列
     */
    label?: string;
}
