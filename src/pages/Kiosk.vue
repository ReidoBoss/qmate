<template>
  <div class="overlay" id="overlay">
  <div class="popUp">
    <div class="headP">
      <div class="headL">
        <p class="titlePage">{{ actionMsg }}</p>
      </div>

     <hr>
    </div>
    <div class="body">
      <i class="fa-solid fa-triangle-exclamation excla"></i>
      <h3 class="err">{{ errMsg }}</h3>
      <button class="ok" @click="exitPop()">OKAY</button>
    </div>
  </div>
</div>
<div class="flex h-full justify-center items-center w-full mx-0">
  <div class="white h-full justify-center items-center w-full mx-0">
    <div class="form ">
      <div class="left">
        <div class="text">

          <div class="editDetailsPane">
            <div class="editP">
            <div class="title">
              <p class="per">PERSONAL INFORMATION</p>
            </div>
            <div class="personal">
              <label for="id" class="name">ID#</label>
              <input type="number" class="field1" id="id" v-model="id"><br>
              <label for="fname" class="name">First Name</label>
              <input type="text" class="field2" id="fname" v-model="fname"><br>
              <label for="mname" class="name">Middle Name</label>
              <input type="text" class="field3" id="mname" v-model="mname"><br>
              <label for="lname" class="name">Last Name</label>
              <input type="text" class="field4" id="lname" v-model="lname"><br>
            </div>
            <div class="title">
              <p>EDUCATIONAL INFORMATION</p>
            </div>
            <div class="educational">
              <label for="educ" class="name">Educ. Level</label>
              <select v-model="edlevel" class="field5">
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
        </select>
              <label for="level" class="name">Grade/Year</label>
              <select v-model="grade" class="field6">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
        </select>
            </div>
            <div class="title">
              <p>PAYMENT INFORMATION</p>
            </div>
            <div class="payment">
              <label for="tuition" class="name">Tuition Fees</label>
              <input type="number" class="field7" id="tuition" v-model="tint"><br>
              <label for="misc" class="name">Miscellaneus</label>
              <input type="number" class="field8" id="tmisc" v-model="tmisc"><br>

            </div>
          </div>
            <div class="buttons">
              <button class="butLow" @click="clearTextField()">
                <ArchiveBoxXMarkIcon class="commandIcon" />
                CANCEL
              </button>
              <button class="butLow" @click="saveData()">
                <DocumentCheckIcon class="commandIcon" />
                DONE
              </button>
            </div>
          </div>
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
                <p class="queue">{{ currentAtext }}</p>
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
                <p class="items">{{ q1Af }}</p>
                <p class="items">{{ q2Af }}</p>
                <p class="items">{{ q3Af }}</p>
                <p class="items">{{ q4Af }}</p>
                <p class="items">{{ q5Af }}</p>
              </div>
            </div>
            <div class="windowSide">
              <div class="windowNum">
                <p class="label">WINDOW B</p>
                <p class="items"> {{ q1Bf }}</p>
                <p class="items"> {{ q2Bf }}</p>
                <p class="items"> {{ q3Bf }}</p>
                <p class="items"> {{ q4Bf }}</p>
                <p class="items"> {{ q5Bf }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio ref="audioNotif"
        src="https://firebasestorage.googleapis.com/v0/b/fir-68a5f.appspot.com/o/Announcement%20FX.mp3?alt=media&token=127c3677-c804-4523-a5bd-dd4438ce56ba"></audio>
  </div>
</div>
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
    currentBtext: '',
    counterVariable: null,
    counterVariableB: '',
    counter : null,
    counterB: null,
    currentDate:"",
    currentTime:"",
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
    id:null,
    fname:'',
    mname:'',
    lname:'',
    edlevel:'',
    grade:'',
    tint:null,
    tmisc:null,
    errMsg: '',
    actionMsg: ''

  };
},



mounted() {
  const dbRef = ref(db);
  const dbRefB = ref(db);


          const dbRefRingerA= ref(db, `ringA`);
          update(dbRefRingerA, {ringA: false});   

          const dbRefRingerB= ref(db, `ringB`);
          update(dbRefRingerB, {ringB: false});    
      

  
// Currently Serving A
onValue(
        child(dbRef, "curA/curA"),
        (snapshot) => {
          this.currentA = Number(snapshot.val());
          this.currentAabs = Math.abs(snapshot.val());


          if(snapshot.val() == 0){
              this.currentAtext = "-";

          }
          else if (snapshot.val()<0){
            this.currentAtext = "B"+this.currentAabs;
            console.log("A :  val is less 0");
            onValue(
                child(dbRef, `transferaA`),
                (snapshot) => {
                  this.transferaA = Math.abs(snapshot.val());
                  onValue(
                    child(dbRef, `usersB/${this.transferaA}/lname`),
                    (snapshot) => {
                      this.lnameyow = snapshot.val();
                        onValue(
                          child(dbRef, `ringA/ringA`),
                          (snapshot) => {
                            if (snapshot.val()==true){


                            }
                          });

                    });

                });

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
                  else{
                    this.name = snapshot.val();
 

                  }

                },
                (error) => {
                  console.error(error);
                }
              );
              
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
          else if (snapshot.val()<0){
            console.log("B :  val is less 0");

            this.currentBtext = "A"+this.currentBabs;
            onValue(
                child(dbRef, `transferaB`),
                (snapshot) => {
                  this.transferaB = Math.abs(snapshot.val());
                  onValue(
                    child(dbRef, `users/${this.transferaB}/lname`),
                    (snapshot) => {
                      this.lnameyow = snapshot.val();
                        onValue(
                          child(dbRef, `ringB/ringB`),
                          (snapshot) => {

                          });

                    });

                });

          }
          else if(snapshot.val()>0){
            console.log("B :  val is greater 0");

            this.currentB = Number(snapshot.val());
            this.currentBtext = "B"+Number(snapshot.val());

              onValue(
                child(dbRef, `usersB/${this.currentB}/lname`),
                (snapshot) => {
                  this.temp = snapshot.val();
                  if(this.temp===null){
                    console.log("this is b");
                  }             
                  else{
                    this.name = snapshot.val();
                    onValue(
                        child(dbRef, `ringB/ringB`),
                        (snapshot) => {
                          this.snapshotval = snapshot.val();
      

                    });

                  }

                },
                (error) => {
                  console.error(error);
                }
              );
              
              }
        
        },
        (error) => {
          console.error(error);
        }
      );

    // current numbers of que A
      onValue(
        child(dbRef, "sCounter/sCounter"),
        (snapshot) => {
          this.counter = Number(snapshot.val());
        
        },
        (error) => {
          console.error(error);
        }
      );
    // current numbers of que B
    onValue(
          child(dbRef, "sCounter/sCounterB"),
          (snapshot) => {
            this.counterB = Number(snapshot.val());
          
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
setInterval(() => {
  const now = new Date();
  this.currentTime = now.toLocaleTimeString();
  this.currentDate = now.toLocaleDateString();

}, 1000);

},
methods: {
    exitPop(){
    var x = document.getElementById("overlay");
    x.style.zIndex="-1";
  },
  printPage() {
    console.log("print");
    const printWindow = window.open(`/token`, 'printWindow');
    printWindow.onload = function() {
      setTimeout(function(){
        printWindow.print();
        printWindow.close();
      }, 500);
    };
    
  },

  saveData() { 
    if(this.id=="" || this.fname =="" || this.mname=="" || this.lname==""
    ||this.edlevel=="" || this.grade==""  || this.tint==""  || this.tmisc==""){

          var x = document.getElementById("overlay");
          x.style.zIndex="1";
          this.actionMsg = "Invalid Action";
          this.errMsg="Fill up everything!";

    }
    else{
  const dbRef = ref(db, 'sCounter/sCounter');
  const dbRefB = ref(db, 'sCounter/sCounterB');

  let counterVariable;
  let counterVariableB;

  //A GETTER
  get(dbRef).then((snapshot) => {
     
    //A  
      counterVariable = Number(snapshot.val());
      this.queNum = Number(snapshot.val());
      
      //USER A variables address 
      const userId = `users/${counterVariable}`;
      const dbRefcustomers = ref(db, userId);
      //USER A HISTORY ADDRESS
      const hisId = `users/${counterVariable}/id`;
      const dbRefHis = ref(db, hisId);


      
      //B GETTER
      get(dbRefB).then((snapshot) => {
        //B
        counterVariableB = Number(snapshot.val());
        this.queNumB = Number(snapshot.val());
        //USER B variables address 
        const userIdB = `usersB/${counterVariableB}`;
        const dbRefcustomersB = ref(db, userIdB);
       
        



        //B CONDITION
        if (counterVariable > counterVariableB){       
           // local storage B

            localStorage.setItem('kioskQ',this.queNumB);
            localStorage.setItem('windowKiosk', 'B');
            localStorage.setItem('curTime',this.currentTime);
            localStorage.setItem('curDate',this.currentDate);


            this.ring = false; 

            //Que Information B
            update(dbRefcustomersB, { id: this.id });
            update(dbRefcustomersB, { fname: this.fname });
            update(dbRefcustomersB, { mname: this.mname });
            update(dbRefcustomersB, { lname: this.lname });
            update(dbRefcustomersB, { edlevel: this.edlevel });
            update(dbRefcustomersB, { grade: this.grade });
            update(dbRefcustomersB, { tint: this.tint });
            update(dbRefcustomersB, { tmisc: this.tmisc });
            update(dbRefcustomersB, { queNum: this.queNumB });
            update(dbRefcustomersB, { ring: this.ring });


             this.incCounterB();
             this.printPage();

        }
        //A CONDITION
      else{

            localStorage.setItem('kioskQ',this.queNum);
            localStorage.setItem('windowKiosk', 'A');
            localStorage.setItem('curTime',this.currentTime);
            localStorage.setItem('curDate',this.currentDate);

      this.ring = false;
      
      update(dbRefcustomers, { id: this.id });
      update(dbRefcustomers, { fname: this.fname });
      update(dbRefcustomers, { mname: this.mname });
      update(dbRefcustomers, { lname: this.lname });
      update(dbRefcustomers, { edlevel: this.edlevel });
      update(dbRefcustomers, { grade: this.grade });
      update(dbRefcustomers, { tint: this.tint });
      update(dbRefcustomers, { tmisc: this.tmisc });
      update(dbRefcustomers, { queNum: this.queNum });
      update(dbRefcustomers, { ring: this.ring });






       this.incCounter();
       this.printPage();
       this.clearTextField();
      }



      });
 
   
  });



  }
},
clearTextField(){
  this.id = "";
  this.fname="";
  this.mname="";
  this.lname="";
  this.edlevel="";
  this.grade="";
  this.tint="";
  this.tmisc="";
},
formatNumber(number, length) {
  const str = number.toString();
  return str.padStart(length, '0').replace(/(\d{3})(?=\d)/g, '$1');
},
incCounter() {
  const dbRef = ref(db, "sCounter");
  this.counter = this.counter + 1;
  update(dbRef, { sCounter: this.counter });
},
incCounterB() {
  const dbRef = ref(db, "sCounter");
  this.counterB = this.counterB + 1;
  update(dbRef, { sCounterB: this.counterB });
},



},
}

</script>


<script setup>
// import { ref } from "vue";
import logo from "~/assets/images/logo.png";
// import axios from "axios";
import { UserCircleIcon , BellAlertIcon , ForwardIcon, ArrowPathIcon, CheckBadgeIcon,DocumentCheckIcon,PencilSquareIcon,ArchiveBoxXMarkIcon,PrinterIcon,PaperAirplaneIcon} from '@heroicons/vue/24/solid'
// const name = ref("");
// const pass = ref("");


</script>



<style scoped>
.butLow:hover .commandIcon{
color:#fefefe;
}

select{
padding-left: 10px;
color: #FEFEFE;
}


.commandIcon{
width:40px ;
height:40px;
margin-right: 15px;
color: #0F172A;
}

.butLow:hover{
background-color: grey;
color: #fefefe;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.butLow{
display: flex;
background-color: #fefefe;
justify-content: center;
align-items: center;
border-radius: 12px;
margin-left: 10px;
height: 65px;
width: 150px;
margin-top: 30px;
color: #0F172A;
font-weight: 900;
}

.buttons{
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 40px;
}
button{
position: flex;
background-color: #fefefe;
border-radius: 10px;
width: 85%;
height: 38px;
color: #0F172A;
font-weight: 700;

}

.payments{
  width: 18%;
  height: 225px;
  text-align: end;
}

.field1{
width: 200px;
height: 30px;
left: 587px;
top: 211px;
background: #1E293B;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
margin: 5px;
margin-left: 102px;
}
.field2{
width: 200px;
height: 30px;
left: 587px;
top: 211px;
background: #1E293B;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
margin: 5px;
margin-left: 44px;
}
.field3{
width: 200px;
height: 30px;
left: 587px;
top: 211px;
background: #1E293B;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
margin: 5px;
margin-left: 23px;
}

.field4{
width: 200px;
height: 30px;
left: 587px;
top: 211px;
background: #1E293B;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
margin: 5px;
margin-left: 47px;
}
.field5{
width: 200px;
height: 30px;
left: 587px;
top: 211px;
background: #1E293B;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
margin: 5px;
margin-left: 42px;
}
.field6{
width: 200px;
height: 30px;
left: 587px;
top: 211px;
background: #1E293B;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
margin: 5px;
margin-left: 41px;
}
.field7{
width: 200px;
height: 30px;
left: 587px;
top: 211px;
background: #1E293B;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
margin: 5px;
margin-left: 34px;
}
.field8{
width: 200px;
height: 30px;
left: 587px;
top: 211px;
background: #1E293B;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
margin: 5px;
margin-left: 28px;
}
.field9{
width: 200px;
height: 30px;
left: 587px;
top: 211px;
background: #1E293B;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
margin: 5px;
margin-left: 24px;
}

input:hover{
box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.5);
}

select:hover{
box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.5);
}

.personal{
height: 156px;
}

.name{
margin-left: 45px;
color: #fefefe;
font-size: 18px;
}

.per{
margin-top: 33px;
}

.title{
font-weight: 700;
font-size: 20px;
line-height: 30px;
color: #fefefe;
padding-left: 18px;
margin-top: 5px;
}

.editDetailsPane {
position: flex;
width: 100%;
height: 100%;

/* margin: 5px; */
border-radius: 25px;
/* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4); */
}

.editP {
position: flex;
width: 100%;
height: 100%;

margin-left: 48px;
/* margin: 5px; */
border-radius: 25px;
/* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4); */
}

input{
color: #FEFEFE;
padding-left: 10px;
}

img {
height: 325px;
width: 325px;
}

.label {
text-align: center;
color: #0F172A;
font-size: 25px;
font-weight: 600;
}

.items {
text-align: center;
color: #0F172A;
font-size: 30px;
font-weight: 800;
}

.number {
display: flex;
border-right: #0F172A solid 1px;
align-items: center;
justify-content: center;
width: 50%;
}

.windowSide {
display: flex;
width: 50%;
border-left: #0F172A solid 1px;
align-items: center;
justify-content: center;
}

.windowName {
font-size: 25px;
font-weight: 600;
margin-bottom: 12px;
margin-top: 5px;
}

.lowA {
display: flex;
justify-content: center;
align-items: center;
}

.upA {
display: flex;
justify-content: center;
align-items: center;
color: #FEFEFE;
}

.lowB {
display: flex;
justify-content: center;
align-items: center;
}

.upB {
display: flex;
justify-content: center;
align-items: center;
color: #FEFEFE;
}

.queue {
color: #FEFEFE;
font-size: 40px;
font-weight: 800;
}

.a {
width: 50%;
border-right: #FEFEFE solid 1px;
align-items: center;
justify-content: center;
}

.b {
width: 50%;
border-left: #FEFEFE solid 1px;
align-items: center;
justify-content: center;
}

.text2 {
font-family: 'Baloo Bhai 2';
text-align: center;
color: #0F172A;
font-size: 40px;
font-weight: bold;

}

.text1 {
text-align: center;
}

.upper {
display: flex;
background-color: #0F172A;
height: 30%;
border-radius: 20px;
}

.lower {
display: flex;
background-color: #D9D9D9;
height: 58%;
margin-top: 10px;
border-radius: 20px;
}

.right {
display: flex;
flex-direction: column;
/* background-color: aqua; */
padding: 15px;
}

.qr {
display: flex;
justify-content: center;
align-items: center;
margin-top: 60px;
}

/* .text{
color: #FEFEFE;
font-size: 50px;
margin-top: 50px;
font-weight:bold;
font-family: 'Baloo Bhai 2';
} */
.form {
@apply grid grid-cols-2 m-4 bg-white;
background: #FEFEFE;
box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.75);
border-radius: 25px;
width: 957px;
height: 587px;
}

.left {
display: flex;
background: #0F172A;
border: 1px solid #0F172A;
border-radius: 25px;
width: 100%;
align-items: center;
justify-content: center;
}

.elements {
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
/* 
Ari gasugod ang popup bullshit
*/
.overlay{
position: absolute;
z-index: -1;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(255, 255, 255, 0.4);
width: 100%;
height: 100%;
}
.popUp{
border-radius: 5px;
background-color: #FEFEFE;
height: 150px;
width: 400px;
opacity: 100%;
box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.75);
}
.headP{
display: flex;
}
.headL{
display: flex;
align-items: flex-start;
justify-content: flex-start;
width: 50%;
font-size: 20px;
margin: 5px;
color: #0F172A;
font-weight: 700;
padding-left: 5px;
}
.body{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
font-weight: 500;
}
.err{
color: #0F172A;
font-size: 20px;
}
.ok{
height: 35px;
width: 150px;
background-color: #0F172A;
color: #FEFEFE;
margin: 5px;
}
</style>
