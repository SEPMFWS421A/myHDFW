<template>
    <div style="height: 10%; background-color: #ECF0F2; border-top-right-radius: 20px; border-top-left-radius: 20px;">
    </div>
    <div style="background-color: #ECF0F2;">
      <div style="width: 25%; margin: auto; ">
        <RouterLink to="/Schedule/">
          <Panel header="Raumverwaltung" style="margin: auto ;">
              <img src="https://taz.de/picture/4989773/948/kfw-kredite-studienkredite-studenten-corona-1.jpeg" class="" alt="empty_lecture_room" width="150%" style="width: 50%; border-radius: 20px;">
          </Panel>
        </RouterLink>

        <Toolbar class="mb-10" style="padding-top: 10%; border: none; background-color:#ECF0F2">
          <template #start>
            <Button id="add_room" label="Raum hinzufügen" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
          </template>

          <template #end>
            <Button id="delete_room" label="Raum löschen" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedRooms || !selectedRooms.length" />
          </template>
        </Toolbar>
      </div>

    <div>
      <div class="card">
        <DataTable ref="dt" :value="Rooms" v-model:selection="selectedRooms" dataKey="id"
                   :paginator="true" :rows="10" :filters="filters"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} rooms">
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
          <Column field="exam_capacity" header="Kapazität-Klausur" sortable style="min-width:10rem"></Column>
          <Column field="equipment" header="Ausstattung" sortable style="min-width:10rem"></Column>
          <Column field="location" header="Standort" sortable style="min-width:10rem"></Column>
          <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editRoom(slotProps.data)" />
              <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteRoom(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>
      
      <!--Dialog zum anlegen-->
      <Dialog v-model:visible="RoomDialog" :style="{width: '450px'}" header="Raum Details" :modal="true" class="p-fluid">
        <div class="field">
          <label for="designation">Bezeichnung</label>
          <InputText id="designation" v-model.trim="Room.name" required="true" autofocus :class="{'p-invalid': submitted && !Room.name}" />
          <small class="p-error" v-if="submitted && !Room.name">Name is required.</small>
        </div>

        <div class="field">
          <label for="capacity">Kapazität</label>
          <Textarea id="capacity" v-model="Room.description" required="true" rows="3" cols="20" />
        </div>
  
        <div class="field">
          <label for="exam_capacity" class="mb-3">Klausurkapazität</label>
          <Textarea id="exam_capacity" v-model="Room.description" required="true" rows="3" cols="20" />
        </div>
  
        <div class="field">
          <label for="equipment" class="mb-3">Ausstattung</label>
          <Textarea id="equipment" v-model="Room.description" required="true" rows="3" cols="20" />
        </div>
  
        <div class="field">
          <label for="location" class="mb-3">Standort</label>
          <Textarea id="location" v-model="Room.description" required="true" rows="3" cols="20" />
        </div>
        <template #footer>
          <Button id="cancel_add_room" label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
          <Button id="add_room" label="Save" icon="pi pi-check" text @click="saveRoom" />
        </template>
      </Dialog>
  
      <!--Dialog zum löschen-->
      <Dialog v-model:visible="deleteRoomDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="Room">Bist du sicher den Raum löschen zu wollen?<b>{{Room.designation}}</b>?</span>
        </div>
        <template #footer>
          <Button id="cancel_delete_room" label="No" icon="pi pi-times" text @click="deleteRoomDialog = false"/>
          <Button id="delete_room" label="Yes" icon="pi pi-check" text @click="deleteRoom" />
        </template>
      </Dialog>
      
      <!--Dialog zum mehrfach löschen-->
      <Dialog v-model:visible="deleteRoomsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="Room">Bist du sicher die Räume zu löschen?</span>
        </div>
        <template #footer>
          <Button id="cancel_delete_rooms" label="No" icon="pi pi-times" text @click="deleteRoomsDialog = false"/>
          <Button id="delete_rooms" label="Yes" icon="pi pi-check" text @click="deleteSelectedRooms" />
        </template>
      </Dialog>
    </div>
   </div>
   <div style="background-color: #ECF0F2;    border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; height: 5%;">
   </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { FilterMatchMode } from 'primevue/api';
  import { useToast } from 'primevue/usetoast';
  import { RoomService } from '@/service/RoomService';
  
  onMounted(() => {
    RoomService.getRooms().then((data) => (Rooms.value = data));
  });
  
  const toast = useToast();
  const dt = ref();
  const Rooms = ref();
  const RoomDialog = ref(false);
  const deleteRoomDialog = ref(false);
  const deleteRoomsDialog = ref(false);
  const Room = ref({});
  const selectedRooms = ref();
  const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
  });
  const submitted = ref(false);

  const openNew = () => {
    Room.value = {};
    submitted.value = false;
    RoomDialog.value = true;
  };
  const hideDialog = () => {
    RoomDialog.value = false;
    submitted.value = false;
  };
  const saveRoom = () => {
    submitted.value = true;
  
    if (Room.value.name.trim()) {
      if (Room.value.id) {
        Room.value.inventoryStatus = Room.value.inventoryStatus.value ? Room.value.inventoryStatus.value : Room.value.inventoryStatus;
        Rooms.value[findIndexById(Room.value.id)] = Room.value;
        toast.add({severity:'success', summary: 'Successful', detail: 'Room Updated', life: 3000});
      }
      else {
        Room.value.id = createId();
        Room.value.code = createId();
        Room.value.image = 'Room-placeholder.svg';
        Room.value.inventoryStatus = Room.value.inventoryStatus ? Room.value.inventoryStatus.value : 'INSTOCK';
        Rooms.value.push(Room.value);
        toast.add({severity:'success', summary: 'Successful', detail: 'Room Created', life: 3000});
      }
  
      RoomDialog.value = false;
      Room.value = {};
    }
  };
  const editRoom = (prod) => {
    Room.value = {...prod};
    RoomDialog.value = true;
  };
  const confirmDeleteRoom = (prod) => {
    Room.value = prod;
    deleteRoomDialog.value = true;
  };
  const deleteRoom = () => {
    Rooms.value = Rooms.value.filter(val => val.id !== Room.value.id);
    deleteRoomDialog.value = false;
    Room.value = {};
    toast.add({severity:'success', summary: 'Successful', detail: 'Room Deleted', life: 3000});
  };
  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < Rooms.value.length; i++) {
      if (Rooms.value[i].id === id) {
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
    deleteRoomsDialog.value = true;
  };
  const deleteSelectedRooms = () => {
    Rooms.value = rooms.value.filter(val => !selectedRooms.value.includes(val));
    deleteRoomsDialog.value = false;
    selectedRooms.value = null;
    toast.add({severity:'success', summary: 'Successful', detail: 'Rooms Deleted', life: 3000});
  };
  
  </script>