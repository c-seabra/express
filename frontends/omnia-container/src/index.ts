import { pathToActiveWhen, registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructLayoutEngine,
} from 'single-spa-layout';
import { ResolvedRoutesConfig } from 'single-spa-layout/dist/types/isomorphic/constructRoutes';

const allApps = [
  {
    default: true,
    path: 'test',
    routes: [{ name: '@single-spa/welcome', type: 'application' }],
    type: 'route',
  },
  {
    path: 'demo',
    routes: [{ name: '@websummit-micro/frontend-demo', type: 'application' }],
    type: 'route',
  },
  {
    path: 'events',
    routes: [{ name: '@websummit-micro/events', type: 'application' }],
    type: 'route',
  },
  {
    path: 'ticket-support',
    routes: [{ name: '@websummit-micro/ticket-support', type: 'application' }],
    type: 'route',
  },
  {
    path: 'staff-tickets',
    routes: [{ name: '@websummit-micro/staff-tickets', type: 'application' }],
    type: 'route',
  },
  {
    path: 'bulk-assign',
    routes: [{ name: '@websummit-micro/bulk-assign', type: 'application' }],
    type: 'route',
  },
  {
    path: 'investor-portal',
    routes: [{ name: '@websummit-micro/investor-portal', type: 'application' }],
    type: 'route',
  },
].flatMap((app) => {
  return [
    app,
    {
      ...app,
      path: `~/${app.path}`,
    },
    {
      ...app,
      path: `micro/${app.path}`,
    },
  ];
});

const apps: Array<any> = [
  {
    routes: [
      {
        default: true,
        path: '/',
        routes: [
          { name: '@websummit-micro/frontend-demo', type: 'application' },
        ],
        type: 'route',
      },
    ],
  },
  {
    routes: allApps,
  },
].map((routeGroup) => {
  const appGroups = routeGroup.routes.map((app) => {
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

const routes: ResolvedRoutesConfig = {
  base: '/',
  containerEl: '#micro',
  mode: 'history',
  redirects: {},
  routes: apps,
};

export type RequiredProps = {
  apiURL: string;
  token: string;
};

export default function loadContainer(props: RequiredProps) {
  const applications = constructApplications({
    loadApp({ name }) {
      /* eslint-disable */
      // @ts-ignore
      return System.import(name);
      /* eslint-enable */
    },
    routes,
  });
  const layoutEngine = constructLayoutEngine({ applications, routes });

  applications.forEach((app) => {
    // this is a bit of a hack till we figure out how to do this properly
    // its some magic to wrap the function in our own
    // and splice in the values we have
    const oldFunc = app.customProps;
    // eslint-disable-next-line no-param-reassign,func-names
    app.customProps = function (e, n) {
      const existing = oldFunc instanceof Function ? oldFunc(e, n) : oldFunc;
      return {
        ...existing,
        ...props,
      };
    };
    registerApplication(app);
  });
  layoutEngine.activate();
  start();
}
