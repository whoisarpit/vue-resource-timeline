import WeeklySchedule from './components/WeeklySchedule.vue';

const plugin = {
  install(Vue) {
    Vue.component('WeeklySchedule', WeeklySchedule);
  },
};

export default plugin;

export {
  WeeklySchedule,
  plugin,
};
