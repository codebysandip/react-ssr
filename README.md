# React Server Side Rendering With Nodejs

 - [How to setup and Run project](#how-to-setup-project)
 - [Folder structure](#folder-structure)
 - [How to build production build](#how-to-build-production-build)
 - [How to add page or route](#how-to-add-page-or-route)

## How To Setup Project
Note: Before setup of project please check node version should be 14.xx.
Steps:

 - Clone this repository on your local machine.
 - Run command `npm install`
 - To start project, Run command `npm start`

## Folder structure
```
├── build                                    # Compiled files
├── config                                   # configuration files related to webpack and build
├── src                                      # Source files
│   ├── core                                 # all common code will reside here
│   ├── pages                                # all routes/pages will reside here. Add new folder for every route
│   ├── ssr                                  # nodejs related code will reside here
│   └── app.tsx                              # main(start) component
└── README.md                                # documentation
```
## How to build production build

## How to add page or route
Steps:
 - Add new folder in `src/pages` then component for page
 - Add route in `src/routes.tsx`
