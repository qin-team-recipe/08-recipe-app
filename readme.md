


## 開発環境
### 構成
- 1.front:ホスト環境
- 2.DBとstorage:docker

### 構築方法
- 1.front:ホスト環境
    - .node-versionかpackage.jsonのvoltaに記載のnodeのバージョンの環境を利用すること
        - nodenvかvoltaでnodeのバージョンをスイッチできる環境を構築できる
        - [[参考]nodenvのインストールやnodeのバージョンスイッチ方法](https://qiita.com/282Haniwa/items/a764cf7ef03939e4cbb1)
        - voltaは利用経験あるたけゆさんこーたろーさんが必要時相談
- 2.DBとstorage:docker（storageは微修正中）
    ```
    docker-compose up -d --build
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
