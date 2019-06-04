<template>
  <div id="app">
    <weekly-schedule :events="events"/>
  </div>
</template>

<script>
import WeeklySchedule from '../src/components/WeeklySchedule.vue';

export default {
  name: 'app',
  components: {
    WeeklySchedule,
  },
  data() {
    return {
      events: [],
    };
  },
};
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
