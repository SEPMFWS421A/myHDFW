<template>
  <div v-if="isVisible" class="card-container">
    <p>{{ msg }}</p>
    <div class="row">
      <div class="Raumverwaltung">
        <Card style="width: 30rem; overflow: hidden">
          <template #header>
            <RouterLink to="/raumverwaltung/">
              <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Raumverwaltung.jpg" />
            </RouterLink>
          </template>
          <template #title><span class="nav_card_title">Raumverwaltung</span></template>
          <template #subtitle>Räume anlegen und löschen</template>
        </Card>
      </div>

      <div class="Eventverwaltung">
        <Card style="width: 30rem; overflow: hidden;" >
          <template #header>
            <RouterLink to="/Eventverwaltung/">
            <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Eventverwaltung.png" />
            </RouterLink>
          </template>
          <template #title><span class="nav_card_title">Eventverwaltung</span></template>
          <template #subtitle>Events anlegen und löschen</template>
        </Card>
      </div>
    </div>

    <div class="row">
      <div class="Prüfungsverwaltung">
        <Card style="width: 30rem; overflow: hidden">
          <template #header>
             <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Prüfungsverwaltung.jpg" />
          </template>
          <template #title><span class="nav_card_title">Prüfungsverwaltung</span></template>
          <template #subtitle>Prüfungen anlegen und löschen</template>
        </Card>
      </div>

      <div class="Studentenverwaltung">
        <Card style="width: 30rem; overflow: hidden">
          <template #header>
            <RouterLink to="/studentenverwaltung/">
              <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Studentenverwaltung.jpg" />
            </RouterLink>
          </template>
          <template #title><span class="nav_card_title">Studentenverwaltung</span></template>
          <template #subtitle>Studenten anlegen und löschen</template>
        </Card>
      </div>
    </div>
  </div>
</template>




<script>
export default {
    props: {
      isVisible: true,
      msg: String,
    }
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