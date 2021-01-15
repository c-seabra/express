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

const ROUTES: Routes = {
  CUSTOMISATION: {
    isActive: false,
    meta: { description: 'Customisation' },
    path: 'customisation',
  },
  DASHBOARD: {
    isActive: false,
    path: 'dashboard',
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
  REPORTS: {
    isActive: false,
    meta: { description: 'Reports' },
    path: 'reports',
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
  TICKET_CONFIGURATION: {
    hasChildren: true,
    isActive: false,
    meta: { description: 'Ticket configuration' },
    path: 'ticket-configuration',
  },
}

export default ROUTES
