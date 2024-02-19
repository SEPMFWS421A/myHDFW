<template>
    <div class="top_rounding_admin">
    </div>
    <div class="background_admin">

    <Card style="width: 35rem; overflow: hidden; margin: auto;">
      <template #header>
        <RouterLink to="/Schedule/">
          <img id="nav_card_image" class="nav_card_image" alt="user header" src="@\assets\Studentenverwaltung.jpg" />
        </RouterLink>
      </template>
      <template #title> 
        <span class="nav_card_title">Studentenverwaltung</span>
        <Button id="help_button_user" class="help_button" label="" icon="pi pi-question-circle" v-tooltip="{ value: 'Confirm to proceed', showDelay: 1000, hideDelay: 300 }"/>
      </template>
      <template #content>
          <Toolbar>
            <template #start>
              <Button id="add_user" class="add_user" data-pc-severity="none" label="Nutzer hinzufügen" icon="pi pi-plus" severity="success"  @click.native="openNew" />
            </template>

            <template #end>
              <Button id="delete_user" class="delete_user" label="Nutzer löschen" icon="pi pi-trash" @click="confirmDeleteSelected" :disabled="!selectedUsers || !selectedUsers.length" />
            </template>
          </Toolbar>
      </template>
    </Card>    

    <div>
      <div class="card">
        <DataTable id="table_users"
                   ref="dt" :value="Users" v-model:selection="selectedUsers" dataKey="id" 
                   :paginator="true" :rows="10" :filters="filters"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
          <template #header>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
              <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText id="search_users" v-model="filters['global'].value" placeholder="Search..." />
                          </span>
            </div>
          </template>
          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="mail" header="E-Mail" sortable style="min-width:12rem"></Column>
          <Column field="forename" header="Vorname" sortable style="min-width:16rem"></Column>
          <Column field="surname" header="Nachname" sortable style="min-width:10rem"></Column>
          <Column field="role" header="Rolle" sortable style="min-width:10rem"></Column>
          <Column field="entry" header="Eintritt" sortable style="min-width:10rem"></Column>
          <Column field="exit" header="Austritt" sortable style="min-width:10rem"></Column>
          <Column field="exmatriculated" header="Exmatrikuliert" sortable style="min-width:10rem"></Column>
          <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
              <Button id="edit_column" class="mr-2 edit_column" icon="pi pi-pencil" outlined rounded @click="editUser(slotProps.data)" />
              <Button id="delete_column" class="delete_column" icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteUser(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>
      
      <!--Dialog zum anlegen-->
      <Dialog v-model:visible="UserDialog" :style="{width: '450px'}" header="Nutzer Details" :modal="true" class="p-fluid">

        <div class="field">
          <label for="mail">E-Mail</label>
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-at icons_dialog"></i>
            </InputGroupAddon>
            <InputText id="mail_user" v-model.trim="User.mail" required="true" autofocus :class="{'p-invalid': submitted && !User.mail}" />
          </InputGroup>
          <small class="p-error" v-if="submitted && !User.mail">Mail ist erforderlich!</small>
        </div>
          
        <div class="flex gap-3">
          <div class="field">
            <label for="forename">Vorname</label>
            <InputGroup>
              <InputGroupAddon>
                <span class="icons_dialog">abc</span>
              </InputGroupAddon>
              <InputText id="forename_user" v-model.trim="User.forename" required="true" autofocus :class="{'p-invalid': submitted && !User.forename}" />
            </InputGroup>
            <small class="p-error" v-if="submitted && !User.forename">Vorname ist erforderlich!</small>
          </div>
        
  
          <div class="field">
            <label for="surname">Nachname</label>
            <InputGroup>
              <InputGroupAddon>
                <span class="icons_dialog">abc</span>
              </InputGroupAddon>
              <InputText id="surname_user" v-model.trim="User.surname" required="true" autofocus :class="{'p-invalid': submitted && !User.surname}" />
            </InputGroup>
            <small class="p-error" v-if="submitted && !User.surname">Nachname ist erforderlich!</small>
          </div>
        </div>

        <div class="flex gap-3">
            <div class="field gap-3" id="field_entry">
            <label for="entry">Eintritt</label>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-arrow-right icons_dialog"></i>
                </InputGroupAddon>
                <InputText id="entry_user" v-model="User.entry" editable :options="entrys" optionLabel="name" class="w-full md:w-14rem" />
            </InputGroup>
            <small class="p-error" v-if="submitted && !User.entry">Eintritt ist erforderlich!</small>
            </div>

            
            <div class="field">
                <label for="exit">Austritt</label>
                <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-arrow-left icons_dialog"></i>
                </InputGroupAddon>
                <InputText id="exit_user" v-model.trim="User.exit" required="true" autofocus :class="{'p-invalid': submitted && !User.exit}" />
                </InputGroup>
                <small class="p-error" v-if="submitted && !User.exit">Austritt ist erforderlich!</small>
            </div>
        </div>
        
        <div class="field">
          <label for="role">Rolle</label>
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-user icons_dialog"></i>
            </InputGroupAddon>
            <InputText id="role_user" autoresize rows="5" v-model.trim="User.role" required="true" autofocus :class="{'p-invalid': submitted && !User.role}" />
          </InputGroup>
          <small class="p-error" v-if="submitted && !User.role">Rolle ist erforderlich!</small>
        </div>
          
        <div class="field">
            <label for="exmatriculated">Exmatrikuliert</label>
            <InputGroup>
              <InputGroupAddon>
                  <i class="pi pi-ban icons_dialog"></i>
              </InputGroupAddon>
              <InputText id="exmatriculated_user" v-model.trim="User.exmatriculated" required="true" autofocus :class="{'p-invalid': submitted && !User.exmatriculated}" />
            </InputGroup>
            <small class="p-error" v-if="submitted && !User.exmatriculated">Exmatrikuliert ist erforderlich!</small>
        </div>

        <template #footer>
          <Button id="add_user_cancel" class="cancel_dialog" label="Abbrechen" icon="pi pi-times" text @click="hideDialog"/>
          <Button id="add_user_save" class="save_dialog" label="Speichern" icon="pi pi-check" text @click="saveUser" />
        </template>
      </Dialog>
  
      <!--Dialog zum löschen-->
      <Dialog v-model:visible="deleteUserDialog" :style="{width: '450px'}" header="Bestätigen" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="User">Bist du sicher den Nutzer <b>{{User.forename}}  {{User.surename}}</b> löschen zu wollen?</span>
        </div>
        <template #footer>
          <Button id="cancel_delete_user_dialog" class="no_button" label="Nein" icon="pi pi-times" text @click="deleteUserDialog = false"/>
          <Button id="delete_user_dialog" class="yes_button" label="Ja" icon="pi pi-check" text @click="deleteUser" />
        </template>
      </Dialog>
      
      <!--Dialog zum mehrfach löschen-->
      <Dialog v-model:visible="deleteUsersDialog" :style="{width: '450px'}" header="Bestätigen" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="User">Bist du sicher die Nutzer zu löschen?</span>
        </div>
        <template #footer>
          <Button id="cancel_delete_users_dialog" class="no_button" label="Nein" icon="pi pi-times" text @click="deleteUsersDialog = false"/>
          <Button id="delete_users_dialog" class="yes_button" label="Ja" icon="pi pi-check" text @click="deleteSelectedUsers" />
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
  import { UserService } from '@/service/UserService';
  
  onMounted(() => {
    UserService.getUsers().then((data) => (Users.value = data));
  });
  
  const toast = useToast();
  const dt = ref();
  const Users = ref();
  const UserDialog = ref(false);
  const deleteUserDialog = ref(false);
  const deleteUsersDialog = ref(false);
  const User = ref({});
  const selectedUsers = ref();
  const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
  });
  const submitted = ref(false);

  const entrys = ref([
    { name: 'Student'},
    { name: 'Professor'},
    { name: 'Verwaltung'}
]);

  const openNew = () => {
    User.value = {};
    submitted.value = false;
    UserDialog.value = true;
  };
  const hideDialog = () => {
    UserDialog.value = false;
    submitted.value = false;
  };
  const saveUser = () => {
    submitted.value = true;
  
    if (User.value.mail.trim()) {
      if (User.value.id) {
        Users.value[findIndexById(User.value.id)] = User.value;
        toast.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
      }
      else {
        User.value.id           = createId();
        User.value.code = createId();
        User.value.image = 'User-placeholder.svg';
        User.value.inventoryStatus = User.value.inventoryStatus ? User.value.inventoryStatus.value : 'INSTOCK';
        Users.value.push(User.value);
        toast.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
      }
  
      UserDialog.value = false;
      User.value = {};
    }
  };
  const editUser = (prod) => {
    User.value = {...prod};
    UserDialog.value = true;
  };
  const confirmDeleteUser = (prod) => {
    User.value = prod;
    deleteUserDialog.value = true;
  };
  const deleteUser = () => {
    Users.value = Users.value.filter(val => val.id !== User.value.id);
    deleteUserDialog.value = false;
    User.value = {};
    toast.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
  };
  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < Users.value.length; i++) {
      if (Users.value[i].id === id) {
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
    deleteUsersDialog.value = true;
  };
  const deleteSelectedUsers = () => {
    Users.value = Users.value.filter(val => !selectedUsers.value.includes(val));
    deleteUsersDialog.value = false;
    selectedUsers.value = null;
    toast.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
  };
  </script>

  <style scoped>
    #entry_user{
      width: 100% !important;
    }
    
    #entry_user:focus{
      width: 100% !important;
      outline: none !important;
      border-color: #645FCE !important;
      box-shadow: 0 0 3px #645FCE !important;
    }

    #delete_user:focus{
      box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #CFC25F, 0 1px 2px 0 black !important;
    }

    .add_user{
    background-color: #645FCE; 
    border-color: white;
    }
    .delete_user{
    background-color: #CFC25F; 
    border-color: white;
}
  </style>