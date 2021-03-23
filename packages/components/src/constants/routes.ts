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
// eslint-disable-next-line sort-keys
const ROUTES: Routes = {
  CUSTOMISATION: {
    isActive: false,
    meta: { description: 'Customisation' },
    path: 'customisation',
  },
  DASHBOARD: {
    isActive: false,
    meta: { description: 'Dashboard' },
    path: 'dashboard',
  },
  DISCOUNTS: {
    isActive: false,
    meta: { description: 'Discounts' },
    path: 'discounts',
  },
  EVENT_CONFIGURATION: {
    hasChildren: false,
    isActive: true,
    meta: { description: 'Events configuration' },
    path: '/',
  },
  PRIVATE_SALES: {
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
        path: '/tickets',
      },
      {
        isActive: true,
        meta: { description: 'Manage orders' },
        path: '/orders',
      },
      {
        isActive: false,
        meta: { description: 'Upgrade' },
        path: 'upgrade',
      },
      {
        isActive: false,
        meta: { description: 'Cancellation and refunds' },
        path: 'cancellation-and-refunds',
      },
    ],
    hasChildren: true,
    isActive: true,
    meta: { description: 'Ticket administration' },
    path: 'tickets',
  },
  TICKET_CONFIGURATION: {
    hasChildren: true,
    isActive: false,
    meta: { description: 'Ticket configuration' },
    path: 'ticket-configuration',
  },
};

export default ROUTES;
