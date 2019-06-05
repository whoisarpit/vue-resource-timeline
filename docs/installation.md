# Installation

## Direct Download / CDN

https://unpkg.com/vue-weekly-schedule/dist/vue-weekly-schedule 

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue-weekly-schedule@{{ $version }}/dist/vue-weekly-schedule.js
 
Include vue-weekly-schedule after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-weekly-schedule/dist/vue-weekly-schedule.js"></script>
```

## NPM

```sh
$ npm install vue-weekly-schedule
```

## Yarn

```sh
$ yarn add vue-weekly-schedule
```

When used with a module system, you must explicitly install the `vue-weekly-schedule` via `Vue.use()`:

```javascript
import Vue from 'vue'
import vue-weekly-schedule from 'vue-weekly-schedule'

Vue.use(vue-weekly-schedule)
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build `vue-weekly-schedule` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com//vue-weekly-schedule.git node_modules/vue-weekly-schedule
$ cd node_modules/vue-weekly-schedule
$ npm install
$ npm run build
```

