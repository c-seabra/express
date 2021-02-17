import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructLayoutEngine,
  constructRoutes,
} from 'single-spa-layout';

const routes = constructRoutes(
  document.querySelector('#single-spa-layout') as HTMLTemplateElement,
);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    // eslint-disable-next-line
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

// eslint-disable-next-line no-undef
const env: any = process.env;
const customProps = {
  test: 'testing',
  apiURL: env.API_URL,
  token: env.AUTH_TOKEN,
};

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
      ...customProps,
    };
  };
  registerApplication(app);
});
layoutEngine.activate();
start();
