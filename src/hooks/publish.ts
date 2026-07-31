import type { CollectionBeforeChangeHook, GlobalBeforeChangeHook } from 'payload'

export const setPublishMetadata: CollectionBeforeChangeHook = ({ data, req }) => {
  if (data.status === 'published' && !data.publishedAt) {
    data.publishedAt = new Date().toISOString()
  }

  if (req.user?.id) {
    data.updatedBy = req.user.id
  }

  return data
}

export const setGlobalPublishMetadata: GlobalBeforeChangeHook = ({ data, req }) => {
  if (data?.status === 'published' && !data.publishedAt) {
    data.publishedAt = new Date().toISOString()
  }

  if (data && req.user?.id) {
    data.updatedBy = req.user.id
  }

  return data
}
