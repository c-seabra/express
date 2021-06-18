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

  const addHeadLink = (url: string, rel: string, linkType = '') => {
    const link = document.createElement('link');
    link.type = linkType;
    link.rel = rel;
    link.href = url;
    document.head.appendChild(link);
  };
  // Inject fonts and icon styles into the doc head
  addHeadLink('https://fonts.gstatic.com', 'preconnect');
  addHeadLink(
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'stylesheet',
  );
  addHeadLink('https://use.typekit.net/vst7xer.css', 'stylesheet');
  addHeadLink(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'stylesheet',
  );

  // Active Single Spa Layout and start
  layoutEngine.activate();
  start({ urlRerouteOnly: true });

  // Add some styles for the micro conatiner into the doc head
  const microCss = '#micro { margin: 0 auto; }';
  const styleTag = document.createElement('style');
  styleTag.appendChild(document.createTextNode(microCss));
  document.head.appendChild(styleTag);

  // Overide the Omnia Dashboard conatiner padding
  const dashboardElement = document.querySelector('.dashbard-1');
  if (dashboardElement) dashboardElement.style.cssText = 'padding: 0';

  // Append all single spa apps to the micro container div
  window.addEventListener('single-spa:routing-event', () => {
    // Select and move single spa apps to container in order
    const target = document.getElementById('micro');
    const singleSPAs = document.querySelectorAll(
      "[id^='single-spa-application:']",
    );
    const singleSPANav = document.querySelector(
      '[id="single-spa-application:@websummit-micro/summit-engine-nav"]',
    );
    // Append spaNav to container
    if (singleSPANav) {
      target?.appendChild(singleSPANav);
    }
    // Append other spas to container
    singleSPAs.forEach((singleSPAElement) => {
      const singleSPAId = ((singleSPAElement as unknown) as {
        attributes: Array<{ value: string }>;
      }).attributes[0].value;
      if (
        singleSPAId !==
        'single-spa-application:@websummit-micro/summit-engine-nav'
      ) {
        target?.appendChild(singleSPAElement);
      }
    });
  });
}
