<template>
  <div class="demo">
    <h1>Weekly Schedule</h1>
    <weekly-schedule
      @eventClick="log"
      @addBtnClick="log"
      :showEmptyDays="true"
      :showAddBtn="true"
      :maxEvents="3"
      :events="events"/>
  </div>
</template>

<script>
  export default {
    name: 'demo',
    data() {
      return {
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
      };
    },
    methods: {
      log(val) {
        console.log(val);
      },
    },
  };
</script>

<style>

</style>
