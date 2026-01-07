# Fire in the Garden

Web推理ゲーム（サウンドノベル形式）

## プロジェクト構成

```
fire-in-the-garden/
├── src/
│   ├── domain/           # ドメインモデル層（エンジン非依存）
│   │   ├── characters.json
│   │   ├── scenarios.json
│   │   ├── evidence.json
│   │   ├── flags.json
│   │   └── assets-mapping.json  # 素材とシナリオの紐付け
│   └── adapters/         # エンジン固有実装
│       └── monogatari/
├── assets/               # 画像・音声素材
│   ├── characters/       # 立ち絵
│   ├── backgrounds/      # 背景
│   ├── ui/              # UI素材
│   ├── bgm/             # BGM
│   └── sfx/             # 効果音
└── tools/                # 開発ツール
    └── preview.html      # 素材プレビューツール
```

## 素材管理の仕組み

素材ファイルは `assets/` に配置するだけ。
どのシーンで使うかは `src/domain/assets-mapping.json` で後から設定可能。

プレビュー: `tools/preview.html` をブラウザで開く

## 開発フロー

1. 素材を `assets/` に配置
2. `assets-mapping.json` で割り当て
3. `preview.html` で確認
4. 問題なければコミット
