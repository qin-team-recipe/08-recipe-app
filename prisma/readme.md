# Prisma による DB の構築

## 1. テーブルの作成

```sh
pnpm prisma db push
```

## 2. 初期データの投入

```sh
pnpm prisma db seed
```

## 3. DB のリセット

```sh
pnpm prisma migrate reset --force --skip-seed
```

- Prisma で生成した全てのテーブルを強制的に削除する
  - スキーマ変更で整合性が取れなくなった場合も強制的に削除できる
- 現在の状態に関わらず、DB を初期状態に戻したい場合は、3 -> 1 -> 2 の順で実行すればよい

## 4. スキーマからの型生成

```sh
pnpm prisma generate
```

- Prisma がスキーマから型を自動生成する
  - VSCode で補完が効かない時に実行する
- prisma-kysely により Kysely 用の型も自動生成してくれる
