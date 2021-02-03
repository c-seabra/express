export type Route = {
  children?: Route[]
  hasChildren?: boolean
  isActive?: boolean
  meta?: {
    description?: string
  }
  path: string
}

export type Routes = {
  [routeName: string]: Route
}
// Order is important here for rendering purpose
const ROUTES: Routes = {
  DASHBOARD: {
    isActive: true,
    meta: { description: 'Dashboard' },
    path: '/',
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  SETTINGS_ADMIN: {
    hasChildren: false,
    isActive: true,
    meta: { description: 'Settings' },
    path: 'settings',
  },
}

export default ROUTES
