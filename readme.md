## アーキテクチャと技術スタック

### アーキテクチャ

- [しまぶーさんの2023年5月に投稿のおすすめ完全サーバーレス構成](https://qinsalon.slack.com/archives/C01GKB8KPAS/p1683264818176499)
- 上記の補足でstorageについては技術未選定。画像はpublicに置くか納期直前の入手可能なサービスに応じて選定

### 技術スタック

- NextJS 13
- TailWindCSS
- UI Libarary
  - Radix color
- Kysely
- Prisma
- tRPC
- zod
- [Planet Scale](https://planetscale.com/)
- nodejs 18.16.0
  - Vercelの実行環境のnodeのバージョンに合わせるため
- パッケージ管理: pnpm

## モジュール設計

AtomicDesignは使わず、Alan AlickovicのBulletProofを参考にする

### 各フォルダの役割

| フォルダ名 | 役割                                                               | 備考                                                                                                                                                                                       |
| ---------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| app        | NextJS13のやつ                                                     |                                                                                                                                                                                            |
| components | アプリ全体で共通で使うコンポーネントを格納                         |                                                                                                                                                                                            |
| config     | configファイル                                                     |                                                                                                                                                                                            |
| features   | 各ドメインに基づくコンポーネントを記載                             | ※この中もフォルダ分けされているので後述                                                                                                                                                    |
| layouts    | ページごとに異なるレイアウトがある場合にレイアウトファイルを格納   | ※Next13だとappフォルダの中にlayout入るから後に消すかも                                                                                                                                     |
| lib        | 外部ライブラリの設定やwrap関数を格納                               | こういうのを含むイメージしてます<br/>[たけゆさんのサンプルファイルより](https://github.com/qin-team-recipe/08-recipe-app/blob/43830d0d71c3ad01852fe65a227a755ba61b539e/src/server/trpc.ts) |
| provieders | アプリのproviderをまとめたファイルを格納                           | providers/app.tsxのサンプルを見ると何をやっているかわかると思う                                                                                                                            |
| stores     | global stateを格納する                                             | Recoil使うなら下記役立ちそう<br/>[「3種類」で管理するReactのState戦略](https://zenn.dev/yoshiko/articles/607ec0c9b0408d)                                                                   |
| testing    | テストに関連するモック、ヘルパーやユーテリティ関数、設定などを格納 |                                                                                                                                                                                            |
| types      | features（各ドメイン）で使わない共通で使うTSの型ファイルを格納     |                                                                                                                                                                                            |
| utils      | ユーテリティ関数を格納する。ヘルパー関数とか                       |                                                                                                                                                                                            |

### 上記のfeatures内のドメインごとのフォルダの役割

| フォルダ名 | 役割                                                                                                                  | 備考                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| api        | そのドメインのAPIコールやAPI                                                                                          | UI層は分けて再利用できるようにすること                                                             |
| components | そのドメインのコンポーネント                                                                                          |                                                                                                    |
| types      | そのドメイン内で利用する型ファイル                                                                                    |                                                                                                    |
| index.ts   | このapiやcomponentsやtypesのすべてのエントリーポイント※<br/>さすれば公開してよいコンポーネントかapiかわかるようになる | お試しで左記のためeslintrc.jsonでもindex.tsからしか読み込めないように設定中<br/>※Bob自身要理解深化 |

## 開発環境

### 構築方法

1. ローカルのnodeのバージョンを.node-versionかpackage.jsonのvoltaに記載のnodeのバージョンに合わせる

- 参考情報
  - nodenvかvoltaでnodeのバージョンをスイッチできる環境を構築できる
  - [[参考]nodenvのインストールやnodeのバージョンスイッチ方法](https://qiita.com/282Haniwa/items/a764cf7ef03939e4cbb1)
  - [.node-versionにはこのプロジェクトで使用するNode.jsのバージョンが記述されているため、このフォルダに移動した時に、自動的にバージョンが切り替わる仕組み]

2. （pnpm未インストールなら）pnpmのインストール
3. フロントのパッケージインストール
   ```
   pnpm install
   ```
4. DB(Planet Scale)
   4.1. PlanetScaleのアカウント設定・DB作成
   - [[参考]PlanetScaleを利用すれば30秒でDBが作成できるんですか？](https://note.com/shift_tech/n/n9a6d2a6a0854)
     4.2. DBの接続URLを控えておくこと（.envに設定するため）
5. (任意）４のPlanetScaleを使わずにdockerでのDBとObjectStorageの立ち上げる場合
   ```
   docker-compose up -d --build
   ```
6. 環境変数設定  
   .envのコピー

   ```
   cp .env.sample .env
   ```

   .envの編集①DATABASE_URLに4のPlanetScaleの接続URLを設定

   ```
   # on PlanetScale
   DATABASE_URL=4.2でコピーしたPlanetScaleのURL
   ```

   .envの編集②DBでPlanetScale利用時に不要な設定をコメント

   ```
   下記をコメント

   # on Docker
   # DATABASE_URL="mysql://recipe08:password@localhost:3306/recipe"
   # KYSELEY_DB_DIALECT="mysql"
   ```

7. 立ち上げ
   ```
   pnpm run dev
   ```
8. DBのスキーマ登録

   ```
   #スキーマからの型生成
   pnpm prisma generate
   #DBのリセット
   pnpm prisma migrate reset --force --skip-seed
   #テーブル作成
   pnpm prisma db push
   ```

   prismaの利用方法の詳細は、[prisma/readme.md](https://github.com/qin-team-recipe/08-recipe-app/tree/main/prisma)に記載

9. DBのシード実行

   ```
   pnpm run seed
   ```

10. DBのシード反映確認

    ```
    pnpm prisma studio
    ```

### 構築方法5のdocker利用時のアクセス・接続情報

下記以外の接続情報はdocker-compose.yml参照

|                | コンテナ名 | 接続情報                                                                                                                                                   | 備考                                                                                                                                                           |
| -------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DB(MySQL)      | db         | PORT番号はdocker-compose.ymlのコンテナ「db」のports                                                                                                        |                                                                                                                                                                |
| Storage(MinIO) | minio      | [http://localhost:9001/](http://localhost:9001/) <br/> ログイン画面ではdocker-compose.ymlのコンテナ「minio」<br/>MINIO_ROOT_USER/MINIO_ROOT_PASSWORDを入力 | 開発用バケットapp-recipeを初期生成させてその中にシェフ・レシピ画像をいくつか格納済<br/>http://localhost:9000にオブジェクトのパスを叩けばアプリで取得表示できる |
