<template>
  <div>
    <div class="ws__day"
      v-for="{dayName, day, schedules} in eventsByDay"
      :key="day">
      <div class="ws__day__name">
        {{dayName}}
      </div>
      <div class="ws__events-container">
        <div class="ws__events"
          v-for="(events, index) in schedules"
          :key="index"
          align-center>
          <div class="ws__event__wrapper"
            v-for="(event, index) in events"
            :key="index"
            :style="{'flex-basis': `${event.duration * 100/maxDayDuration}%`}">
            <div class="ws__event"
              :class="event.class"
              @click="clickEvent(event)">
              {{event.startTime}} - {{event.endTime}}
            </div>
          </div>

        </div>
      </div>
      <button class="ws__add"
        v-if="showAddBtn"
        @click="addEvent(day)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z"/>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </div>
    <div class="ws__footer" v-if="showLegend">
      <div class="ws__legend"
        :class="schedule.class"
        v-for="(schedule, index) in schedules"
        :key="index">
        {{schedule.name}}
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment';

  export default {
    props: {
      schedules: {
        required: true,
        type: Array,
      },
      eventClass: {
        type: String,
        default: '',
      },
      showEmptyDays: {
        type: Boolean,
        default: false,
      },
      showAddBtn: {
        type: Boolean,
        default: false,
      },
      maxEvents: {
        required: false,
        type: Number,
        default: 0,
      },
      showLegend: {
        required: false,
        type: Boolean,
        default: true,
      },
    },

    computed: {
      eventsByDay() {
        const eventsByDay = moment.weekdaysShort().map((dayName, index) => ({
          day: index,
          dayName,
          schedules: this.schedules.map(() => []),
        }));

        this.schedules.forEach((schedule, index) => {
          const eventClass = schedule.class;
          schedule.events.forEach((event) => {
            const startHr = moment.duration(event.startTime).asHours();
            const endHr = moment.duration(event.endTime).asHours();
            const duration = endHr - startHr;
            eventsByDay[event.day].schedules[index].push({
              day: event.day,
              startTime: event.startTime,
              endTime: event.endTime,
              class: `${(event.class || '')} ${eventClass}`,
              duration,
              origEvent: event,
            });
          });
        });

        eventsByDay.forEach((day) => {
          day.schedules.forEach((events) => {
            events.sort((event1, event2) => (event2.startTime > event1.startTime ? -1 : 0));
          });
        });

        if (this.showEmptyDays) {
          return eventsByDay;
        }

        return eventsByDay.filter((day) => {
          const numEvents = day.schedules.map(events => events.length);
          return Math.max(...numEvents);
        });
      },
      maxDayDuration() {
        const arraySum = numArray => numArray.reduce((accum, val) => (accum + val), 0);
        const dayDurations = [];

        this.eventsByDay.forEach((day) => {
          day.schedules.forEach((events) => {
            const durations = events.map(({ duration }) => duration);
            dayDurations.push(arraySum(durations));
          });
        });

        return Math.max(...dayDurations);
      },
    },
    methods: {
      async addEvent(day) {
        this.$emit('addBtnClick', day);
      },

      async clickEvent(event) {
        this.$emit('eventClick', event.origEvent);
      },
    },
  };
</script>
<style lang="scss">
  $ws-radius-sm: 4px;
  $ws-primary: #03A9F4;
  $ws-success: #4CAF50;
  $ws-warning: #FFEB3B;
  $ws-danger: #F44336;

  $ws-primary--bg: lighten($ws-primary, 10%);
  $ws-success--bg: lighten($ws-success, 6%);
  $ws-warning--bg: lighten($ws-warning, 15%);
  $ws-danger--bg: lighten($ws-danger, 8%);

  $ws-text: #212121;
  $ws-text--light: #FAFAFA;

  .ws {
    &__day {
      display: flex;
      margin: 0.25rem 0;
      align-items: center;

      &__name {
        line-height: 1rem;
        padding: 0.5rem 0;
        flex-basis: 40px;
        flex-grow: 0;
        font-weight: 600;
      }
    }

    &__events-container {
      flex-grow: 1;
    }

    &__events {
      display: flex;
      min-height: 2.25rem;
    }

    &__event {
      line-height: 1rem;
      padding: 0.5rem;
      border-radius: $ws-radius-sm;
      font-size: 0.875rem;
      white-space: nowrap;
      background-color: $ws-primary--bg;
      color: $ws-text--light;

      &.success {
        background-color: $ws-success--bg;
      }

      &.warning {
        background-color: $ws-warning--bg;
        color: $ws-text;
      }

      &.danger {
        background-color: $ws-danger--bg;
        color: $ws-text--light;
      }

      &__wrapper {
        flex-grow: 0;
        padding: 0.125rem;
      }
    }

    &__add {
      appearance: none;
      border: none;
      background: transparent;
      border-radius: 16px;
      padding: 0.125rem;
      font-size: 1.5rem;
      margin-left: 0.25rem;


      &:hover,
      &:focus {
        outline: none;
        background-color: rgba(black, 0.1);
      }

      svg {
        height: 1em;
        display: block;
      }
    }

    &__legend {
      display: inline-block;
      line-height: 1.5;
      margin: 0 1em;

      &::before {
        content: '';
        display: inline-block;
        height: 1.5em;
        width: 1.5em;
        vertical-align: middle;
        border: 1px solid 1px;
        margin-bottom: 4px;
        margin-right: 4px;
        border-radius: 4px;
        background: $ws-primary--bg;
      }

      &.success {
        &::before {
          background-color: $ws-success--bg;
        }
      }

      &.warning {
        &::before {
          background-color: $ws-warning--bg;
        }
      }

      &.danger {
        &::before {
          background-color: $ws-danger--bg;
        }
      }
    }

    &__footer {
      margin-top: 1em;
      text-align: right;
    }
  }

</style>
