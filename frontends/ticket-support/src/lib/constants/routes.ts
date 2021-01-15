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
// eslint-disable-next-line sort-keys
const ROUTES: Routes = {
  DASHBOARD: {
    isActive: false,
    meta: { description: 'Dashboard' },
    path: 'dashboard',
  },
  TICKET_CONFIGURATION: {
    hasChildren: true,
    isActive: false,
    meta: { description: 'Ticket configuration' },
    path: 'ticket-configuration',
  },
  DISCOUNTS: {
    hasChildren: true,
    isActive: false,
    meta: { description: 'Discounts' },
    path: 'discounts',
  },
  PRIVATE_SALES: {
    hasChildren: true,
    isActive: false,
    meta: { description: 'Private sales' },
    path: 'private-sales',
  },
  TICKET_ADMINISTRATION: {
    children: [
      {
        isActive: true,
        meta: { description: 'Manage tickets' },
        path: 'tickets',
      },
      {
        isActive: true,
        meta: { description: 'Manage orders' },
        path: 'orders',
      },
      {
        meta: { description: 'Upgrade' },
        path: 'upgrade',
      },
      {
        meta: { description: 'Cancellation and refunds' },
        path: 'cancellation-and-refunds',
      },
    ],
    hasChildren: true,
    isActive: true,
    meta: { description: 'Ticket administration' },
    path: 'ticket-administration',
  },
  REPORTS: {
    isActive: false,
    meta: { description: 'Reports' },
    path: 'reports',
  },
  CUSTOMISATION: {
    isActive: false,
    meta: { description: 'Customisation' },
    path: 'customisation',
  },
}

export default ROUTES
