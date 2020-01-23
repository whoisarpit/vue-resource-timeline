# vue-resource-timeline

A simple component to show timeline of events categorized by resources.

## Install

```
npm install --save vue-resource-timeline
```

Use as a plugin -

```js
import Vue from 'vue';
import ResourceTimeline from 'vue-resource-timeline';

Vue.use(ResourceTimeline); // Adds 'resource-timeline' component
```

or directly use as a component

```js
import ResourceTimeline from 'vue-resource-timeline';

export default {
  components: {
    ResourceTimeline,
    ...
  },
  ...
};
```

## Props -

| Prop | Description  | Type  | Default |
|------|--------------|-------|---------|
|resources*|Array of resources|Array||
|events*|Array of events|Array||
|showEmptyResource|Toggle showing of resources with no events|Boolean|false|
|showAddBtn|Toggle showing add button|Boolean|false|

`events` expects the following format -
```js
const events = [{
  resourceId: String/Number, // Strictly matches the value of a resource.id
  start: String, // 'HH:mm'
  end: String, // 'HH:mm'
  class: String, // Optional
  title: String, // Optional
}];
```

`resources` expects the following format -
```js
const resources = [{
  id: String/Number, // Strictly matches the value of a resource.id
  class: String, // Optional
  title: String, // Optional
}];
```

## Events -

| Event | Description  | Payload  |
|-------|--------------|----------|
|addBtnClick|Emitted when the `+` button is clicked|`Number`, day of add button that was clicked|
|eventClick|Emitted when an event is clicked|`Object`, original event object for the clicked event|

## Development setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## License

[MIT](https://github.com/arpit9295/vue-resource-timeline/blob/master/LICENSE.md)
