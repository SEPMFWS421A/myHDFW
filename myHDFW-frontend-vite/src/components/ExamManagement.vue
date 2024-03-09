<template>
    <div class="top_rounding_admin">
    </div>
    <div class="background_admin">
  
      <Card style="width: 35rem; overflow: hidden; margin: auto;">
        <template #header>
          <RouterLink to="/Schedule/">
            <img id="nav_card_image" class="nav_card_image" alt="user header"
                 src="@\assets\Prüfungsverwaltung.jpg"/>
          </RouterLink>
        </template>
        <template #title>
          <span class="nav_card_title">Prüfungsverwaltung</span>
          <Button id="help_button_exam" class="help_button" label="" icon="pi pi-question-circle"
                  v-tooltip="{ value: 'Confirm to proceed', showDelay: 1000, hideDelay: 300 }"/>
        </template>
        <template #content>
          <Toolbar>
            <template #start>
              <Button id="add_exam" class="add_exam" data-pc-severity="none" label="Prüfung hinzufügen" icon="pi pi-plus"
                      severity="success" @click.native="openNew"/>
            </template>
  
            <template #end>
              <Button id="delete_exam" class="delete_exam" label="Prüfung löschen" icon="pi pi-trash"
                      @click="confirmDeleteSelected" :disabled="hideDelete()"/>
            </template>
          </Toolbar>
        </template>
      </Card>
  
      <div>
        <div class="card">
          <DataTable id="table_exams"
                     ref="dt" :value="Exams" v-model:selection="selectedExams" dataKey="id"
                     :paginator="true" :rows="10" :filters="filters"
                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                     :rowsPerPageOptions="[5,10,25]"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} exams">
            <template #header>
              <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span class="p-input-icon-left">
                                <i class="pi pi-search"/>
                                <InputText id="search_exams" v-model="filters['global'].value" placeholder="Search..."/>
                            </span>
              </div>
            </template>
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="lecture"     	                header="Prüfung" sortable style="min-width:12rem"></Column>    
                <Column field="study_group"                     header="Studentengruppe" sortable style="min-width:12rem"></Column>
                <Column field="lecturer"                        header="Dozent" sortable style="min-width:12rem"></Column>
                <Column field="semester"                        header="Semester" sortable style="min-width:12rem"></Column>
                <Column field="start_date"                      header="Startdatum" sortable style="min-width:12rem"></Column>
                <Column field="end_date"                        header="Enddatum" sortable style="min-width:12rem"></Column>
                <Column field="form_of_examination"             header="Prüfungsart" sortable style="min-width:12rem"></Column>
                <Column field="deadline_lecturer"               header="Beabrbeitungsfrist" sortable style="min-width:12rem"></Column>
            <Column :exportable="false" style="min-width:8rem">
              <template #body="slotProps">
                <Button id="edit_column" class="mr-2 edit_column" icon="pi pi-pencil" outlined rounded
                        @click="editExam(slotProps.data)"/>
                <Button id="delete_column" class="delete_column" icon="pi pi-trash" outlined rounded severity="danger"
                        @click="confirmDeleteExam(slotProps.data)"/>
              </template>
            </Column>
          </DataTable>
        </div>
  
        <!--Dialog zum anlegen-->
        <Dialog v-model:visible="ExamDialog" :style="{width: '450px'}" header="Prüfung Details" :modal="true"
                class="p-fluid">
                <div class="field">

            <label for="lecture">Prüfung für Vorlesung</label>
            <InputGroup>
              <InputGroupAddon>
                <span class="icons_dialog">abc</span>
              </InputGroupAddon>
              <InputText id="lecture_exam" v-model.trim="Exam.lecture" required="true" autofocus
                         :class="{'p-invalid': submitted && !Exam.lecture}"/>
            </InputGroup>
            <small class="p-error" v-if="submitted && !Exam.lecture">Vorlesung der Prüfung ist erforderlich!</small>
          </div>

          <div class="field">
            <label for="study_group">Studentengruppe</label>
            <InputGroup>
              <InputGroupAddon>
                <span class="icons_dialog">abc</span>
              </InputGroupAddon>
              <InputText id="study_group_exam" v-model.trim="Exam.study_group" required="true" autofocus
                         :class="{'p-invalid': submitted && !Exam.study_group}"/>
            </InputGroup>
            <small class="p-error" v-if="submitted && !Exam.study_group">Studentengruppe ist erforderlich!</small>
          </div>
    

          <div class="field">
            <label for="lecturer">Dozent</label>
            <InputGroup>
              <InputGroupAddon>
                <span class="icons_dialog">abc</span>
              </InputGroupAddon>
              <InputText id="lecturer_exam" v-model.trim="Exam.lecturer" required="true" autofocus
                         :class="{'p-invalid': submitted && !Exam.lecturer}"/>
            </InputGroup>
            <small class="p-error" v-if="submitted && !Exam.lecturer">Dozent ist erforderlich!</small>
          </div>

          <div class="field">
            <label for="semester">Semester</label>
            <InputGroup>
              <InputGroupAddon>
                <span class="icons_dialog">abc</span>
              </InputGroupAddon>
              <InputText id="semester_exam" v-model.trim="Exam.semester" required="true" autofocus
                         :class="{'p-invalid': submitted && !Exam.semester}"/>
            </InputGroup>
            <small class="p-error" v-if="submitted && !Exam.semester">Semester ist erforderlich!</small>
          </div>

          <div class="field">
            <label for="start_date">Startdatum</label>
            <InputGroup>
              <InputGroupAddon>
                <span class="icons_dialog">abc</span>
              </InputGroupAddon>
              <InputText id="start_date_exam" v-model.trim="Exam.start_date" required="true" autofocus
                         :class="{'p-invalid': submitted && !Exam.start_date}"/>
            </InputGroup>
            <small class="p-error" v-if="submitted && !Exam.start_date">Startdatum ist erforderlich!</small>
          </div>

          <div class="field">
            <label for="end_date">Enddatum</label>
            <InputGroup>
              <InputGroupAddon>
                <span class="icons_dialog">abc</span>
              </InputGroupAddon>
              <InputText id="end_date_exam" v-model.trim="Exam.end_date" required="true" autofocus
                         :class="{'p-invalid': submitted && !Exam.end_date}"/>
            </InputGroup>
            <small class="p-error" v-if="submitted && !Exam.end_date">Enddatum ist erforderlich!</small>
          </div>

          <div class="field">
            <label for="form_of_examination">Prüfungsart</label>
            <InputGroup>
              <InputGroupAddon>
                <span class="icons_dialog">abc</span>
              </InputGroupAddon>
              <InputText id="form_of_examination_exam" v-model.trim="Exam.form_of_examination" required="true" autofocus
                         :class="{'p-invalid': submitted && !Exam.form_of_examination}"/>
            </InputGroup>
            <small class="p-error" v-if="submitted && !Exam.form_of_examination">Prüfungsart ist erforderlich!</small>
          </div>

          <div class="field">
            <label for="deadline_lecturer">Beabrbeitungsfrist</label>
            <InputGroup>
              <InputGroupAddon>
                <span class="icons_dialog">abc</span>
              </InputGroupAddon>
              <InputText id="deadline_lecturer_exam" v-model.trim="Exam.deadline_lecturer" required="true" autofocus
                         :class="{'p-invalid': submitted && !Exam.deadline_lecturer}"/>
            </InputGroup>
            <small class="p-error" v-if="submitted && !Exam.deadline_lecturer">Beabrbeitungsfrist ist erforderlich!</small>
          </div>







          <template #footer>
            <Button id="add_exam_cancel" class="cancel_dialog" label="Abbrechen" icon="pi pi-times" text
                    @click="hideDialog"/>
            <Button id="add_exam_save" class="save_dialog" label="Speichern" icon="pi pi-check" text @click="saveExam"/>
          </template>
        </Dialog>
  
        <!--Dialog zum löschen-->
        <Dialog v-model:visible="deleteExamDialog" :style="{width: '450px'}" header="Bestätigen" :modal="true">
          <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
            <span v-if="Exam">Bist du sicher die Prüfung der Vorlesung <b>{{ Exam.lecture }}</b> für die Studenienruppe {{ Exam.study_group }} löschen zu wollen?</span>
          </div>
          <template #footer>
            <Button id="cancel_delete_exam_dialog" class="no_button" label="Nein" icon="pi pi-times" text
                    @click="deleteExamDialog = false"/>
            <Button id="delete_exam_dialog" class="yes_button" label="Ja" icon="pi pi-check" text @click="deleteExam"/>
          </template>
        </Dialog>
  
        <!--Dialog zum mehrfach löschen-->
        <Dialog v-model:visible="deleteExamsDialog" :style="{width: '450px'}" header="Bestätigen" :modal="true">
          <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
            <span v-if="Exam">Bist du sicher die Prüfungen zu löschen?</span>
          </div>
          <template #footer>
            <Button id="cancel_delete_exams_dialog" class="no_button" label="Nein" icon="pi pi-times" text
                    @click="deleteExamsDialog = false"/>
            <Button id="delete_exams_dialog" class="yes_button" label="Ja" icon="pi pi-check" text
                    @click="deleteSelectedExams"/>
          </template>
        </Dialog>
      </div>
    </div>
    <div class="bottom_rounding_admin">
    </div>
  </template>
  
  <script setup>
  import {onMounted, ref} from 'vue';
  import {FilterMatchMode} from 'primevue/api';
  import {useToast} from 'primevue/usetoast';
  import {ExamService} from '@/service/ExamService';
  import {ExamServiceHelp} from '@/service/ExamServiceHelp';
  
  const Exams = ref();
  const Exam = ref({                
                id: '',
                study_group: '',
                lecture: '',
                lecturer: '',
                semester: '',
                start_date: '',
                end_date: '',
                form_of_examination: '',
                deadline_lecturer: ''});

  onMounted(() => {
    ExamService.getExams().then((data) => (Exams.value = data));
    ExamServiceHelp.getExam().then(() => (Exam.value = {}));
  });
  
  const toast = useToast();
  const dt = ref();
  const ExamDialog = ref(false);
  const deleteExamDialog = ref(false);
  const deleteExamsDialog = ref(false);
  const selectedExams = ref();
  const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
  });
  const submitted = ref(false);

  let isHidden;
  
  const locations = ref([
    {name: 'Mettmann'},
    {name: 'Paderborn'},
    {name: 'Bergisch-Gladbach'}
  ]);
  
  const openNew = () => {
    Exam.value = {};
    submitted.value = false;
    ExamDialog.value = true;
  };
  const hideDialog = () => {
    ExamDialog.value = false;
    submitted.value = false;
  };
  const saveExam = () => {
    submitted.value = true;
  
    if (Exam.value.lecture.trim()) {
      if (Exam.value.id) {
        Exams.value[findIndexById(Exam.value.id)] = Exam.value;
        toast.add({severity: 'success', summary: 'Successful', detail: 'Exam Updated', life: 3000});
      } else {
        Exam.value.id = createId();
        Exam.value.code = createId();
        Exam.value.image = 'Exam-placeholder.svg';
        Exam.value.inventoryStatus = Exam.value.inventoryStatus ? Exam.value.inventoryStatus.value : 'INSTOCK';
        Exams.value.push(Exam.value);
        toast.add({severity: 'success', summary: 'Successful', detail: 'Exam Created', life: 3000});
      }
  
      ExamDialog.value = false;
      Exam.value = {};
    }
  };
  const editExam = (prod) => {
    Exam.value = {...prod};
    ExamDialog.value = true;
  };
  const confirmDeleteExam = (prod) => {
    Exam.value = prod;
    deleteExamDialog.value = true;
  };
  const deleteExam = () => {
    Exams.value = Exams.value.filter(val => val.id !== Exam.value.id);
    deleteExamDialog.value = false;
    Exam.value = {};
    toast.add({severity: 'success', summary: 'Successful', detail: 'Exam Deleted', life: 3000});
  };
  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < Exams.value.length; i++) {
      if (Exams.value[i].id === id) {
        index = i;
        break;
      }
    }
  
    return index;
  };
  const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  const exportCSV = () => {
    dt.value.exportCSV();
  };
  const confirmDeleteSelected = () => {
    deleteExamsDialog.value = true;
  };
  const deleteSelectedExams = () => {
    Exams.value = Exams.value.filter(val => !selectedExams.value.includes(val));
    deleteExamsDialog.value = false;
    selectedExams.value = null;
    toast.add({severity: 'success', summary: 'Successful', detail: 'Exams Deleted', life: 3000});
  };

  const hideDelete = () => {
    isHidden = !selectedExams || !selectedExams.length;
    return isHidden;
  };

  </script>
  
  <style scoped>
      #delete_exam:focus{
        box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #CFC25F, 0 1px 2px 0 black !important;
      }
  
      .add_exam{
        background-color: #645FCE; 
        border-color: white;
      }
      .delete_exam{
        background-color: #CFC25F; 
        border-color: white;
      }
      #location_exam {
        width: 100% !important;
      }
  
      #location_exam:focus {
        width: 100% !important;
        outline: none !important;
        border-color: #645FCE !important;
        box-shadow: 0 0 3px #645FCE !important;
      }
  
      #delete_exam:focus {
        box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #CFC25F, 0 1px 2px 0 black !important;
      }
  </style>
  