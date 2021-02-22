import { pathToActiveWhen, registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructLayoutEngine,
} from 'single-spa-layout';
import {
  ResolvedRoutesConfig,
  ResolvedUrlRoute,
} from 'single-spa-layout/dist/types/isomorphic/constructRoutes';

const apps: Array<ResolvedUrlRoute> = [
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
].map((app) => {
  return {
    ...app,
    activeWhen: pathToActiveWhen(app.path),
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

export function loadContainer(props: RequiredProps) {
  const applications = constructApplications({
    loadApp({ name }) {
      // eslint-disable-next-line
      return System.import(name);
    },
    routes,
  });
  const layoutEngine = constructLayoutEngine({ applications, routes });

  applications.forEach((app) => {
    // this is a bit of a hack till we figure out how to do this properly
    // its some magic to wrap the function in our own
    // and splice in the values we have
    const oldFunc = app.customProps;
    // eslint-disable-next-line no-param-reassign
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
