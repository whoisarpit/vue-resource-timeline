<template>
  <div>
    <div class="ws__day"
      v-for="{dayName, day, events} in eventsByDay"
      :key="day">
      <div class="ws__day__name">
        {{dayName}}
      </div>
      <div class="ws__events"
        align-center>
        <div class="ws__event"
          :class="eventClass"
          v-for="(event, index) in events"
          :key="index"
          @click="clickEvent(event.id)"
          :style="{'flex-basis': `${event.duration * 100/maxDayDuration}%`}">
          {{event.startTime}} - {{event.endTime}}
        </div>
      </div>
      <button class="ws__add"
        v-if="showAddBtn"
        :disabled="maxEvents && events.length >= maxEvents"
        @click="addEvent(day)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z"/>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
  import moment from 'moment';

  export default {
    props: {
      events: {
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
    },

    computed: {
      eventsByDay() {
        if (!Array.isArray(this.events)) {
          return [];
        }

        const eventsByDay = moment.weekdaysShort().map((dayName, index) => ({
          day: index,
          dayName,
          events: [],
        }));

        this.events.forEach((event) => {
          const startTime = moment(event.startTime, 'HH:mm');
          const endTime = moment(event.endTime, 'HH:mm');
          // ignore minutes
          const startHr = Number(startTime.format('HH'));
          const endHr = Number(endTime.format('HH'));
          const duration = endHr - startHr;
          eventsByDay[event.day].events.push({
            ...event,
            duration,
          });
        });

        if (this.showEmptyDays) {
          return eventsByDay;
        }

        return eventsByDay.filter(dayEvents => dayEvents.events.length !== 0);
      },
      maxDayDuration() {
        return this.eventsByDay.reduce((maxDuration, dayEvents) => {
          const totalDuration = dayEvents.events
            .reduce((total, { duration }) => total + duration, 0);

          return totalDuration > maxDuration ? totalDuration : maxDuration;
        }, 0);
      },
    },
    methods: {
      async addEvent(day) {
        this.$emit('addBtnClick', day);
      },

      async clickEvent(eventId) {
        const event = this.events.find(currSlot => currSlot.id === eventId);
        this.$emit('eventClick', event);
      },
    },
  };
</script>
<style lang="scss">
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

    &__events {
      display: flex;
      flex-grow: 1;
    }

    &__event {
      line-height: 1rem;
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      flex-grow: 0;
      white-space: nowrap;
      background-color: #42A5F5;
      color: #ffffff;
      margin: 0 0.125rem;
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
  }

</style>
