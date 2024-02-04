<template>
  <div class="card-container">
    <div class="row">
      <div class="Raumverwaltung">
        <Card style="width: 30rem; overflow: hidden">
          <template #header>
            <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Raumverwaltung.jpg" />
          </template>
          <template #title>Raumverwaltung</template>
          <template #subtitle>Räume anlegen und löschen</template>
        </Card>
      </div>

      <div class="Eventverwaltung">
        <Card style="width: 30rem; overflow: hidden;" >
          <template #header>
            <RouterLink to="/Eventverwaltung/">
            <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Eventverwaltung.jpg" />
            </RouterLink>
          </template>
          <template #title>Eventverwaltung</template>
          <template #subtitle>Events anlegen und löschen</template>
        </Card>
      </div>
    </div>

    <div class="row">
      <div class="Prüfungsverwaltung">
        <Card style="width: 30rem; overflow: hidden">
          <template #header>
            <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Prüfungsverwaltung.png" />
          </template>
          <template #title>Prüfungsverwaltung</template>
          <template #subtitle>Prüfungen anlegen und löschen</template>
        </Card>
      </div>

      <div class="Studentenverwaltung">
        <Card style="width: 30rem; overflow: hidden">
          <template #header>
            <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Studentenverwaltung.png" />
          </template>
          <template #title>Studentenverwaltung</template>
          <template #subtitle>Studenten anlegen und löschen</template>
        </Card>
      </div>
    </div>
  </div>
</template>




<script>
export default {

};
</script>

<style>
.card-container {
  display: flex;
  flex-direction: column; /* Karten in einer Spalte anordnen */
  justify-content : center;
  gap: 80px;
}


.row {
  display: flex;
  justify-content: space-between; /* Nur für die Karten in der gleichen Zeile */
  justify-content : center;
  gap: 80px;
}

</style>