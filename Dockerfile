FROM node:18-alpine AS base

# pnpmをインストール
RUN npm install -g pnpm

# 依存関係を必要なときだけインストール
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.jsonとpnpm-lock.yamlをコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# 必要なときだけソースコードをビルド
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.jsのテレメトリーを無効化したい場合は以下の行をアンコメント
# ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm build

# 本番環境用のイメージを作成し、Next.jsを実行
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# ランタイム中にテレメトリーを無効化したい場合は以下の行をアンコメント
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# prerenderキャッシュのパーミッションを正しく設定
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 出力トレースを自動的に活用してイメージサイズを削減
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# ホスト名をlocalhostに設定
ENV HOSTNAME "0.0.0.0"

# server.jsはnext buildによってstandalone出力から作成されます
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
