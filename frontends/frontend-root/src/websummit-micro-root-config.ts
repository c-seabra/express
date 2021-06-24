import { routes } from '@websummit/glue/src/single-spa/routes';
import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructLayoutEngine,
} from 'single-spa-layout';

// console.log(JSON.stringify(routes));
const applications = constructApplications({
  loadApp({ name }) {
    // eslint-disable-next-line
    return System.import(name);
  },
  routes,
});
const layoutEngine = constructLayoutEngine({ applications, routes });

// eslint-disable-next-line no-undef
const { env } = process;
const customProps = {
  apiURL: env.API_URL,
  test: 'testing',
  token: env.AUTH_TOKEN,
};

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
      ...customProps,
    };
  };
  registerApplication(app);
});
layoutEngine.activate();
start({ urlRerouteOnly: true });
