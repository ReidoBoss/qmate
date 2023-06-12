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
<div class="flex h-full justify-center items-center  mx-0 w-full">
    <div class="queuePane">
        <br>
      <span>  <p  class="current"> {{ curWinText }}</p> </span>
        <br>
        <div class="uQueue">
            <div class="windowA">
                <span id ="countSpan" class="currentNum"> {{ currentAtext  }}</span>
            </div>
            <div class="windowB">
                <p class="currentNum">{{ currentBtext  }}</p>
            </div>
        </div>
        <div class="uQueue">
            <div class="windowTextA">Window A</div>
            <div class="windowTextB">Window B</div>
        </div>
        <div class="dQueue">
            <div class="line">
                <div class="lineBox">
                    <div class="lineNum">
                        <div class="num">{{ q1Af  }}</div>
                    </div>
                    <div class="lineWindow">WINDOW A</div>
                </div>
                <div class="lineBox">
                    <div class="lineNum">
                        <div class="num">{{ q2Af }}</div>
                    </div>
                    <div class="lineWindow">WINDOW A</div>
                </div>
                <div class="lineBox">
                    <div class="lineNum">
                        <div class="num">{{ q3Af }}</div>
                    </div>
                    <div class="lineWindow">WINDOW A</div>
                </div>
                <div class="lineBox">
                    <div class="lineNum">
                        <div class="num">{{ q4Af }}</div>
                    </div>
                    <div class="lineWindow">WINDOW A</div>
                </div>
                <div class="lineBox">
                    <div class="lineNum">
                        <div class="num">{{ q1Bf }}</div>
                    </div>
                    <div class="lineWindow">WINDOW B</div>
                </div>
                <div class="lineBox">
                    <div class="lineNum">
                        <div class="num">{{ q2Bf }}</div>
                    </div>
                    <div class="lineWindow">WINDOW B</div>
                </div>
                <div class="lineBox">
                    <div class="lineNum">
                        <div class="num">{{ q3Bf }}</div>
                    </div>
                    <div class="lineWindow">WINDOW B</div>
                </div>
            </div>
            <div class="controls">
                <button class="commandBox" @click="callUser()">
                    <BellAlertIcon class="commandIcon"/> CALL</button>
                <button class="commandBox" @click="incCounter()" :class="{ 'activeButton': nextButtonClicked }">
                    <ForwardIcon class="commandIcon"/>NEXT</button>
                <button class="commandBox" @click = "transfer()">
                    <ArrowPathIcon class="commandsIcon"/>TRANSFER</button>
                <button class="commandBox" @click="doneUser()" :disabled="!nextButtonClicked" :class="{ 'activeButton': !nextButtonClicked }">
                    <CheckBadgeIcon class="commandIcon"/>DONE</button>
                    
           
            </div>
        </div>
    </div>
    <div class="billingPane justify-center">
        <div class="upper ">
            <div class="userInfo">
                <div class="user">
                    <p>Name: <span id="userName">{{ currentCashier }}</span></p>
                    <p>ID No: <span id="userId">{{currentCashierId}}</span></p>
                </div>
                <div class="dateTime">
                    <p id="date">{{ currentDate }}</p>
                    <p id="time"><span>{{ currentTime }}</span></p>
                </div>
                <div class="image">
                <a @click="logout">    <UserCircleIcon class="logout" /></a>
                    
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="editDetailsPane">
                <div class="title">
                    <p class="per">PERSONAL INFORMATION</p>
                </div>
                <div class="personal">
                          <label for="id" class="name" >ID#</label>
                          <input type="text" class="field1" id="id"    v-model="idT" :disabled="!isEditMode"><br>
                          <label for="fname" class="name" >First Name</label>
                          <input type="text" class="field2" id="fname"  v-model="fnameT" :disabled="!isEditMode"><br>
                          <label for="mname" class="name">Middle Name</label>
                          <input type="text" class="field3" id="mname"  v-model="mnameT" :disabled="!isEditMode"><br>
                          <label for="lname" class="name">Last Name</label>
                          <input type="text" class="field4" id="lname"  v-model="lnameT" :disabled="!isEditMode"><br>
                      </div>
                  <div class="title">
                      <p>EDUCATIONAL INFORMATION</p>
                  </div>
                  <div class="educational">
                          <label for="educ" class="name">Educ. Level</label>
                          <input type="text" class="field5" id="educ"  v-model="edlevelT" :disabled="!isEditMode"><br>
                          <label for="level" class="name">Grade/Year</label>
                          <input type="text" class="field6" id="level"  v-model="gradeT" :disabled="!isEditMode"><br>
                  </div>
                  <div class="title">
                      <p>PAYMENT INFORMATION</p>
                  </div>   
                  <div class="payment">
                          <label for="tuition" class="name">Tuition Fees</label>
                          <input type="text" class="field7" id="tuition"  v-model="tintT" :disabled="!isEditMode"><br>
                          <label for="misc" class="name" >Miscellaneus</label>
                          <input type="text" class="field8" id="tmisc"  v-model="tmiscT" :disabled="!isEditMode"><br>

                  </div> 
                <div class="buttons">
                    <button class="butLow" @click="editInfo()" :class="{ 'activeButton': isEditMode }">
                      <PencilSquareIcon class="commandIcon"/>
                      EDIT</button>
                    <button class="butLow" @click="saveInfo()" :disabled="!isEditMode" :class="{ 'activeButton': !isEditMode }">
                      <DocumentCheckIcon class="commandIcon"/>
                      SAVE</button>
                </div>
                </div>
            <div class="tabs">
                <div class="tabUp">
                </div>
                <div class="tabDown">
                    <div :class="currentTab == 0 ? 'tab-active' : 'general-tab'" @click="currentTab = 0">Transaction</div>
                    <div :class="currentTab == 1 ? 'tab-active' : 'general-tab'" @click="currentTab = 1">Invoice</div>
                    <div :class="currentTab == 2 ? 'tab-active' : 'general-tab'" @click="currentTab = 2">History</div>
                </div>
                <div class="content">
                  <Transition name="fade" mode="out-in">
                    <div class="transactionContent" v-if="currentTab == 0">
                      <table>
                        <tr>
                          <td class="lebel">ID No:</td>
                          <td>{{ id }}</td>
                        </tr>
                        <tr>
                          <td class="lebel">First Name:</td>
                          <td>{{ fname }}</td>
                        </tr>
                        <tr>
                          <td class="lebel">Middle Name:</td>
                          <td>{{ mname }}</td>
                        </tr>
                        <tr>
                          <td class="lebel">Last Name:</td>
                          <td>{{ lname }}</td>
                        </tr>
                        <tr>
                          <td class="lebel">Educational Level:</td>
                          <td>{{ edlevel }}</td>
                        </tr>
                        <tr>
                          <td class="lebel">Grade/Year:</td>
                          <td>{{ grade }}</td>
                        </tr>
                        <tr>
                          <td class="lebel">Tuition Payment:</td>
                          <td>{{ tint }}</td>
                        </tr>
                        <tr>
                          <td class="lebel">Miscelleneus:</td>
                          <td>{{ tmisc }}</td>
                        </tr>
                        <tr>
                          <td class="lebel">Total Amount:</td>
                          <td>{{ total }}</td>
                        </tr>
                      </table>
                      <div class="but">
                        <button class="butLow" @click= "cancelTransaction" :class="{ 'activeButton': isEditMode }"> 
                          <ArchiveBoxXMarkIcon class="commandIcon"/>
                          CANCEL</button>
                        <button class="butLow" @click="doneTransaction();printPage1()" :class="{ 'activeButton': isEditMode }">
                          <CheckBadgeIcon class="commandIcon" />
                          DONE</button>
                      </div>
                    </div>
                    <div class="invoiceContent" v-else-if="currentTab == 1">
                      <div class="assesment">
                        <div class="head">
                          <div class="logo">
                            <img class="log" :src="logo" alt="logo">
                          </div>
                          <div class="schoolName">
                            <div class="u">SAINT WILLIAM COOPERATIVE SCHOOL</div>
                            <div class="l">STUDENTS' ACCOUNTING SECTION</div>
                          </div>
                          <div class="slip">
                            <p class="asses">ASSESMENT SLIP</p>
                          </div>
                        </div>
                        <div class="details">
                          <div class="up">
                            <div class="uleft">
                            <p>{{ lname }}, {{ fname }}</p>
                            <p>{{ id }}</p>
                            </div>
                            <div class="uright">
                              <p>2nd QUARTER SY 2022-2023</p>
                              <p>YEAR-12 ST. PIO</p>
                            </div>
                          </div>
                          <div class="ud" > 
                            <div class="subject">
                              <p class="t">SUBJECT</p>
                              <p>TECHNO32</p>
                              <p>AUTOLAN32</p>
                              <p>COMORG32</p>
                              <p>ELDROID32</p>
                              <p>FREIP</p>
                              <p>INFOSEC32</p>
                              <p>SOFTENG32</p>
                              <br>
                              <p>TOTAL UNITS</p>
                            </div>
                            <div class="unit">
                              <p class="tu">UNITS</p>
                              <p class="p">3.00</p>
                              <p class="p">3.00</p>
                              <p class="p">3.00</p>
                              <p class="p">3.00</p>
                              <p class="p">3.00</p>
                              <p class="p">3.00</p>
                              <p class="p">3.00</p>
                              <br>
                              <p class="p">21.0</p>
                            </div>
                            <div class="watermark">
                          <img class="logs" :src="logo" alt="logo">
                          </div>
                            <div class="soa">
                              <p class="tu">STATEMENT OF THE ACCOUNT</p>
                              <div class="soaDetails">
                                <div class="sl">OLD ACCOUNT</div>
                                <div class="sr">9,499.50</div>
                              </div>
                              <hr>
                              <div>FEES:</div>
                              <div class="container">
                                  <div class="fChildren">
                                  <div class="fl">
                                    <p>TUITION</p>
                                    <p>LABARATORY</p>
                                    <p>REGISTRATION</p>
                                    <p>MISCELLANEUS</p>
                                  </div>
                                  <div class= "fr">
                                    <p>23,280.00</p>
                                    <p>2,200.00</p>
                                    <p>752.00</p>
                                    <p>1,400.00</p>
                                  </div>
                                </div>
                              </div>
                              <div class="soaDetails">
                                <div class="sl">TOTAL FEES</div>
                                <div class="sr">27,632.00</div>
                              </div>
                              <hr>
                              <div class="soaDetails">
                                <div class="sl">TOTAL DUES</div>
                                <div class="sr">37,131.00</div>
                              </div>
                              <hr>
                              <div>LESS:</div>
                              <div class="container">
                                  <div class="fChildren">
                                  <div class="fl">
                                    <p>PAYMENT</p>
                                    <p>LABARATORY</p>
                                    <p>REGISTRATION</p>
                                    <p>MISCELLANEUS</p>
                                  </div>
                                  <div class= "fr">
                                    <p>.00</p>
                                    <p>.00</p>
                                    <p>.00</p>
                                    <p>.00</p>
                                  </div>
                                </div>
                              </div>
                              <div class="soaDetails">
                                <div class="sl">BALANCE</div>
                                <div class="sr">37,131.00</div>
                              </div>
                              <hr>
                            </div>
                            <div class="payments">
                              <p class="tup">PAYMENT(S)</p>
                              <div class="paid">
                                <p>{{ tint }}</p>
                                <p>{{ tmisc }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="butter">
                        <button class="butLow"  @click="printPage">
                          <PrinterIcon class="commandIcon"/>
                          PRINT
                          </button>
                      </div>
                    </div>
                    <div class="historyContent" v-else="currentTab == 2">
                      <table class="hTable">
                        <th class="hTh">Date</th>
                        <th class="hTh">Time</th>
                        <th class="hTh">OR No.</th>
                        <th class="hTh">ID No.</th>
                        <th class= "hTh">Name </th>
                        <th class="hTh">Amount</th>
                        <th class="hTh">Particulars</th>
                        <th class="hTh">Cashier</th>

                          <tr v-for="index in 16" :key="index" class="hTr">
                          <td class="hTd">{{ getHisDate(index) }}</td>
                          <td class="hTd">{{ getHisTime(index) }}</td>
                          <td class="hTd">{{ getHisOrno(index)}}</td>
                          <td class="hTd">{{ getHisId(index) }}</td>
                          <td class="hTd">{{ getHisLname(index) }}</td>
                          <td class="hTd">{{ getHisTotal(index) }}</td>
                          <td class="hTd">{{ getHisParti(index) }}</td>
                          <td class="hTd">{{ getHisCashier(index) }}</td>
                          </tr>
                                        
                        
                        
                      </table>
                    </div>
                  </Transition>
                </div>
            </div>
        </div>
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
remove
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { routerKey } from 'vue-router';





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
  const dataProperties = {};
  for (let i = 1; i <= 16 ; i++) {
  dataProperties[`hisDate${i}`] = '';
  dataProperties[`hisTime${i}`] = '';
  dataProperties[`hisLname${i}`] = '';
  dataProperties[`hisTotal${i}`] = '';
  dataProperties[`hisCashier${i}`] = '';
  dataProperties[`hisOrno${i}`] = '';
  dataProperties[`hisId${i}`] = '';
  dataProperties[`hisParti${i}`] = '';
                                    }
  return {
    nextButtonClicked: false,
    isEditMode: false,
    currentAtext : '',
    currentBtext : '',
    currentA: null,
    currentB: null,
    counterVariable: null,
    counterVariableB: '',
    q1Af : '',
    q2Af : '',
    q3Af: '',
    q4Af:'',
    id: '' ,
    fname : '',
    mname : '',
    lname : '',
    edlevel : '',
    grade : '',
    tint: null ,
    tmisc: null ,
    idT: '' ,
    fnameT : '',
    mnameT : '',
    lnameT : '',
    edlevelT : '',
    gradeT : '',
    tintT: null ,
    tmiscT: null ,
    currentTime: "",
    currentDate: "",
    currentTab: 0,
    ring : false,
    q1Bf : '',
    q2Bf : '',
    q3Bf : '',
    q4Bf: '',
    curWinText: '',
    currentCashier: '',
    currentCashierId: '',
    ...this.dataProperties,
    ringA : false,
    ringB: false,
    actionMsg: '',
    errMsg:'',
    currentBT:'',

  };
},




mounted() {
  const dbRef = ref(db);
  const dbRefB = ref(db);
  console.log(this.currentA)
  this.loggedin = localStorage.getItem('log-in');
  console.log(this.loggedin)
  this.currentCashier = localStorage.getItem('currentCashier');
  this.currentCashierId = localStorage.getItem('currentCashierId');




    


  
  


  if(this.loggedin=="false"){
    console.log("true ang asd")
    this.$router.push('/');
  }



const currentWindow = localStorage.getItem('currentWindow')
if(currentWindow =='A'){

this.curWinText = "Currently Serving A";
}
else{
this.curWinText = "Currently Serving B";

}
 




  
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
              this.currentAT = snapshot.val();
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
              this.currentBT = snapshot.val();


        }
      },
      (error) => {
        console.error(error);
      }
    );      
    

  

// COUNTER A 
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







  




//WINDOW A USER INFO
if(currentWindow=='A'){
// a CURRENT

onValue(
  child(dbRef, "curA/curA"),
  (snapshot) => {
    this.transferA = snapshot.val();
    if(this.transferA > 0){         
      console.log("A  is greater than 0");
        onValue(
          child(dbRef, "curA/curA"),
          (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/id/`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.id = snapshot.val();
              for (let i = 1; i <= 16; i++) {
                onValue(child(dbRef, `History/${this.id}/${i}/date`), (snapshot) => { 
                  this[`hisDate${i}`] = snapshot.val();
                  if(snapshot.val()==null){
                    this[`hisDate${i}`] = '-';    
                  }
              });
                onValue(child(dbRef, `History/${this.id}/${i}/time`), (snapshot) => { this[`hisTime${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/lname`), (snapshot) => { this[`hisLname${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/total`), (snapshot) => { this[`hisTotal${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/cashier`), (snapshot) => { this[`hisCashier${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/orno`), (snapshot) => { this[`hisOrno${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/id`), (snapshot) => { this[`hisId${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/parti`), (snapshot) => { this[`hisParti${i}`] = snapshot.val() });


              }

                        


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
      // first name
      onValue(
        child(dbRef, "curA/curA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/fname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.fname = snapshot.val(); 
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

      // mid name
      onValue(
        child(dbRef, "curA/curA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/mname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.mname = snapshot.val(); 
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
      //last name
      onValue(
        child(dbRef, "curA/curA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/lname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.lname = snapshot.val(); 
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
      //ed level
      onValue(
        child(dbRef, "curA/curA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/edlevel`; // assuming `edlevel` is the key for the `edlevel` string value
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.edlevel = snapshot.val(); // set the value of `this.edlevel`
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
      //grade/year
      onValue(
        child(dbRef, "curA/curA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/grade`; // assuming `edlevel` is the key for the `edlevel` string value
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.grade = snapshot.val(); // set the value of `this.edlevel`
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
      // tuition fee
      onValue(
          child(dbRef, "curA/curA"),
          (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/tint`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.tint = Number(snapshot.val());
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
      // miscfker
      // id


      // tmisc
      onValue(
        child(dbRef, "curA/curA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userMisc = `users/${counterValue}/tmisc`; 
          const userTuiton = `users/${counterValue}/tint`;
          onValue(
            child(dbRef, userMisc),
            (snapshot) => {
              this.tmisc = Number(snapshot.val()); 
              onValue(
            child(dbRef, userTuiton),
            (snapshot) => {
              this.tuiton = Number(snapshot.val()); 
              this.total = this.tuiton + this.tmisc;

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
          //total
          
        },
        (error) => {
          console.error(error);
        }
      );
      
    }
    else if (this.transferA < 0){
      console.log("A is less than 0");
        onValue(
          child(dbRef, "transferaB"),
          (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/id/`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.id = Number(snapshot.val());
              for (let i = 1; i <= 16; i++) {
                onValue(child(dbRef, `History/${this.id}/${i}/date`), (snapshot) => { 
                  this[`hisDate${i}`] = snapshot.val();
                  if(snapshot.val()==null){
                    this[`hisDate${i}`] = '-';
                  }
              });
                onValue(child(dbRef, `History/${this.id}/${i}/time`), (snapshot) => { this[`hisTime${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/lname`), (snapshot) => { this[`hisLname${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/total`), (snapshot) => { this[`hisTotal${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/cashier`), (snapshot) => { this[`hisCashier${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/orno`), (snapshot) => { this[`hisOrno${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/id`), (snapshot) => { this[`hisId${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/parti`), (snapshot) => { this[`hisParti${i}`] = snapshot.val() });
              }
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
      // first name
      onValue(
        child(dbRef, "transferaB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/fname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.fname = snapshot.val()+" "; 
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

      // mid name
      onValue(
        child(dbRef, "transferaB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/mname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.mname = snapshot.val(); 
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
      //last name
      onValue(
        child(dbRef, "transferaB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/lname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.lname = snapshot.val(); 
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
      //ed level
      onValue(
        child(dbRef, "transferaB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/edlevel`; // assuming `edlevel` is the key for the `edlevel` string value
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.edlevel = snapshot.val(); // set the value of `this.edlevel`
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
      //grade/year
      onValue(
        child(dbRef, "transferaB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/grade`; // assuming `edlevel` is the key for the `edlevel` string value
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.grade = snapshot.val(); // set the value of `this.edlevel`
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
      // tuition fee
      onValue(
        child(dbRef, "transferaB"),
          (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/tint`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.tint = Number(snapshot.val());
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
      // miscfker
      // id


      // tmisc
      onValue(
        child(dbRef, "transferaB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userMisc = `usersB/${counterValue}/tmisc`; 
          const userTuiton = `usersB/${counterValue}/tint`;
          onValue(
            child(dbRef, userMisc),
            (snapshot) => {
              this.tmisc = Number(snapshot.val()); 
              onValue(
            child(dbRef, userTuiton),
            (snapshot) => {
              this.tuiton = Number(snapshot.val()); 
              this.total = this.tuiton + this.tmisc;

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
          //total
          
        },
        (error) => {
          console.error(error);
        }
      );



    }
  });

}// end of of WINDOW A user info

//window B USER INFO
else{


onValue(
  child(dbRef, "curB/curB"),
  (snapshot) => {
    this.transferB = snapshot.val();

    if(this.transferB > 0){  
      console.log("B  is greater than 0");
           
      // B CURRENT
      onValue(
          child(dbRef, "curB/curB"),
          (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/id/`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.id = Number(snapshot.val());
              for (let i = 1; i <= 16; i++) {
                onValue(child(dbRef, `History/${this.id}/${i}/date`), (snapshot) => { 
                  this[`hisDate${i}`] = snapshot.val();
                  if(snapshot.val()==null){
                    this[`hisDate${i}`] = '-';
                  }
              });
                onValue(child(dbRef, `History/${this.id}/${i}/time`), (snapshot) => { this[`hisTime${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/lname`), (snapshot) => { this[`hisLname${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/total`), (snapshot) => { this[`hisTotal${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/cashier`), (snapshot) => { this[`hisCashier${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/orno`), (snapshot) => { this[`hisOrno${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/id`), (snapshot) => { this[`hisId${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/parti`), (snapshot) => { this[`hisParti${i}`] = snapshot.val() });
              }
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
      // first name
      onValue(
        child(dbRef, "curB/curB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/fname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.fname = snapshot.val()+" "; 
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

      // mid name
      onValue(
        child(dbRef, "curB/curB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/mname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.mname = snapshot.val(); 
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
      //last name
      onValue(
        child(dbRef, "curB/curB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/lname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.lname = snapshot.val(); 
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
      //ed level
      onValue(
        child(dbRef, "curB/curB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/edlevel`; // assuming `edlevel` is the key for the `edlevel` string value
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.edlevel = snapshot.val(); // set the value of `this.edlevel`
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
      //grade/year
      onValue(
        child(dbRef, "curB/curB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/grade`; // assuming `edlevel` is the key for the `edlevel` string value
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.grade = snapshot.val(); // set the value of `this.edlevel`
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
      // tuition fee
      onValue(
          child(dbRef, "curB/curB"),
          (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `usersB/${counterValue}/tint`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.tint = Number(snapshot.val());
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
      // miscfker
      // id


      // tmisc
      onValue(
        child(dbRef, "curB/curB"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userMisc = `usersB/${counterValue}/tmisc`; 
          const userTuiton = `usersB/${counterValue}/tint`;
          onValue(
            child(dbRef, userMisc),
            (snapshot) => {
              this.tmisc = Number(snapshot.val()); 
              onValue(
            child(dbRef, userTuiton),
            (snapshot) => {
              this.tuiton = Number(snapshot.val()); 
              this.total = this.tuiton + this.tmisc;

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
          //total
          
        },
        (error) => {
          console.error(error);
        }
      );

    }
    else if(this.transferB < 0){
      console.log("B  is less than 0");
        onValue(
          child(dbRef, "transferaA"),
          (snapshot) => {
            console.log(snapshot.val()+"test");
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/id/`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.id = snapshot.val();
              for (let i = 1; i <= 16; i++) {
                onValue(child(dbRef, `History/${this.id}/${i}/date`), (snapshot) => { 
                  this[`hisDate${i}`] = snapshot.val();
                  if(snapshot.val()==null){
                    this[`hisDate${i}`] = '-';    
                  }
              });
                onValue(child(dbRef, `History/${this.id}/${i}/time`), (snapshot) => { this[`hisTime${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/lname`), (snapshot) => { this[`hisLname${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/total`), (snapshot) => { this[`hisTotal${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/cashier`), (snapshot) => { this[`hisCashier${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/orno`), (snapshot) => { this[`hisOrno${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/id`), (snapshot) => { this[`hisId${i}`] = snapshot.val() });
                onValue(child(dbRef, `History/${this.id}/${i}/parti`), (snapshot) => { this[`hisParti${i}`] = snapshot.val() });


              }

                        


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
      // first name
      onValue(
        child(dbRef, "transferaA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/fname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.fname = snapshot.val(); 
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

      // mid name
      onValue(
        child(dbRef, "transferaA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/mname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.mname = snapshot.val(); 
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
      //last name
      onValue(
        child(dbRef, "transferaA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/lname`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.lname = snapshot.val(); 
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
      //ed level
      onValue(
        child(dbRef, "transferaA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/edlevel`; // assuming `edlevel` is the key for the `edlevel` string value
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.edlevel = snapshot.val(); // set the value of `this.edlevel`
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
      //grade/year
      onValue(
        child(dbRef, "transferaA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/grade`; // assuming `edlevel` is the key for the `edlevel` string value
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.grade = snapshot.val(); // set the value of `this.edlevel`
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
      // tuition fee
      onValue(
        child(dbRef, "transferaA"),
          (snapshot) => {
          const counterValue = snapshot.val();
          const userId = `users/${counterValue}/tint`;
          onValue(
            child(dbRef, userId),
            (snapshot) => {
              this.tint = Number(snapshot.val());
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
      // miscfker
      // id


      // tmisc
      onValue(
        child(dbRef, "transferaA"),
        (snapshot) => {
          const counterValue = snapshot.val();
          const userMisc = `users/${counterValue}/tmisc`; 
          const userTuiton = `users/${counterValue}/tint`;
          onValue(
            child(dbRef, userMisc),
            (snapshot) => {
              this.tmisc = Number(snapshot.val()); 
              onValue(
            child(dbRef, userTuiton),
            (snapshot) => {
              this.tuiton = Number(snapshot.val()); 
              this.total = this.tuiton + this.tmisc;

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
          //total
          
        },
        (error) => {
          console.error(error);
        }
      );
      

    }
  });

}






//time
setInterval(() => {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
    this.currentDate = now.toLocaleDateString();

  }, 1000);

  
  

  console.log("Current Window is: "+ currentWindow);
  
},



methods: {
  exitPop(){
    var x = document.getElementById("overlay");
    x.style.zIndex="-1";
  },
  muteRing(){
    const currentWindow = localStorage.getItem('currentWindow');
    if(currentWindow=='A'){
          const dbRefRinger= ref(db, `ringA`);
          update(dbRefRinger, {ringA: false});          
      }
      else if(currentWindow=='B'){
          const dbRefRinger= ref(db, `ringB`);
          update(dbRefRinger, {ringB: false});    
      }
  },
  
  printPage() {
    this.muteRing();
    console.log("print");
    const printWindow = window.open('/invoice', 'printWindow');
    printWindow.onload = function() {
      setTimeout(function(){
        printWindow.print();
        printWindow.close();
      }, 500);
    };
    localStorage.setItem('wholeName',this.fname+" "+this.lname);
    localStorage.setItem('idNumber',this.id);
  },

  printPage1() {
    this.muteRing();
    const currentWindow = localStorage.getItem('currentWindow');
    if(currentWindow=='A'){
          const dbRefRinger= ref(db, `ringA`);
          update(dbRefRinger, {ringA: false});          
      }
      else if(currentWindow=='B'){
          const dbRefRinger= ref(db, `ringB`);
          update(dbRefRinger, {ringB: false});    
      }
    console.log("print");
    const printWindow = window.open('/receipt', 'printWindow');
    printWindow.onload = function() {
      setTimeout(function(){
        printWindow.print();
        printWindow.close();
      }, 500);
    };
      localStorage.setItem('wholeName',this.fname+" "+this.lname);
      localStorage.setItem('idNumber',this.id);
      localStorage.setItem('tuitionfee',this.tint);
      localStorage.setItem('miscfee',this.tmisc);
      localStorage.setItem('currentTimeHehe',this.currentTime);
      localStorage.setItem('currentDateHehe',this.currentDate);
  },

  getHisDate(index) {
    return this[`hisDate${index}`];
  },
  getHisTime(index) {
    return this[`hisTime${index}`];
  },
  getHisLname(index) {
    return this[`hisLname${index}`];
  },
  getHisTotal(index) {
    return this[`hisTotal${index}`];
  },
  getHisCashier(index) {
    return this[`hisCashier${index}`];
  },
  getHisOrno(index) {
    return this[`hisOrno${index}`];
  },
  getHisId(index) {
    return this[`hisId${index}`];
  },
  getHisParti(index) {
    return this[`hisParti${index}`];
  },
  logout(){
    localStorage.setItem('log-in', false);
    localStorage.setItem('loggedas', '');
    location.reload();

  },



  incCounter() {
    this.muteRing();
    this.nextButtonClicked = true;

    const currentWindow = localStorage.getItem('currentWindow');
    if(currentWindow=='A'){
          const dbRefRinger= ref(db, `ringA`);
          update(dbRefRinger, {ringA: false});          
      }
      else if(currentWindow=='B'){
          const dbRefRinger= ref(db, `ringB`);
          update(dbRefRinger, {ringB: false});    
      }

    
    if(currentWindow=='A'){
      if(this.q1Af == '-' && this.q2Af =='-' && this.q3Af =='-' && this.q4Af =='-' && this.q5Af =='-'){
            var x = document.getElementById("overlay");
            x.style.zIndex="1";
            this.actionMsg = "Invalid Action";
            this.errMsg="There is nobody next in line";
      }
     else if(this.currentA == 0){

        const dbRef = ref(db, "Counter");
        this.counterVariable = this.counterVariable + 1;
        update(dbRef, { Counter: this.counterVariable });

        const dbRefC = ref(db, "curA");
        this.currentA = this.counterVariable;
        update(dbRefC, { curA: this.currentA });

        }

        else if(this.currentA != 0){
            var x = document.getElementById("overlay");
            x.style.zIndex="1";
            this.actionMsg = "Invalid Action";
            this.errMsg="Press DONE before proceeding";          
          
          }
        const dbRef = ref(db, 'Counter/Counter');
        let counterVariable;
        get(dbRef).then((snapshot) => {

            counterVariable = Number(snapshot.val());
            const userId = `users/${counterVariable}`;
            const dbRefcustomers = ref(db, userId);
            this.ring = false;           
            update(dbRefcustomers, { ring: this.ring });           
        });
    }
    else{
      if (this.q1Bf == '-' && this.q2Bf =='-' && this.q3Bf =='-' && this.q4Bf =='-' && this.q5Bf =='-'){
          var x = document.getElementById("overlay");
            x.style.zIndex="1";
            this.actionMsg = "Invalid Action";
            this.errMsg="Next que is empty";        
          }
      else if(this.currentB == 0){

        const dbRef = ref(db, "CounterB");
        this.counterVariableB = this.counterVariableB + 1;
        update(dbRef, { CounterB: this.counterVariableB });

        const dbRefC = ref(db, "curB");
        this.currentB = this.counterVariableB;
        update(dbRefC, { curB: this.currentB });

        }

        else if(this.currentB != 0){
            var x = document.getElementById("overlay");
            x.style.zIndex="1";
            this.actionMsg = "Invalid Action";
            this.errMsg="Press Done before proceeding";          
          }
        const dbRef = ref(db, 'CounterB/CounterB');
        let counterVariableB;
        get(dbRef).then((snapshot) => {
            
          
            counterVariableB = Number(snapshot.val());
            const userId = `usersB/${counterVariableB}`;
            const dbRefcustomersB = ref(db, userId);
            this.ring = false;
          
            update(dbRefcustomersB, { ring: this.ring });           
        });        

    }
  
      
  },
  


  doneUser(){
    this.nextButtonClicked = false;
    this.muteRing();

    const currentWindow = localStorage.getItem('currentWindow')

    if(currentWindow =='A'){
    const dbReftemp = ref(db, "curA");
   
    update(dbReftemp, { curA: 0 });

    const dbRef = ref(db, 'Counter/Counter');
    let counterVariable;

    get(dbRef).then((snapshot) => {

    counterVariable = Number(snapshot.val());
        const userId = `users/${counterVariable}`;
        const dbRefcustomers = ref(db, userId);
        this.ring = false;
       
        update(dbRefcustomers, { ring: this.ring }); 
      });

    }
    else{
    
    const dbReftemp = ref(db, "curB");
   
    update(dbReftemp, { curB: 0 });

    const dbRef = ref(db, 'CounterB/CounterB');
    let counterVariableB;

    get(dbRef).then((snapshot) => {

    counterVariableB = Number(snapshot.val());
        const userId = `usersB/${counterVariableB}`;
        const dbRefcustomers = ref(db, userId);
        this.ring = false;
       
        update(dbRefcustomers, { ring: this.ring }); 
      });


    }

    
  },




  callUser() {        
    const currentWindow = localStorage.getItem('currentWindow')
      if(currentWindow=='A'){
  
      }
      else if(currentWindow=='B'){

      }

    if(currentWindow == 'A'){
    const dbRef = ref(db, 'Counter/Counter');
    let counterVariable;
    get(dbRef).then((snapshot) => {
        
        if(this.currentA==0){
            var x = document.getElementById("overlay");
            x.style.zIndex="1";
            this.actionMsg = "Invalid Action";
            this.errMsg="There is nobody to call";
        }
        
        else if(this.currentA>0){

          const dbRefRinger= ref(db, `ringA`);
          this.ringA = !this.ringA;
          update(dbRefRinger, {ringA: this.ringA});      
          
          
          counterVariable = Number(snapshot.val());
          const userId = `users/${counterVariable}`;
          const dbRefcustomers = ref(db, userId);
          this.ring = !this.ring;       
          update(dbRefcustomers, { ring: this.ring });   

        }
        else if (this.currentA<0){

          const dbRefRinger= ref(db, `ringA`);
          this.ringA = !this.ringA;
          update(dbRefRinger, {ringA: this.ringA});  

          const dbRef = ref(db, 'transferaA');
          let counterVariableB;
          get(dbRef).then((snapshot) => {

            console.log("snapshot value: "+snapshot.val())
            counterVariableB = Math.abs(snapshot.val());
            const userId = `usersB/${counterVariableB}`;
            const dbRefcustomers = ref(db, userId);
            this.ring = !this.ring;
            update(dbRefcustomers, { ring: this.ring });    

          });
        }
      
    });

    }
    else{
    const dbRef = ref(db, 'CounterB/CounterB');
    let counterVariableB;
    get(dbRef).then((snapshot) => {
        
        if(this.currentB==0){
          var x = document.getElementById("overlay");
            x.style.zIndex="1";
            this.actionMsg = "Invalid Action";
            this.errMsg="There is nobody to call";

        }
        else if(this.currentB >0){

          const dbRefRinger= ref(db, `ringB`);
          this.ringB = !this.ringB;
          update(dbRefRinger, {ringB: this.ringB});    


          counterVariableB = Math.abs(snapshot.val());
          const userId = `usersB/${counterVariableB}`;
          const dbRefcustomers = ref(db, userId);
          this.ring = !this.ring;
        
          update(dbRefcustomers, { ring: this.ring });  
        }
        else if(this.currentB<0){

          const dbRefRinger= ref(db, `ringB`);
          this.ringB = !this.ringB;
          update(dbRefRinger, {ringB: this.ringB});    

          const dbRef = ref(db, 'transferaB');
          let counterVariableB;
          get(dbRef).then((snapshot) => {

            console.log("snapshot value: "+snapshot.val())
            counterVariableB = Math.abs(snapshot.val());
            const userId = `users/${counterVariableB}`;
            const dbRefcustomers = ref(db, userId);
            this.ring = !this.ring;
            update(dbRefcustomers, { ring: this.ring });                  
          });

        }
       
    });



    }
    

  },
  editInfo(){
      this.muteRing();

      this.isEditMode = true;
      this.idT = this.id;
      this.fnameT = this.fname;
      this.mnameT = this.mname;
      this.lnameT = this.lname;
      this.edlevelT = this.edlevel;
      this.gradeT = this.grade;
      this.tintT = this.tint;
      this.tmiscT = this.tmisc;
    },
  saveInfo(){
    const dbRef = ref(db);
    this.muteRing();
    this.isEditMode = false;
    const currentWindow = localStorage.getItem('currentWindow');

    if(this.currentA < 0){
      console.log("current A is less 0")
    }
    if(this.currentB < 0){
      console.log("current b is less 0")
    }

    if(currentWindow==='A'){
      const dbRefCurA = ref(db, `curA/curA`);
            get(dbRefCurA).then((snapshot) => {
              if(snapshot.val()>0){
          if(currentWindow === 'A'){
            const dbRefcustomers = ref(db, `users/${this.currentA}`);

                  //Que Information A
                  update(dbRefcustomers, { id: this.idT });
                  update(dbRefcustomers, { fname: this.fnameT });
                  update(dbRefcustomers, { mname: this.mnameT });
                  update(dbRefcustomers, { lname: this.lnameT });
                  update(dbRefcustomers, { edlevel: this.edlevelT });
                  update(dbRefcustomers, { grade: this.gradeT });
                  update(dbRefcustomers, { tint: this.tintT });
                  update(dbRefcustomers, { tmisc: this.tmiscT });
                  
                                        
              this.idT = "";
              this.fnameT = "";
              this.mnameT = "";
              this.lnameT = "";
              this.edlevelT = "";
              this.gradeT = "";
              this.tintT = "";
              this.tmiscT = "";
            }// if A
        }
        else if(snapshot.val()<0){
          const dbRefCTR = ref(db, `transferaA`);
            get(dbRefCTR).then((snapshot) => {
            
            const dbRefcustomers = ref(db, `usersB/${Math.abs(snapshot.val())}`);
            console.log(this.currentA);
            //Que Information B
            update(dbRefcustomers, { id: this.idT });
            update(dbRefcustomers, { fname: this.fnameT });
            update(dbRefcustomers, { mname: this.mnameT });
            update(dbRefcustomers, { lname: this.lnameT });
            update(dbRefcustomers, { edlevel: this.edlevelT });
            update(dbRefcustomers, { grade: this.gradeT });
            update(dbRefcustomers, { tint: this.tintT });
            update(dbRefcustomers, { tmisc: this.tmiscT });
                      
              this.idT = "";
              this.fnameT = "";
              this.mnameT = "";
              this.lnameT = "";
              this.edlevelT = "";
              this.gradeT = "";
              this.tintT = "";
              this.tmiscT = "";
              

            });



        }

              
            });

    }
    

    if(currentWindow==='B'){
      const dbRefCurB = ref(db, `curB/curB`);
            get(dbRefCurB).then((snapshot) => {
              
        if(snapshot.val()>0){
          if(currentWindow === 'B'){

            const dbRefcustomers = ref(db, `usersB/${this.currentB}`);

                  //Que Information B
                  update(dbRefcustomers, { id: this.idT });
                  update(dbRefcustomers, { fname: this.fnameT });
                  update(dbRefcustomers, { mname: this.mnameT });
                  update(dbRefcustomers, { lname: this.lnameT });
                  update(dbRefcustomers, { edlevel: this.edlevelT });
                  update(dbRefcustomers, { grade: this.gradeT });
                  update(dbRefcustomers, { tint: this.tintT });
                  update(dbRefcustomers, { tmisc: this.tmiscT });
                  
                                        
              this.idT = "";
              this.fnameT = "";
              this.mnameT = "";
              this.lnameT = "";
              this.edlevelT = "";
              this.gradeT = "";
              this.tintT = "";
              this.tmiscT = "";
            }// if B
        }
        else if(snapshot.val()<0){
          const dbRefCTR = ref(db, `transferaB`);
            get(dbRefCTR).then((snapshot) => {
            
            const dbRefcustomers = ref(db, `users/${Math.abs(snapshot.val())}`);
            console.log(this.currentA);
            //Que Information B
            update(dbRefcustomers, { id: this.idT });
            update(dbRefcustomers, { fname: this.fnameT });
            update(dbRefcustomers, { mname: this.mnameT });
            update(dbRefcustomers, { lname: this.lnameT });
            update(dbRefcustomers, { edlevel: this.edlevelT });
            update(dbRefcustomers, { grade: this.gradeT });
            update(dbRefcustomers, { tint: this.tintT });
            update(dbRefcustomers, { tmisc: this.tmiscT });
                      
              this.idT = "";
              this.fnameT = "";
              this.mnameT = "";
              this.lnameT = "";
              this.edlevelT = "";
              this.gradeT = "";
              this.tintT = "";
              this.tmiscT = "";
              

            });



        }



            });

    }





  },
  doneTransaction(){
    this.muteRing();

    const currentWindow = localStorage.getItem('currentWindow');

      const userIdHistory = `History/${this.id}`;
      const dbRefCTR = ref(db, `History/${this.id}/ctr`);
      const dbRefHistory = ref(db, userIdHistory);
      get(dbRefCTR).then((snapshot) => {
                    //INCREMENT                
                    this.ctr = snapshot.val();
                    this.ctr = this.ctr+1;
                    this.parti = "Tuition";

                   this.randomNumber = Math.floor(Math.random() * 999999) + 1;
                   this.formattedRandomNumber = this.formatNumber(this.randomNumber, 6);
                   localStorage.setItem('ornoYEAH!',this.formattedRandomNumber);
                   localStorage.setItem('transactionYeah!',this.ctr);


                    update(dbRefHistory, { ctr: this.ctr});
                    const userIdHistoryNum = `History/${this.id}/${this.ctr}`;
                    const dbRefHistoryNum = ref(db, userIdHistoryNum);
                    update(dbRefHistoryNum, { date: this.currentDate});
                    update(dbRefHistoryNum, { time: this.currentTime});
                    update(dbRefHistoryNum, { lname: this.lname});
                    update(dbRefHistoryNum, { id: this.id});
                    this.total = this.tmisc + this.tint;
                    update(dbRefHistoryNum, { total: this.total});
                    update(dbRefHistoryNum, { parti: this.parti});
                    update(dbRefHistoryNum, { orno: this.formattedRandomNumber});


                    const dbRefCC = ref(db, "currentCashierA"); 
                    const dbRefCCB = ref(db, "currentCashierB"); 



                    if(currentWindow=='A'){
                      get(dbRefCC).then((snapshot) => {     
                      this.cashier = snapshot.val();
                      update(dbRefHistoryNum, { cashier: this.cashier});
                      
                    });
                  }
                    else if(currentWindow=='B'){
                      get(dbRefCCB).then((snapshot) => {     
                      this.cashier = snapshot.val();
                      update(dbRefHistoryNum, { cashier: this.cashier});
                      
                    });                      
                  }
               
            });
    this.idT = "";
    this.fnameT = "";
    this.mnameT = "";
    this.lnameT = "";
    this.edlevelT = "";
    this.gradeT = "";
    this.tintT = "";
    this.tmiscT = "";

      

  },
  formatNumber(number, length) {
  const str = number.toString();
  return str.padStart(length, '0').replace(/(\d{3})(?=\d)/g, '$1');
},
  cancelTransaction(){
    this.muteRing();

    const currentWindow = localStorage.getItem('currentWindow');
    if(currentWindow==='A'){



      const deletePathA = ref(db, `users/${this.currentA}`);
      remove(deletePathA).then(() => {console.log("location removed and Transaction canceled");});
      
      const updateCurA = ref(db,`curA`);
      update(updateCurA, {curA: 0});
      console.log(this.currentA);
    this.idT = "";
    this.fnameT = "";
    this.mnameT = "";
    this.lnameT = "";
    this.edlevelT = "";
    this.gradeT = "";
    this.tintT = "";
    this.tmiscT = "";

    }
    else if(currentWindow==='B'){
      this.muteRing();

      const updateCurB = ref(db,`curB`);
      update(updateCurB, {curB: 0});

      const deletePathB = ref(db, `users/${this.currentB}`);
      remove(deletePathB).then(() => {console.log("location removed and Transaction canceled");});
    this.idT = "";
    this.fnameT = "";
    this.mnameT = "";
    this.lnameT = "";
    this.edlevelT = "";
    this.gradeT = "";
    this.tintT = "";
    this.tmiscT = "";
    }
     
  },
  transfer(){
    this.muteRing();

    const currentWindow = localStorage.getItem('currentWindow');
    const dbRef = ref(db);
    if(currentWindow === 'A'){

      if(this.currentAtext === '-'){

          var x = document.getElementById("overlay");
            x.style.zIndex="1";
            this.actionMsg = "Invalid Action";
            this.errMsg="No customer to transfer";
      }
      else if(this.currentB > 0){
          
          var x = document.getElementById("overlay");
            x.style.zIndex="1";
            this.actionMsg = "Invalid Action";
            this.errMsg="Can't Transfer Because Cashier is busy";
        }
      else{
        const dbRef = ref(db, `curA/curA`);
        get(dbRef).then((snapshot) => {  
        
        const dbRefB = ref(db, "curB");
        update(dbRefB, { curB: snapshot.val()*-1});

        const dbRefA = ref(db, "curA");
        update(dbRefA, { curA: 0});     

        const dbRefTransfer = ref(db);
        update(dbRefTransfer, { transferaA: snapshot.val()});

          this.id = null ;
          this.fname = null ;
          this.mname = null ;
          this.lname = null ;
          this.edlevel = null ;
          this.grade = null ;
          this.tint = null ;
          this.tmisc = null ;
          this.total = null;
          
        });
      }



    }
    if(currentWindow === 'B'){

        if(this.currentBtext ==='-'){
          
            var x = document.getElementById("overlay");
            x.style.zIndex="1";
            this.actionMsg = "Invalid Action";
            this.errMsg="You can't transfer nothing";
        }
        else if(this.currentA > 0){
          
            var x = document.getElementById("overlay");
            x.style.zIndex="1";
            this.actionMsg = "Invalid Action";
            this.errMsg="Other cashier is busy";
        }
        
        else{
          const dbRef = ref(db, `curB/curB`);
          get(dbRef).then((snapshot) => {  
          
          const dbRefA = ref(db, "curA");
          update(dbRefA, { curA: snapshot.val()*-1});

          const dbRefB = ref(db, "curB");
          update(dbRefB, { curB: 0});  
          
          const dbRefTransfer = ref(db);
          update(dbRefTransfer, { transferaB: snapshot.val()});

          this.id = null ;
          this.fname = null ;
          this.mname = null ;
          this.lname = null ;
          this.edlevel = null ;
          this.grade = null ;
          this.tint = null ;
          this.tmisc = null ;
          this.total = null;

          
          });
        }

    }

  },

    
},
    
};
</script>

<script setup>
import { UserCircleIcon , BellAlertIcon , ForwardIcon, ArrowPathIcon, CheckBadgeIcon,DocumentCheckIcon,PencilSquareIcon,ArchiveBoxXMarkIcon,PrinterIcon,PaperAirplaneIcon} from '@heroicons/vue/24/solid'
import logo from "~/assets/images/logo.png";
</script>

<style scoped>
.activeButton {
  background-color: grey !important;
  color: #fefefe;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.per{
margin-top: 33px;
}

.tabUp{
height: 33px;
}

.hTable{
font-size: 14px;
width: 550px;
text-align:center;
}

.hTd{
font-size: 13px;
}
.hTable,.hTr,.hTd,.hTh{
border:1px solid #fefefe;
}
.butter{
display:flex;
align-items: center;
justify-content: center;
}
.watermark{
display: flex;
justify-content: center;
}
.logs{
  position:absolute;
  height: 250x;
  width: 250px;
  margin-top: 0px;
  margin-left:250px;
  z-index:0;
  opacity:0.2;
}
.fl{
  text-align:start;
  width:50%;
}
.fr{
  text-align:end;
  width:50%;
}
.container{
  display:flex;
  justify-content: center;
  align-items:center;
  margin-bottom:5px;
}
.fChildren{
  display:flex;
  width:65%;
}

hr{
  border-top: 1px dashed #3f3f46;
  margin-top:0px;
}
.sl{
  text-align:start;
  width:50%;

}
.sr{
  text-align:end;
  width:50%;
}
.soaDetails{
  display:flex;
}
.p{
  text-align: center;
}
.t{
  font-weight: 900;
  margin-bottom:3px;
}
.tu{
  font-weight: 900;
  margin-bottom:3px;
  text-align: center;
}


.tup{
  font-weight: 900;
  margin-bottom:3px;    
}
.ud{
  display:flex;
}

.subject{
  width: 17%;
  height: 225px;
}

.unit{
  width: 10%;
  height: 225px;
}

.soa{
  width: 56%;
  height: 240px;
  padding-left:3px;
  padding-right:3px;
  z-index:0;
}

.payments{
  width: 18%;
  height: 225px;
  text-align: end;
}


.uleft{
  width: 50%;
  text-align:start;
}
.uright{
  width: 50%;
  text-align: end;
}

.up{
  display:flex;
  margin-bottom: 8px;
}

.details{
  color:#3f3f46;
  font-size: 10px;
  letter-spacing:1.5px;
  font-weight: 700;
  
}
.asses{
  font-weight: 500;
  font-size:13px;
}
.u{
  font-weight: 900;
  font-size:16px;
  text-decoration-line: underline;
  font-family: "Times New Roman", Times, serif;
  padding:0px;
  margin-top:5px;
  height:19px;
  text-underline-offset: 3px;
}

.l{
  font-weight: 600;
  font-size:11px;
  padding:0px;
  margin:0px;
  letter-spacing:2.5px;
}
.log{
height: 42px;
width: 42px;
}
.schoolName{
height:100%;
width: 66%;
}
.logo{
display: flex;
align-items:center;
justify-content: center;
height: 100%;
width: 12%;
}
.slip{
display:flex;
justify-content:center;
align-items:center;
height: 100%;
width: 22%;
margin-right:3px;
}


.assesment{
background-color: #fefefe;
height: 373px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
padding:8px;
}
.headP{
display: flex;
}
.head{
display:flex;
background-color: #166534;
height: 13%;
padding:0px;
margin-bottom: 15px;
}
.lebel{
font-weight: 500;
}

.but{
display: flex;
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
margin-top: 13px;
color: #0F172A;
font-weight: 900;
}

table{
width:58%;
border: 1px solid #fefefe;
text-align: left;
font-size: 20px;
margin-top: 25px;
margin-bottom: 25px;
}
.transactionContent{
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
}


td,th,table{
border: 1px solid #1E293B;
}

.edit:hover{
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
background-color: grey;
color: #fefefe;
}
.logout:hover{
color: grey;
}

.general-tab:hover{
background-color: grey;
color: #fefefe;
}

input{
color:#fefefe;
padding-left: 10px;
}

.content{
height: 480px;
background: #1E293B;
border: 1px solid #293549;
border-radius: 0px 15px 15px 15px;
color: white;
padding: 16px;
}

.fade-enter-active,
.fade-leave-active {
transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
opacity: 0;
}

.tabs{
padding: 15px;
}
.search{
margin-left: 380px;
margin-bottom: 10px;
width: 200px;
height: 30px;
background: #293549;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
padding-left: 10px;
color: #fefefe;
}
.tabDown{
display: flex;
}
.tab-active {
display: flex;
width: 120px;
height: 25px;
background: #1E293B;
border-width: 1px 1px 0px 1px;
border-style: solid;
border-color: #293549;
border-radius: 8px 8px 0px 0px;
margin-right: 1px;
color: #FEFEFE;
font-weight: 700;
justify-content: center;
align-items: center;
cursor: pointer;
}
.general-tab {
display: flex;
width: 120px;
height: 25px;
background: #fefefe;
border-width: 1px 1px 0px 1px;
border-style: solid;
border-color: #293549;
border-radius: 8px 8px 0px 0px;
margin-right: 1px;
color: #0F172A;
font-weight: 700;
justify-content: center;
align-items: center;
cursor: pointer;
}

.buttons{
display: flex;
align-items: center;
justify-content: center;
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
.title{
font-weight: 700;
font-size: 20px;
line-height: 30px;
color: #fefefe;
padding-left: 18px;
margin-top: 5px;
}
.personal{
height: 156px;
}
.educational{
height: 70x;
}
.name{
margin-left: 45px;
color: #fefefe;
font-size: 18px;
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
margin-left: 30px;
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
.commandsIcon{
width:40px ;
height:40px;
margin-right: 5px;
color: #0F172A;
}
.commandIcon{
width:40px ;
height:40px;
margin-right: 15px;
color: #0F172A;
}

.num{
color: #0F172A;
font-weight: 900;
font-size:x-large;
}
.lineWindow{
color: #fefefe;
margin-left: 38px;
font-weight: 700;
}
.lineNum{
display: flex;
width: 53px;
height: 35px;
background-color: #fefefe;
margin: 5px;
margin-left: 10px;
border-radius: 8px;
justify-content: center;
align-items: center;
}
.lineBox{
display: flex;
height: 45px;
width: 240px;
margin: 10px;
align-items: center;
padding: 2px;
margin-bottom: 15px;
background-color: #0F172A;
border-radius: 12px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 12px;
}
.controls{
padding-top: 49px;
padding-left: 13px;
}
.commandBox{
display: flex;
background-color: #fefefe;
justify-content: center;
align-items: center;
border-radius: 12px;
height: 65px;
width: 150px;
margin-top: 13px;
color: #0F172A;
font-weight: 900;
}

.commandBox:hover .commandIcon{
color:#fefefe;
}

.butLow:hover .commandIcon{
color:#fefefe;
}

.butLow:hover{
background-color: grey;
color: #fefefe;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.commandBox:hover .commandsIcon{
color:#fefefe;   
}

.commandBox:hover{
background-color: grey;
color: #fefefe;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}


.dQueue{
margin-top: 25px;
display: flex;
width: 61%;
}
.uQueue{
display: flex;
}
.windowA{
display: flex;
height: 80px;
width: 120px;
margin-left: 75px;
margin-right: 25.5px;
background-color: #0F172A;
border-radius: 20px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
justify-content: center;
align-items: center;
}

.windowB{
display: flex;
height: 80px;
width: 120px;
margin-left: 25.5px;
margin-right: 51px;
background-color: #0F172A;
border-radius: 20px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
justify-content: center;
align-items: center;
}

.currentNum{
font-size: 32px;
color: #ffffff;
font-weight: 800;
line-height: 60px;
}

.windowTextA{
color: #ffffff;
margin-left: 92px;
margin-right: 29px;
margin-top: 7px;
font-weight: 700;
font-size: 18px;
}
.windowTextB{
color: #ffffff;
margin-left: 53px;
margin-right: 55px;
margin-top: 7px;
font-weight: 700;
font-size: 18px;
}

.logout {
color: #ffffff;
width: 55px;
height: 55px;
margin-bottom: 2px;
}

.image {
height: 100%;
}

.current{
text-align: center;
font-size: 28px;
color: #ffffff;
font-style: normal;
font-weight: 600;
}

.dateTime {
color: #ffffff;
width: 15%;
height: 100%;
padding-top: 2px;
}

.user {
color: #ffffff;
width: 85%;
padding-left: 20px;
height: 100%;
padding-top: 2px;
}

.upper {
display: flex;
margin-top: 10px;
margin-left: 8px;
margin-right: 8px;
margin-bottom: 0px;
}

.bottom {
display: flex;
height: 85%;
margin: 5px;
}

.flex {
background-color: #0F172A;
padding-left: 15px;
padding-right: 15px;
padding-top: 10px;
padding-bottom: 10px;

}

.queuePane {
position: flex;
background-color: #1E293B;
width: 30%;
height: 100%;
margin-right: 7.5px;
border-radius: 35px;
border: 1px solid #293549;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.8);

}

.billingPane {
position: flex;
background-color: #1E293B;
width: 70%;
height: 100%;
margin-left: 7.5px;
border-radius: 35px;
padding: 0px;
border: 1px solid #293549;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.8);
}

.userInfo {
display: flex;
width: 100%;
height: 54px;
background-color: #0F172A;
border-radius: 30px;
align-items: flex-end;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
padding-top: 1.5px;
}

.editDetailsPane {
position: flex;
width: 40%;
height: 100%;
background-color: #0F172A;
margin: 5px;
border-radius: 10px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
padding-top: 18px;
}

.tabs {
width: 60%;
height: 100%;
background-color: #0F172A;
margin: 5px;
border-radius: 10px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
}
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
.headR{
display: flex;
align-items: flex-end;
justify-content: flex-end;
width: 50%;
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
