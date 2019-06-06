# vue-weekly-schedule

A simple component to show a repeating weekly schedule.

## Install

```
npm install --save vue-weekly-schedule
```

Use as a plugin -

```js
import Vue from 'vue';
import WeeklySchedule from 'vue-weekly-schedule';

Vue.use(WeeklySchedule); // Adds 'weekly-schedule' component
```

or directly use as a component

```js
import WeeklySchedule from 'vue-weekly-schedule';

export default {
  components: {
    WeeklySchedule,
    ...
  },
  ...
};
```

## Props -

| Prop | Description  | Type  | Default |
|------|--------------|-------|---------|
|schedules*|Array of schedules|Array||
|eventClass|A class you want to attach to each event|String|''|
|showEmptyDays|Toggle showing days which don't have any events to them|Boolean|false|
|showAddBtn|Toggle showing add button|Boolean|false|
|maxEvents|Toggle disabling add button after a max number of events is added|Number|0|
|showLegend|Show legend for the calendars|Boolean|false|

`schedules` expects the following format -
```js
  const schedules = [{
    name: String,
    class: String,
    events: [
      {
        day: Number,
        startTime: String, // 'HH:mm'
        endTime: String, // 'HH:mm'
        class: String,
      },
    ],
  }];
```
The class is added to each event of the schedule.

## Events -

| Event | Description  | Payload  |
|-------|--------------|----------|
|addBtnClick|Emitted when the `+` button is clicked|`Number`, day of add button that was clicked|
|eventClick|Emitted when an event is clicked|`Object`, event object for the clicked event|

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

[MIT](https://github.com/arpit9295/vue-weekly-schedule/blob/master/LICENSE.md)
