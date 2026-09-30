# WEB制作 修正対応ルール

副業で制作・納品したサイトの修正依頼を Claude が対応するためのリポジトリ。
オーナーは最終確認（プルリクエストを見てマージ）だけを行う。

## サイトとフォルダの対応

| サイト | リポジトリ | さくらのサーバー | 公開URL |
|---|---|---|---|
| クオーレプラス（LUMINELLE） | `cuoreplus/textFile/` | `/home/aquaokapi50/www/cuoreplus/textFile/` | https://www.cuoreplus.com/ |
| 伊藤智子ピアノ教室 | `piano-ito/textFile/` | `/home/aquaokapi50/www/piano-ito/textFile/` | https://www.ito-tomoko-piano.com/ |

- 画像はサーバーの `www/<サイト>/data/` にあり、html からは
  `https://aquaokapi50.sakura.ne.jp/<サイト>/data/...` の絶対URLで参照している。
- 過去の画像はリポジトリに入っていない（サーバーにだけある）。新しく追加する画像だけをリポジトリに入れる。

## 修正の流れ

1. 依頼内容に沿って `claude/...` ブランチでファイルを修正する（主に `textFile/index.html`）。
2. main 向けのプルリクエストを作り、何を変えたかを日本語で短くまとめる。
3. オーナーが確認してマージすると、GitHub Actions（`.github/workflows/deploy.yml`）が
   変更されたファイルだけをさくらへ FTPS でアップロードする。

## ルール

- **画像は必ず WebP に変換してから使う。** 置き場所は `<サイト>/data/YY.MM.DD/`（作業日の日付フォルダ）。
  html には `https://aquaokapi50.sakura.ne.jp/<サイト>/data/YY.MM.DD/<ファイル名>.webp` と書く。
- PC用とスマホ用で画像が分かれている箇所（例：`top_img_wrapper_pc` / `top_img_wrapper_sp`）は両方直す。
  テキストも PC用・スマホ用（`_sp`）で二重に書かれていることが多いので両方直す。
- html 内で参照する画像が、サーバー上に存在するか（またはこのプルリクエストに含まれているか）を必ず確認する。
  サーバーに無い画像を参照すると公開後に表示されない。
- 既存ファイルの改行コード（CRLF）と文字コード（UTF-8）はそのまま保つ。
- 依頼の素材（写真など）はオーナーの Google ドライブ `01.WEB制作/<サイト名>/data/` にあることが多い。
- サーバーを直接（ファイルマネージャーで）編集した場合は、同じ変更をこのリポジトリにも入れる。
  入れないと、次のアップロードで古い内容に上書きされる。
