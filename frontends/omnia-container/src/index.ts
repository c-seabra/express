import { routes } from '@websummit/glue/src/single-spa/routes';
import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructLayoutEngine,
} from 'single-spa-layout';

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
