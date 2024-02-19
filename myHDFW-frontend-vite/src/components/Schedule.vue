<template>

  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar class='demo-app-calendar' :options='calendarOptions'  >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
  <Dialog v-model:visible="visible" modal header="Update Event" :style="{ width: '30rem' }">
  <span class="p-text-secondary block mb-5">Update your Event information</span>
  <div class="flex align-items-center gap-3 mb-5">
    <label for="designation" class="font-semibold w-7rem">Bezeichnung</label>
    <InputText id="designation" class="flex-auto" autocomplete="off" />
  </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="date" class="font-semibold w-7rem">Datum</label>
      <InputText id="date" class="flex-auto" autocomplete="off" />
    </div>
  <div class="flex align-items-center gap-3 mb-5">
    <label for="capacity" class="font-semibold w-7rem">Kapazität</label>
    <InputText id="capacity" class="flex-auto" autocomplete="off" />
  </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="starting_point" class="font-semibold w-7rem">Start</label>
      <InputText id="starting_point" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="end_point" class="font-semibold w-7rem">Ende</label>
      <InputText id="end_point" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="duration" class="font-semibold w-7rem">Dauer</label>
      <InputText id="duration" class="flex-auto" autocomplete="off" />
    </div>
  <div class="flex justify-content-end gap-2">
    <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
    <Button type="button" label="Save" @click="visible = false"></Button>
  </div>
  </Dialog>
</template>
<script>
import {defineComponent, ref} from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import allLocales from "@fullcalendar/core/locales-all"
import {createEventId, INITIAL_EVENTS} from '../event-utils.js'


export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      visible: false,
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        locale: 'de',
        locales: allLocales,
        headerToolbar: {
          right: 'prev,next today',
          center: 'title',
          left: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
 handleDateSelect(selectInfo) {

      this.visible = true
      console.log(this.visible)
      //let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection

      /*if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
      */
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()

      }
    },
    handleEvents(events) {
      this.currentEvents = events
    },
  }
})
</script>

<style lang='css' scoped>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;

}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

fc{
  max-width: 1200px;
  margin: 0 auto;
}


</style>
<script setup>
</script>