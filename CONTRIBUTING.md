# 作業ルール

この案件での作業方法を記載します。

開発環境についての詳細は[FOR_DEVELOPERS.md](./FOR_DEVELOPERS.md)を参照してください。

## 1. Gitの管理方法

### 1-1. コミットコメント

Emoji prefixを採用しています。
詳しくは[.gitmessage](./.gitmessage)を参照してください。

※ `.gitmessage`ファイルを認識するツールだとコメントルールテンプレートが利用できます（CLIやTortoise Gitなど）

### 1-2. ブランチ

GitHub Flowをベースにした運用フローを採用しています。

|ブランチ名|目的|備考|
|---|---|---|
|`production`|納品物|**作業厳禁。deployコマンドでしかコミットしない。**|
|`main`|開発版の最新バージョン（納品済み）|**作業厳禁**|
|`feature/*`|運用作業を実施する|Backlogのチケットと一致させるか、ブランチ名をBacklogの課題詳細に明記すること|
|`demo`|Nadeshikoに反映するためのブランチ|featureブランチをマージすると自動的にDEMOに反映されます|

**重要：** 作業を行う場合は、必ず`main`ブランチから`feature`ブランチを切ってから作業を行ってください。

#### ブランチの動きのイメージ

```
[develop branches]
demo              *-----------------3-------5
                 /                 /       /
feature/*        *-----------------2------4
                /                         \
main (Default)  1--------------------------6


[document root branch (unrelated history)]
production      *--------------------------7
```

1. mainブランチ（`git switch main`）
2. featureブランチを作成（`git switch -c feature/do-some-task`）・作業・コミット
3. demoブランチにマージ（`git switch demo` → `git merge feature/do-some-task`）
4. 追加作業。
5. 3と同様
6. featureを完了する（`git switch main` → `git merge feature/do-some-task`）、デプロイコマンド実行（`npm run deploy`）
7. 6番のコマンドによって自動的に生成されるコミット（納品物）

### DEMO環境への反映

`demo`ブランチに`feature`ブランチをマージするだけで、ナデシコに反映されます。

1. 公開したい`feature`ブランチを`demo`ブランチにマージします
<!-- TODO: パス変更 -->
2. 待つ（[GitLabで進捗が確認](/pipelines)できます）

## 3. 納品方法

`production`ブランチ用のローカルリポジトリを用意することをオススメします。
そのローカルブランチでは、ブランチ切り替えを行わないことがミスを防ぐうえで重要です。

1. `feature`ブランチを`main`ブランチにマージ・プッシュします
2. `main`ブランチで`deploy`コマンドを実行します
3. `production`ブランチでプルをします
4. 自分の納品コミット（差分）を抽出します

## 4. 公開領域と非公開領域

各サイトの「/example/**」を非公開領域と定義し、それ以外は公開領域として定義します。
実際には公開しない差分実装サンプルや実装テンプレート、テストファイルを公開領域にコミットしてはいけません。

必ず「/example/\*\*/sample/\*\*」に格納してください。

ディレクトリ構成については[FOR_DEVELOPERS.md](./FOR_DEVELOPERS.md)を参照してください。
