<script>
import axios from "axios";
//import data from 'C:/Users/Masifame/IdeaProjects/myHDFW/myHDFW-frontend-vite/src/assets/db.json'
const baseUrl = "http://localhost:3000/Semester";


export default {
  data() {
    return {
      semester: []

      }
    },
  methods: {
    async getApi() {
      let respon = await axios.get(baseUrl);
      console.log(respon);
      this.semester = respon.data;
      console.log(this.semester);
    },
  },

  mounted() {
    this.getApi();
  }

}
</script>

<template>
  <header>
    <div class="head">
      <h1>Notenübersicht</h1>
    <table id="info-bar">
      <tr>
        <td>Name: Marcel Firley</td>
        <td>Matrikelnummer: 12345</td>
        <td>Studiengang: Wirtschaftinformatiker</td>
      </tr>
    </table>
    </div>
  </header>
  <body>
      <div class="main">
      <table>
        <tr>
          <td>1. Semster</td>
          <td>25 ECTS</td>
        </tr>
        <tr>
          <td>Modul</td>
          <td>Status</td>
          <td>Note</td>
          <td>Credit</td>
          <td>Versuch</td>
          <td>Prüfungstermin</td>
        </tr>
        <tr v-for="semester in semester" v-bind:key="semester.index">
          <td>{{semester.modulname}}</td>
          <td>{{semester.status}}</td>
          <td>{{semester.note}}</td>
          <td>{{semester.credit}}</td>
          <td>{{semester.versuch}}</td>
          <td>{{semester.pruefungstermin}}</td>
        </tr>
      </table>
      </div>
  </body>
  <footer>
      <h1><a href="http://127.0.0.1:5173/Overview">Legende</a></h1>
      <h1><a href="http://127.0.0.1:5173/Overview">Modulhandbuch</a></h1>
      <br>
      <h1>Gesamtdurschnitt: 0.00</h1><h1>Gesamt ETCS: 5/180</h1>
  </footer>
</template>

<style>

header{
  background-color: aqua;
}

body{
  background-color: white;
  height: auto;
}

footer{


}

h1{
  margin: 0;
}

.head{
  text-align: center;
}
.head table{
margin-left: auto;
margin-right: auto;
}
.head table td{
  padding-right: 250px;
  padding-left: 250px;
}

.main table{
  margin-right: auto;
  margin-left: 200px;
}
.main table td{
  padding-right: 100px;
  padding-left: 100px;
  background-color: lightgray;
}

</style>