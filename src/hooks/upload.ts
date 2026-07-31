import type { CollectionBeforeValidateHook } from 'payload'

const maxImageUploadSize = 5 * 1024 * 1024

type RequestWithUploadFile = {
  file?: {
    size?: number
  }
}

export const validateImageUploadSize: CollectionBeforeValidateHook = ({ req }) => {
  const file = (req as RequestWithUploadFile).file

  if (file?.size && file.size > maxImageUploadSize) {
    throw new Error('Image uploads must be 5MB or smaller.')
  }
}
