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
    meta: { description: 'Customisation' },
    path: '~customisation',
  },
  {
    isActive: false,
    meta: { description: 'Dashboard' },
    path: '~dashboard',
  },
  {
    isActive: false,
    meta: { description: 'Discounts' },
    path: '~discounts',
  },
  {
    hasChildren: false,
    isActive: true,
    meta: { description: 'Events configuration' },
    path: '~events#/',
  },
  {
    isActive: false,
    meta: { description: 'Private sales' },
    path: '~private-sales',
  },
  {
    isActive: false,
    meta: { description: 'Reports' },
    path: '~reports',
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
    hasChildren: true,
    isActive: false,
    meta: { description: 'Ticket configuration' },
    path: '~events/ticket-configuration',
  },
];

export default ROUTES;
