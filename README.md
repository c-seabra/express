# micro
Repo to hold all of our shared libs and micro frontends

# Creating new project
- navigate to `/frontends` 
- run `npx create-single-spa`
- pick `parcel`
- pick whatever project setup you need - react, angular, vue, typescript/no typescript etc
- company name - `WebSummit`
- if you need to use this app outside of the single-spa container copy webpack.config.build.js from `frontends/bulk-assign`
  - this newly generated build can be then deployed/uploaded to s3 and used similarly as displayed in `frontends/react-app-build-usage-example.html`