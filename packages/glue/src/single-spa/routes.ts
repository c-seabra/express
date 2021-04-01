import { pathToActiveWhen } from 'single-spa';
import {
  ResolvedRouteChild,
  ResolvedRoutesConfig,
} from 'single-spa-layout/dist/types/isomorphic/constructRoutes';

type SubRoute = {
  name: string;
  type: string;
};

type AppRoute = {
  altPath?: string;
  default?: boolean;
  path: string;
  routes: SubRoute[];
  type: string;
};

const protoRootApps: AppRoute[] = [
  {
    default: true,
    path: 'demo',
    routes: [{ name: '@websummit-micro/frontend-demo', type: 'application' }],
    type: 'route',
  },
  {
    path: 'events',
    routes: [{ name: '@websummit-micro/events', type: 'application' }],
    type: 'route',
  },
];

const protoEventSpecificApps: AppRoute[] = [
  {
    default: true,
    path: 'demo',
    routes: [{ name: '@websummit-micro/frontend-demo', type: 'application' }],
    type: 'route',
  },
  {
    altPath: 'conferences/:conferenceId/tickets/support_dashboard',
    path: 'ticket-support',
    routes: [{ name: '@websummit-micro/ticket-support', type: 'application' }],
    type: 'route',
  },
  {
    altPath: 'conferences/:conferenceId/tickets/staff-tickets/micro',
    path: 'staff-tickets',
    routes: [{ name: '@websummit-micro/staff-tickets', type: 'application' }],
    type: 'route',
  },
  {
    altPath: 'conferences/:conferenceId/tickets/bulk-assign',
    path: 'bulk-assign',
    routes: [{ name: '@websummit-micro/bulk-assign', type: 'application' }],
    type: 'route',
  },
  {
    altPath: 'conferences/:conferenceId/investor_portal',
    path: 'investor-portal',
    routes: [{ name: '@websummit-micro/investor-portal', type: 'application' }],
    type: 'route',
  },
  {
    altPath: 'conferences/:conferenceId/calendar',
    path: 'calendar',
    routes: [{ name: '@websummit-micro/calendar', type: 'application' }],
    type: 'route',
  },
];

const protoApps: AppRoute[] = [...protoRootApps, ...protoEventSpecificApps];

const rootApps: AppRoute[] = protoApps
  .map((app: AppRoute) => {
    const variations = [
      app,
      {
        ...app,
        path: `~/${app.path}`,
      },
      {
        ...app,
        path: `~${app.path}`,
      },
      {
        ...app,
        path: `micro/${app.path}`,
      },
    ];
    if (app.altPath) {
      variations.push({
        ...app,
        path: app.altPath,
      });
    }
    return variations;
  })
  .reduce((acc, x) => acc.concat(x), []);

const eventSpecificApps: AppRoute[] = protoApps
  .map((app: AppRoute) => {
    const variations = [
      app,
      {
        ...app,
        path: `conferences/:conferenceId/~/${app.path}`,
      },
      {
        ...app,
        path: `conferences/:conferenceId/~${app.path}`,
      },
      {
        ...app,
        path: `conferences/:conferenceId/micro/${app.path}`,
      },
    ];
    if (app.altPath) {
      variations.push({
        ...app,
        path: app.altPath,
      });
    }
    return variations;
  })
  .reduce((acc, x) => acc.concat(x), []);

const allApps = [...rootApps, ...eventSpecificApps];

const nawElement = [
  {
    default: true,
    path: '/',
    routes: [
      { name: '@websummit-micro/summit-engine-nav', type: 'application' },
    ],
    type: 'route',
  },
];

type TopLevelLayout = {
  routes: AppRoute[];
};

const apps: TopLevelLayout[] = [
  {
    routes: nawElement,
  },
  {
    routes: allApps,
  },
].map((routeGroup) => {
  const appGroups = routeGroup.routes.map((app: AppRoute) => {
    return {
      ...app,
      /* eslint-disable */
      // @ts-ignore
      activeWhen: pathToActiveWhen(app.path || '/'),
      /* eslint-enable */
    };
  });
  return {
    routes: appGroups,
  };
});

const latchElement = document.getElementById('micro');

export const routes: ResolvedRoutesConfig = {
  base: '/',
  containerEl: latchElement || '#micro',
  mode: 'history',
  redirects: {},
  // the types here are a madness so we just force it :/
  routes: apps as Array<ResolvedRouteChild>,
};
