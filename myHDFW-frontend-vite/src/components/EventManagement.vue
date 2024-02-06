<template>
  <div class="top_rounding">
  </div>
  <div class="background_admin">

    <Card style="width: 35rem; overflow: hidden; margin: auto;">
      <template #header>
        <RouterLink to="/Schedule/">
          <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Eventverwaltung.png" />
        </RouterLink>
      </template>
      <template #title> <span class="nav_card_title">Eventverwaltung</span><Button id="add_event" class="help_button" label="" icon="pi pi-question-circle"/>
      </template>
      <template #content>
        <Toolbar>
          <template #start>
            <Button id="add_event" class="add_event" data-pc-severity="none" label="Event hinzufügen" icon="pi pi-plus" severity="success"  @click.native="openNew" />
          </template>

          <template #end>
            <Button id="delete_event" class="delete_event" label="Event löschen" icon="pi pi-trash" @click="confirmDeleteSelected" :disabled="!selectedEvents || !selectedEvents.length" />
          </template>
        </Toolbar>
      </template>
    </Card>

    <div>
      <div class="card">
        <DataTable ref="dt" :value="Events" v-model:selection="selectedEvents" dataKey="id"
                   :paginator="true" :rows="10" :filters="filters"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} events">
          <template #header>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
              <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="filters['global'].value" placeholder="Search..." />
                          </span>
            </div>
          </template>
          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="designation" header="Bezeichnung" sortable style="min-width:12rem"></Column>
          <Column field="capacity" header="Kapazität" sortable style="min-width:16rem"></Column>
          <Column field="starting_point" header="Start" sortable style="min-width:10rem"></Column>
          <Column field="end_point" header="Ende" sortable style="min-width:10rem"></Column>
          <Column field="duration" header="Dauer" sortable style="min-width:10rem"></Column>
          <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
              <Button style="border-color: #AE5FCF; color: #AE5FCF;" icon="pi pi-pencil" outlined rounded class="mr-2" @click="editEvent(slotProps.data)" />
              <Button style="border-color: #CFC25F; color: #CFC25F;" icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteEvent(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>

      <!--Dialog zum anlegen-->
      <Dialog v-model:visible="EventDialog" :style="{width: '450px'}" header="Event Details" :modal="true" class="p-fluid">
        <div class="field">
          <label for="designation">Bezeichnung</label>
          <InputText id="designation" v-model.trim="Event.designation" required="true" autofocus :class="{'p-invalid': submitted && !Event.designation}" />
          <small class="p-error" v-if="submitted && !Event.designation">Eine Bezeichnung ist erforderlich!</small>
        </div>

        <div class="field">
          <label for="capacity">Kapazität</label>
          <InputText id="capacity" v-model.trim="Event.capacity" required="true" autofocus :class="{'p-invalid': submitted && !Event.capacity}" />
          <small class="p-error" v-if="submitted && !Event.capacity">Eine Kapazität ist erforderlich!</small>
        </div>

        <div class="field">
          <label for="starting_point">Start</label>
          <InputText id="starting_point" v-model.trim="Event.starting_point" required="true" autofocus :class="{'p-invalid': submitted && !Event.starting_point}" />
          <small class="p-error" v-if="submitted && !Event.starting_point">Ein Startpunkt ist erforderlich!</small>
        </div>

        <div class="field">
          <label for="end_point">Ende</label>
          <InputText id="end_point" v-model.trim="Event.end_point" required="true" autofocus :class="{'p-invalid': submitted && !Event.end_point}" />
          <small class="p-error" v-if="submitted && !Event.end_point">Ein Endpunkt ist erforderlich!</small>
        </div>

        <div class="field">
          <label for="duration">Dauer</label>
          <InputText id="duration" v-model.trim="Event.duration" required="true" autofocus :class="{'p-invalid': submitted && !Event.duration}" />
          <small class="p-error" v-if="submitted && !Event.duration">Eine Dauer ist erforderlich!</small>
        </div>

        <template #footer>
          <Button id="cancel_add_event" label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
          <Button id="add_event" label="Save" icon="pi pi-check" text @click="saveEvent" />
        </template>
      </Dialog>

      <!--Dialog zum löschen-->
      <Dialog v-model:visible="deleteEventDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="Event">Bist du sicher das Event löschen zu wollen?<b>{{Event.designation}}</b>?</span>
        </div>
        <template #footer>
          <Button id="cancel_delete_event" label="No" icon="pi pi-times" text @click="deleteEventDialog = false"/>
          <Button id="delete_event" label="Yes" icon="pi pi-check" text @click="deleteEvent" />
        </template>
      </Dialog>

      <!--Dialog zum mehrfach löschen-->
      <Dialog v-model:visible="deleteEventsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="Event">Bist du sicher das Event zu löschen?</span>
        </div>
        <template #footer>
          <Button id="cancel_delete_events" label="No" icon="pi pi-times" text @click="deleteEventsDialog = false"/>
          <Button id="delete_events" label="Yes" icon="pi pi-check" text @click="deleteSelectedEvents" />
        </template>
      </Dialog>
    </div>
  </div>
  <div class="bottom_admin">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import {EventService} from "@/service/EventService.js";

onMounted(() => {
  EventService.getEvents().then((data) => (Events.value = data));
});

const toast = useToast();
const dt = ref();
const Events = ref();
const EventDialog = ref(false);
const deleteEventDialog = ref(false);
const deleteEventsDialog = ref(false);
const Event = ref({});
const selectedEvents = ref();
const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);

const openNew = () => {
  Event.value = {};
  submitted.value = false;
  EventDialog.value = true;
};
const hideDialog = () => {
  EventDialog.value = false;
  submitted.value = false;
};
const saveEvent = () => {
  submitted.value = true;

  if (Event.value.designation.trim()) {
    if (Event.value.id) {
      Event.value.inventoryStatus = Event.value.inventoryStatus.value ? Event.value.inventoryStatus.value : Event.value.inventoryStatus;
      Events.value[findIndexById(Event.value.id)] = Event.value;
      toast.add({severity:'success', summary: 'Successful', detail: 'Event Updated', life: 3000});
    }
    else {
      Event.value.id = createId();
      Event.value.code = createId();
      Event.value.image = 'Event-placeholder.svg';
      Event.value.inventoryStatus = Event.value.inventoryStatus ? Event.value.inventoryStatus.value : 'INSTOCK';
      Events.value.push(Event.value);
      toast.add({severity:'success', summary: 'Successful', detail: 'Event Created', life: 3000});
    }

    EventDialog.value = false;
    Event.value = {};
  }
};
const editEvent = (prod) => {
  Event.value = {...prod};
  EventDialog.value = true;
};
const confirmDeleteEvent = (prod) => {
  Event.value = prod;
  deleteEventDialog.value = true;
};
const deleteEvent = () => {
  Events.value = Events.value.filter(val => val.id !== Event.value.id);
  deleteEventDialog.value = false;
  Event.value = {};
  toast.add({severity:'success', summary: 'Successful', detail: 'Event Deleted', life: 3000});
};
const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < Events.value.length; i++) {
    if (Events.value[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
};
const createId = () => {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
const exportCSV = () => {
  dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
  deleteEventsDialog.value = true;
};
const deleteSelectedEvents = () => {
  Events.value = events.value.filter(val => !selectedEvents.value.includes(val));
  deleteEventsDialog.value = false;
  selectedEvents.value = null;
  toast.add({severity:'success', summary: 'Successful', detail: 'Events Deleted', life: 3000});
};

</script>