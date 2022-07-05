# 開発者向け情報

## 1. 環境構築

以下のアプリケーション開発をおこなう環境へインストールします。

|App名|バージョン指定|インストール条件|備考|
|---|---|:-:|---|
|Node.js|[.node-version](./.node-version)を参照|必須|nodistを利用する場合は`npx`コマンドを利用可能にしておく必要があります|
|[Visual Studio Code](https://code.visualstudio.com/)||推奨|他のアプリケーションを利用する場合、後述するVS Codeの必須拡張と同等の機能を有する必要があります。|

## 1-1. Visual Studio Codeの拡張機能

|拡張名|インストール条件|
|---|:-:|
|[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)|必須|
|[editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)|必須|
|[stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)|必須|
|[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)||
|[Gremlins tracker](https://marketplace.visualstudio.com/items?itemName=nhoizey.gremlins)||
|[Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)||

## 2. 開発開始

### 2-1. 【初回のみ】node_modulesのインストール

```shell
npm ci
```

### 2-2. 開発開始

Nodeモジュールのインストール後に次のコマンドを実行すると、webpackによるファイルの監視が始まります。

```shell
npm start
```

## 3. 実装方法

本環境はejsでの実装をしています。
ページ追加時は[テンプレート](/src/ejs/example/templates)配下のものを使用してください。

## 4. 開発環境の構成

開発環境では、以下の処理を行っています。
EJSファイルのビルドには`11ty`、SCSSファイルのバンドルには`gulp`、JavaScriptのバンドルには`webpack`を使用しています。

- EJSファイルのビルド
- SCSSファイルのコンパイル
- TSファイルのバンドル出力

### 4-1. ディレクトリ構造

- `/src` - ビルド対象ファイル
- `/static` - 非ビルド対象ファイル
- `/public` - 公開される最終的なファイル（全ブランチでコミットしない）

開発リソース（SCSSファイル、TSファイル）は`/src/`配下に格納します。
基本的にこれらのリソースは、`/static/`配下に直接格納することはありません。

####  `/src/`配下ディレクトリ構成

|  ディレクトリ |  詳細  |
| ---- | ---- |
| sytles | SCSSファイルを格納するディレクトリ |
| ejs | ejsファイルを格納するディレクトリ |
| scripts | jsファイルを格納するディレクトリ |

####  構造については以下を参照

```
プロジェクトルート
├─src /** 圧縮する画像 / SCSSファイル / JSリソースを格納するディレクトリ **/
│  ├─ejs /** ejsファイルを格納するディレクトリルート。 **/
│  │  └─この配下に階層を保ったままejsを配置すると、その階層のままwebpackバンドルをかけて/public/配下にバンドル後のhtmlファイルを出力
│  └─assets
│     ├─scripts /** tsファイルを格納するディレクトリルート。 **/
│     │  └─この配下に階層を保ったままtsを配置すると、その階層のままwebpackバンドルをかけて/public/assets/配下にバンドル後のJSファイルを出力
│     └─styles /** SCSSファイルを格納するディレクトリルート。 **/
│        └─この配下に階層を保ったままSCSSを配置すると、その階層のままコンパイルをかけて/public/assets/配下にコンパイル後のcssを出力
├─static /* ビルドを通さない静的なファイルを管理します */
├─public /* ドキュメントルートディレクトリ */
│  └─階層を保ったままそれぞれのリソースが出力されます
```

#### 開発リソースの出力先

基本的に、`/src/`配下の各ディレクトリ（`/ts/`, `/scss/`）をルートとして、
`/public/`配下に階層を保ったまま出力します。

## 5. コマンド一覧

### 5.1 主要なコマンド一覧

よく使用するnpm scriptsです。必要に応じて使ってください。

|  コマンド  |  詳細  |
| ---- | ---- |
| `deploy` | 納品コマンドです。最終的なビルド結果を`production`ブランチにコミットします。 |
| `start` | 通常のビルドコマンドです。`src`配下の`Scss/JavaScript/ejs`をビルド、それぞれのファイルの変更を監視します。同時にローカルサーバーを立ち上げます。 |
| `build` | ビルド関連処理をまとめて実行します。 |
| `lint:html` | `src`配下のejsファイルに対して`ejs-lint`を実行します |
| `lint:css` | `src`配下のsassファイルに対して`stylelint`を実行します |
| `lint:js` | `src`配下のtsファイルに対して`eslint`を実行します |

## 5.2 部分的に実行するコマンド一覧

部分的に実行されるnpm scriptsです。必要に応じて使ってください。

|  コマンド  |  詳細  |
| ---- | ---- |
| `watch` | `src`配下のファイルの変更を監視します |
| `watch:server` | ローカルサーバーを立ち上げます |

