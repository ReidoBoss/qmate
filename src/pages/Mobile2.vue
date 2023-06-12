<template>
  <div class="container">
    <div class="qOverlap" id="qOverlap"></div>
  </div>
  <div class="box" >
    <div class="qLap" id="qLap">
      <div class="details">
        <!-- details for the queue number -->
         <div class="x"><XMarkIcon class="commandIcon" @click="close"/></div> 
         <div class="det">
          <div class="mes">You Are Successfully Enqueued</div>
        <div class="qMes">Your Queue No:</div>
        <div class="qNum">{{queCur}}</div>
       
         </div>

      </div>
    </div>
  </div>

    <div class="body">
      <div class="upper">
          <div class="left">
            <audio ref="audio" src="https://firebasestorage.googleapis.com/v0/b/fir-68a5f.appspot.com/o/X2Download.app%20-%20Cycle%20Bell%20Ring%20Sound%20Effect%20_%20Non%20Copyright%20(128%20kbps).mp3?alt=media&token=760578d2-3675-45d3-a3ca-f357df3699b4" loop></audio>
            <audio ref="audioNotif" src="https://firebasestorage.googleapis.com/v0/b/fir-68a5f.appspot.com/o/Ting.mp3?alt=media&token=b6a9303f-03ef-4551-a09c-c3787d92ec8b" ></audio>

              <h3>{{ currentAtext }}</h3>
          </div>
          <div class="right">
              <h3>{{ currentBtext }}</h3>
          </div>
      </div>
      <div class="window">
          <div class="a">
             
          </div>
          <div class="b">
             
          </div>
      </div>
      <div class="queue">
          <div class="no">
              <h2>Window A</h2>
              <div class="squares">{{ q1Af }}</div>
              <div class="squares">{{ q2Af }}</div>
              <div class="squares">{{ q3Af }}</div>
              <div class="squares">{{ q4Af }}</div>
              <div class="squares" id="current">{{ q5Af }}</div>
              <div class="squares">{{ q6Af }}</div>
          </div>
          <div class="assign">
              <h2>Window B</h2>
              <div class="txt"> {{ q1Bf }}</div>
              <div class="txt"> {{ q2Bf }}</div>
              <div class="txt"> {{ q3Bf}}</div>
              <div class="txt"> {{ q4Bf }}</div>
              <div class="txt" > {{q5Bf  }}</div>
              <div class="txt"> {{ q6Bf }}</div>
          </div>
      </div>     
      <div class="personal">
          <h3 class="num">Queue No : {{ queCur }}</h3>
        </div>
        <div class="controls">
            <div class="conRight">
          <div class="editIcon" @click="cancel()">
            <ArchiveBoxXMarkIcon class="commandsIcon"/>
          </div>
          <div class="text">
            CANCEL
          </div>
        </div>
        <div class="conLeft">
          <input type="checkbox" id="check" @click="testAudio()">
          <label for="check" class="button"></label>
          <div class="text">
            NOTIFY  
          </div>
        </div>
        <div class="conRight" @click="redirect()">
          <div class="editIcon">
            <PencilSquareIcon class="commandsIcon"/>
          </div>
          <div class="text">
            EDIT
          </div>
        </div>
      </div>
  </div>
  
  <audio :src="audioLink"></audio>
  <audio :src="audioNotif"></audio>


</template>

<script>



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
getDatabase,
ref,
child,
get,
remove,
update,
onValue,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";



function close(){
const x = document.getElementById("qOverlap");
const y = document.getElementById("qLap");
x.classList.toggle("delete");
y.classList.toggle("del");
}


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
    q1Af : '',
    q2Af : '',
    q3Af: '',
    q4Af:'',
    q5Af:'',
    q6Af:'',
    q1Bf : '',
    q2Bf : '',
    q3Bf: '',
    q4Bf:'',
    q5Bf:'',
    q6Bf:'',
    queCur:'',
    test: false,
    audioBool: '',
    audioLink: "https://firebasestorage.googleapis.com/v0/b/fir-68a5f.appspot.com/o/X2Download.app%20-%20Cycle%20Bell%20Ring%20Sound%20Effect%20_%20Non%20Copyright%20(128%20kbps).mp3?alt=media&token=760578d2-3675-45d3-a3ca-f357df3699b4",
    audioNotif: "https://firebasestorage.googleapis.com/v0/b/fir-68a5f.appspot.com/o/Ting.mp3?alt=media&token=b6a9303f-03ef-4551-a09c-c3787d92ec8b",
    isMuted: false,
    speakThis: '',

   

  };
},



mounted() {
  const dbRef = ref(db);
  const dbRefB = ref(db);
  this.$refs.audio.volume = 0;


// Currently Serving A
onValue(
      child(dbRef, "curA/curA"),
      (snapshot) => {
        this.currentA = Number(snapshot.val());
        if(snapshot.val() == 0){
            this.currentAtext = "-";

        }
        else{this.currentA = Number(snapshot.val());
             this.currentAtext = "A"+Number(snapshot.val());

                if(this.window =='A'){
                this.myVariable = localStorage.getItem('que');
                this.queCurR = this.myVariable;

                
                const ring = `users/${this.queCurR}/lname`;
                onValue(
                  child(dbRef, ring),
                  (snapshot) => {
                    
                      if(this.currentA+3 == this.queCurR){
                        console.log("this is true this should be using voice");
                          this.speakThis = "Current number is: "+this.currentAtext+"........."+"It is almost your turn, Please be ready" + ".."+snapshot.val();
                          const synth = window.speechSynthesis;
                          const utterance = new SpeechSynthesisUtterance(this.speakThis);
                          synth.speak(utterance);
                      }

                  },
                  (error) => {
                    console.error(error);
                  }
                );

                }

            
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
        else{this.currentB = Number(snapshot.val());
             this.currentBtext = "B"+Number(snapshot.val());

             if(this.window =='B'){
                this.myVariable = localStorage.getItem('que');
                this.queCurRB = this.myVariable;

                if(this.currentB+1 == this.queCurRB){
                  console.log("this is true");

                  const ring = `usersB/${this.queCurRB}/lname`;
                onValue(
                  child(dbRef, ring),
                  (snapshot) => {
                    
                      if(this.currentA+3 == this.queCurRB){
                        console.log("this is true this should be using voice B");
                          this.speakThis = "Current number is: "+this.currentBtext+"........."+"It is almost your turn, Please be ready" + ".."+snapshot.val();
                          const synth = window.speechSynthesis;
                          const utterance = new SpeechSynthesisUtterance(this.speakThis);
                          synth.speak(utterance);
                      }

                  },
                  (error) => {
                    console.error(error);
                  }
                );

                }

                }
            
            }
      
      },
      (error) => {
        console.error(error);
      }
    );        
     

// window recognizer
this.window = localStorage.getItem('window');
console.log("this is window "+this.window)
// que recognizer

if(this.window == "A"){
console.log("HI I'M WINDOW A")
this.myVariable = localStorage.getItem('que');
  this.queCur = this.myVariable;
  if (this.myVariable > this.counterVariable){
      console.log("THIS IS TRUE")
      this.queCur = "A"+this.myVariable;
      this.queCurNum = this.myVariable;
      localStorage.setItem('myQ', this.queCurNum);

  }
const ring = `users/${this.queCurNum}/ring`;
// A Ring
  onValue(
    child(dbRef, ring),
    (snapshot) => {
      console.log(snapshot.val())

      if(snapshot.val()== true){

        this.$refs.audio.play();

        
        }
      else{
          const audio = this.$refs.audio
          audio.pause();
          audio.currentTime = 0;
      }
     
    },
    (error) => {
      console.error(error);
    }
  );
}
//B ring
else{
console.log("HI I'M WINDOW B")

this.myVariable = localStorage.getItem('que');
  this.queCur = this.myVariable;
  if (this.myVariable > this.counterVariable){
      console.log("THIS IS TRUE")
      this.queCur = "B"+this.myVariable;
      this.queCurNum = this.myVariable;
      localStorage.setItem('myQ', this.queCurNum);

  }
const ring = `usersB/${this.queCurNum}/ring`;
  onValue(
    child(dbRef, ring),
    (snapshot) => {
      console.log(snapshot.val())

      if(snapshot.val()== true){

        this.$refs.audio.play();

        
        }
      else{
          const audio = this.$refs.audio
          audio.pause();
          audio.currentTime = 0;
      }
     
    },
    (error) => {
      console.error(error);
    }
  );

}
 




// COUNTER A 
onValue(
      child(dbRef, "Counter/Counter"),
      (snapshot) => {
        this.counterVariable = Number(snapshot.val());
        console.log(this.counterVariable)
        console.log(this.queCurNum);

        // if(this.counterVariable==this.queCurNum){
        // this.$refs.audio.play()
        //   console.log(this.counterVariable)

        // }
        // else {
        //   const audio = this.$refs.audio
          // audio.pause();
        //   audio.currentTime = 0;
        // }
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
      else { this.q2Af = '-';}
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
//B 4th q
onValue(
  child(dbRef, "CounterB/CounterB"),
  (snapshot) => {
  const counterValue = snapshot.val();
  const userId = `usersB/${counterValue+4}/queNum`;
  onValue(
    child(dbRef, userId),
    (snapshot) => {
      if(snapshot.val()!=null){ this.q4B = snapshot.val();
                                this.q4Bf = "B" + this.q4B;}
      else { this.q4Bf = "-"; }
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
//B 5th q
onValue(
  child(dbRef, "CounterB/CounterB"),
  (snapshot) => {
  const counterValue = snapshot.val();
  const userId = `usersB/${counterValue+5}/queNum`;
  onValue(
    child(dbRef, userId),
    (snapshot) => {
      if(snapshot.val()!=null){ this.q5B = snapshot.val();
                                this.q5Bf = "B" + this.q5B;}
      else { this.q5Bf = "-"; }
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

// 6th que
onValue(
  child(dbRef, "Counter/Counter"),
  (snapshot) => {
  const counterValue = snapshot.val();
  const userId = `users/${counterValue+6}/queNum`;
  onValue(
    child(dbRef, userId),
    (snapshot) => {
      if(snapshot.val()!=null){ this.q6A = snapshot.val();
                                this.q6Af = "A" + this.q6A;}
      else { this.q6Af = '-'; }
      
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
//B 6th q
onValue(
  child(dbRef, "CounterB/CounterB"),
  (snapshot) => {
  const counterValue = snapshot.val();
  const userId = `usersB/${counterValue+6}/queNum`;
  onValue(
    child(dbRef, userId),
    (snapshot) => {
      if(snapshot.val()!=null){ this.q6B = snapshot.val();
                                this.q6Bf = "B" + this.q6B;}
      else { this.q6Bf = "-"; }
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
},
methods: {
  cancel(){
    this.myNum = localStorage.getItem('myQ');
    const db = getDatabase();

    
    
    if(this.window =='A'){  

      const deletePath = ref(db, `users/${this.myNum}`)
      remove(deletePath).then(() => {console.log("location removed");});
      
      const temp = 0;
      const dbRefCur = ref(db, `curA/`);
          get(dbRefCur).then((snapshot) => {
            update(dbRefCur, { curA: 0 });
          });

    }
    else {

      const deletePath = ref(db, `usersB/${this.myNum}`)
      remove(deletePath).then(() => {console.log("location removed");});
      
     
      const dbRefCur = ref(db, `curB/`);
          get(dbRefCur).then((snapshot) => {
            update(dbRefCur, { curB: 0 });
          });
      
    }

    this.$router.push("/mobile1");


  },
 
  testAudio(){
      this.test = !this.test;
      this.isMuted = !this.isMuted;

      if(this.test == true){
        this.$refs.audio.volume = 1;
        this.$refs.audioNotif.play()

      }
      else {
        this.$refs.audio.volume = 0;
      }


    },


 
     redirect(){
    this.$router.push('/mobile3');
}


 
},


}




</script>

<script setup>
import {XMarkIcon,PencilSquareIcon,ArchiveBoxXMarkIcon} from '@heroicons/vue/24/solid'
</script>

<style scoped>

.text{
margin-right: 3px;
font-size: 10px;
font-weight: 600;
}

.commandsIcon{
    position: flex;
    justify-content: flex-end;
    color: #fefefe;
    height: 40px;
    width: 40px;
    margin-left: auto;
    margin-right: 0;
  }

.button{
  background-color: #ffffff;
  width: 70px;
  height: 30px;
  border-radius: 200px;
  cursor: pointer;
  display:flex;
  transition: 0.2s;
  margin: 5px;
}

.button::before{
  position: flex;
  content: '';
  background-color: #D9D9D9;
  width: 20px;
  height: 20px;
  border-radius: 200px;
  margin: 5px;
  transition: 0.2s;
  
}

input:checked + .button{
  background-color: #334155;
}
input:checked + .button::before{
  transform: translateX(40px);
}
input{
  display: none;
}

.controls{
    display: flex;
    height: 56px;
    color: #fefefe;

  }

  .conLeft{
    display: flex;
    width: 50%;
    padding: 3px;
    align-items: center;
    justify-content: center;
    background-color: #0F172A;
    
    flex-direction: column;
  }

  .conRight{
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: center;
    padding: 3px;
    background-color: #0F172A;
    /* border: 1px solid red; */
    flex-direction: column;
  }

  .qOverlap.delete{
    z-index: -1;
  }
  
  .qLap.del{
    z-index: -1;
  }
 

  .x{
    margin-top: 6px;
    margin-right:6px;
    padding: 0px;
    margin-bottom: 0px;
  }
  .commandIcon{
    position: flex;
    justify-content: flex-end;
    right:2px;
    height: 30px;
    width: 30px;
    margin-left: auto;
    margin-right: 0;
    
  }

  .mes{
    font-weight: 800;
    font-size: 20px;
    margin-top: 3px;
    margin-bottom: 2px;
    
  }
  .qMes{
    font-weight: 500;
    font-size: 18px;
   
  }

  .qNum{
    font-weight: 800;
    font-size: 65px;
    background-color: #0F172A;
    width: 170px;
    color: #fefefe;
    border-radius: 20px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    margin: 20px;
  
  }
  .det{
    display:flex;
    text-align: center;
    color: #0F172A;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
  }
  .box{
    display: flex;
    align-items: center;
    justify-content: center;
   
  }

  .qLap{
    position: absolute;
    height: 250px;
    width: 310px;
    background-color: #fefefe;
    bottom: 206px;
    border-radius: 20px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    z-index:0;
  }

  .qOverlap{
    position: absolute;
    height: 750px;
    width: 360px;
    background-color: #0F172A;
    bottom: -65px;
    left: 0;
    z-index: 0;
    opacity: 0.5;
    
  }

  .container{
    display: flex;
    align-items: center;
    justify-content: center;
    
  }


  h2{
    font-size: 25px;
  }

  .txt{
      display: flex;
      margin-left: 30px;
      width:  100px;
      height: 65px;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      border-radius: 8px;
      font-size: 22px;
      
  }
  .current{
      background-color: #334155;
      color: #fefefe;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      
  }

  #cur{
      background-color: #334155;
      color: #fefefe;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      
  }
  .no{
      width: 100%;
      border-radius: 0px;
      border-right: 1px solid #0F172A;    
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: 700;
      font-size: 22px;
      
  }

  .txt{
      background-color: #D9D9D9;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  }

  .squares{
      display: flex;
      margin-left: 30px;
      width:  100px;
      height: 65px;
      background-color: #D9D9D9;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      border-radius: 8px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      
  }



  .assign{
      width: 100%;
      border-radius: 0px;
      border-left: 1px solid #0F172A;    
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: 700;
      
  }
  .personal{
      background-color: #d9d9d9;
      width: 360px;
      border-radius: 10px,10px,10px,10px;
      padding: 0px;
      text-align: center;
  }

  .num{
    color: #0F172A;
      font-weight: 700;
      font-size: 45px;
  }

  .queue{
      display: flex;
      height: 500px;
      width: 325px;
      background-color: #fefefe;
      margin-left: 18px;
      border-radius: 10px;
      margin-top: 15px;
  }
  .body {
    background-color: #D9D9D9;
    display: flex;
    flex-wrap: wrap; /* Allows elements to wrap to next line on small screens */
    justify-content: center; /* Centers elements horizontally */
    flex-direction: column;
    box-sizing: border-box;
    
    
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
    margin-bottom: 3px;
    
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