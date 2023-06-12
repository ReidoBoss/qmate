<template>
  <div class="flex h-full justify-center items-center w-full mx-0">
      <div class="white h-full justify-center items-center w-full mx-0">
          <div class="form ">
              <div class="left">
                <div class="text">
                  <p class= "text1">Scan Here</p>
                </div>
                <div class="qr">
                  <img src="../assets/images/qr.png" alt="">
                </div>
              </div>
                <div class="right">
                    <p class="text2">Currently Serving</p>
                    <div class="upper">
                      <div class="a">
                        <div class="upA">
                          <p class="windowName">Window A</p>
                        </div>
                        <div class="lowA">
                          <p class="queue">{{currentAtext}}</p>
                        </div>
                      </div>
                      <div class="b">
                        <div class="upB">
                          <p class="windowName">Window B</p>
                        </div>
                        <div class="lowB">
                          <p class="queue">{{ currentBtext }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="lower">
                      <div class="number">
                        <div class="queueNum">
                          <p class="label">WINDOW A</p>
                          <p class="items">{{q1Af}}</p>
                          <p class="items">{{q2Af}}</p>
                          <p class="items">{{q3Af}}</p>
                          <p class="items">{{q4Af}}</p>
                          <p class="items">{{q5Af}}</p>
                        </div>
                      </div>
                        <div class="windowSide">
                          <div class="windowNum">
                            <p class="label">WINDOW B</p>
                            <p class="items"> {{q1Bf}}</p>
                            <p class="items"> {{q2Bf}}</p>
                            <p class="items"> {{q3Bf}}</p>
                            <p class="items"> {{q4Bf}}</p>
                            <p class="items"> {{q5Bf}}</p>
                          </div>

                        </div>
                      </div>
                </div>  
              </div>
              <audio ref="audioNotif" src="https://firebasestorage.googleapis.com/v0/b/fir-68a5f.appspot.com/o/Announcement%20FX.mp3?alt=media&token=127c3677-c804-4523-a5bd-dd4438ce56ba" ></audio>

          </div>
      </div>
      <p>{{ ringNameA }}{{ ringNameB }}{{ ringNameAT }}{{ ringNameBT }}</p>
      <p>{{ currentA }}{{ currentB }}</p>
</template>

<script>
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";





const firebaseConfig = {
  apiKey: "AIzaSyBCYeQpyCqsu2zMsH69d3QKdxYLc0N5K5o",
  authDomain: "q-mate-e981c.firebaseapp.com",
  databaseURL: "https://q-mate-e981c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "q-mate-e981c",
  storageBucket: "q-mate-e981c.appspot.com",
  messagingSenderId: "177787216625",
  appId: "1:177787216625:web:0ed0fa8b9407709986bf50",
  measurementId: "G-1XSWKNTPYD"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export default {
  
  data() {
    return {
      currentAtext: '',
      currentAasd:'',
      currentB:null,
      currentBtext: '',
      counterVariable: null,
      counterVariableB: '',
      qA: '',
      q1Af : '',
      q2Af : '',
      q3Af: '',
      q4Af:'',
      q5Af:'',
      q1Bf : '',
      q2Bf : '',
      q3Bf: '',
      q4Bf:'',
      q5Bf:'',
      ringAYow:false,
      ringBYow:false,
      ringNameA:'',
      ringNameB:'',
      ringNameAT:'',
      ringNameBT:'',
     

    };
  },
  
  
  
  
  mounted() {
    const dbRef = ref(db);
    const dbRefB = ref(db);

    
  
            const dbRefRingerA= ref(db, `ringA`);
            update(dbRefRingerA, {ringA: false});   

            const dbRefRingerB= ref(db, `ringB`);
            update(dbRefRingerB, {ringB: false});    


            onValue(
                        child(dbRef, `ringA/ringA`),
                        (snapshot) => {
                          console.log("I am fucking asd");

                          this.snapshotval = snapshot.val();
                          if(snapshot.val()==true){

                          
                          this.$refs.audioNotif.play();
                          }
                            if(this.snapshotval==true){
                              this.speakThis = "ATTENTION"+"..." + this.currentAtext +"...."+"Mister or Miss"+this.ringNameA+"..."+"Please proceed to Counter A.";
                              const synth = window.speechSynthesis;
                              const utterance = new SpeechSynthesisUtterance(this.speakThis);

                              setTimeout(() => {
                                synth.speak(utterance);
                              }, 2800);

                            }

                    });  

                    onValue(
                        child(dbRef, `ringB/ringB`),
                        (snapshot) => {
                          if(snapshot.val()==true){
                              this.$refs.audioNotif.play();
                          }
                        

                          this.snapshotval = snapshot.val();
                            if(this.snapshotval==true){
                              this.speakThis = "ATTENTION"+"..." + this.currentBtext +"...."+"Mister or Miss"+this.ringNameB+"..."+"Please proceed to Counter B.";
                              const synth = window.speechSynthesis;
                              const utterance = new SpeechSynthesisUtterance(this.speakThis);

                              setTimeout(() => {
                                synth.speak(utterance);
                              }, 2800);

                            }

                    });
         

    
// Currently Serving A
onValue(
        child(dbRef, "curA/curA"),
        (snapshot) => {
          this.currentAasd = snapshot.val();
          this.currentA = Number(snapshot.val());
          console.log(this.currentA+"yeah");
          this.currentAabs = Math.abs(snapshot.val());


          if(snapshot.val() == 0){
              this.currentAtext = "-";

          }
          else if (snapshot.val()>0){this.currentA = Number(snapshot.val());
               this.currentAtext = "A"+Number(snapshot.val());
               console.log("A :  val is greater 0");


              onValue(
                child(dbRef, `users/${this.currentA}/lname`),
                (snapshot) => {
                  this.temp = snapshot.val();
                  if(this.temp===null){
                    console.log("this is a");
                  }            
                  else if(this.temp!=null){
                    this.ringNameA = snapshot.val();


                  }

                },
                (error) => {
                  console.error(error);
                }
              );
              
              }
          if (snapshot.val()<0){
            this.currentAtext = "B"+this.currentAabs;
            console.log("A :  val is less 0");
            onValue(
                child(dbRef, `transferaA`),
                (snapshot) => {
                  this.transferaA = Math.abs(snapshot.val());
                  onValue(
                    child(dbRef, `usersB/${this.transferaA}/lname`),
                    (snapshot) => {
                      this.ringNameAT = snapshot.val();


                    });

                });

          }
        
        },
        (error) => {
          console.error(error);
        }
      );

// Currently Serving B
onValue(
        child(dbRef, "curB/curB"),
        (snapshot) => {
          this.currentBabs = Math.abs(snapshot.val());
          if(snapshot.val() == 0){
              this.currentBtext = "-";
          }

          else if(snapshot.val()>0){
            console.log("B :  val is greater 0");
            console.log("this is true greater than 0");
            this.currentB = Number(snapshot.val());
            this.currentBtext = "B"+Number(snapshot.val());

              onValue(
                child(dbRef, `usersB/${this.currentB}/lname`),
                (snapshot) => {
                  this.temp = snapshot.val();
                  if(this.temp===null){
                    console.log("this is b");
                  }             
                  else if(this.temp!==null){
                    this.ringNameB = snapshot.val();
 

                  }

                },
                (error) => {
                  console.error(error);
                }
              );
              
              }
               if (snapshot.val()<0){
            console.log("B :  val is less 0");
            console.log("I am fucking asd");
            this.currentBtext = "A"+this.currentBabs;
            onValue(
                child(dbRef, `transferaB`),
                (snapshot) => {
                  this.transferaB = Math.abs(snapshot.val());
                  onValue(
                    child(dbRef, `users/${this.transferaB}/lname`),
                    (snapshot) => {
                      this.ringNameBT = snapshot.val();
                      console.log
                      console.log("hemlo"+this.transferaB);


                    });

                });

          }
        
        },
        (error) => {
          console.error(error);
        }
      );


//A 1st q
onValue(
    child(dbRef, "Counter/Counter"),
    (snapshot) => {
    const counterValue = snapshot.val();
    const userId = `users/${counterValue+1}/queNum`;
    onValue(
      child(dbRef, userId),
      (snapshot) => {
        if(snapshot.val()!=null){ this.q1A = snapshot.val();
                                  this.q1Af = "A" + this.q1A;}
        else { this.q1Af = "-"; }
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);
//B 1st q
onValue(
    child(dbRef, "CounterB/CounterB"),
    (snapshot) => {
    const counterValue = snapshot.val();
    const userId = `usersB/${counterValue+1}/queNum`;
    onValue(
      child(dbRef, userId),
      (snapshot) => {
        if(snapshot.val()!=null){ this.q1B = snapshot.val();
                                  this.q1Bf = "B" + this.q1B;}
        else { this.q1Bf = "-"; }
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);

// A 2nd que
onValue(
    child(dbRef, "Counter/Counter"),
    (snapshot) => {
    const counterValue = snapshot.val();
    const userId = `users/${counterValue+2}/queNum`;
    onValue(
      child(dbRef, userId),
      (snapshot) => {
        if(snapshot.val()!=null){ this.q2A = snapshot.val();
                                  this.q2Af = "A" + this.q2A;}
        else { this.q2Af = '-'; }
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);
//B 2nd q
onValue(
    child(dbRef, "CounterB/CounterB"),
    (snapshot) => {
    const counterValue = snapshot.val();
    const userId = `usersB/${counterValue+2}/queNum`;
    onValue(
      child(dbRef, userId),
      (snapshot) => {
        if(snapshot.val()!=null){ this.q2B = snapshot.val();
                                  this.q2Bf = "B" + this.q2B;}
        else { this.q2Bf = "-"; }
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);
// A 3rd que
onValue(
    child(dbRef, "Counter/Counter"),
    (snapshot) => {
    const counterValue = snapshot.val();
    const userId = `users/${counterValue+3}/queNum`;
    onValue(
      child(dbRef, userId),
      (snapshot) => {
        if(snapshot.val()!=null){ this.q3A = snapshot.val();
                                  this.q3Af = "A" + this.q3A;}
        else { this.q3Af = '-'; }
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);
//B 3RD q
onValue(
    child(dbRef, "CounterB/CounterB"),
    (snapshot) => {
    const counterValue = snapshot.val();
    const userId = `usersB/${counterValue+3}/queNum`;
    onValue(
      child(dbRef, userId),
      (snapshot) => {
        if(snapshot.val()!=null){ this.q3B = snapshot.val();
                                  this.q3Bf = "B" + this.q3B;}
        else { this.q3Bf = "-"; }
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);
// A 4th que
onValue(
    child(dbRef, "Counter/Counter"),
    (snapshot) => {
    const counterValue = snapshot.val();
    const userId = `users/${counterValue+4}/queNum`;
    onValue(
      child(dbRef, userId),
      (snapshot) => {
        if(snapshot.val()!=null){ this.q4A = snapshot.val();
                                  this.q4Af = "A" + this.q4A;}
        else { this.q4Af = '-'; }
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);
// B 4th que
onValue(  
    child(dbRef, "CounteB/CounterB"),
    (snapshot) => {
    const counterValue = snapshot.val();
    const userId = `usersB/${counterValue+4}/queNum`;
    onValue(
      child(dbRef, userId),
      (snapshot) => {
        if(snapshot.val()!=null){ this.q4B = snapshot.val();
                                  this.q4Bf = "B" + this.q4B;}
        else { this.q4Bf = '-'; }
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);
// A 5th que
onValue(
    child(dbRef, "Counter/Counter"),
    (snapshot) => {
    const counterValue = snapshot.val();
    const userId = `users/${counterValue+5}/queNum`;
    onValue(
      child(dbRef, userId),
      (snapshot) => {
        if(snapshot.val()!=null){ this.q5A = snapshot.val();
                                  this.q5Af = "A" + this.q5A;}
        else { this.q5Af = '-'; }
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);
// B 5th que
onValue(
    child(dbRef, "CounteB/CounterB"),
    (snapshot) => {
    const counterValue = snapshot.val();
    const userId = `usersB/${counterValue+5}/queNum`;
    onValue(
      child(dbRef, userId),
      (snapshot) => {
        if(snapshot.val()!=null){ this.q5B = snapshot.val();
                                  this.q5Bf = "B" + this.q5B;}
        else { this.q5Bf = '-'; }
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);
  }
}
 
  </script>

<script setup>
// import { ref } from "vue";
import logo from "~/assets/images/logo.png";
// import axios from "axios";

// const name = ref("");
// const pass = ref("");

async function onLogin() {
  // const response = await axios.post("http://127.0.0.1:3000/login", {
  //     user: "asdc",
  //     pass: "asdcasdcasdcs"
  // });
}
</script>

<style scoped>

img{
  height: 325px;
  width: 325px;
}

.label{
  text-align: center;
  color: #0F172A;
  font-size: 25px;
  font-weight: 600;
}

.items{
  text-align: center;
  color: #0F172A;
  font-size: 30px;
  font-weight: 800;
}

.number{
  display: flex;
  border-right: #0F172A solid 1px;
  align-items: center;
  justify-content: center;
  width: 50%;
}
.windowSide{
  display: flex;
  width: 50%;
  border-left: #0F172A solid 1px;
  align-items: center;
  justify-content: center;
}

.windowName{
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 12px;
  margin-top: 5px;
}
.lowA{
  display: flex;
  justify-content: center;
  align-items: center;
}
.upA{
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FEFEFE;
}
.lowB{
  display: flex;
  justify-content: center;
  align-items: center;
}
.upB{
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FEFEFE;
}
.queue{
  color: #FEFEFE;
  font-size: 40px;
  font-weight: 800;
}
.a{
  width: 50%;
  border-right: #FEFEFE solid 1px;
  align-items: center;
  justify-content: center;
}
.b{
  width: 50%;
  border-left: #FEFEFE solid 1px;
  align-items: center;
  justify-content: center;
}
.text2{
  font-family: 'Baloo Bhai 2';
  text-align: center;
  color: #0F172A;
  font-size: 40px;
  font-weight: bold;
  
}
.text1{
  text-align: center;
}
.upper{
  display: flex;
  background-color: #0F172A;
  height: 30%;
  border-radius: 20px;
}

.lower{
  display: flex;
  background-color: #D9D9D9;
  height: 58%;
  margin-top: 10px;
  border-radius: 20px;
}

.right{
  padding: 15px;
}
.qr{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}
.text{
  color: #FEFEFE;
  font-size: 50px;
  margin-top: 50px;
  font-weight:bold;
  font-family: 'Baloo Bhai 2';
}
.form {
  @apply grid grid-cols-2 m-4 bg-white;
  background: #FEFEFE;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
  width: 957px;
  height: 587px;
}

.left {
  background: #0F172A;
  border: 1px solid #0F172A;
  border-radius: 25px;
}

.elements{
  display: flex;
  align-items: center;
  justify-content: center;
}

.white {
  display: flex;
  background-color: #ffffff99;
  height: 100%;
}

.flex {
  background-image: url(../assets/images/loginBg.jpg);
  background-size: cover;
}
</style>
