<template>
  <div>
    <div class="rt__resource"
      v-for="resource in resourcesWithEvents"
      :key="resource.id"
      :class="resource.class">
      <div class="rt__resource__title">
        {{resource.title}}
      </div>
      <div class="rt__events">
        <div class="rt__event"
          v-for="(event, index) in resource.events"
          :key="index"
          :class="event.class"
          :style="event.style"
          @click="clickEvent(event)">
          {{ event.title  }}
        </div>
      </div>
      <button class="rt__add"
        @click="addEvent(resource)">
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
      resources: {
        required: true,
        type: Array,
      },
      events: {
        required: true,
        type: Array,
      },
      showEmptyResource: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      gridBoundary() {
        if (this.events.length === 0) {
          return [];
        }
        return [
          this.events.map(event => event.start).reduce((min, val) => (val < min ? val : min), '24:00'),
          this.events.map(event => event.end).reduce((max, val) => (val > max ? val : max), '00:00'),
        ];
      },
      resourcesWithEvents() {
        const toValue = base => moment.duration(base).asHours();
        const [minBase, maxBase] = this.gridBoundary;
        const min = toValue(minBase);
        const max = toValue(maxBase);
        const duration = max - min;
        const getEventStyle = event => ({
          left: `${((toValue(event.start) - min) * 100 / duration).toFixed(2)}%`,
          right: `${((max - toValue(event.end)) * 100 / duration).toFixed(2)}%`,
        });
        const resourcesWithEvents = this.resources.map(resource => ({
          events: this.events
            .filter(event => event.resourceId === resource.id)
            .map(event => ({
              origEvent: event,
              style: getEventStyle(event),
              title: event.title,
              class: event.class,
            })),
          id: resource.id,
          title: resource.title,
          class: resource.class,
          origResource: resource,
        }));

        if (this.showEmptyResource) {
          return resourcesWithEvents;
        }

        return resourcesWithEvents.filter(resource => resource.events.length > 0);
      },
    },
    methods: {
      async addEvent(resource) {
        this.$emit('addBtnClick', resource.origResource);
      },

      async clickEvent(event) {
        this.$emit('eventClick', event.origEvent);
      },
    },
  };
</script>
<style lang="scss">
  $rt-radius-sm: 4px;
  $rt-primary: #03A9F4;
  $rt-success: #4CAF50;
  $rt-warning: #FFEB3B;
  $rt-danger: #F44336;

  $rt-primary--bg: lighten($rt-primary, 10%);
  $rt-success--bg: lighten($rt-success, 6%);
  $rt-warning--bg: lighten($rt-warning, 15%);
  $rt-danger--bg: lighten($rt-danger, 8%);

  $rt-text: #212121;
  $rt-text--light: #FAFAFA;

  .rt {
    &__resource {
      display: flex;
      margin: 0.25rem 0;
      align-items: center;

      &__title {
        line-height: 1rem;
        padding: 0.5rem 0;
        flex-basis: 50px;
        flex-grow: 0;
        font-weight: 600;
      }
    }

    &__events {
      width: 100%;
      min-height: 2rem;
      position: relative;
    }

    &__event {
      position: absolute;
      height: 100%;
      line-height: 1rem;
      padding: 0.5rem;
      border-radius: $rt-radius-sm;
      font-size: 0.875rem;
      white-space: nowrap;
      background-color: $rt-primary--bg;
      color: $rt-text--light;
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
