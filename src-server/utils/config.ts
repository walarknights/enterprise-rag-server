export const SITE_NAME = process.env.SITE_NAME || '企业知识库'
export const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || 'dev-secret-change-me'
export const PORT = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000
export const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`
export const TRUSTED_ORIGINS = (process.env.TRUSTED_ORIGINS || SERVER_URL)
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)
export const DB_PATH = process.env.DB_PATH || './data/app.db'
export const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads'
