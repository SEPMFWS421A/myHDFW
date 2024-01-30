<template>
  <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>

  <div class="main">
  <h2 style="color: #6F6AF8; padding: 1px;margin-top: 60px;font-size:120%; font-family: monospace;">Zum Uni-Portal</h2>
    <img src="../assets/students.jpg" alt="Happy Students Img">
    <h2 style="background-color: #FCFDFD; padding: 10px; margin-bottom:60px;border-radius: 10px">Die Cafeteria ist geöffnet</h2>
  </div>
  <div class="light" style="background-color: #E8E9FF;position: absolute; top:12.4%; right: 115px; height:70px; width:100px; border-radius: 45px"></div>
  <div class="hint">
    <img src="../assets/light.jpg" alt="hint" width="20%" height="20%">
    <h2 style="color: #838383">Erinnerung</h2>
    <h2 style="padding-bottom:30px">Ihre nächste Klausur ist <br> am 24.01.2024 </h2>
  </div>
  <div class="sideview">
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

<style lang="css">
h2{
  font-family: 'Inter';
}

.main{
  background-color: #ECF0F2;
  width: 400px;
  margin:0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  filter: drop-shadow(0px 5px 0px lightgray);
}
.main h2{
  text-align: center;
  margin: 25px;
}
.main img{
  display: block;
  margin: 5px auto 30px auto;
  width: 60%;
  border-radius: 20px;
  filter: drop-shadow(1px 4px 1px lightgray);
}

.sideview{
  position: absolute;
  top:40%;
  right: 40px;
  border-radius: 10px;
}
.sideview h2{
  padding: 15px 60px 10px 20px;
  margin: 10px;
  background-color: #9598D6;
  font-size: 180%;
  border-radius: 10px;
  color: white;
}
.sideview h4{
  margin:0;
  padding-left:10px;
}

.hint{
  background-color: #E8E9FF;
  position: absolute;
  top:15%;
  right: 50px;
  border-radius: 10px;
  filter: drop-shadow(1px 4px 1px lightgray);
  padding: 1px 20px 1px 20px;
}
.hint h2{
  text-align: center;
  padding: 1px 10px 10px 10px;
  font-size: 100%;
}
.hint img {
  top:10%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50px;
}
</style>