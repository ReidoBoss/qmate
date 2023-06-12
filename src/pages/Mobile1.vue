<template>
  <div class="body">
      <div class="upper">
          <div class="left">
              <h3>{{ currentAtext }}</h3>
          </div>
          <div class="right">
              <h3>{{currentBtext }}</h3>
          </div>
      </div>
      <div class="window">
          <div class="a">
              Window A
          </div>
          <div class="b">
              Window B
          </div>
      </div>
      <div class="personalInformation">
          <h4>PERSONAL INFORMATION</h4>
      </div>
      <div class="fields" >
          <label>ID No.</label><br>
          <input type="number" v-model="id">
      </div>
      <div class="fields">
          <label>First Name</label><br>
          <input type="text" v-model="fname">
      </div>
      <div class="fields">
          <label>Middle Name</label><br>
          <input type="text" v-model="mname">
      </div>
      <div class="fields">
          <label>Last Name</label><br>
          <input type="text" v-model="lname">
      </div>
      <div class="educational">
          <h4>EDUCATIONAL INFORMATION</h4>
      </div>
      <div class="fields">
          <label>Educational Level</label><br>
          <select v-model="edlevel">
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
          </select>
      </div>
      <div class="fields">
          <label>Grade Level</label><br>
          <select v-model="grade">
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
      <div class="payment">
          <h4>PAYMENT INFORMATION</h4>
      </div>
      <div class="fields" >
          <label>Tuition Fee</label><br>
          <input type="number"  v-model="tint">
      </div>
      <div class="fields" >
          <label>Miscellaneus Fee</label><br>
          <input type="number" v-model="tmisc">
      </div>
      <div class="fields" >
          
      </div>
      <div class="buttons">
          <button>Cancel</button>
       <button  @click="saveData()">Done</button>
      </div>
  </div>
</template>

<script>
import { push } from "firebase/database";
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
}

const app = initializeApp(firebaseConfig);

const db = getDatabase();

export default {
data() {
  return {
    currentAtext:'',
    currentBtext:'',
    counterVariable : null,
    counterVariableB: null,
    counter : null,
    counterB: null,
    currentTime: "",
    currentDate: "",
    hisCtr: null,
    randomNumber: null,
    formattedRandomNumber: null
  }
},
created (){
  const dbRef = ref(db);
  const dbRefB = ref(db);

// Currently Serving A
onValue(
        child(dbRef, "curA/curA"),
        (snapshot) => {
          this.currentA = Number(snapshot.val());
          if(snapshot.val() == 0){
              this.currentAtext = "-";

          }
          else if(snapshot.val() > 0){this.currentA = Number(snapshot.val());
               this.currentAtext = "A"+Number(snapshot.val());}

          else if(snapshot.val() < 0){ 
                this.currentAtext = "B"+Math.abs(snapshot.val());
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
          this.currentB = Number(snapshot.val());
          if(snapshot.val() == 0){
              this.currentBtext = "-";
          }
          else if (snapshot.val() > 0){this.currentB = Number(snapshot.val());
               this.currentBtext = "B"+Number(snapshot.val());
              }     
          else if (snapshot.val() < 0){
                this.currentBtext = "A"+Math.abs(snapshot.val());
          }
        },
        (error) => {
          console.error(error);
        }
      );    

//COUNTER A
  onValue(
      child(dbRef, "Counter/Counter"),
      (snapshot) => {
        this.counterVariable = Number(snapshot.val());
      
      },
      (error) => {
        console.error(error);
      }
    );
// COUNTER B
onValue(
      child(dbRefB, "CounterB/CounterB"),
      (snapshot) => {
        this.counterVariableB = snapshot.val();
      },
      (error) => {
        console.error(error);
      },
      () => {
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

    
    setInterval(() => {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hour}:${minute}`;
    this.currentDate = now.toLocaleDateString();

  }, 1000);  



},
methods: {
 
  saveData() {   

        localStorage.setItem('idM',this.id);
        localStorage.setItem('fnameM',this.fname);
        localStorage.setItem('mnameM',this.mname);
        localStorage.setItem('lnameM',this.lname);
        localStorage.setItem('edlevelM',this.edlevel);
        localStorage.setItem('gradeM',this.grade);
        localStorage.setItem('tintM',this.tint);
        localStorage.setItem('tmiscM',this.tmisc);
        
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
              localStorage.setItem('que', this.queNumB);
              const myVariableB = localStorage.getItem('que');
              localStorage.setItem('window', 'B');


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

              // //INC VARIABLES FOR HISTORY
              // this.idNum = this.id;
              // const userIdHistory = `History/${this.idNum}`;
              // const dbRefCTR = ref(db, `History/${this.idNum}/ctr`);
              // const dbRefHistory = ref(db, userIdHistory);

              // this.randomNumber = Math.floor(Math.random() * 999999) + 1;
              // this.formattedRandomNumber = this.formatNumber(this.randomNumber, 6);
              // this.parti = "Tuition";

              // get(dbRefCTR).then((snapshot) => {
              //         //INCREMENT                
              //         this.ctr = snapshot.val();
              //         this.ctr = this.ctr+1;
              //         update(dbRefHistory, { ctr: this.ctr});
              //         const userIdHistoryNum = `History/${this.idNum}/${this.ctr}`;
              //         const dbRefHistoryNum = ref(db, userIdHistoryNum);
              //         update(dbRefHistoryNum, { date: this.currentDate});
              //         update(dbRefHistoryNum, { time: this.currentTime});
              //         update(dbRefHistoryNum, { lname: this.lname});

              //         update(dbRefHistoryNum, { orno: this.formattedRandomNumber});
              //         update(dbRefHistoryNum, { id: this.idNum});
              //         update(dbRefHistoryNum, { parti: this.parti});




              //         this.total = this.tmisc + this.tint;
              //         update(dbRefHistoryNum, { total: this.total});
                      
              //         const dbRefCC = ref(db, "currentCashierB"); 
              //         get(dbRefCC).then((snapshot) => {     

              //           this.cashier = snapshot.val();

              //           update(dbRefHistoryNum, { cashier: this.cashier});


              //          });



                    
              // });

               this.incCounterB();
               this.$router.push('/mobile2');
          }
          //A CONDITION
        else{
        localStorage.setItem('que', this.queNum);
        const myVariable = localStorage.getItem('que')
        localStorage.setItem('window', 'A');

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






        //                 //INC VARIABLES
        //       this.idNum = this.id;
        //       const userIdHistory = `History/${this.idNum}`;
        //       const dbRefCTR = ref(db, `History/${this.idNum}/ctr`);
        //       const dbRefHistory = ref(db, userIdHistory);

        //       this.randomNumber = Math.floor(Math.random() * 999999) + 1;
        //       this.formattedRandomNumber = this.formatNumber(this.randomNumber, 6);
        //       this.parti = "Tuition";


        //       get(dbRefCTR).then((snapshot) => {
        //               //INCREMENT                
        //               this.ctr = snapshot.val();
        //               this.ctr = this.ctr+1;
        //               update(dbRefHistory, { ctr: this.ctr});
        //               const userIdHistoryNum = `History/${this.idNum}/${this.ctr}`;
        //               const dbRefHistoryNum = ref(db, userIdHistoryNum);
        //               update(dbRefHistoryNum, { date: this.currentDate});
        //               update(dbRefHistoryNum, { time: this.currentTime});
        //               update(dbRefHistoryNum, { lname: this.lname});

        //               update(dbRefHistoryNum, { orno: this.formattedRandomNumber});
        //               update(dbRefHistoryNum, { id: this.idNum});
        //               update(dbRefHistoryNum, { parti: this.parti});
                  

        //               this.total = this.tmisc + this.tint;
        //               update(dbRefHistoryNum, { total: this.total});
                      
        //               const dbRefCC = ref(db, "currentCashierA"); 
        //               get(dbRefCC).then((snapshot) => {     

        //                 this.cashier = snapshot.val();

        //                 update(dbRefHistoryNum, { cashier: this.cashier});


        //                });

                      
                      
                    
        //       });

         this.incCounter();
         this.$router.push('/mobile2');
        }



        });
   
     
    });
 



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
 
 
 
  
}
}

</script>

<style scoped>

  .body {
    background-color: #D9D9D9;
    display: flex;
    flex-wrap: wrap; /* Allows elements to wrap to next line on small screens */
    justify-content: center; /* Centers elements horizontally */
    flex-direction: column;
    box-sizing: border-box;
  }
  button{
      height: 50px;
      width: 120px;
      background-color: #0F172A;
      color: #fefefe;
      border-radius: 15px;
      margin-top: 15px;
      margin-left: 40px;
      margin-bottom: 15px;
  }
  .educational{
      margin-top: 12px;
  }
  .payment{
      margin-top: 12px;
  }
  input:focus{
      box-shadow: 0px 4px 4px rgba(15, 23, 42, 0.5);
      background-color: #fefefe;
  }

  select{
      margin-bottom: 10px;
      height: 38px;
      width: 290px;
      border-radius: 8px;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid #0F172A;
      background-color: #D9D9D9;
  }

  input{
      margin-bottom: 10px;
      height: 38px;
      width: 290px;
      border-radius: 8px;
      padding-left: 10px;
      border: 1px solid #0F172A;
      background-color: #D9D9D9;
  }

  .fields{
      padding-left: 35px;
  }
  label{
      color: #0F172A;
      font-weight: 500;
  }
  h4{
      color: #0F172A;
      font-size: 20px;
      font-weight: bold;
      margin-left: 20px;
      margin-bottom: 10px;
  }
  .upper{
    background-color: #D9D9D9;
    display: flex;
    flex-wrap: wrap; /* Allows elements to wrap to next line on small screens */
    justify-content: center; /* Centers elements horizontally */
    align-items: center; /* Centers elements vertically */
  }

  .window{
    background-color: #D9D9D9;
    display: flex;
    flex-wrap: wrap; /* Allows elements to wrap to next line on small screens */
    justify-content: center; /* Centers elements horizontally */
    align-items: center; 
    margin-bottom: 15px;
  }

  .a{

      font-weight: 600;
      font-size: 30px;
  }
  .b{
      font-weight: 600;
      font-size: 30px;
  }

  .left {
    background-color: #0F172A;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    height: 15px;
    width: 15px;
    border-radius: 20px;
    padding: 15px;
    text-align: center;
    /* Adds some space between elements */
  }

  .right {
    background-color: #0F172A;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    height: 15px;
    width: 15px; 
    padding: 15px;
    text-align: center;
  }

  h3{
      color: #fefefe;
      font-weight: 700;
      font-size: 45px;
  }
  /* Media query for screens smaller than 768px */
  @media (max-width: 768px) {
    .left, .right {
      height: 80px;
      width: 125px;
      margin-top: 25px;
      margin-left: 20px;
      margin-right: 20px; /* Reduces the size and space between elements */
      margin-bottom: 5px;
      border-radius: 20px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      padding: 8px;
    }

    .a,.b{
      font-size: 20px;
    }
    .b{
      margin-left: 80px;
    }
  }
</style>