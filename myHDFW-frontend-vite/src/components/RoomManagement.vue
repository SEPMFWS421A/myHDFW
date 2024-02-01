<template>
    <div class="top_rounding">
    </div>
    <div class="background_admin">

    <Card style="width: 35rem; overflow: hidden; margin: auto;">
      <template #header>
        <RouterLink to="/Schedule/">
          <img id="nav_card_image" class="nav_card_image" alt="user header" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/77f1f60f-2b47-4c08-9c95-df986efe8c7f/dd6yq9v-c9929aee-c4c8-4f67-a54f-44a96a49b8a3.png/v1/fill/w_1024,h_576,q_80,strp/visual_novel_background__classroom_by_kjkjmulo_dd6yq9v-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc3ZjFmNjBmLTJiNDctNGMwOC05Yzk1LWRmOTg2ZWZlOGM3ZlwvZGQ2eXE5di1jOTkyOWFlZS1jNGM4LTRmNjctYTU0Zi00NGE5NmE0OWI4YTMucG5nIiwiaGVpZ2h0IjoiPD01NzYiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC83N2YxZjYwZi0yYjQ3LTRjMDgtOWM5NS1kZjk4NmVmZThjN2ZcL2tqa2ptdWxvLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.tlNsovwcY-weMtUeKVrIOcyOaPdhKWG2SONVOx_dmPE" />
        </RouterLink>
      </template>
      <template #title> 
        <span class="nav_card_title">Raumverwaltung</span>
        <Button id="help_button_room" class="help_button" label="" icon="pi pi-question-circle" v-tooltip="{ value: 'Confirm to proceed', showDelay: 1000, hideDelay: 300 }"/>
      </template>
      <template #content>
          <Toolbar>
            <template #start>
              <Button id="add_room" class="add_room" data-pc-severity="none" label="Raum hinzufügen" icon="pi pi-plus" severity="success"  @click.native="openNew" />
            </template>

            <template #end>
              <Button id="delete_room" class="delete_room" label="Raum löschen" icon="pi pi-trash" @click="confirmDeleteSelected" :disabled="!selectedRooms || !selectedRooms.length" />
            </template>
          </Toolbar>
      </template>
    </Card>    

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
          <Column field="location" header="Standort" sortable style="min-width:10rem">
            <template #body="slotProps">
              <Tag :value="slotProps.data.location" />
            </template>
          </Column>
          <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
              <Button id="edit_column" class="mr-2 edit_column" icon="pi pi-pencil" outlined rounded @click="editRoom(slotProps.data)" />
              <Button id="delete_column" class="delete_column" icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteRoom(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>
      
      <!--Dialog zum anlegen-->
      <Dialog v-model:visible="RoomDialog" :style="{width: '450px'}" header="Raum Details" :modal="true" class="p-fluid">

        <div class="field">
          <label for="designation">Bezeichnung</label>
          <InputGroup>
            <InputGroupAddon>
                <span class="icons_dialog">abc</span>
            </InputGroupAddon>
            <InputText id="column_designation" v-model.trim="Room.designation" required="true" autofocus :class="{'p-invalid': submitted && !Room.designation}" />
          </InputGroup>
          <small class="p-error" v-if="submitted && !Room.designation">Bezeichnung ist erforderlich!</small>
        </div>
          
        <div class="flex gap-3">
          <div class="field">
            <label for="capacity">Kapazität</label>
            <InputGroup>
              <InputGroupAddon>
                  <i class="pi pi-building icons_dialog"></i>
              </InputGroupAddon>
              <InputText id="column_capacity" v-model.trim="Room.capacity" required="true" autofocus :class="{'p-invalid': submitted && !Room.capacity}" />
              <small class="p-error" v-if="submitted && !Room.capacity">Kapazität ist erforderlich!</small>
            </InputGroup>
          </div>
  
          <div class="field">
            <label for="exam_capacity">Klausurkapazität</label>
            <InputGroup>
              <InputGroupAddon>
                  <i class="pi pi-pencil icons_dialog"></i>
              </InputGroupAddon>
              <InputText id="column_exam_capacity" v-model.trim="Room.exam_capacity" required="true" autofocus :class="{'p-invalid': submitted && !Room.exam_capacity}" />
              <small class="p-error" v-if="submitted && !Room.exam_capacity">Klausurkapazität ist erforderlich!</small>
            </InputGroup>
          </div>
        </div>

        <div class="field">
          <label for="equipment">Ausstattung</label>
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-info icons_dialog"></i>
            </InputGroupAddon>
            <InputText id="equipment" v-model.trim="Room.equipment" required="true" autofocus :class="{'p-invalid': submitted && !Room.equipment}" />
            <small class="p-error" v-if="submitted && !Room.equipment">Ausstattung ist erforderlich!</small>
          </InputGroup>
        </div>

        <div class="field" id="field_location">
          <label for="location">Standort</label>
          <Dropdown id="location" v-model="Room.location" editable :options="locations" optionLabel="name" placeholder="Suche oder wähle einen Standort aus" class="w-full md:w-14rem" />
        </div>

        <!--
        <div v-for="category in categories" :key="category.key" class="flex align-items-center">
            <RadioButton v-model="selectedCategory" :inputId="category.key" name="dynamic" :value="category.name" />
            <label :for="category.key" class="ml-2">{{ category.name }}</label>
        </div>

        <div class="field">
          <label for="location">Standort</label>
          <InputText id="column_location" v-model.trim="Room.location" required="true" autofocus :class="{'p-invalid': submitted && !Room.location}" />
          <small class="p-error" v-if="submitted && !Room.location">Standort ist erforderlich!</small>
        </div>
        -->

        <template #footer>
          <Button id="cancel_add_room" class="cancel_dialog" label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
          <Button id="add_room" class="save_dialog" label="Save" icon="pi pi-check" text @click="saveRoom" />
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
   <div class="bottom_admin">
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

  const locations = ref([
    { name: 'Mettmann'},
    { name: 'Paderborn'},
    { name: 'Bergisch-Gladbach'}
]);

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
  
    if (Room.value.designation.trim()) {
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

  <style scoped>
    #location{
      width: 100% !important;
    }
  </style>