Table of Contents
=================

   * [Create Caspar Graphics](#create-caspar-graphics)
      * [Creating a Graphics Project](#creating-a-graphics-project)
         * [npx](#npx)
         * [npm](#npm)
         * [Yarn](#yarn)
         * [npm start or <code>yarn start</code>](#npm-start-or-yarn-start)
         * [npm run build or <code>yarn build</code>](#npm-run-build-or-yarn-build)
      * [Developing Graphics](#developing-graphics)
         * [Props](#props)
            * [data](#data)
            * [state](#state)
         * [componentWillLeave(onComplete)](#componentwillleaveoncomplete)
         * [static previewData](#static-previewdata)
         * [Example (using GSAP)](#example-using-gsap)
         * [Viewing Your Graphic](#viewing-your-graphic)
            * [With Development UI](#with-development-ui)
            * [Without Development UI](#without-development-ui)
            * [Query Parameters](#query-parameters)
      * [Extras](#extras)

# Create Caspar Graphics

Create graphics for [CasparCG](https://www.casparcg.com/) using [React](https://reactjs.org/) — with no build configuration.

* [Creating a Graphics Project](#creating-a-graphics-project) – How to create a new graphics project.
* [Developing Graphics](#developing-graphics) – How to develop graphics for a project bootstrapped with Create Caspar Graphics.

Create Caspar Graphics works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/nxtedition/create-caspar-graphics/issues/new).

## Creating a Graphics Project

To create a new app, you can choose one of the following methods:

### npx

```sh
npx create-caspar-graphics my-graphics
```

*[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher*

### npm

```sh
npm init caspar-graphics my-graphics
```
*`npm init` is available in npm 6+*

### Yarn

```sh
yarn create caspar-graphics my-graphics
```
*`yarn create` is available in Yarn 0.25+*

Select the preferred framework `React` or `Vanilla`

Select the preferred variant, in this example we'll use `React`and `Framer Motion`

It will create a directory called `my-graphics` inside the current folder.<br>

> **Note**: this will create a project for 1080p. If you're developing for 720, you can pass `--mode 720p` as an argument. It can also be changed later in your package.json.

Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-graphics
├── node_modules
├── package.json
├── .gitignore
└── templates
  └── example
    └── index.html
    └── index.jsx
    └── manifest.json
```

No configuration or complicated folder structures. Just one `/templates` folder where you put all your graphics. Once the installation is done, you can open your project folder:

```sh
cd my-graphics
```

Inside the newly created project, you can run some built-in commands:

### `npm` or `yarn`
followed by:
### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

<p align='center'>
<img width="1237" alt="dev-preview" src="https://user-images.githubusercontent.com/3599069/46212164-98db6c00-c335-11e8-93ed-d18cddd0c3bf.png" alt="Development View">
</p>

Every template that you've added to the `/templates` folder will automatically be picked up, and turned into a CasparCG template that you can interact with.
Use the GUI to view your graphics, change their preview data, send commands (e.g. play, pause, stop) and change background. Remember the file structure, index.html, index.jsx, manifest.json.

The page will automatically reload if you make changes to the code.<br>
And you will see the build errors and lint warnings in the console.

### `npm run build` or `yarn build`

Builds your graphics for production to the `dist` folder.<br>

It correctly bundles React in production mode and optimizes the build for the best performance, and then inlines every graphic into its own HTML file.

> **Tip**: use `--include` (shorthand `-i`) or `--exlude` (shorthand `-e`)  to control which graphics get built.


Your graphics are now ready to be played in CasparCG!

## Developing Graphics

Start by adding a new folder to your `templates` folder, with the name of your new graphic. Then add three files, index.html, index.jsx, and manifest.json in the folder you just created.
index.html is a standard html doctype to run the index.jsx script. Inside of index.jsx import `render`from `@nxtedition/graphics-kit`to render your functional component. In the same package you have access to `data` where you can retrive the data from your manifest.json file. You're done and ready! 💫

> Note: you have to stop webpack and run `yarn start` again for it to pick up your new template.

If you know React, you already know almost everything you need to know.
The only thing different from a "normal" React component, is that you instead for doing an export you use the `render` from `@nxtedition/graphics-kit` to render your component.

### Props

#### `data`
> object | defaults to `{}`

Contains the data sent by CasparCG. Every time a new `update()` is performed, you'll receive the new data in `props.data`.

#### `state`
> string | defaults to `"LOADING"`

The current Caspar state. All available states are exported under the `States` namespace:

```js
States = {
  loading: 'LOADING',
  loaded: 'LOADED',
  playing: 'PLAYING',
  paused: 'PAUSED',
  stopping: 'STOPPING',
  stopped: 'STOPPED'
}
```

Usually, you only have to care about the states `playing` and `pausing`, since everything else is handled for you.

### `componentWillLeave(onComplete)`
> function

When Caspar sends the `stop()` command, `props.state` will change to `"STOPPING"`. If you don't do anything, your graphic will just be removed.
Usually though, you'd want to take off your graphic with an animation. The lifceycle method `componentWillLeave` is your chance to do just that.

It's important that you call the `onComplete` callback once your out animation is complete, since this is what will actually remove the graphic.

### `static previewData`

When developing your graphic, you often need example data. This can be really tedious to add manually, and also runs the risk of making it into production.
We've made this easy for you — simply specify a static property called `previewData` in your class, and you'll automatically get it as `props.data` when developing.

### Example (using Framer Motion)


#### index.html
``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <script type="module" src="./index.jsx"></script>
  </body>
</html>

```

#### index.jsx
```js
import React from 'react'
import { render, FramerMotion, useCasparData } from '@nxtedition/graphics-kit'
import { motion } from 'framer-motion'
import './style.css'

const FramerMotionExample = () => {
  const { name } = useCasparData()

  return (
    <FramerMotion hide={!name}>
      <motion.div
        key={name}
        className="container"
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          y: 50
        }}
      >
        {name}
      </motion.div>
    </FramerMotion>
  )
}

render(FramerMotionExample)

```

#### manifest.json
``` json

{
  "name": "Framer Motion Example",
  "schema": {
    "name": {
      "type": "string",
      "label": "Name"
    }
  },
  "previewData": {
    "Thierry Henry": {
      "name": "Thierry Henry"
    },
    "Dennis Bergkamp": {
      "name": "Dennis Bergkamp"
    }
  }
}

```

### Viewing Your Graphic

#### With Development UI

To view your graphic, just go to [http://localhost:8080/example](http://localhost:8080/example).

#### Without Development UI

If you want to view it outside of the provided GUI, e.g. directly in CasparCG,
you can also go to [http://localhost:8080/example.html](http://localhost:8080/example.html).

> Tip: use your local IP instead of localhost to view it in CasparCG.

#### Query Parameters

You can pass a few query parameters:

**_fit**
> boolean | defaults to `false`

If true, your graphic will be scaled down to fit your browsers window (useful when developing on smaller screens).

**_bg**
> string or boolean

Add a background to your graphic's container. Either pass true, for a green color, or pass your own e.g. "#ffff00".

**_autoPreview**
> boolean | defaults to `false`

If true, the graphic will be played immediately when mounted.  

**e.g.**
> http://localhost:8080/example.html?_fit=true&_bg="#ff0000"&_autoPreview=true

#### Graphics background preview

It is possible to put an image called `reference.jpg` in the same folder as the template (next to the index.js file). And then use `f9` to toggle its visibility.

## Extras

Your new project comes installed with [Prettier](https://prettier.io/) and [lint-staged](https://github.com/okonet/lint-staged).
By default, lint-staged will run prettier for staged files when running `git commit`. You can change the behavior, or disable it completely.
