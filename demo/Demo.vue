<template>
  <div class="demo">
    <h1>Weekly Schedule</h1>
    <weekly-schedule
      @eventClick="log"
      @addBtnClick="log"
      :showEmptyDays="true"
      :showAddBtn="true"
      :maxEvents="3"
      :schedules="schedules"
      :showLegend="true"/>
  </div>
</template>

<script>
  export default {
    name: 'demo',
    data() {
      return {
        schedules: [
          {
            name: 'Schedule 1',
            class: 'schedule-1-class',
            events: [{
              day: 2,
              startTime: '13:00',
              endTime: '18:00',
            }, {
              day: 1,
              startTime: '08:00',
              endTime: '13:00',
            }, {
              day: 1,
              startTime: '14:00',
              endTime: '18:00',
            }, {
              day: 3,
              startTime: '13:00',
              endTime: '18:00',
            }],
          },
          {
            name: 'Schedule 2',
            class: 'schedule-2-class',
            events: [{
              day: 4,
              startTime: '13:00',
              endTime: '18:00',
            }, {
              day: 1,
              startTime: '09:00',
              endTime: '13:00',
            }, {
              day: 1,
              startTime: '14:00',
              endTime: '18:00',
            }, {
              day: 3,
              startTime: '13:00',
              endTime: '18:00',
            }],
          },
        ],
      };
    },
    methods: {
      log(val) {
        console.log(val);
      },
    },
  };
</script>

<style lang="scss">
  .schedule-2-class {
    background-color: #FFF59D;
    color: #333;
  }
</style>
