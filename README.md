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
      - [**The magic command to get it all running**](#the-magic-command-to-get-it-all-running)
      - [Other interesting commands that are more situational](#other-interesting-commands-that-are-more-situational)
  - [Concepts and architecture](#concepts-and-architecture)
    - [Lerna](#lerna)
  - [Adding a new dependency to a micro frontend](#adding-a-new-dependency-to-a-micro-frontend)
  - [Creating a single-spa micro frontend](#creating-a-single-spa-micro-frontend)
    - [1. Copy from an existing frontend](#1-copy-from-an-existing-frontend)
    - [2. Amend package.json start command](#2-amend-packagejson-start-command)
    - [3. Add reference to local development import map](#3-add-reference-to-local-development-import-map)
    - [4. Add reference to production deployment import map](#4-add-reference-to-production-deployment-import-map)
    - [5. Add namespace to babel config](#5-add-namespace-to-babel-config)
    - [6. Install dependencies and test](#6-install-dependencies-and-test)
  - [Creating Component and Library Packages](#creating-component-and-library-packages)
    - [1. Create a new package within the package directory](#1-create-a-new-package-within-the-package-directory)
    - [2. Add package path to TypeScript path configuration.](#2-add-package-path-to-typescript-path-configuration)
    - [3. Add your package as a dependency and test](#3-add-your-package-as-a-dependency-and-test)
  - [References](#references)

## Introduction

`micro` is a micro frontend monorepo containing the complete set of component parts to construct a Websummit Front End.

This project uses Lerna to manage the monorepo and handle deployment and local dependency management.

It uses single-spa and related concepts to enable development and deployment of independent, framework agnostic micro frontends, within a host application.

In addition, it also contains supporting packages, including UI components and libs, to allow developer to easily develop and share code across the micro frontends.

## Quick start

### One time credentials setup

We have an `.env.example` file that you can copy as `.env` to set some environment variables.

There variables are shared between all micro frontends. Currently we use:

- `AUTH_TOKEN` this is your admin auth token you get from omnia, it determines the active conference, your user permissions and is valid for either staging or production. There are a few prefixed environment variables that you can use to save different tokens and cycle between them.
- `API_URL` this is the url pointing to the catalyst that you want to use. There are prefixed examples for production and sandbox that you can copy, or you point it to your local setup as needed.

### Requirements

Node v14 (exact working v14.17.1)

### How to run things

There are a few commands (run at the root level of `micro`) that are interesting depending on what you want to accomplish. Here is a summary of them:

#### **The magic command to get it all running**

- `yarn start` this will get you a fully featured local development environment under http://localhost:9000/demo with hot reloading. It will first install yarn packages, then build shared packages, then start all microfrontends and a thin root container that hosts them all, supporting individual hot reloading, debugging etc. of each micro frontend. **You need nothing else to start developing on existing micro frontends, you are now good to go!**

#### Other interesting commands that are more situational

- `yarn start:omnia` **_This is only interesting if you need to test the integration with omnia locally, which is rarely the case._** this will build static assets of all micro frontends and then host them in a simulated S3 bucket and run a thin omnia optimized container on http://localhost:9337 that can be used as `PUBLIC_MICRO_URL` for a local `avenger` setup. This does not enable hot reloading of micro frontends, so you will have to rebuild on changes, but allows you to test everything in the context of omnia in a production like setup.
- `yarn pretty` This runs our formatter to auto format your code before you commit it
- `yarn fix` this runs eslint to fix code style issues and do things like auto sorting and simple transformations of code
- `yarn ready` runs both formatter and linter in a neat package (this is also added as a pre-commit git-hook for your convenience)
- `yarn check` runs our build/compile steps that check for typescript errors, then if they succeds runs formatter/linter. This is the all in one package if you want to be sure this passes ci
- `yarn test` runs our test suite to ensure everything still works
- `yarn test:watch` runs only the tests for code you changed and keeps rereunning them as you edit files
- `yarn codegen` runs our graphql code generation pipeline that updates the types of the `graphql` package with any new queries/mutations you added and backend changes
- `yarn clean` in case you need to start fresh, in practice rarely needed

## Concepts and architecture

### Lerna

**Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.**

Use of this repository does not require understanding of how lerna works. But if you want to create new commands or modify workflows, that requires a fundamental understanding of how lerna works and the cli. For the full list of commands see [GitHub - lerna/lerna: A tool for managing JavaScript projects with multiple packages.](https://github.com/lerna/lerna#readme)

It is important to understand the principal concept, that Lerna manages package installations and commands across the repo. Therefore to avoid unforeseen issues it is recommended to run commands via the Lerna CLI at the root level.

## Adding a new dependency to a micro frontend

If you are adding a `devDependency` then you can just add it to the root `package.json` and it will automagically work. All micro frontends have `devDependencies: {}` and derive them from the global list, this allows us to update to new versions in one go and ensures parity between all the frontends. If you see dev dependencies in a micro frontend then please move them to the top level :)

If you want to add a new `dependency` then you add the dependency with a pinned version (no `^` or `~` or similar) to the `resolutions` field, and then in your specific frontend `package.json` add the same dependency with a version of `*`. This again allows us to manage dependency versions in one place and reduce conflicts or bundle bloat. If you see micro frontend dependencies without the \* then please add it :)

The root `package.json` `dependencies` are only for things you need in commands run at root level, which usually is empty, if it contains packages then removing them might be a good idea :)

## Creating a single-spa micro frontend

Before beginning it is suggested to get a basic understanding of the concepts and technologies used:
[Single Spa Documentation](https://single-spa.js.org/docs/getting-started-overview)

### 1. Copy from an existing frontend

Since our frontends by now have grown to become very custom in what they need, the easiest way to get started is to copy a frontend that has the things you need as a starting point. The `frontend-demo` one is a bare bones frontend which can be useful, `ticket-support` in contrast is as full featured as it gets and can serve as a jumpstart point, from which you delete things you don't need.

Once you decided on a source frontend, you need to pick a name. Our naming convention is `[a-z\-]+` as in words separated by hyphen. This is important to ensure that the name you pick complies with all the different url resolution systems and stays consistent.

Now copy the source frontend folder completely and name the target folder exactly the name you picked.

Firstly, when you copy a full micro frontend, you will need to replace the name of the source with your new name in various files. A search and replace in your folder should solve most of the cases, but there are a few ones that are more tricky:

In `webpack.config.build.js` at the top you will find an entry with a camelCase version of your name, this needs to be replaced too:

```
entry: {
  staffTickets: './src/index.js',
},
```

### 2. Amend package.json start command

Next in order that the micro-frontend can be run alongside other micro-frontends and is accessible to the host application in local development, we need to manually manage which port the micro-frontend is served from. The host app runs on port 9000 and each subsequent micro-frontend runs incrementally e.g `9001`, `9002` etc.

You can find a list of all used ports at `frontends/frontend-root/src/index.ejs` (you will touch this file again in [3. Add reference to local development import map](#3-add-reference-to-local-development-import-map) don't worry)

In the package.json start command for your micro-frontend please update:

`”start”: “webpack serve —port 90[xx]”`

Where `[xx]` is a port number that is not yet in use. For consistency sake we suggest to increment them starting from `9000` but you are free to pick anything in the range `9000 - 9100`.

### 3. Add reference to local development import map

The next step is to add the reference for the micro-frontend to the import maps in the single-spa host. To do this, open:

`frontends/frontend-root/src/index.ejs`

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

### 4. Add reference to production deployment import map

You want to also open:

`frontends/omnia-container/importmap.json`

here you add your frontend as:

```
"@websummit-micro/ticket-management": "/ticket-management/frontends.ticketManagement.bundle.js"
"[package.json name]": "/[webpack.config.build.js config.module.output.path]/frontends.[webpack.config.build.js config.entry.name].bundle.js"
```

You can see that the `events` microfrontend is named conferences in both these places to not be flagged as analytics tracking, so that would be a great example of how those values influence the build. But in general you want the hyphen separated name you picked and the camel case one in the bundle.

### 5. Add namespace to babel config

NOTE: if you are using styled components within a react micro frontend, in order to avoid CSS selector clashes with duplicate classnames in other microfrontends, it is required to have a babel configuraiton with a namespace specified. This namespace will be used as a classname prefix for all styled components in the micro frontend. For more information check the [styled components plugin documentation](https://styled-components.com/docs/tooling#namespace)

This is usually already done if you find-replaced correctly

### 6. Install dependencies and test

You can now test your micro frontend by running `yarn start` from the root and navigate to `http://localhost:9000/[your-frontend-name]`

## Creating Component and Library Packages

Lerna and Yarn workspaces enable us to create packages which can be shared and used within the mono-repo as if they were npm packages when working locally.

### 1. Create a new package within the package directory

Similarly to the new frontend, you create a new package by copy pasting form an existing one and find replace the name

### 2. Add package path to TypeScript path configuration.

In the root `tsconfig.json` file, ensure that there is a mapping to your package in the paths configuration:

```
“paths”: {
      “@websummit/components”: [“packages/components/src”],
      “@websummit/ws-lib-example”: [“packages/ws-lib-example/src”]
    },
```

Note: these can be wild carded e.g.

`”websummit/*”: [“packages/*/src”]`

### 3. Add your package as a dependency and test

To use your package as a dependency elsewhere in the mono repo it is necessary to add it to the package.json of the consuming package. In order for Lerna and yarn to manage the symlinking necessary to consume local unpublished packages, you manually add `"@websummit/[your-frontend-name]": "*",` to the `package.json` of that frontend. The `*` is important to make sure that you always get the local version.

Then you can call your package code as you would any npm package, update it and see changes immediately. Only caveat at the moment is that you explicitly have to have the `src` inside the import path.

## References

This repository started from the following resources:

https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559
https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680

And for some additional information on single-spa both within a lerna repo and standalone, see

https://github.com/tsukhu/single-spa-portal-monorepo
https://github.com/tsukhu?tab=repositories&q=single-spa&type=&language=

It has grown since then and no longer behaves in the same way as those blog posts
