// パルワールドサーバ設定json
export interface IPalworldServerVersionSettings {
    version: string;
    settings: IPalworldServerSettings;
}

export type IPalworldServerSettings = (BoolSetting | NumberSetting | StringSetting)[];

export interface BoolSetting {
    key: string;
    description: string;
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
    type: "float" | "int";
    enabled: boolean;
    allow_empty: boolean;
    values: {
        value: number;
        defalut?: boolean;
        description?: string;
    }[];
}

export interface StringSetting {
    key: string;
    description: string;
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
}

export type FormValueType = "planetext" | "string" | "float" | "int" | "bool";