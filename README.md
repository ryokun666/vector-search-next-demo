# ベクトル検索デモアプリケーション

このアプリケーションは、テキストのベクトル検索機能を実装したデモアプリケーションです。Next.js、OpenAI API、PineconeDB を使用して構築されています。

## 機能

- テキストの登録：入力されたテキストをベクトル化してデータベースに保存
- ベクトル検索：入力されたクエリに意味的に近いテキストを検索
- 類似度表示：検索結果の類似度をパーセンテージで表示

## 必要な環境

- Node.js 18.0.0 以上
- npm または yarn
- OpenAI API キー
- Pinecone API キー

## セットアップ方法

1. リポジトリのクローン

```bash
git clone https://github.com/[ユーザー名]/vector-search-next-demo.git
cd vector-search-next-demo
```

2. 依存パッケージのインストール

```bash
npm install
# または
yarn install
```

3. 環境変数の設定
   `.env.local`ファイルを作成し、以下の環境変数を設定してください：

```
OPENAI_API_KEY="your-api-key"
PINECONE_API_KEY="your-api-key"
PINECONE_ENVIRONMENT="your-environment"
PINECONE_INDEX_NAME="your-index-name"
```

4. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。

## 使い方

1. テキストの登録

   - 「テキストの登録」セクションにテキストを入力
   - 「登録」ボタンをクリックしてデータベースに保存

2. テキストの検索
   - 「テキストの検索」セクションに検索したいテキストを入力
   - 「検索」ボタンをクリックして類似テキストを検索
   - 検索結果が類似度と共に表示されます

## 技術スタック

- [Next.js](https://nextjs.org/) - React フレームワーク
- [OpenAI API](https://openai.com/) - テキストのベクトル化
- [Pinecone](https://www.pinecone.io/) - ベクトルデータベース

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
