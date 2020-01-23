import ResourceTimeline from './components/ResourceTimeline.vue';

const version = '1.0.0';

const install = (Vue) => {
  Vue.component('ResourceTimeline', ResourceTimeline);
};

const plugin = {
  install,
  version,
};

export default plugin;

export {
  ResourceTimeline,
  plugin,
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
