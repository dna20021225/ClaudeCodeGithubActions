# Claude Code GitHub Actions Demo

このプロジェクトは、Claude CodeとGitHub Actionsの連携をテストするためのデモアプリケーションです。

## 機能

- Express.jsを使ったシンプルなWebサーバー
- 基本的なAPI エンドポイント（/, /health, /echo）
- Jestを使ったユニットテスト
- ESLintとPrettierによるコード品質管理
- GitHub ActionsによるCI/CDパイプライン

## API エンドポイント

### GET /
メインエンドポイント。アプリケーションの基本情報を返します。

```json
{
  "message": "Hello from Claude Code GitHub Actions Demo!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### GET /health
ヘルスチェックエンドポイント。アプリケーションの状態を返します。

```json
{
  "status": "healthy",
  "uptime": 123.456
}
```

### POST /echo
エコーエンドポイント。送信されたデータをそのまま返します。

```json
{
  "message": "Echo endpoint",
  "received": { "your": "data" },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## セットアップ

1. 依存関係をインストール：
```bash
npm install
```

2. アプリケーションを起動：
```bash
npm start
```

3. テストを実行：
```bash
npm test
```

4. コードを整形：
```bash
npm run format
```

5. Lintを実行：
```bash
npm run lint
```

## GitHub Actions

このプロジェクトには以下のワークフローが含まれています：

### CI/CD Pipeline (`.github/workflows/ci.yml`)

- **Test Job**: Node.js 16.x, 18.x, 20.xでのテスト実行
- **Build Job**: プロダクションビルドとヘルスチェック
- **Security Job**: npm auditによるセキュリティチェック

ワークフローは以下のタイミングで実行されます：
- `main`または`master`ブランチへのpush
- `main`または`master`ブランチへのPull Request

## 開発

このプロジェクトでは以下のツールを使用しています：

- **Express.js**: Webフレームワーク
- **Jest**: テストフレームワーク
- **ESLint**: コード品質チェック
- **Prettier**: コードフォーマッター
- **GitHub Actions**: CI/CDパイプライン

## Claude Codeでの使用方法

1. GitHubリポジトリを作成してこのコードをpush
2. GitHub Actionsが自動的に実行されることを確認
3. Claude Codeを使ってコードを編集・改善
4. 変更をcommit・pushしてCIパイプラインをテスト

## ライセンス

MIT