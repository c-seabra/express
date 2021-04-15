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

  const addHeadLink = (url: string, linkType: string, rel: string) => {
    const link = document.createElement('link');
    link.type = linkType;
    link.rel = rel;
    link.href = url;
    document.head.appendChild(link);
  };
  // Inject fonts and icon styles into the doc head
  addHeadLink('https://fonts.gstatic.com', '', 'preconnect');
  addHeadLink(
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    '',
    'stylesheet',
  );
  addHeadLink('https://use.typekit.net/vst7xer.css', '', 'stylesheet');
  addHeadLink(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '',
    'stylesheet',
  );

  // Active Single Spa Layout and start
  layoutEngine.activate();
  start();

  // Append all single spa apps to the micro container div
  window.addEventListener('single-spa:routing-event', () => {
    const target = document.getElementById('micro');
    const allSpas = document.querySelectorAll(
      "[id^='single-spa-application:']",
    );
    const spaNav = document.querySelector(
      '[id="single-spa-application:@websummit-micro/summit-engine-nav"]',
    );
    // Append spaNav to container
    target?.appendChild(spaNav);
    // Append other spas to container
    allSpas.forEach((el) => {
      if (
        el.attributes[0].id !==
        'single-spa-application:@websummit-micro/summit-engine-nav'
      )
        target?.appendChild(el);
    });
  });
}
