# Palworldサーバ設定生成ツール

## 公開中のサイト

[Palworldサーバ設定生成ツール](https://palworld-setting-generator.deno.dev/)

## 環境構築

```bash
# クローン
git clone https://github.com/rinjugatla/palworld-setting-generator.git

# 必要なパッケージのインストール
npm install

# 実行
npm run dev
# 実行するとローカルサーバが立つのでブラウザでアクセスします
# http://localhost:5173/ など

# ビルド
npm run build
```

## 設定

バージョン毎に存在する設定キーや設定値が異なります。\
設定一覧を[palworld-server-settings.json](src/lib/palworld-server-settings.json)にまとめています。

設定例

```json
[
    {
        "version": "0.1.3.0", // ゲームバージョン
        "server_setting_file_format": "; This configuration file is a sample of the default server settings.\n; Changes to this file will NOT be reflected on the server.\n; To change the server settings, modify Pal/Saved/Config/WindowsServer/PalWorldSettings.ini.\n[/Script/Pal.PalGameWorldSettings]\nOptionSettings=(:GENERATE_SETTINGS:)", 
        // 設定ファイル書式 :GENERATE_SETTINGS:をフォームの値で置き換え
        "settings": [
            {
                "key": "Difficulty", // 設定キー
                "description": "ゲームの難易度", // 説明
                "additional_info": "", // 補足説明
                "type": "planetext", // フォームタイプ
                "enabled": false, // デフォルトで有効化するか
                "allow_empty": false, // 空を許可するか
                "min": 10, // 最小値 数値系で指定
                "max": 50, // 最大値 数値系で指定
                "values": [
                    {
                        "value": "None", // 複数値を取る場合は複数定義
                        "defalut": true // デフォルトの値とするか
                    }
                ]
            }
        ]
    }
]
```
