# image optimizer

画像をまとめて圧縮します。

完了と同時にプレビュー用htmlも作るので見やすいです。

macOS専用。

## 依存

* Homebrew
    * 入ってない場合はターミナルに→をコピペして実行 `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
* Node.js v6以上
    * 入ってない場合はターミナルに→をコピペして実行 `brew install node`

## 対応形式

* png (pngquant)
* jpg (mozjpeg)
* gif (gifsicle)
* svg (svgo)

## How to use

初回利用時のみ `init.command` を実行してください。

`source` の中へ圧縮したい画像を入れてください。

`start.command` を実行すると画像を圧縮しプレビューを表示します。

`dest` の中に圧縮した画像とオリジナル画像(`_source` へ出力します)、プレビュー用html&css、圧縮情報の詰まったjsonを出力します。

なお、`[プロセスが完了しました]` と表示されたらターミナルを終了してOKです。

## 小ネタ

* プレビュー時に透過画像は背景を白で塗りつぶして表示しています。
* 設定は `config.js` でやってます。

## TODO

オプション設定をブラウザから行う
