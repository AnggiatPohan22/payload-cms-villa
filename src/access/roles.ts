export type UserRole = 'super-admin' | 'admin' | 'editor'

type AccessUser = {
  id?: string | number
  role?: UserRole
}

export const getUser = (req: { user?: AccessUser | null }) => req.user

export const isSuperAdmin = (req: { user?: AccessUser | null }) => getUser(req)?.role === 'super-admin'

export const isAdmin = (req: { user?: AccessUser | null }) => {
  const role = getUser(req)?.role
  return role === 'super-admin' || role === 'admin'
}

export const isEditor = (req: { user?: AccessUser | null }) => {
  const role = getUser(req)?.role
  return role === 'super-admin' || role === 'admin' || role === 'editor'
}

export const isAuthenticated = (req: { user?: AccessUser | null }) => Boolean(getUser(req))

export const publishedOrAuthenticated = ({ req }: { req: { user?: AccessUser | null } }) => {
  if (isAuthenticated(req)) return true

  return {
    status: {
      equals: 'published',
    },
  }
}

export const authenticatedOnly = ({ req }: { req: { user?: AccessUser | null } }) => isAuthenticated(req)

export const adminsOnly = ({ req }: { req: { user?: AccessUser | null } }) => isAdmin(req)

export const superAdminsOnly = ({ req }: { req: { user?: AccessUser | null } }) => isSuperAdmin(req)

export const editorsCanWrite = ({ req }: { req: { user?: AccessUser | null } }) => isEditor(req)

export const adminsCanDelete = ({ req }: { req: { user?: AccessUser | null } }) => isAdmin(req)
