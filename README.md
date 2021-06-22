# Micro

<!-- 
This readme uses an extension to automatically generate a table of content, no configuration required:
Name: Markdown All in One
Id: yzhang.markdown-all-in-one
Description: All you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more)
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one
-->

- [Micro](#micro)
  - [Introduction](#introduction)
  - [Quick start](#quick-start)
    - [One time credentials setup](#one-time-credentials-setup)
    - [How to run things](#how-to-run-things)
  - [Concepts and architecture](#concepts-and-architecture)
    - [Lerna](#lerna)
    - [References](#references)
  - [Creating a single-spa micro frontend](#creating-a-single-spa-micro-frontend)
    - [1. Initialise with Single-spa CLI](#1-initialise-with-single-spa-cli)
    - [2. Amend package.json start command](#2-amend-packagejson-start-command)
    - [3. Add version value](#3-add-version-value)
    - [4. Add reference to import map](#4-add-reference-to-import-map)
    - [5. Add namespace to babel config](#5-add-namespace-to-babel-config)
    - [6. Install dependencies and test](#6-install-dependencies-and-test)
  - [Creating Component and Library Packages](#creating-component-and-library-packages)
    - [1. Create a new package within the package directory](#1-create-a-new-package-within-the-package-directory)
    - [2. Copy build scripts, dependencies and npm commands](#2-copy-build-scripts-dependencies-and-npm-commands)
    - [3. Add package path to TypeScript path configuration.](#3-add-package-path-to-typescript-path-configuration)
    - [4. Add your package as a dependency and test](#4-add-your-package-as-a-dependency-and-test)

## Introduction

`micro` is a micro frontend monorepo containing the complete set of component parts to construct a Websummit Front End.

This project uses Lerna to manage the monorepo and handle deployment and local dependency management.

It uses single-spa and related concepts to enable development and deployment of independent, framework agnostic micro frontends, within a host application.

In addition, it also contains supporting packages, including UI components and libs, to allow developer to easily develop and share code across the micro frontends.

## Quick start

### One time credentials setup

We have an `.env.example` file that you can copy as `.env` to set some environment variables.

There variables are shared between all micro frontends. Currently we use:
* `AUTH_TOKEN` this is your admin auth token you get from omnia, it determines the active conference, your user permissions and is valid for either staging or production. There are a few prefixed environment variables that you can use to save different tokens and cycle between them.
* `API_URL` this is the url pointing to the catalyst that you want to use. There are prefixed examples for production and sandbox that you can copy, or you point it to your local setup as needed.

### How to run things

There are a few commands that are interesting depending on what you want to accomplish. Here is a summary of them:
* `yarn start` this will get you a fully featured local development environment under http://localhost:9000/demo with hot reloading. It will first install yarn packages, then build shared packages, then start all microfrontends and a thin root container that hosts them all, supporting individual hot reloading, debugging etc. of each micro frontend.
* `yarn start:omnia` this will build static assets of all micro frontends and then host them in a simulated S3 bucket and run a thin omnia optimized container on http://localhost:9337 that can be used as `PUBLIC_MICRO_URL` for a local `avenger` setup. This does not enable hot reloading of micro frontends, so you will have to rebuild on changes, but allows you to test everything in the context of omnia in a production like setup.
* `yarn pretty` This runs our formatter to auto format your code before you commit it
* `yarn fix` this runs eslint to fix code style issues and do things like auto sorting and simple transformations of code
* `yarn ready` runs both formatter and linter in a neat package (this is also added as a pre-commit git-hook for your convenience)
* `yarn check` runs our build/compile steps that check for typescript errors, then if they succeds runs formatter/linter. This is the all in one package if you want to be sure this passes ci
* `yarn test` runs our test suite to ensure everything still works
* `yarn test:watch` runs only the tests for code you changed and keeps rereunning them as you edit files
* `yarn codegen` runs our graphql code generation pipeline that updates the types of the `graphql` package with any new queries/mutations you added and backend changes
* `yarn clean` in case you need to start fresh, in practice rarely needed

## Concepts and architecture

### Lerna

**Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.**

Use of this repository requires a fundamental understanding of how lerna works and the cli. For the full list of commands see [GitHub - lerna/lerna: A tool for managing JavaScript projects with multiple packages.](https://github.com/lerna/lerna#readme)

It is important to understand the principal concept, that Lerna manages package installations and commands across the repo. Therefore to avoid unforeseen issues it is recommended to run commands via the Lerna CLI at the root level.

Lerna provides a simple set of commands and filtering options to make this as simple as possible. I(particular the scope filter. For example, to add a package dependency (either local or external) to a package within the monorepo, run the command from the root level e.g

`lerna add @someco/somepackage —scope @websummit-micro/targetpackage -D`

Which will add `@someco/somepackage` as a dev dependency to `@websummit-micro/targetpackage`

### References

This repository relies heavily on the following resources:

https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559
https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680

And for some additional information on single-spa both within a lerna repo and standalone, see

https://github.com/tsukhu/single-spa-portal-monorepo
https://github.com/tsukhu?tab=repositories&q=single-spa&type=&language=

## Creating a single-spa micro frontend

Before beginning - ensure a basic understanding of the concepts and technologies used:
[Single Spa Documentation](https://single-spa.js.org/docs/getting-started-overview)

### 1. Initialise with Single-spa CLI

To create a new single-spa application, use the single-spa CLI. Because the CLI will run a `yarn` command as part of the setup, ensure that you run the CLI from the project root., in order that lerna and yarn can manage the dependencies at root level.

To begin run

`npx create-single-spa`

The CLI will next prompt you to enter a directory for the new project. New micro frontends should be created within the app folder and follow the naming convention consistently, as the application names are used in the wildcard selectors for running top level lerna commands. e.g :

`./frontends/[appname]`

At the next prompt choose `single-spa-application/parcel`
You will then be prompted to select a frontend framework e.g React, VueJS etc and then to select whether to use Yarn or NPM as the package manager and whether to use Typescript.

The choice of frontend framework is optional, as is the use of Typescript (though recommended). However it is important that **Yarn is the chosen package manager**, as this needs to match the lerna configuration, in order for sym-linking and local package management to work.

When promoted for the organisation name, note: the organisation name is used for the scope. In order to differentiate between micro-frontends and packages within the repo the scope needs to be different, therefore, for micro frontends please use:

`websummit-micro`

and when prompted for the app name, please maintain consistency with the folder name e.g.

`[appname]`

When the CLI is complete there are a couple of steps and amendments to be made to fully integrate the micro-frontend into the workflow.

### 2. Amend package.json start command

Firstly, when the single-spa CLI runs it initiates each micro-frontend in it’s own repository. This conflicts with the monorepo approach therefore you will need to delete the `.git` folder from inside the micro-frontend.

Next in order that the micro-frontend can be run alongside other micro-frontends and is accessible to the host application in local development, we need to manually mange which port the micro-frontend is served from. The host app runs on port 9000 and each subsequent micro-frontend runs incrementally e.g `9001`, `9002` etc. In the package.json start command for your micro-frontend please add:

`”start”: “webpack serve —port 900[x]”`

Where `[x]` is the next incremented port number.

### 3. Add version value

In order for lerna and yarn workspaces to manage the shared dependencies, each package.json needs to include a version number. Otherwise it will be ignored when running root level lerna/yarn commands. The single-spa CLI does not add a version field to the package.json when initialising. Therefore it is necessary to manually add this value to the package.json file of the new micro-frontend e.g.

`”version”: “1.0.0”`

### 4. Add reference to import map

The next step is to add the reference for the micro-frontend to the import map in the single-spa host. To do this, open:

`./frontends/frontend-root/src/index.ejs`

And add the local development url with the appropriate incremented port number to the import map:

```
 <% if (isLocal) { %>
  <script type="systemjs-importmap">
    {
      "imports": {
        "@single-spa/welcome": "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js",
        "@websummit-micro/root-config": "//localhost:9000/websummit-root-config.js",
        "@websummit-micro/frontend-demo": "//localhost:9001/websummit-micro-frontend-demo.js",
        "@websummit-micro/frontend-tickets": "//localhost:9002/websummit-micro-frontend-tickets.js"
		"@websummit-micro/[appname]": "//localhost:900[x]/websummit-micro-[appname].js"
	  }
    }
  </script>
  <% } %>
```

You can then render and view your micro-frontend by adding a further reference to it anywhere inside the index.ejs markup file using the single-spa layout engine and `<application>` tags. e.g.

```
<application name=“@websummit-micro/ticket-support”></application>
```

### 5. Add namespace to babel config

NOTE: if you are using styled components within a react micro frontend, in order to avoid CSS selector clashes with duplicate classnames in other microfrontends, it is required to have a babel configuraiton with a namespace specified. This namespace will be used as a classname prefix for all styled components in the micro frontend. For more information check the [styled components plugin documentation](https://styled-components.com/docs/tooling#namespace)

### 6. Install dependencies and test

When all the previous steps are completed, form the root of your application, run `yarn`

This should manage and bootstrap any dependencies

You can now test your micro frontend by running `yarn start:single-spa` from the root.

## Creating Component and Library Packages

Lerna and Yarn workspaces enable us to create packages which can be shared and used within the mono-repo as if they were npm packages when working locally.

### 1. Create a new package within the package directory

First browse to the packages directory

`cd packages`

Create a directory for your package

`mkdir [somepackage]`

Then browse into your new directory and run `yarn init`
When prompted, ensure that you name your package with the correct scope e.g.

`@websummit/[somepackage]`

Ensure you add the version number and set ‘private’ to true when prompted. When promoted for an app entry point add `dist/index`

### 2. Copy build scripts, dependencies and npm commands

There are two existing example packages in the packages directory, one contains a React component ui kit , one a simple vanilla JS lib-example which exports a number. In each case you can see that the package.json files contain the following build scripts, which are in turn called by the lerna commands in the root level package.json. Therefore, ensure that your new component includes the same commands and dependencies:

```
“scripts”: {
    “build”: “yarn run clean && yarn run compile”,
    “clean”: “rimraf -rf ./dist”,
    “compile”: “tsc -p tsconfig.build.json”,
    “prepublishOnly”: “yarn run build”,
    “test”: “yarn run build”
  },
  “devDependencies”: {
    “rimraf”: “~3.0.2”,
    “typescript”: “~4.1.0”
  }
```

In addition, create a `tsconfig.json` file with the following contents:

```
{
  "extends": "../../tsconfig.json"
}
```

And a `tsconfig.build.json` file with the following contents:

```
{
  “extends”: “../../tsconfig.build.json”,

  “compilerOptions”: {
    “outDir”: “./dist”
  },

  “include”: [
    “src/**/*”
  ]
}
```

The examples above are for a vanilla javascript package. If using React or another framework you will need to add to the tsconfig files accordingly. These configs ensure that the packages are linked to the root configs for a consistent build.

### 3. Add package path to TypeScript path configuration.

In the root `tsconfig.json` file, ensure that there is a mapping to your package in the paths configuration:

```
“paths”: {
      “@websummit/components”: [“packages/components/src”],
      “@websummit/ws-lib-example”: [“packages/ws-lib-example/src”]
    },
```

Note: these can be wild carded e.g.

`”websummit/*”: [“packages/*/src”]`

### 4. Add your package as a dependency and test

To use your package as a dependency elsewhere in the mono repo it is necessary to add it to the package.json of the consuming package. In order for Lerna and yarn to manage the symlinking necessary to consume local unpublished packages, this action should be initiated from the root using the lerna CLI and the scope filter. To test your packager in the example react app run the following.

`lerna add @websummit/[somepackage] —scope @websummit-micro/create-react-app-example`

Then you can call your package code as you would any npm package, update it and see changes immediately.
