# image optimizer

画像をまとめて圧縮します。

完了と同時にBefore/Afterをブラウザで確認できます。

macOS専用。

## 対応形式

* png (pngquant)
* jpg (mozjpeg)
* gif (gifsicle)
* svg (svgo)

## How to use

最初だけ `init.command` を実行してください。

`source` の中へ圧縮したい画像を入れてください。

`start.command` を実行すると画像を圧縮しプレビューを表示します。

`dest` の中に圧縮した画像とオリジナル画像、プレビュー用html&css、圧縮情報の詰まったjsonが出力されます。

なお、`[プロセスが完了しました]` と表示されたらターミナルを終了してOKです。

## TODO

オプション設定をブラウザから行う
