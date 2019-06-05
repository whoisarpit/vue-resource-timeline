import WeeklySchedule from './components/WeeklySchedule.vue';

const version = '0.1.0';

const install = (Vue) => {
  Vue.component('WeeklySchedule', WeeklySchedule);
};

const plugin = {
  install,
  version,
};

export default plugin;

export {
  WeeklySchedule,
  plugin,
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
