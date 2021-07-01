import { routes } from '@websummit/glue/src/single-spa/routes';
import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructLayoutEngine,
} from 'single-spa-layout';

const applications = constructApplications({
  loadApp({ name }) {
    console.log(name, name.length)
    // eslint-disable-next-line
    return System.import(name).then(application => {
      // Verify that this object has the lifecycle functions on it.
      // If compiling with webpack and consuming in-browser with SystemJS, consider
      // setting webpack's output.libraryTarget to "system".
      console.log(application)
      console.log(JSON.stringify(application))
      return application as import('single-spa').Application;
    });
  },
  routes,
});
const layoutEngine = constructLayoutEngine({ applications, routes });

const customProps = {
  apiURL: process.env.API_URL,
  test: 'testing',
  token: process.env.AUTH_TOKEN,
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
