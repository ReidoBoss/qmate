<template>
    <div class="flex h-full justify-center items-center w-full mx-0">
        <div class="white h-full justify-center items-center w-full mx-0">
            <div class="form ">
                <div class="left">
                </div>
                <div class="right">
                    <img :src="logo" alt="logo">
                    <br>
                    <div class="element px-16">
                        <label for="email">Username</label>
                        <br>
                        <input type="text" id="email" v-model="email" rounded-xl placeholder="Username ">
                        <br>
                        <br>
                        <label for="password">Password </label>
                        <br>
                        <input type="password" id="password" v-model="password" placeholder="**********">
                        <br>
                        <p v-f="errMsg">{{ errMsg	}}</p>
  
                        <br>
                        <label for="user">User</label>
                        <br>
                        <select type="chooseuser" id="chooseuser"  v-model="chooseuser">
                            <option value="cashier">Cashier</option>
                            <option value="admin">Admin</option>
                        </select>
                        <br>
                        <br>
                        <br>
                        <br>
                        <button @click="signin">LOGIN</button>
                        <p>Forgot Password? <span><a href="forgotPassword">CLICK HERE!</a></span></p>
                        <br>
                        <br>
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
        errMsg: '',
   
      }
    },
    created (){
      const dbRef = ref(db);
      let loggedas = localStorage.getItem('loggedas');
      let loggedin = localStorage.getItem('log-in');
  
  
      const currentWindow = localStorage.getItem('currentWindow')
      console.log("current window is: "+currentWindow)
      if( loggedin=="true"){
        if(loggedas=='admin'){
          this.$router.push('/adminPage');
        }
        if(loggedas=='cashier'){
          this.$router.push('/cashierPage');
        }
      }
  
  
  
    },
    methods: {
     signin(){
      console.log(chooseuser.value)
  
      const dbRef = ref(db);
      
  
  
      if(chooseuser.value == ""){
        this.errMsg="Please choose what type of user are you"
      }

      else if(chooseuser.value=="cashier")  {
        localStorage.setItem('loggedas', 'cashier');
  
        const emailVal = `cashier/${email.value}`;
        
        onValue(
          child(dbRef, emailVal),
          (snapshot) => {
            if(snapshot.val() == null){
              this.errMsg = "Username invalid";
            }
            else {
              this.errMsg = "";
                onValue(
                  child(dbRef, `cashier/${email.value}/password/`),
                  (snapshot) => {
                    if(snapshot.val() == password.value){
                       this.$router.push('/cashierPage');
                       localStorage.setItem('log-in', true);

                       this.errMsg="";
                       onValue(
                        child(dbRef, `cashier/${email.value}/name`),
                        (snapshot) => {
                          localStorage.setItem('currentCashier', snapshot.val());
                          this.currentCashier= snapshot.val();

                         
                          // WINDOW IDENTIFIER
                          onValue(
                            child(dbRef, `cashier/${email.value}/window`),
                            (snapshot) => {

                              if(snapshot.val()=='A'){
                                update(dbRef, { currentCashierA: this.currentCashier });
                                localStorage.setItem('currentWindow', 'A');

                              }
                              else if(snapshot.val()=='B'){
                                localStorage.setItem('currentWindow', 'B');

                                update(dbRef, { currentCashierB: this.currentCashier });

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
                      onValue(
                        child(dbRef, `cashier/${email.value}/id`),
                        (snapshot) => {
                          localStorage.setItem('currentCashierId', snapshot.val());

                          
                        },
                        (error) => {
                          console.error(error);
                        }
                      );
                  
                    }
                    else {
                      this.errMsg = "INVALID PASSWORD";
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
  
    }
    else{
      localStorage.setItem('loggedas', 'admin');
  
      const emailVal = `admin/${email.value}`;
        
        onValue(
          child(dbRef, emailVal),
          (snapshot) => {
            if(snapshot.val() == null){
              this.errMsg = "Username invalid";
            }
            else {
              this.errMsg = "";
                onValue(
                  child(dbRef, `admin/${email.value}/password/`),
                  (snapshot) => {
                    if(snapshot.val() == password.value){
                      this.$router.push('/adminPage');
                      localStorage.setItem('log-in', true);
                      this.errMsg="";
                      onValue(
                      child(dbRef, `admin/${email.value}/name/`),
                      (snapshot) => {
                        localStorage.setItem('currentAdmin', snapshot.val());

                      },
                      (error) => {
                        console.error(error);
                      }
                    );
                    onValue(
                      child(dbRef, `admin/${email.value}/id/`),
                      (snapshot) => {
                        localStorage.setItem('currentAdminId', snapshot.val());

                      },
                      (error) => {
                        console.error(error);
                      }
                    );

                    }
                    else {
                      this.errMsg = "INVALID PASSWORD";
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
  
  
  
    }
  
  
     }
    
    }
  }
  
    </script>
  
  
  <script setup>
  
  import logo from "~/assets/images/logo.png";
  
  
  </script>
  
  <style scoped>
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
    background-image:url(../assets/images/img4.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position:-550px;
  }
  
  .element {
    padding-left: 90px;
    padding-right: 90px;
  }
  
  input{
    padding-left: 15px;
  }

  input,
  select {
    border-radius: 30px;
    box-sizing: border-box;
    border-bottom: 2px solid #0F172A;
    position: flex;
    width: 291px;
    height: 38px;
    margin-left: auto;
    margin-right: auto;
  }
  
  select {
    text-align: center;
  }
  
  label {
    position: flex;
    width: 172px;
    height: 19px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
  }
  
  button {
    border-radius: 30px;
    box-sizing: border-box;
    background-color: #0F172A;
    color: #FEFEFE;
    position: flex;
    width: 291px;
    height: 47px;
    left: 779px;
  
  }
  
  span:hover {
    color: blue;
    text-decoration: underline;
    font-size: small;
    cursor: pointer;
  }
  
  button:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.50);
  }
  
  input:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.50);
  }
  
  select:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.50);
  }
  
  span {
    text-decoration: underline;
    font-size: small;
  }
  
  p {
    font-size: small;
    position: flex;
    text-align: center;
    margin-top: 10px;
  }
  
  label {
    color: #0F172A;
    position: flex;
  }
  
  img {
    margin-top: 5%;
    width: 105.26px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
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
  