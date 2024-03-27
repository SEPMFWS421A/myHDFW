<template>
  <div class="top_rounding_admin">
  </div>
  <div class="background_admin">

    <div class="Notenübersicht">
    <Card style="width: 35rem; overflow: hidden; margin: auto;">
      <template #header>
        <RouterLink to="/Schedule/">
          <img id="nav_card_image" class="nav_card_image" alt="user header"
               src="@\assets\Notenübersicht.jpg"/>
        </RouterLink>
      </template>
      <template #title>
        <span class="nav_card_title">Notenüberblick</span>
      </template>
    </Card>
    </div>



    <div>
      <div class="card">
        <DataTable id="table_grades"
                   ref="dt" :value="Grades" v-model:selection="selectedGrades" dataKey="id"
                   :paginator="true" :rows="5" :filters="filters"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   :rowsPerPageOptions="[5,10,15,20]"
                   currentPageReportTemplate="Zeige {last} von 20 Semester Einträgen">

          <Column field="semester" header="Semester" sortable style="min-width:12rem"></Column>
          <Column field="modul" header="Modul" sortable style="min-width:16rem"></Column>
          <Column field="status" header="Status" sortable style="min-width:10rem"></Column>
          <Column field="grade" header="Note" sortable style="min-width:10rem"></Column>
          <Column field="try" header="Versuch" sortable style="min-width:10rem"></Column>
          <Column field="date" header="Datum" sortable style="min-width:10rem"></Column>
          <Column field="credits" header="Credits" sortable style="min-width:10rem"></Column>
        </DataTable>
      </div>
    </div>
  </div>


  <div class="bottom_rounding_admin">
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {FilterMatchMode} from 'primevue/api';
import {GradeService} from "@/service/GradeService.js";

onMounted(() => {
  GradeService.getGrades().then((data) => (Grades.value = data));
});

const dt = ref();
const Grades = ref();
const selectedGrades = ref();
const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});


</script>

<style scoped>

</style>
