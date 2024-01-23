<template>

  <header>
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='style'>
  <RouterLink to="/Schedule">Zum Kalender</RouterLink>
  <RouterLink to="/Administration">Zur Administration </RouterLink>
  </header>
  <div class="main">
  <h2>Zum Uni Portal</h2>
    <img src="../assets/happystudents-min.jpg" alt="Happy Students Img" width="50%" height="30%">
    <h2 style="background-color: mediumpurple; padding: 10px; border-radius: 10px">Die Cafeteria ist geöffnet</h2>
  </div>
  <div class="hint">
    <img src="../assets/light.jpg" alt="hint" width="20%" height="20%">
    <h2>Erinnerung</h2>
    <h2>Ihre nächste Klausur ist <br> am 24.01.2024 </h2>
  </div>
  <div class="sidebar">
    <h4>Uni Konto:</h4>
    <h2>$14.032.22</h2>
    <br>
    <h4>Datum:</h4>
    <h2>31.01.2024</h2>
    <br>
    <h4>Uhrzeit:</h4>
    <h2>12:09:00</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  }
};
</script>

<style>
h2{
  font-family: "Inter", "Courier New", monospace;
}

.main{
  background-color: lightgray;
  width: 350px;
  margin:0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.main h2{
  text-align: center;
  margin: 25px;
  font-weight: bold;

}
.main img{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  border-radius: 20px;
  filter: drop-shadow(1px 1px 1px grey);
}

.sidebar{
  position: absolute;
  top:40%;
  right: 40px;
  border-radius: 10px;
}
.sidebar h2{
  padding-right: 70px;
  padding-left:10px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: lightgray;
  font-size: 180%;
  border-radius: 10px;
}
.sidebar h4{
  padding-top:50px;
  margin:0;
}

.hint{
  background-color: lightblue;
  position: absolute;
  top:10%;
  right: 50px;
  border-radius: 10px;
}
.hint h2{
  text-align: center;
  padding-top: 20px;
}
.hint img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>