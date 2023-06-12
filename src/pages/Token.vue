<template>
  <div class="container">
    <div class="assessment">
      <div class="welcome">
        Welcome, you are currently in the queue.
      </div>
      <div class="bold">
        Your Number:
      </div>
      <div class="queueNo">
        {{ window }}{{ queNum }}
      </div>
      <div class="window">
        Window {{ window }}
      </div>
      <div class="outro">
        Your number will be called shortly.
      </div>
      <div class="dateDetails">
        {{ curDate }} {{ curTime }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import logo from "~/assets/images/logo.png";
</script>

<script>
export default {
  data() {
    return {
      window:'',
      queNum:'',
      curDate:"",
      curTime:"",
    }
  },
  created (){
    this.window = localStorage.getItem('windowKiosk');
    this.queNum = localStorage.getItem('kioskQ');
    this.curTime = localStorage.getItem('curTime');
    this.curDate = localStorage.getItem('curDate');
  },
  methods: {
  
  }
}

  </script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-weight: 700;
}

@media print {
  .assessment {
    visibility: visible !important;
    print-color-adjust: exact;
  }
}

.assessment {
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))
          drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))
          drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))
          drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.1));
  background-color: #ffffff;
  height: 350px;
  padding: 60px;
  width: 500px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
  font-size: 18px;
  visibility: hidden;
}

.bold{
  font-size: 25px;
  text-align: center;
}

.queueNo{
  font-size: 45px;
  font-weight: bolder;
  text-align: center;
}

.welcome{
  text-align: center  ;
  color: #333333;
}

.window{
  text-align: center;
  font-weight: 780;
}

.dateDetails{
  text-align: end;
  color: #333333;
}

.outro{
  color: #333333;
}

</style>
