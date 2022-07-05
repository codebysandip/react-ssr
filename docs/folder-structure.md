## Folder structure
```
|-- root
    |-- .vscode                                                  # vs code editor config
    |   |-- launch.json                                          # config to run in debug mode. Used by vscode
    |   |-- settings.json                                        # vs code editor settings
    |-- build                                                    # webpack after build compiled files will go here
    |-- config                                                   # config folder related to webpack build
    |   |-- build.js                                             # build.js is file where we call webpack with extra options to build project
    |   |-- helper-functions.js                                  # webpack helper functions
    |   |-- meta-info.plugin.js                                  # webpack plugin to get contentHash of client.js and style.css
    |   |-- webpack-local-node-server.plugin.js                  # webpack plugin to start/restart local development server
    |   |-- webpack.common.js                                    # weback common config for dev as well as prod
    |   |-- webpack.dev.js                                       # webpack dev config. Used for local development build
    |   |-- webpack.prod.js                                      # webapck prod config. Used for production build
    |-- src                                                      # React and Node files folder
    |   |-- core                                                 # core/common code folder
    |   |   |-- components                                       # common components will go here
    |   |   |   |-- empty
    |   |   |   |   |-- empty.component.tsx                      # empty component used when SSR don't required for page
    |   |   |   |-- header
    |   |   |   |   |-- header.tsx                               # header component 
    |   |   |   |-- lazy
    |   |   |       |-- lazy.component.tsx                       # Lazy component used for lazy loading of route
    |   |   |-- functions                                        # common functions
    |   |   |   |-- create-context.ts                            # function to create context data/object for SSR/CSR
    |   |   |   |-- get-route.ts
    |   |   |-- models                                           # common model/interface
    |   |   |   |-- context.model.ts
    |   |   |   |-- page-data.ts
    |   |   |   |-- route.model.ts
    |   |   |   |-- server-response.ts
    |   |   |-- services                                         # common services
    |   |       |-- cookie.service.ts                            # cookie service to get, set and delete cookie for SSR and CSR
    |   |       |-- http-client.ts                               # Http Client to send api request
    |   |-- pages                                                # folder for pages/routes
    |   |   |-- home
    |   |       |-- home.component.tsx
    |   |       |-- home.model.ts
    |   |-- ssr                                                  # folder for SSR/node files
    |       |-- functions                                        # common functions
    |       |   |-- get-webpack-build-hash.ts
    |       |   |-- send-response.ts
    |       |   |-- XMLHttpRequest.ts
    |       |-- middlewares                                      # node middlewares
    |           |-- proxy-middleware.ts
    |           |-- static-files.middleware.ts
    |   |-- app.tsx                                              # React App file (contains Route, Header, footer)
    |   |-- client.tsx                                           # React client side bootstrap component
    |   |-- const.ts                                             # constants
    |   |-- routes.tsx                                           # Pages/Routes
    |   |-- server.ts                                            # Node server start file
    |   |-- template.tsx                                         # Project Html Head part reside in this component. Can think of index.html
    |-- typings                                                  # typescript typing file
        |-- env.d.ts
        |-- index.d.ts
    |-- .env                                                     # environment constants
    |-- .eslintignore                                            # eslint ignore file to ignore folders
    |-- .eslintrc.js
    |-- .gitignore
    |-- .prettierrc                                              # prettier config
    |-- ecosystem.config.js                                      # pm2 ecosystem config file for production start
    |-- favicon.ico
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- restart
    |-- test-api.ts                                              # test api server. Can use to create mock api
    |-- tsconfig.json                                            # typescript build config file
```