export interface KnowledgeBase {
  id: string
  name: string
  description: string
  isDefault: boolean
  createdAt: number
  documentCount?: number
}

export interface DocumentInfo {
  id: string
  knowledgeBaseId: string
  name: string
  originalName: string
  ext: string
  mimeType: string
  size: number
  language: string
  createdAt: number
}

export interface DocumentFull extends DocumentInfo {
  content: string
}

export interface SearchResult {
  id: string
  name: string
  knowledgeBaseId: string
  knowledgeBaseName: string
  snippet: string
  /** 文档详情接口路径 */
  url: string
}

export interface Provider {
  id: string
  name: string
  baseUrl: string
  hasApiKey?: boolean
  enabled: boolean
  createdAt: number
}

export interface Model {
  id: string
  providerId: string
  name: string
  label: string
  isDefault: boolean
  createdAt: number
  providerName?: string
}

export interface GlobalSettings {
  defaultModelName: string | null
  defaultKnowledgeBaseId: string | null
}

export interface PublicConfig {
  siteName: string
  hasAdmin: boolean
}
