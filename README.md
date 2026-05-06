# AQUA GALLERY

Discordにアップされた画像を水槽の中の生き物として表示するWebサイトです。
GitHub Pagesで無料公開できます。
https://hiroton09.github.io/aqua-gallery/

---

## ファイル構成

```
repository/
├── index.html               # メインページ
├── creatures.json           # 生き物データ一覧
├── css/
│   ├── base.css             # リセット・共通スタイル
│   ├── tank.css             # 水槽・背景・光・砂利
│   └── card.css             # カードフリップ
├── js/
│   ├── config.js            # ★設定（表示件数などここだけ変更）
│   ├── loader.js            # データ読み込み・整形
│   ├── card.js              # カード生成・フリップ
│   └── tank.js              # アニメーション・気泡
├── creatures/
│   ├── 001/
│   │   ├── front.jpg        # 表の画像
│   │   └── back.jpg         # 裏の画像
│   └── ...
└── .github/
    └── workflows/
        └── sync-discord.yml # Discord連携（後で実装）
```

---

## 表示件数の変更

`js/config.js` の `DISPLAY_LIMIT` を変更するだけです。

```js
const CONFIG = {
  DISPLAY_LIMIT: 30,  // ← この数字を変える
  ...
};
```

creatures.json の全データは削除されません。
新しい順に `DISPLAY_LIMIT` 件だけ表示されます。

---

## 画像の追加方法（手動）

1. `creatures/` 以下に次の連番フォルダを作成（例：`000004/`）
2. `front.jpg`（表の画像）と `back.jpg`（裏の画像）を配置
3. `creatures.json` に以下の形式でエントリを追加

```json
{
  "id": "000004",
  "discord_user": "ユーザー名",
  "added_at": "2026-05-05"
}
```

4. コミット & プッシュ → GitHub Pages が自動でデプロイ

---

## GitHub Pages の設定

1. リポジトリの Settings → Pages
2. Source を `Deploy from a branch` に設定
3. Branch を `main` / `(root)` に設定
4. 保存すると `https://<username>.github.io/<repository>/` で公開される

---

## Discord連携（後で実装）

`.github/workflows/sync-discord.yml` にコメントアウトで実装予定の内容を記載済みです。
