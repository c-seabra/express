export type Route = {
  children?: Route[];
  hasChildren?: boolean;
  isActive?: boolean;
  meta?: {
    description?: string;
  };
  path: string;
};

export type Routes = {
  [routeName: string]: Route;
};
// Order is important here for rendering purpose
const ROUTES: Routes = {
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  DASHBOARD: {
    isActive: true,
    meta: { description: 'Dashboard' },
    path: '/dashboard',
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  INVESTOR_PERMISSIONS: {
    isActive: true,
    meta: { description: 'Investor Permissions' },
    path: '/investor_permissions',
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  SETTINGS_ADMIN: {
    hasChildren: false,
    isActive: true,
    meta: { description: 'Settings' },
    path: '/settings',
  },
};

export default ROUTES;
