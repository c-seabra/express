# micro
Repo to hold all of our shared libs and micro frontends.
In this repo we will mainly be using [single-spa](https://single-spa.js.org/docs/getting-started-overview) but you could also host any other application you wish.

# Project info
- this repo will contain multiple micro frontends that can all be deployed individually
- each of the `frontends/yourMicroFrontend` will be deployed using github actions to s3 bucket
- these deployed builds can then be used in two different ways
  - for `build-standalone` its going to be used similarly as displayed in `frontends/react-app-build-usage-example.html`
  - for `build` you will require single-spa container app to mount your application using [Root Config](https://single-spa.js.org/docs/configuration)
- you are more than welcome to use any framework/library you wish for your application as long as it result in compiled JavaScript

# Creating new project
- navigate to `/frontends` 
- run `npx create-single-spa`
- pick `parcel`
- pick whatever project setup you need - react, angular, vue, typescript/no typescript etc
- company name - `WebSummit`
- copy webpack.config.build.js from `frontends/bulk-assign` to allow for a standalone build without single-spa