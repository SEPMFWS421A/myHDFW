<template>
  <div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedStudents || !selectedStudents.length" />
        </template>

        <template #end>
          <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
          <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)"  />
        </template>
      </Toolbar>

      <DataTable ref="dt" :value="students" v-model:selection="selectedStudents" dataKey="id"
                 :paginator="true" :rows="10" :filters="filters"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students">
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 class="m-0">Manage Students</h4>
            <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="code" header="Matrikelnummer" sortable style="min-width:12rem"></Column>
        <Column field="name" header="Name des Studenten" sortable style="min-width:16rem"></Column>
        <Column header="Image">
          <template #body="slotProps">
            <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="shadow-2 border-round" style="width: 64px" />
          </template>
        </Column>
        <Column field="price" header="Eintrittsdatum" sortable style="min-width:8rem">
          <template #body="slotProps">
            {{formatCurrency(slotProps.data.price)}}
          </template>
        </Column>
        <Column field="category" header="Studiengang" sortable style="min-width:10rem"></Column>
        <Column field="rating" header="Reviews" sortable style="min-width:12rem">
          <template #body="slotProps">
            <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
          </template>
        </Column>
        <Column field="inventoryStatus" header="Status" sortable style="min-width:12rem">
          <template #body="slotProps">
            <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
          </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editStudent(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteStudent(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="studentDialog" :style="{width: '450px'}" header="Student Details" :modal="true" class="p-fluid">
      <img v-if="student.image" :src="`https://primefaces.org/cdn/primevue/images/product/${student.image}`" :alt="student.image" class="block m-auto pb-3" />
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model.trim="student.name" required="true" autofocus :class="{'p-invalid': submitted && !student.name}" />
        <small class="p-error" v-if="submitted && !student.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="student.description" required="true" rows="3" cols="20" />
      </div>

      <div class="field">
        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
        <Dropdown id="inventoryStatus" v-model="student.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <Tag :value="slotProps.value.value" :severity="getStatusLabel(slotProps.value.label)" />
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <Tag :value="slotProps.value" :severity="getStatusLabel(slotProps.value)" />
            </div>
            <span v-else>
							{{slotProps.placeholder}}
						</span>
          </template>
        </Dropdown>
      </div>

      <div class="field">
        <label class="mb-3">Category</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton id="category1" name="category" value="Accessories" v-model="student.category" />
            <label for="category1">Accessories</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton id="category2" name="category" value="Clothing" v-model="student.category" />
            <label for="category2">Clothing</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton id="category3" name="category" value="Electronics" v-model="student.category" />
            <label for="category3">Electronics</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton id="category4" name="category" value="Fitness" v-model="student.category" />
            <label for="category4">Fitness</label>
          </div>
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col">
          <label for="price">Price</label>
          <InputNumber id="price" v-model="student.price" mode="currency" currency="USD" locale="en-US" />
        </div>
        <div class="field col">
          <label for="quantity">Quantity</label>
          <InputNumber id="quantity" v-model="student.quantity" integeronly />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" text @click="saveStudent" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteStudentDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="student">Are you sure you want to delete <b>{{student.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteStudentDialog = false"/>
        <Button label="Yes" icon="pi pi-check" text @click="deleteStudent" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteStudentsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="student">Are you sure you want to delete the selected students?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteStudentsDialog = false"/>
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedStudents" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {FilterMatchMode} from 'primevue/api';
import {useToast} from 'primevue/usetoast';
import {StudentService} from '@/service/StudentService';

onMounted(() => {
  StudentService.getStudents().then((data) => (students.value = data));
});

const toast = useToast();
const dt = ref();
const students = ref();
const studentDialog = ref(false);
const deleteStudentDialog = ref(false);
const deleteStudentsDialog = ref(false);
const student = ref({});
const selectedStudents = ref();
const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);
const statuses = ref([
  {label: 'Studiert', value: 'studiert'},
  {label: 'Fehler', value: 'fehler'},
  {label: 'Exmatrikuliert', value: 'exmatrikuliert'}
]);

const formatCurrency = (value) => {
  if(value)
    return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  return;
};
const openNew = () => {
  student.value = {};
  submitted.value = false;
  studentDialog.value = true;
};
const hideDialog = () => {
  studentDialog.value = false;
  submitted.value = false;
};
const saveStudent = () => {
  submitted.value = true;

  if (student.value.name.trim()) {
    if (student.value.id) {
      student.value.inventoryStatus = student.value.inventoryStatus.value ? student.value.inventoryStatus.value : student.value.inventoryStatus;
      students.value[findIndexById(student.value.id)] = student.value;
      toast.add({severity:'success', summary: 'Successful', detail: 'Student Updated', life: 3000});
    }
    else {
      student.value.id = createId();
      student.value.code = createId();
      student.value.image = 'student-placeholder.svg';
      student.value.inventoryStatus = student.value.inventoryStatus ? student.value.inventoryStatus.value : 'INSTOCK';
      students.value.push(student.value);
      toast.add({severity:'success', summary: 'Successful', detail: 'Student Created', life: 3000});
    }

    studentDialog.value = false;
    student.value = {};
  }
};
const editStudent = (prod) => {
  student.value = {...prod};
  studentDialog.value = true;
};
const confirmDeleteStudent = (prod) => {
  student.value = prod;
  deleteStudentDialog.value = true;
};
const deleteStudent = () => {
  students.value = students.value.filter(val => val.id !== student.value.id);
  deleteStudentDialog.value = false;
  student.value = {};
  toast.add({severity:'success', summary: 'Successful', detail: 'Student Deleted', life: 3000});
};
const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < students.value.length; i++) {
    if (students.value[i].id === id) {
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
  deleteStudentsDialog.value = true;
};
const deleteSelectedStudents = () => {
  students.value = students.value.filter(val => !selectedStudents.value.includes(val));
  deleteStudentsDialog.value = false;
  selectedStudents.value = null;
  toast.add({severity:'success', summary: 'Successful', detail: 'Students Deleted', life: 3000});
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'Studiert':
      return 'success';

    case 'Fehler':
      return 'warning';

    case 'Exmatrikuliert':
      return 'danger';

    default:
      return null;
  }
};

</script>
