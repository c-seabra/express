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

const summitEngineNav = {
  name: '@websummit-micro/summit-engine-nav',
  type: 'application',
};

function appFor(name: string, nav?: SubRoute): SubRoute[] {
  const routes = [];
  if (nav) {
    routes.push(nav);
  }
  const app = { name: `@websummit-micro/${name}`, type: 'application' };
  routes.push(app);
  return routes;
}

const protoRootApps: AppRoute[] = [
  {
    default: true,
    path: 'demo',
    routes: appFor('frontend-demo', summitEngineNav),
    type: 'route',
  },
  {
    path: 'ticket-management',
    routes: appFor('ticket-management', summitEngineNav),
    type: 'route',
  },
  {
    path: 'events',
    routes: appFor('events', summitEngineNav),
    type: 'route',
  },
];

const protoEventSpecificApps: AppRoute[] = [
  {
    default: true,
    path: 'demo',
    routes: appFor('frontend-demo', summitEngineNav),
    type: 'route',
  },
  {
    altPath: 'conferences/:conferenceId/tickets/support_dashboard',
    path: 'ticket-support',
    routes: appFor('ticket-support', summitEngineNav),
    type: 'route',
  },
  {
    altPath: 'conferences/:conferenceId/tickets/staff-tickets/micro',
    path: 'staff-tickets',
    routes: appFor('staff-tickets', summitEngineNav),
    type: 'route',
  },
  {
    altPath: 'conferences/:conferenceId/tickets/bulk_assignments',
    path: 'bulk-assign',
    routes: appFor('bulk-assign', summitEngineNav),
    type: 'route',
  },
  {
    altPath: 'conferences/:conferenceId/investor_portal',
    path: 'investor-portal',
    routes: appFor('investor-portal'),
    type: 'route',
  },
  {
    altPath: 'conferences/:conferenceId/calendar_admin',
    path: 'calendar-admin',
    routes: appFor('calendar-admin'),
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

type TopLevelLayout = {
  routes: AppRoute[];
};

const apps: TopLevelLayout[] = [
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
