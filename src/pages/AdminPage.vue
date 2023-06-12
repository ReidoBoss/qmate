<!-- {{ errMsg }} -->
<template>
  <div class="overlay" id="overlay">
      <div class="popUp">
        <div class="head">
          <div class="headL">
            <p class="titlePage">{{ actionMsg }}</p>
          </div>
          <div class="headR">
            <i class="fa-sharp fa-solid fa-xmark exit" @click="exitPop()"></i>
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
          <div class="editDetailsPane">
            <div class="field">
              <p class="title">USER'S INFORMATION</p>
              <p class="title1">PERSONAL INFORMATION</p>
              
              <label for="fname">First Name</label>
              <input type="text" id="fname" class="field1" v-model="fname"><br>

              <label for="lname">Last Name</label>
              <input type="text" id="lname"  class="field3" v-model="lname"><br>

              <label for="bdate">Birthdate</label>
              <input type="date" name="" id="bdate"  class="field4" v-model="bdate"><br>

              <label for="age">Address </label>
              <input type="text" id="age"  class="field4" v-model="address"> <br>

              <label for="email">Email</label>
              <input type="email" name="email" id="email"  class="field6" v-model="email"><br>

              <label for="securityQ">Security Question</label>
              <!-- //field14 -->
              <select name="sq" id="sq" class="field14" v-model="securityQuestion">
                <option value="q1">Favorite color?</option>
                <option value="q2">First car?</option>
                <option value="q3">High school mascot?</option>
                <option value="q4">Best friend's name?</option>
                <option value="q5">Favorite food?</option>
              </select>

              <label for="securityQA">Answer</label>
              <input type="sq" name="sq" id="sq"  class="field15" v-model="answerSQ"><br>

              <p class="title1">ACCOUNT INFORMATION</p>

              <label for="userType">User Type</label>
              <select name="user" id="userType"  class="field8" v-model="userType">
                <option value="administrator">Administrator</option>
                <option value="cashier">Cashier</option>
              </select><br>

              <label for="userType">Window</label>
              <select name="user" id="userType"  class="field13" v-model="window">
                <option value="A">A</option>
                <option value="B">B</option>
              </select><br>


              <label for="username">Username</label>
              <input type="text" id="username"  class="field10" v-model="username"><br>

              <label for="password">Password</label>
              <input type="password" id="password"  class="field11" v-model="password"><br>
              <br>
              

              <div class="buttons">
                <button class="cancelBut" @click="cancel">
                  <i class="fa-solid fa-rectangle-xmark fa-2xl"></i><span class="t">CANCEL</span></button>
                <button class="saveBut" @click="saveUserData">
                  <i class="fa-solid fa-square-check fa-2xl"></i><span class="t">SAVE</span></button>
              </div>
            </div>
          </div>
    </div>
      <div class="billingPane justify-center">
          <div class="upper ">
              <div class="userInfo">
                  <div class="user">
                      <p>Name: <span id="userName">{{ currentAdmin }}</span></p>
                      <p>ID No: <span id="userId">{{ currentAdminId }}</span></p>
                  </div>
                  <div class="dateTime">
                      <p id="date">{{ currentDate }}</p>
                      <p id="time">{{ currentTime }}</p>
                  </div>
                  <div class="image">
                      <UserCircleIcon @click="logout()" class="logout"/>   
                  </div>
              </div>
          </div>
          <div class="bottom">
              <div class="tabs">
                  <div class="tabUp">
                      <button class="controls" @click="addIntent">
                        <i class="fa-solid fa-user-plus fa-2xl"></i> <span class="t">ADD</span></button>
                      <button class="controls" @click="deleteData">
                        <i class="fa-solid fa-user-minus fa-2xl"></i> <span class="t">DELETE</span></button>
                      <button class="controls" @click="updateIntent">
                        <i class="fa-solid fa-user-pen fa-2xl"></i> <span class="t">UPDATE</span></button>
                        <button class="controls" @click="reset">
                          <i class="fa-solid fa-eraser fa-2xl"></i><span class="t">RESET</span></button>
                      
                  </div>
                  <div class="tabDown">
                      <div :class="currentTab == 0 ? 'tab-active' : 'general-tab'" @click="currentTab = 0">Cashier</div>
                      <div :class="currentTab == 1 ? 'tab-active' : 'general-tab'" @click="currentTab = 1">Administrator</div>
                  </div>
                <div class="content">
                  <Transition name="fade" mode="out-in">
                      <div class="transactionContent" v-if="currentTab == 0">
                        <table class="hTable">
                          <th class="hTh">ID</th>
                          <th class="hTh">First Name</th>
                          <th class="hTh">Last Name</th>
                          <th class="hTh">Birthdate</th>
                          <th class="hTh">Age</th>
                          <th class= "hTh">E-mail</th>
                          <th class="hTh">Address</th>
                          <th class="hTh">Window</th>
                          <tr v-for="index in 18" :key="index" class="hTr">
                            <td class="hTd"><button class="btnClass" @click="getIndexCashier($event,index)">{{ getuserIdCashier(index) }}</button></td>
                            <td class="hTd">{{ getuserFnameCashier(index) }}</td>
                            <td class="hTd">{{ getuserLnameCashier(index) }}</td>
                            <td class="hTd">{{ getuserBdateCashier(index) }}</td>
                            <td class="hTd">{{ getuserAgeCashier(index) }}</td>
                            <td class="hTd">{{ getuserEmailCashier(index) }}</td>
                            <td class="hTd">{{ getuserAddressCashier(index) }}</td>
                            <td class="hTd">{{ getWin(index) }}</td>

                          </tr>
                        </table>
                      </div>
                      <div class="invoiceContent" v-else-if="currentTab == 1">
                        <table class="hTable">
                          <th class="hTh">ID</th>
                          <th class="hTh">First Name</th>
                          <th class="hTh">Last Name</th>
                          <th class="hTh">Birthdate</th>
                          <th class="hTh">Age</th>
                          <th class= "hTh">E-mail</th>
                          <th class="hTh">Address</th>
                          <tr v-for="index in 18" :key="index" class="hTr">
                            <td class="hTd"><button class="btnClass" @click="getIndexAdmin($event,index)">{{ getuserIdAdmin(index) }}</button></td>
                            <td class="hTd">{{ getuserFnameAdmin(index) }}</td>
                            <td class="hTd">{{ getuserLnameAdmin(index) }}</td>
                            <td class="hTd">{{ getuserBdateAdmin(index) }}</td>
                            <td class="hTd">{{ getuserAgeAdmin(index) }}</td>
                            <td class="hTd">{{ getuserEmailAdmin(index) }}</td>
                            <td class="hTd">{{ getuserAddressAdmin(index) }}</td>
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
import { push } from "firebase/database";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  remove,
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
    const dataPropertiesCashier = {};
    for (let i = 1; i <= 16 ; i++) {
    dataPropertiesCashier[`userAddressCashier${i}`] = '';
    dataPropertiesCashier[`userAgeCashier${i}`] = '';
    dataPropertiesCashier[`userBdateCashier${i}`] = '';
    dataPropertiesCashier[`userEmailCashier${i}`] = '';
    dataPropertiesCashier[`userFnameCashier${i}`] = '';
    dataPropertiesCashier[`userIdCashier${i}`] = null;
    dataPropertiesCashier[`userLnameCashier${i}`] = '';
    dataPropertiesCashier[`userMnameCashier${i}`] = '';
    dataPropertiesCashier[`userNameCashier${i}`] = '';
    dataPropertiesCashier[`userWindowCashier${i}`] = '';
                         }

    const dataPropertiesAdmin = {};
    for (let i = 1; i <= 16 ; i++) {
      dataPropertiesAdmin[`userAddressAdmin${i}`] = '';
      dataPropertiesAdmin[`userAgeAdmin${i}`] = '';
      dataPropertiesAdmin[`userBdateAdmin${i}`] = '';
      dataPropertiesAdmin[`userEmailAdmin${i}`] = '';
      dataPropertiesAdmin[`userFnameAdmin${i}`] = '';
      dataPropertiesAdmin[`userIdAdmin${i}`] = '';
      dataPropertiesAdmin[`userLnameAdmin${i}`] = '';
      dataPropertiesAdmin[`userMnameAdmin${i}`] = '';
      dataPropertiesAdmin[`userNameAdmin${i}`] = '';
                                      }

                                   

    return {
      errMsg: '',
      actionMsg:'',
      currentAdmin: '',
      currentAdminId:'',
      name : '',
      currentTab: 0,
      ...this.dataPropertiesCashier,
      ...this.dataPropertiesAdmin,
      fname: '',
      mname: '',
      lname: '',
      bdate: '',
      email: '',
      address: '',
      userType: '',
      window: '',
      username: '',
      password: '',
      currentTime: "",
      currentDate: "",

    }
  },

  computed: {
    age() {
      if (this.bdate) {
        const today = new Date();
        const birthdateObj = new Date(this.bdate);

        let age = today.getFullYear() - birthdateObj.getFullYear();
        const monthDiff = today.getMonth() - birthdateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
          age--;
        }

        return age;
      }

      return '';
    },

    
  },

  mounted (){
    const dbRef = ref(db);
    let loggedas = localStorage.getItem('loggedas');

    let loggedin = localStorage.getItem('log-in');
    console.log(loggedin)
    this.currentAdmin = localStorage.getItem('currentAdmin');
    this.currentAdminId = localStorage.getItem('currentAdminId');

    if( loggedin==="false"){
       this.$router.push('/');
    }



    if( loggedin=="true"){
      if(loggedas=='admin'){
        this.$router.push('/adminPage');
      }
      if(loggedas=='cashier'){
        this.$router.push('/cashierPage');
      }
    }


        for (let i = 1; i <= 16; i++) {

            onValue(child(dbRef, `userlistAdmin/${i}/userType`), (snapshot) => {
            this[`userType${i}`] = snapshot.val();

            onValue(child(dbRef, `userlistAdmin/${i}/address`), (snapshot) => { this[`userAddressAdmin${i}`] = snapshot.val(); console.log(snapshot.val()) });
            onValue(child(dbRef, `userlistAdmin/${i}/age`), (snapshot) => { this[`userAgeAdmin${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistAdmin/${i}/bdate`), (snapshot) => { this[`userBdateAdmin${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistAdmin/${i}/email`), (snapshot) => { this[`userEmailAdmin${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistAdmin/${i}/fname`), (snapshot) => { this[`userFnameAdmin${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistAdmin/${i}/id`), (snapshot) => { this[`userIdAdmin${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistAdmin/${i}/lname`), (snapshot) => { this[`userLnameAdmin${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistAdmin/${i}/mname`), (snapshot) => { this[`userMnameAdmin${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistAdmin/${i}/name`), (snapshot) => { this[`userNameAdmin${i}`] = snapshot.val() });

            //changes userListAdmin values.

          
        });

        onValue(child(dbRef, `userlistCashier/${i}/userType`), (snapshot) => {
          this[`userType${i}`] = snapshot.val();

          if (this[`userType${i}`] === "cashier") {

            onValue(child(dbRef, `userlistCashier/${i}/address`), (snapshot) => { this[`userAddressCashier${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistCashier/${i}/age`), (snapshot) => { this[`userAgeCashier${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistCashier/${i}/bdate`), (snapshot) => { this[`userBdateCashier${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistCashier/${i}/email`), (snapshot) => { this[`userEmailCashier${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistCashier/${i}/fname`), (snapshot) => { this[`userFnameCashier${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistCashier/${i}/id`), (snapshot) => { this[`userIdCashier${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistCashier/${i}/lname`), (snapshot) => { this[`userLnameCashier${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistCashier/${i}/mname`), (snapshot) => { this[`userMnameCashier${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistCashier/${i}/name`), (snapshot) => { this[`userNameCashier${i}`] = snapshot.val() });
            onValue(child(dbRef, `userlistCashier/${i}/window`), (snapshot) => { this[`userWindowCashier${i}`] = snapshot.val() });

          }
        });

        }

 //time
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
    saveUserData(){

      const admin = ref(db, 'admin/');
      const adminDyna = ref(db, `admin/${this.username}`)
      const cashier = ref(db, `cashier/${this.username}`);
      const cashierDyna = ref(db, `cashier/${this.username}`);

      const intent = localStorage.getItem('intent');

      if(intent === 'add'){
        if(this.userType =='administrator'){
        const dbRef = ref(db);

          const dbRefCashierChecker = ref(db, `cashier/${this.username}`);
          get(dbRefCashierChecker).then((snapshot) => {
            if(snapshot.val()!=null){
              var x = document.getElementById("overlay");
              x.style.zIndex="1";
              this.actionMsg = "Invalid Action";
              this.errMsg="Username is already taken by a cashier";
              }
              else{
                const dbRefAlreadyTaken= ref(db,`admin/${this.username}`);
                get(dbRefAlreadyTaken).then((snapshot) => {
                  
                if(snapshot.val()!=null){
                  var x = document.getElementById("overlay");
                  x.style.zIndex="1";
                  this.actionMsg = "Invalid Action";
                  this.errMsg = "Username is already taken"
                }
                else{
                  var x = document.getElementById("overlay");
                  x.style.zIndex="1";
                  this.actionMsg = "";
                  this.errMsg = "Admin added";

                    console.log("admin saved")
                    update(adminDyna, { fname: this.fname });
                    update(adminDyna, { lname: this.lname });
                    update(adminDyna, { bdate: this.bdate });
                    update(adminDyna, { age: this.age });
                    update(adminDyna, { address: this.address });
                    update(adminDyna, { email: this.email });
                    update(adminDyna, { securityQuestion: this.securityQuestion });
                    update(adminDyna, { answerSQ: this.answerSQ });
                    update(adminDyna, { name: this.fname });
                    update(adminDyna, { password: this.password });

                    const dbRefCTRA = ref(db, `userlistAdmin/ctr`);
                    const dbRefCTRR = ref(db, `userlistAdmin`);

                    get(dbRefCTRA).then((snapshot) => {
                  //INCREMENT                
                  this.ctr = snapshot.val();
                  if(this.ctr==null){
                    this.ctr = 1;
                    const adminDyna = ref(db, `admin/${this.username}`)
                    update(adminDyna, { id: snapshot.val()+1 });

                    update(dbRefCTRR, { ctr: this.ctr});
                      const dbRefAdmin = ref(db, `userlistAdmin/${this.ctr}`);
                      update(dbRefAdmin, { id: snapshot.val()+1});
                      update(dbRefAdmin, { fname: this.fname });
                      update(dbRefAdmin, { lname: this.lname });
                      update(dbRefAdmin, { bdate: this.bdate });
                      update(dbRefAdmin, { age: this.age });
                      update(dbRefAdmin, { email: this.email });
                      update(dbRefAdmin, { address: this.address });
                      update(dbRefAdmin, { securityQuestion: this.securityQuestion });
                      update(dbRefAdmin, { answerSQ: this.answerSQ });
                      update(dbRefAdmin, { username: this.username });
                      update(dbRefAdmin, { userType: this.userType });
                      update(dbRefAdmin, { window: this.window });
                      update(dbRefAdmin, { name: this.fname });
                  }
                  else {
                      const adminDyna = ref(db, `admin/${this.username}`)
                      update(adminDyna, { id: snapshot.val()+1});

                      this.ctr = this.ctr+1;
                      update(dbRefCTRR, { ctr: this.ctr});
                      const dbRefAdmin = ref(db, `userlistAdmin/${this.ctr}`);
                      update(dbRefAdmin, { id: snapshot.val()+1 });
                      update(dbRefAdmin, { fname: this.fname });
                      update(dbRefAdmin, { lname: this.lname });
                      update(dbRefAdmin, { bdate: this.bdate });
                      update(dbRefAdmin, { age: this.age });
                      update(dbRefAdmin, { securityQuestion: this.securityQuestion });
                      update(dbRefAdmin, { answerSQ: this.answerSQ });
                      update(dbRefAdmin, { username: this.username });
                      update(dbRefAdmin, { email: this.email });
                      update(dbRefAdmin, { address: this.address });
                      update(dbRefAdmin, { userType: this.userType });
                      update(dbRefAdmin, { window: this.window });
                      update(dbRefAdmin, { name: this.fname });
                                }                 
                        });
                      }   

                      });
              }        
                     
            });
      
      }
      else if(this.userType=='cashier'){
        const dbRef = ref(db);

        const dbRefAdminChecker = ref(db, `admin/${this.username}`);
          let counterVariable;
          get(dbRefAdminChecker).then((snapshot) => {
            if(snapshot.val() !=null){
              var x = document.getElementById("overlay");
              x.style.zIndex="1";
            this.errMsg="Username is already Admin";
            console.log(snapshot.val());
          }
          else{
            const dbRefUserCheckerC = ref(db,`cashier/${this.username}`);
            get(dbRefUserCheckerC).then((snapshot) => {
              if(snapshot.val()!=null){
                var x = document.getElementById("overlay");
                x.style.zIndex="1";
                this.errMsg="USERNAME ALREADY TAKEN";
                console.log(snapshot.val());
              }
              else{
                  var x = document.getElementById("overlay");
                  x.style.zIndex="1";
                  this.actionMsg = "";
                  this.errMsg = "Cashier added";
                console.log("cashier saved");
            
                update(cashierDyna, { fname: this.fname });
                update(cashierDyna, { lname: this.lname });
                update(cashierDyna, { bdate: this.bdate });
                update(cashierDyna, { age: this.age });
                update(cashierDyna, { email: this.email });
                update(cashierDyna, { address: this.userType });
                update(cashierDyna, { securityQuestion: this.securityQuestion });
                update(cashierDyna, { answerSQ: this.answerSQ });
                update(cashierDyna, { userType: this.userType });
                update(cashierDyna, { window: this.window });
                update(cashierDyna, { name: this.fname });
                update(cashierDyna, { password: this.password });
        
                const dbRefCTR = ref(db, `userlist/ctr`);
                const dbRefCTRR = ref(db, `userlist`);
        
                const dbRefCTRC = ref(db, `userlistCashier/ctr`);
                const dbRefCTRRC = ref(db, `userlistCashier`);
                
        
        
                get(dbRefCTRC).then((snapshot) => {
                            //INCREMENT                
                            this.ctr = snapshot.val();
                            if(this.ctr==null){
                              this.ctr = 1;
                              const cashierDyna = ref(db, `cashier/${this.username}`);
                                update(cashierDyna, { id: snapshot.val()+1 });
                                update(dbRefCTRRC, { ctr: this.ctr});

                                const dbRefAdmin = ref(db, `userlistCashier/${this.ctr}`);
                                update(dbRefAdmin, { id: snapshot.val()+1});
                                update(dbRefAdmin, { fname: this.fname });
                                update(dbRefAdmin, { lname: this.lname });
                                update(dbRefAdmin, { bdate: this.bdate });
                                update(dbRefAdmin, { age: this.age });
                                update(dbRefAdmin, { email: this.email });
                                update(dbRefAdmin, { address: this.address });
                                update(dbRefAdmin, { securityQuestion: this.securityQuestion });
                                update(dbRefAdmin, { answerSQ: this.answerSQ });
                                update(dbRefAdmin, { username: this.username });
                                update(dbRefAdmin, { userType: this.userType });
                                update(dbRefAdmin, { window: this.window });
                                update(dbRefAdmin, { name: this.fname });
                            }
                            else {
                                const cashierDyna = ref(db, `cashier/${this.username}`)
                                update(cashierDyna, { id: snapshot.val()+1});
    
                                this.ctr = this.ctr+1;
                                update(dbRefCTRRC, { ctr: this.ctr});
                                const dbRefAdmin = ref(db, `userlistCashier/${this.ctr}`);
                                update(dbRefAdmin, { id: snapshot.val()+1 });
                                update(dbRefAdmin, { fname: this.fname });
                                update(dbRefAdmin, { lname: this.lname });
                                update(dbRefAdmin, { bdate: this.bdate });
                                update(dbRefAdmin, { age: this.age });
                                update(dbRefAdmin, { email: this.email });
                                update(dbRefAdmin, { username: this.username });
                                update(dbRefAdmin, { address: this.address });
                                update(dbRefAdmin, { securityQuestion: this.securityQuestion });
                                update(dbRefAdmin, { answerSQ: this.answerSQ });
                                update(dbRefAdmin, { userType: this.userType });
                                update(dbRefAdmin, { window: this.window });
                                update(dbRefAdmin, { name: this.fname });

                            }                         
                    });
    
    
    
    

              }

            
            });

          }// else end
        

        
          });






        }

      }
      else if(intent ==='update'){


        const indexCur = localStorage.getItem('curIndex');

        if(indexCur === 'admin'){

        const adminIndex = localStorage.getItem('adminIndex');     
        
        const dbRef = ref(db, `userlistAdmin/${adminIndex}`);
        const dbRefUserChecker = ref(db, `userlistAdmin/${adminIndex}/username`);
    
          
          get(dbRef).then((snapshot) => {
            get(dbRefUserChecker).then((snapshot) => {
              const adminUserName = snapshot.val();
              const dbRefAdminAuth = ref(db, `admin/${adminUserName}`);
              const dbRefNewUserName = ref(db, `admin/${this.username}`);

                get(dbRefAdminAuth).then((snapshot) => {
                    const dog = snapshot.val();
                    if(this.username != adminUserName){
                    const deletePathAdmin = ref(db, `admin/${adminUserName}`);
                    remove(deletePathAdmin).then(() => {console.log("location removed");});
                    
                    update(dbRefNewUserName, { 
                      fname: this.fname, 
                      lname: this.lname, 
                      bdate: this.bdate, 
                      age: this.age,
                      email: this.email,
                      address: this.address,
                      userType: this.userType,
                      securityQuestion:this.securityQuestion,
                      answerSQ:this.answerSQ,
                      name: this.fname,
                      password: this.password,
                    });
                      update(dbRef,{  fname: this.fname,
                                      lname: this.lname,
                                      bdate: this.bdate,
                                      age: this.age,
                                      email: this.email,
                                      securityQuestion:this.securityQuestion,
                                      answerSQ:this.answerSQ,
                                      address: this.address,
                                      userType: this.userType,
                                      name: this.fname,
                                      username: this.username
                                  });               

                    }// if old username is not equal to current username
                    else{
                    const dbRefNewUserName = ref(db, `admin/${this.username}`);
                    update(dbRefNewUserName, { fname: this.fname,
                                              lname: this.lname,
                                              bdate: this.bdate,
                                              age: this.age,
                                              email: this.email,
                                              address: this.address,
                                              securityQuestion:this.securityQuestion,
                                              answerSQ:this.answerSQ,
                                              userType: this.userType,
                                              name: this.fname,
                                              password: this.password
                                              });

                    
                    update(dbRef,{    fname: this.fname,
                                      lname: this.lname,
                                      bdate: this.bdate,
                                      age: this.age,
                                      email: this.email,
                                      address: this.address,
                                      securityQuestion:this.securityQuestion,
                                      answerSQ:this.answerSQ,
                                      userType: this.userType,
                                      name: this.fname,
                                      username: this.username
                                  });
                    }// else
                });// getter of admin username
            });//checks the current username of the index selected
        });// checks the admin id that has the current index

          



        }// if admin

        else if(indexCur==='cashier'){
            const cashierIndex = localStorage.getItem('cashIndex');     
            
            const dbRef = ref(db, `userlistCashier/${cashierIndex}`);
            const dbRefUserChecker = ref(db, `userlistCashier/${cashierIndex}/username`);

              
              get(dbRef).then((snapshot) => {
                get(dbRefUserChecker).then((snapshot) => {
                  const cashierUserName = snapshot.val();
                  const dbRefCashierAuth = ref(db, `cashier/${cashierUserName}`);
                  const dbRefNewUserName = ref(db, `cashier/${this.username}`);

                    get(dbRefCashierAuth).then((snapshot) => {
                        const dog = snapshot.val();
                        if(this.username != cashierUserName){
                        const deletePathCashier = ref(db, `cashier/${cashierUserName}`);
                        remove(deletePathCashier).then(() => {console.log("location removed");});
                        
                        update(dbRefNewUserName, { 
                          fname: this.fname, 
                          lname: this.lname, 
                          bdate: this.bdate, 
                          age: this.age,
                          email: this.email,
                          address: this.address,
                          securityQuestion:this.securityQuestion,
                          answerSQ:this.answerSQ,
                          userType: this.userType,
                          name: this.fname,
                          password: this.password,
                        });
                          update(dbRef,{  fname: this.fname,
                                          lname: this.lname,
                                          bdate: this.bdate,
                                          age: this.age,
                                          email: this.email,
                                          address: this.address,
                                          securityQuestion:this.securityQuestion,
                                          answerSQ:this.answerSQ,
                                          userType: this.userType,
                                          name: this.fname,
                                          username: this.username
                                      });               

                        }// if old username is not equal to current username
                        else{
                        const dbRefNewUserName = ref(db, `cashier/${this.username}`);
                        update(dbRefNewUserName, { fname: this.fname,
                                                  lname: this.lname,
                                                  bdate: this.bdate,
                                                  age: this.age,
                                                  email: this.email,
                                                  address: this.address,
                                                  securityQuestion:this.securityQuestion,
                                                  answerSQ:this.answerSQ,
                                                  userType: this.userType,
                                                  name: this.fname,
                                                  password: this.password
                                                  });

                        
                        update(dbRef,{    fname: this.fname,
                                          lname: this.lname,
                                          bdate: this.bdate,
                                          age: this.age,
                                          email: this.email,
                                          address: this.address,
                                          securityQuestion:this.securityQuestion,
                                          answerSQ:this.answerSQ,
                                          userType: this.userType,
                                          name: this.fname,
                                          username: this.username
                                      });
                        }// else
                    });// getter of cashier username
                });//checks the current username of the index selected
            });// checks the cashier id that has the current index

              

            }// else if cashier



      }// if intent is equal to. UPDATE!
    else{
      var x = document.getElementById("overlay");
      x.style.zIndex="1";
      this.errMsg='Please click UPDATE or ADD';
    }
      
      
    localStorage.setItem('intent', '');


    },
    cancel(){
      localStorage.setItem('curIndex', '');
      localStorage.setItem('intent', '');
      this.fname = '';
      this.lname = '';
      this.bdate = '';
      this.age = '';
      this.email = '';
      this.address = '';
      this.userType = '';
      this.securityQuestion='';
      this.answerSQ='';
      this.window = '';
      this.username = '';
      this.password = '';
      this.errMsg='';
    },
    logout(){
      localStorage.setItem('log-in', false);
      localStorage.setItem('loggedas', '');
      location.reload();
      localStorage.setItem('intent', '');

    },
    
    updateIntent(){
      localStorage.setItem('intent', 'update');
      const test = localStorage.getItem('intent');
      console.log(test);
      this.errMsg='';

    },
    addIntent(){
      localStorage.setItem('intent', 'add');
      const test = localStorage.getItem('intent');
      console.log(test);
      this.errMsg='';
    },
    reset(){
      console.log("this is cashier");

      const counterA = ref(db, 'Counter/');
      update(counterA, { Counter:0 });
      const counterB = ref(db, 'CounterB/');
      update(counterB, { CounterB:0 });

      const currA = ref(db, 'curA/');
      update(currA, { curA:0 });
      const currB = ref(db, 'curB/');
      update(currB, { curB:0 });

      const SC = ref(db, 'sCounter/');
      update(SC, { sCounter:1 });
      const scC = ref(db, 'sCounter/');
      update(scC, { sCounterB:1 });

      const deletePath = ref(db, `users`)
      remove(deletePath).then(() => {console.log("location removed");});
      const deletePathB = ref(db, `usersB`)
      remove(deletePathB).then(() => {console.log("location removed");});
      localStorage.setItem('intent', '');

    },
    // Cashier Getter
    getuserAddressCashier(index) {
      return this[`userAddressCashier${index}`];
    },
    getuserAgeCashier(index) {
      return this[`userAgeCashier${index}`];
    },
    getuserBdateCashier(index) {
      return this[`userBdateCashier${index}`];
    },
    getuserEmailCashier(index) {
      return this[`userEmailCashier${index}`];
    },
    getuserFnameCashier(index) {
      return this[`userFnameCashier${index}`];
    },
    getuserIdCashier(index) {
      return this[`userIdCashier${index}`];
    },
    getuserLnameCashier(index) {
      return this[`userLnameCashier${index}`];
    },
    getuserMnameCashier(index) {
      return this[`userMnameCashier${index}`];
    },
    getuserNameCashier(index) {
      return this[`userNameCashier${index}`];
    },
    getWin(index) {
      return this[`userWindowCashier${index}`];
    },
    //end of Getter Cashier 
    
    //Admin Getter
    getuserAddressAdmin(index) {
      return this[`userAddressAdmin${index}`];
    },
    getuserAgeAdmin(index) {
      return this[`userAgeAdmin${index}`];
    },
    getuserBdateAdmin(index) {
      return this[`userBdateAdmin${index}`];
    },
    getuserEmailAdmin(index) {
      return this[`userEmailAdmin${index}`];
    },
    getuserFnameAdmin(index) {
      return this[`userFnameAdmin${index}`];
    },
    getuserIdAdmin(index) {
      return this[`userIdAdmin${index}`];
    },
    getuserLnameAdmin(index) {
      return this[`userLnameAdmin${index}`];
    },
    getuserMnameAdmin(index) {
      return this[`userMnameAdmin${index}`];
    },
    getuserNameAdmin(index) {
      return this[`userNameAdmin${index}`];
    },
    
    getIndexCashier(event,index){
      localStorage.setItem('cashIndex', index);
      localStorage.setItem('curIndex', 'cashier');
      const debug = localStorage.getItem('curIndex');
      const debugNum = localStorage.getItem('cashIndex');
      console.log(debug +" "+ debugNum);

      const fnameT = ref(db, `userlistCashier/${index}/fname`);
      const lnameT = ref(db, `userlistCashier/${index}/lname`);
      const bdateT = ref(db, `userlistCashier/${index}/bdate`);
      const ageT = ref(db, `userlistCashier/${index}/age`);
      const emailT = ref(db, `userlistCashier/${index}/email`);
      const addressT = ref(db, `userlistCashier/${index}/address`);
      const securityQuestionT = ref(db, `userlistCashier/${index}/securityQuestion`);
      const answerSQT = ref(db, `userlistCashier/${index}/answerSQ`);
      const userTypeT = ref(db, `userlistCashier/${index}/userType`);
      const windowT = ref(db, `userlistCashier/${index}/window`);
      const usernameT = ref(db, `userlistCashier/${index}/username`);

        get(fnameT).then((snapshot) => { this.fname = snapshot.val(); });
        get(lnameT).then((snapshot) => { this.lname =snapshot.val();});
        get(bdateT).then((snapshot) => { this.bdate =snapshot.val();});
        get(ageT).then((snapshot) => { this.age =snapshot.val();});
        get(emailT).then((snapshot) => { this.email =snapshot.val();});
        get(addressT).then((snapshot) => { this.address =snapshot.val();});
        get(securityQuestionT).then((snapshot) => { this.securityQuestion =snapshot.val();});
        get(answerSQT).then((snapshot) => { this.answerSQ =snapshot.val();});
        get(userTypeT).then((snapshot) => { this.userType =snapshot.val();});
        get(windowT).then((snapshot) => { this.window =snapshot.val();});
        get(usernameT).then((snapshot) => { this.username =snapshot.val();});


    },
    getIndexAdmin(event,index){
      localStorage.setItem('adminIndex', index);
      localStorage.setItem('curIndex', 'admin');
      const debug = localStorage.getItem('curIndex');
      const debugNum = localStorage.getItem('adminIndex');
      console.log(debug+" "+debugNum) ;
      // puts the values into field
      const fnameT = ref(db, `userlistAdmin/${index}/fname`);
      const lnameT = ref(db, `userlistAdmin/${index}/lname`);
      const bdateT = ref(db, `userlistAdmin/${index}/bdate`);
      const ageT = ref(db, `userlistAdmin/${index}/age`);
      const emailT = ref(db, `userlistAdmin/${index}/email`);
      const securityQuestionT = ref(db, `userlistAdmin/${index}/securityQuestion`);
      const answerSQT = ref(db, `userlistAdmin/${index}/answerSQ`);
      const addressT = ref(db, `userlistAdmin/${index}/address`);
      const userTypeT = ref(db, `userlistAdmin/${index}/userType`);
      const usernameT = ref(db, `userlistAdmin/${index}/username`);

        get(fnameT).then((snapshot) => { this.fname = snapshot.val(); });
        get(lnameT).then((snapshot) => { this.lname =snapshot.val();});
        get(bdateT).then((snapshot) => { this.bdate =snapshot.val();});
        get(ageT).then((snapshot) => { this.age =snapshot.val();});
        get(emailT).then((snapshot) => { this.email =snapshot.val();});
        get(addressT).then((snapshot) => { this.address =snapshot.val();});
        get(securityQuestionT).then((snapshot) => { this.securityQuestion =snapshot.val();});
        get(answerSQT).then((snapshot) => { this.answerSQ =snapshot.val();});
        get(userTypeT).then((snapshot) => { this.userType =snapshot.val();});
        get(usernameT).then((snapshot) => { this.username =snapshot.val();});

 
    },
    deleteData(){   
      const curIndexM = localStorage.getItem('curIndex');
      this.errMsg='';
      if(curIndexM ==='cashier'){
        console.log("this is cashier");
        // const dbRef = ref(db);
         const cashIndexR = localStorage.getItem('cashIndex');
        //   onValue(child(dbRef, `userlistCashier/${cashIndexR}/username`), 
        //   (snapshot) => { 
        //     console.log(snapshot.val());
        //   });

          const cashierIndexR = localStorage.getItem('cashIndex');
          const dbRef = ref(db, `userlistAdmin/${cashierIndexR}/username`);

          get(dbRef).then((snapshot) => {
            console.log(snapshot.val());
            this.uName = snapshot.val();
              const deletePathC = ref(db, `cashier/${this.uName}`);
              remove(deletePathC).then(() => {console.log("location removed");});
              const deletePathList = ref(db, `userlistCashier/${cashIndexR}`);
              remove(deletePathList).then(() => {console.log("location removed");});

              localStorage.setItem('cashIndex', 0);

              
          
          });
      }
      if(curIndexM ==='admin'){
        console.log("this is admin");

        // const dbRef = ref(db);
        //   const adminIndexR = localStorage.getItem('adminIndex');
        //   onValue(child(dbRef, `userlistAdmin/${adminIndexR}/username`), 
        //   (snapshot) => { 
        //   });
          const adminIndexR = localStorage.getItem('adminIndex');
          const dbRef = ref(db, `userlistAdmin/${adminIndexR}/username`);
          let counterVariable;
          get(dbRef).then((snapshot) => {
            console.log(snapshot.val());
              this.uName = snapshot.val();
              const deletePathA = ref(db, `admin/${this.uName}`);
              remove(deletePathA).then(() => {console.log("location removed");});
              const deletePathList = ref(db, `userlistAdmin/${adminIndexR}`);
              remove(deletePathList).then(() => {console.log("location removed");});
              localStorage.setItem('adminIndex', 0);

              
          
          });
      }      



      localStorage.setItem('intent', '');
    },

    clearText(){
      this.fname = "";
      this.lname = "";
      this.bdate = "";
      this.address = "";
      this.email = "";
      this.securityQuestion = "";
      this.answerSQ = "";
      this.userType = "";
      this.window = "";
      this.username = "";
      this.password = "";

    },


   
  
  }
}

  </script>


<script setup>
import { UserCircleIcon , UserPlusIcon,UserMinusIcon} from '@heroicons/vue/24/solid'
</script>

<style scoped>
option{
  text-align: center;
}
hr {
  color: #000; /* Set the desired color */
  height: 1px; /* Set the desired height */
  border-style: solid; /* Set the desired line style */
}
.ok{
  height: 35px;
  width: 200px;
  background-color: #0F172A;
  color: #FEFEFE;
  margin: 5px;
}

.excla{
  font-size: 80px;
  color: #0F172A;
  margin: 5px;
}

.head{
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

.headR{
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 50%;
}
.exit{
  font-size: 30px;
  margin: 5px;
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

.popUp{
  border-radius: 5px;
  background-color: #FEFEFE;
  height: 250px;
  width: 400px;
  opacity: 100%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.75);
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
.transactionContent,.invoiceContent{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.content{
  height: 495px;
  background: #1E293B;
  border: 1px solid #293549;
  border-radius: 0px 15px 15px 15px;
  color: white;
  padding: 16px;
}

.t{
  margin-left: 8px;
}

label{
  font-weight:600;
  font-size: 16px;
}
.btnClass{
  position: flex;
  background-color: #1E293B;
  border-radius: 10px;
  width: 25px;
  height: 20px;
  color: #0F172A;
  font-weight: 700;
  color: #fefefe;
}
.hTable,.hTr,.hTd,.hTh{
  
  border:1px solid #fefefe;
  text-align: center;

}
.hTd{
  font-size: 13px;
}
.hTable{
  font-size: 14px;
  width: 900px;
  text-align:center;
}

.icon{
  width: 45px;
  height: 45px;
  margin-right: 15px;
}

button:hover{
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    background-color: grey;
    color: #fefefe;
}

.logout:hover{
    color: grey;
}

input:hover{
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.5);
}
select:hover{
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.5);
}

.general-tab:hover{
  background-color: grey;
  color: #fefefe;
}

.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.buttons{
  display: flex;
}

.cancelBut{
  display: flex;
  width: 150px;
  height: 45px;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 35px;
}
.saveBut{
  display: flex;
  width: 150px;
  height: 45px;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 35px;
}

.title{
  margin-bottom: 6px;
}

.field1{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 75px;
}
.field2{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 55px;
}
.field3{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 77px;
}
.field4{
  text-align: center;
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 85px;
}
.field5{
  
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 122px;
}
.field6{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 112px;
}
.field7{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 92px;
}

.field13{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 90px;
}

.field14{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 22px;
}

.field15{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 95px;
}

.field8{
  text-align: center;
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 78px;
}
.field9{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 103px;
}
.field10{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 76px;
}
.field11{
  width: 200px;
  height: 30px;
  background: #1E293B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  margin: 5px;
  margin-left: 81px;
}

label{
  margin-left: 40px;

}

.title1{
  font-size: 18px;
  font-weight: 700;
  margin-left: 15px;
  margin-bottom: 3px;
  margin-top: 3px;
}
.tabUp{
  display: flex;
  margin-bottom: 10px;
  align-items: flex-end;
  justify-content: flex-end;
}

.controls{
  margin-right: 15px;
  height: 45px;
  width: 150px;
}


input{
  color:#fefefe;
  padding-left: 10px;
  border-radius: 0px 15px 15px 15px;
  color: white;
  padding: 16px;
}
.tabs{
  padding: 15px;

}
.search{
  margin-bottom: 10px;
  width: 200px;
  height: 30px;
  background: #293549;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding-left: 10px;
  color: #fefefe;
  margin-left: 118px;
}
.tabDown{
  display: flex;
}
.tab-active {
  display: flex;
  width: 130px;
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
  width: 130px;
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

button{
  display: flex;
  background-color: #fefefe;
  border-radius: 10px;
  width: 85%;
  height: 42px;
  color: #0F172A;
  font-weight: 700;
  justify-content: center;
  align-items: center;
}
.title{
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #fefefe;
  text-align: center;
  margin-top: 0px;
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
  display: flex;
  background-color: #1E293B;
  width: 30%;
  height: 100%;
  margin-right: 7.5px;
  border-radius: 35px;
  border: 1px solid #293549;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.8);
  padding: 10px;
  color: #fefefe;
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
  width: 100%;
  height: 97%;
  background-color: #0F172A;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  padding-top: 18px;
}

.tabs {
  width: 100%;
  height: 100%;
  background-color: #0F172A;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
}</style>
