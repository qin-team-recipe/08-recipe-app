

## モジュール設計
AtomicDesignは使わず、Alan AlickovicのBulletProofを参考にする


### 各フォルダの役割

| フォルダ名| 役割 | 備考 |
| ---- | ---- | ---- |
| app | NextJS13のやつ |  |
| components | アプリ全体で共通で使うコンポーネントを格納 |  |
| config | configファイル |  |
| features | 各ドメインに基づくコンポーネントを記載 | ※この中もフォルダ分けされているので後述 |
| layouts | ページごとに異なるレイアウトがある場合にレイアウトファイルを格納 | ※Next13だとappフォルダの中にlayout入るから後に消すかも |
| lib | 外部ライブラリの設定やwrap関数を格納 | こういうのを含むイメージしてます<br/>[たけゆさんのサンプルファイルより](https://github.com/qin-team-recipe/08-recipe-app/blob/43830d0d71c3ad01852fe65a227a755ba61b539e/src/server/trpc.ts) |
| provieders | アプリのproviderをまとめたファイルを格納  | providers/app.tsxのサンプルを見ると何をやっているかわかると思う |
| stores | global stateを格納する | Recoil使うなら下記役立ちそう<br/>[「3種類」で管理するReactのState戦略](https://zenn.dev/yoshiko/articles/607ec0c9b0408d) |
| testing | テストに関連するモック、ヘルパーやユーテリティ関数、設定などを格納 |  |
| types | features（各ドメイン）で使わない共通で使うTSの型ファイルを格納  |  |
| utils | ユーテリティ関数を格納する。ヘルパー関数とか |  |

### 上記のfeatures内のドメインごとのフォルダの役割

| フォルダ名| 役割 | 備考 |
| ---- | ---- | ---- |
| api | そのドメインのAPIコールやAPI | UI層は分けて再利用できるようにすること |
| components | そのドメインのコンポーネント |  |
| types | そのドメイン内で利用する型ファイル |  |
| index.ts | このapiやcomponentsやtypesのすべてのエントリーポイント※<br/>さすれば公開してよいコンポーネントかapiかわかるようになる | お試しで左記のためeslintrc.jsonでもindex.tsからしか読み込めないように設定中<br/>※Bob自身要理解深化 |


## 開発環境
### 構成
- 1.front:ホスト環境
- 2.DBとstorage:docker

### 構築方法
- 1.front:ホスト環境
    - .node-versionかpackage.jsonのvoltaに記載のnodeのバージョンの環境を利用すること
        - nodenvかvoltaでnodeのバージョンをスイッチできる環境を構築できる
        - [[参考]nodenvのインストールやnodeのバージョンスイッチ方法](https://qiita.com/282Haniwa/items/a764cf7ef03939e4cbb1)
        - [.node-versionにはこのプロジェクトで使用するNode.jsのバージョンが記述されているため、このフォルダに移動した時に、自動的にバージョンが切り替わる仕組み](https://qiita.com/tonkotsuboy_com/items/5322d226b6783d25b5df)
        - voltaは利用経験あるたけゆさんこーたろーさんが必要時相談
- 2.DBとstorage:docker（storageは微修正中）
    ```
    docker-compose up -d --build
    ```

- 3.その他設定
```
cp .env.sample .env
```

### アクセス・接続情報
- 1.front:ホスト環境
割愛
- 2.DBとstorage:docker（storageは微修正中）
下記以外の接続情報はdocker-compose.yml参照

|  | コンテナ名 | 接続情報 | 備考 |
| ---- | ---- | ---- | ---- |
|  DB(MySQL)  | db | PORT番号はdocker-compose.ymlのコンテナ「db」のports  |  |
|  Storage(MinIO)  | minio | [http://localhost:9001/](http://localhost:9001/) <br/> ログイン画面ではdocker-compose.ymlのコンテナ「minio」<br/>MINIO_ROOT_USER/MINIO_ROOT_PASSWORDを入力| 開発用バケットapp-recipeを初期生成させてその中にシェフ・レシピ画像をいくつか格納済 |

