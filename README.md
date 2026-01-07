# Fire in the Garden

Web推理ゲーム（サウンドノベル形式）

## 🚀 クイックスタート

### プロトタイプを動かす

```bash
# プロジェクトルートで
python3 -m http.server 8000

# ブラウザで開く
# http://localhost:8000
```

詳細は [プロトタイプガイド](docs/PROTOTYPE_GUIDE.md) を参照

---

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

---

## 📚 ドキュメント

- [プロトタイプガイド](docs/PROTOTYPE_GUIDE.md) - ゲームの起動方法・動作確認
- [構造化ドキュメント](docs/STRUCTURE.md) - データモデルの詳細
- [素材配置ガイド](docs/ASSETS_GUIDE.md) - 素材の受け取りと配置方法

---

## ✨ 現在の実装状況

### 完成
✅ ドメインモデル層（characters, evidence, flags, scenarios）
✅ 素材管理プレビューツール
✅ Monogatariプロトタイプ（スタート〜第1章導入）
✅ キャラクター表示システム
✅ 選択肢分岐・フラグ管理

### 進行中
🚧 第1章の事情聴取シーン（5人中1人完成）
🚧 第2章のBITE!推理システム

### 今後
⏳ 第3章エピローグ
⏳ BGM/効果音の統合
⏳ セーブ/ロード機能
⏳ スマホ最適化
