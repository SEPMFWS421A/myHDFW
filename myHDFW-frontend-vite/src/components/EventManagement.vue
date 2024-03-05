<template>
  <div class="top_rounding_admin">
  </div>
  <div class="background_admin">

    <Card style="width: 35rem; overflow: hidden; margin: auto;">
      <template #header>
        <RouterLink to="/Schedule/">
          <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Eventverwaltung.png" />
        </RouterLink>
      </template>
      <template #title>
        <span class="nav_card_title">Eventverwaltung</span>
        <Button id="help_button_event" class="help_button" label="" icon="pi pi-question-circle" v-tooltip="{ value: 'Confirm to proceed', showDelay: 1000, hideDelay: 300 }"/>
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
        <DataTable id="table_events"
                   ref="dt" :value="Events" v-model:selection="selectedEvents" dataKey="id"
                   :paginator="true" :rows="10" :filters="filters"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} events">
          <template #header>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
              <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText id="search_events" v-model="filters['global'].value" placeholder="Search..." />
                          </span>
            </div>
          </template>
          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="designation" header="Bezeichnung" sortable style="min-width:12rem"></Column>
          <Column field="starting_point" header="Startpunkt" sortable style="min-width:10rem"></Column>
          <Column field="end_point" header="Endpunkt" sortable style="min-width:10rem"></Column>
          <Column field="capacity" header="Kapazität" sortable style="min-width:16rem"></Column>
          <Column field="date" header="Datum" sortable style="min-width:10rem"></Column>
          <Column field="location" header="Standort" sortable style="min-width:10rem">
            <template #body="slotProps">
              <Tag :value="slotProps.data.location" />
            </template>
          </Column>
          <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
              <Button id="edit_column" class="mr-2 edit_column" icon="pi pi-pencil" outlined rounded @click="editEvent(slotProps.data)" />
              <Button id="delete_column" class="delete_column" icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteEvent(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>

      <!--Dialog zum anlegen-->
      <Dialog v-model:visible="EventDialog" :style="{width: '450px'}" header="Event Details" :modal="true" class="p-fluid">

        <div class="field">
          <label for="designation">Bezeichnung</label>
          <InputGroup>
            <InputGroupAddon>
              <span class="icons_dialog">abc</span>
            </InputGroupAddon>
            <InputText id="designation_event" v-model.trim="Event.designation" required="true" autofocus :class="{'p-invalid': submitted && !Event.designation}" />
          </InputGroup>
          <small class="p-error" v-if="submitted && !Event.designation">Bezeichnung ist erforderlich!</small>
        </div>

        <div class="flex gap-3">

          <div class="field">
            <label for="starting_point">Startpunkt</label>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-pencil icons_dialog"></i>
              </InputGroupAddon>
              <InputText id="starting_point" v-model.trim="Event.starting_point" required="true" autofocus :class="{'p-invalid': submitted && !Event.starting_point}" />
            </InputGroup>
            <small class="p-error" v-if="submitted && !Event.starting_point">Ein Startpunkt ist erforderlich!</small>
          </div>


        <div class="field">
          <label for="end_point">Endpunkt</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-pencil icons_dialog"></i>
            </InputGroupAddon>
            <InputText id="end_point" v-model.trim="Event.end_point" required="true" autofocus :class="{'p-invalid': submitted && !Event.end_point}" />
          </InputGroup>
          <small class="p-error" v-if="submitted && !Event.end_point">Ein Endpunkt ist erforderlich!</small>
        </div>
        </div>


          <div class="field">
            <label for="capacity">Kapazität</label>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-building icons_dialog"></i>
              </InputGroupAddon>
              <InputText id="capacity_event" v-model.trim="Event.capacity" required="true" autofocus :class="{'p-invalid': submitted && !Event.capacity}" />
            </InputGroup>
            <small class="p-error" v-if="submitted && !Event.capacity">Kapazität ist erforderlich!</small>
          </div>


    <div class="field">
      <label for="date">Datum</label>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-pencil icons_dialog"></i>
        </InputGroupAddon>
        <InputText id="date" v-model.trim="Event.date" required="true" autofocus :class="{'p-invalid': submitted && !Event.date}" />
      </InputGroup>
      <small class="p-error" v-if="submitted && !Event.date">Ein Datum ist erforderlich!</small>
    </div>

        <div class="field" id="field_location">
          <label for="location">Standort</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-map-marker icons_dialog"></i>
            </InputGroupAddon>
            <Dropdown id="location_event" v-model="Event.location" editable :options="locations" optionLabel="name" placeholder="Suche oder wähle einen Standort aus" class="w-full md:w-14rem" />
          </InputGroup>
          <small class="p-error" v-if="submitted && !Event.location">Standort ist erforderlich!</small>
        </div>


        <template #footer>
          <Button id="add_event_cancel" class="cancel_dialog" label="Abbrechen" icon="pi pi-times" text @click="hideDialog"/>
          <Button id="add_event_save" class="save_dialog" label="Speichern" icon="pi pi-check" text @click="saveEvent" />
        </template>
      </Dialog>

      <!--Dialog zum löschen-->
      <Dialog v-model:visible="deleteEventDialog" :style="{width: '450px'}" header="Bestätigen" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="Event">Bist du sicher das Event <b>{{Event.designation}}</b> löschen zu wollen?</span>
        </div>
        <template #footer>
          <Button id="cancel_delete_event_dialog" class="no_button" label="Nein" icon="pi pi-times" text @click="deleteEventDialog = false"/>
          <Button id="delete_event_dialog" class="yes_button" label="Ja" icon="pi pi-check" text @click="deleteEvent" />
        </template>
      </Dialog>

      <!--Dialog zum mehrfach löschen-->
      <Dialog v-model:visible="deleteEventsDialog" :style="{width: '450px'}" header="Bestätigen" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="Event">Bist du sicher die Events zu löschen?</span>
        </div>
        <template #footer>
          <Button id="cancel_delete_events_dialog" class="no_button" label="Nein" icon="pi pi-times" text @click="deleteEventsDialog = false"/>
          <Button id="delete_events_dialog" class="yes_button" label="Ja" icon="pi pi-check" text @click="deleteSelectedEvents" />
        </template>
      </Dialog>
    </div>
  </div>
  <div class="bottom_rounding_admin">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { EventService } from '@/service/EventService';

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

const locations = ref([
  { name: 'Mettmann'},
  { name: 'Paderborn'},
  { name: 'Bergisch-Gladbach'}
]);

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
      Events.value[findIndexById(Event.value.id)] = Event.value;
      toast.add({severity:'success', summary: 'Successful', detail: 'Event Updated', life: 3000});
    }
    else {
      Event.value.id           = createId();
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
  Events.value = Events.value.filter(val => !selectedEvents.value.includes(val));
  deleteEventsDialog.value = false;
  selectedEvents.value = null;
  toast.add({severity:'success', summary: 'Successful', detail: 'Events Deleted', life: 3000});
};
</script>

<style scoped>
#location_event{
  width: 100% !important;
}

#location_event:focus{
  width: 100% !important;
  outline: none !important;
  border-color: #645FCE !important;
  box-shadow: 0 0 3px #645FCE !important;
}

.add_event{
      background-color: #645FCE; 
      border-color: white;
}
.delete_event{
      background-color: #CFC25F; 
      border-color: white;
}


#delete_event:focus{
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #CFC25F, 0 1px 2px 0 black !important;
}
</style>