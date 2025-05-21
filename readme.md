mtmlファイルでtailwindのソートをprettierのプラグインとして実行するプラグインです。

* mtmlファイルの整形は行いません。
* class="" の内部にMTタグがある場合はソートしません。例：class="mx-auto text-lg <mt:Var name="test" />" の場合はソートしない
* 通常のプラグインと同様の利用法です。