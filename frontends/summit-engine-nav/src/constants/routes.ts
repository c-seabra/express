export type Route = {
  children?: Route[];
  conferenceSpecific?: boolean;
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
    conferenceSpecific: false,
    isActive: false,
    meta: { description: 'Home' },
    path: '~Home',
  },
  {
    conferenceSpecific: false,
    hasChildren: false,
    isActive: true,
    meta: { description: 'Events configuration' },
    path: '~events#/',
  },
  {
    children: [
      {
        conferenceSpecific: true,
        isActive: true,
        meta: { description: 'Manage tickets' },
        path: '~ticket-support/#/tickets',
      },
      {
        conferenceSpecific: true,
        isActive: true,
        meta: { description: 'Manage orders' },
        path: '~ticket-support/#/orders',
      },
    ],
    conferenceSpecific: true,
    hasChildren: true,
    isActive: true,
    meta: { description: 'Ticket administration' },
    path: '~ticket-support/tickets',
  },
  {
    children: [
      {
        conferenceSpecific: true,
        isActive: true,
        meta: { description: 'Sale cycles' },
        path: '~ticket-management/#/sale-cycles',
      },
      {
        conferenceSpecific: true,
        isActive: true,
        meta: { description: 'Ticket categories' },
        path: '~ticket-management/#/ticket-categories',
      },
      {
        conferenceSpecific: true,
        isActive: true,
        meta: { description: 'Ticket types' },
        path: '~ticket-management/#/ticket-types',
      },
      {
        conferenceSpecific: true,
        isActive: true,
        meta: { description: 'Deals' },
        path: '~ticket-management/#/deals',
      },
      // DO NOT REMOVE: Will be used when tags can be updated in ticket type
      // {
      //   conferenceSpecific: true,
      //   isActive: true,
      //   meta: { description: 'Benefits & permissions' },
      //   path: '~ticket-management/#/tags',
      // },
    ],
    conferenceSpecific: true,
    hasChildren: true,
    isActive: true,
    meta: { description: 'Ticket configuration' },
    path: '~ticket-management#/',
  },
  {
    children: [
      {
        conferenceSpecific: true,
        isActive: true,
        meta: { description: 'Staff tickets' },
        path: '~staff-tickets',
      },
      {
        conferenceSpecific: true,
        isActive: true,
        meta: { description: 'Bulk assign' },
        path: '~bulk-assign',
      },
    ],
    conferenceSpecific: true,
    hasChildren: true,
    isActive: true,
    meta: { description: 'Bulk operations' },
    path: '~staff-tickets',
  },
  {
    conferenceSpecific: true,
    isActive: false,
    meta: { description: 'Reports' },
    path: '~reports',
  },
];

export default ROUTES;
