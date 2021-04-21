export type Route = {
  children?: Route[];
  hasChildren?: boolean;
  isActive?: boolean;

  meta?: {
    description?: string;
  };
  path: string;
};

export type Routes = Route[];
// Order is important here for rendering purpose
// eslint-disable-next-line sort-keys
const ROUTES: Routes = [
  {
    isActive: false,
    meta: { description: 'Home' },
    path: '~Home',
  },
  {
    hasChildren: false,
    isActive: true,
    meta: { description: 'Events configuration' },
    path: '~events#/',
  },
  {
    children: [
      {
        isActive: true,
        meta: { description: 'Manage tickets' },
        path: '~ticket-support/#/tickets',
      },
      {
        isActive: true,
        meta: { description: 'Manage orders' },
        path: '~ticket-support/#/orders',
      },
      {
        isActive: false,
        meta: { description: 'Upgrade' },
        path: '~ticket-support/#/upgrade',
      },
      {
        isActive: false,
        meta: { description: 'Cancellation and refunds' },
        path: '~ticket-support/#/cancellation-and-refunds',
      },
    ],
    hasChildren: true,
    isActive: true,
    meta: { description: 'Ticket administration' },
    path: '~ticket-support/tickets',
  },
  {
    children: [
      {
        isActive: true,
        meta: { description: 'Sale cycles' },
        path: '~ticket-management/#/sale-cycles',
      },
      {
        isActive: true,
        meta: { description: 'Ticket categories' },
        path: '~ticket-management/#/ticket-categories',
      },
      {
        isActive: true,
        meta: { description: 'Ticket types' },
        path: '~ticket-management/#/ticket-types',
      },
      {
        isActive: true,
        meta: { description: 'Packages' },
        path: '~ticket-management/#/packages',
      },
    ],
    hasChildren: true,
    isActive: true,
    meta: { description: 'Ticket configuration' },
    path: '~ticket-management#/',
  },
  {
    isActive: false,
    meta: { description: 'Reports' },
    path: '~reports',
  },
];

export default ROUTES;
