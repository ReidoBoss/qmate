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
              <div class="form py-2">
                  <div class="x">
                      <XMarkIcon class="exit"  @click="back"/>
                  </div>
                  <div class="lower">
                  <p>FORGOT PASSWORD</p>
                  <p class="bold">Please verify your account by answering security</p>
                  <p class="bold">questions you provided during registration</p>
               
                  <p>{{ question }}</p>
                  <img src="../assets/images/img5.png" alt="paper plane" class="plane"> 
                  <input class="security" type="text" v-model="text">
                  <button @click="submit">{{ check }}</button>
                  </div>
              </div>
          </div>
      </div>
  </template>
  
  <script setup>
  import logo from "~/assets/images/logo.png";
  import {XMarkIcon} from '@heroicons/vue/24/solid';
  </script>
  
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
  const dbRef = ref(db);
  export default {
      data() {
        return {
          question:'What is your username?',
          admin:'',
          intent : 0,
          intentOwner:'',
          actionMsg: '',
          errMsg: '',
          text:'',
          check: 'CHECK AVAILABILITY',
        }
      },
      
      created (){
          localStorage.setItem("currently",'');
          localStorage.setItem('forgotUsername','');
          
    
      },
  
      methods: {
          exitPop(){
              var x = document.getElementById("overlay");
              x.style.zIndex="-1";
          },
          back() {
          this.$router.push('/');
          },
          submit(){
          
          /*cashier*/
          onValue(
            child(dbRef, `cashier/${this.text}`),
            (snapshot) => {
              if(this.intent == 0){
  
                  this.cashier = snapshot.val();
                  onValue(
                  child(dbRef, `admin/${this.text}`),
                  (snapshot) => {
                      this.admin = snapshot.val();
  
  
                      if(this.cashier == null && this.admin == null){
                          var x = document.getElementById("overlay");
                          x.style.zIndex="1";
                          this.actionMsg = "Invalid Action";
                          this.errMsg="Username doesn't exist!";
                      }
                      else if(this.cashier == null && this.admin!=null) {
                          //admin
                          localStorage.setItem('forgotUsername',this.text);
                          localStorage.setItem("currently",'admin');
                          onValue(
                              child(dbRef, `admin/${this.text}/securityQuestion`),
                              (snapshot) => {
                                  this.sq = snapshot.val();
                                  switch (this.sq) {
                                  case 'q1':
                                      this.question = "What is your favorite color?";
                                      this.check = "SUBMIT";
                                      this.text="";
                                      break;
  
                                  case 'q2':
                                      this.question = "What is your first car?";
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
  
                                  case 'q3':
                                      this.question = "What is your highschool mascot?";
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
  
                                  case 'q4':
                                      this.question = "What is your bestfriend's name?";
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
  
                                  case 'q5':
                                      this.question = "What is your favorite food?";
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
  
                                  default:
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
                                  }
                              });
                              this.intent ++;
    
                      }
                      else if(this.cashier != null && this.admin==null) {
                          //cashier
                          localStorage.setItem("currently",'cashier');
                          localStorage.setItem('forgotUsername',this.text);
                          onValue(
                              child(dbRef, `cashier/${this.text}/securityQuestion`),
                              (snapshot) => {
                                  this.sq = snapshot.val();
                                  switch (this.sq) {
                                  case 'q1':
                                      this.question = "What is your favorite color?";
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
  
                                  case 'q2':
                                      this.question = "What is your first car?";
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
  
                                  case 'q3':
                                      this.question = "What is your highschool mascot?";
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
  
                                  case 'q4':
                                      this.question = "What is your bestfriend's name?";
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
  
                                  case 'q5':
                                      this.question = "What is your favorite food?";
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
  
                                  default:
                                      this.text="";
                                      this.check = "SUBMIT";
                                      break;
                                  }
                              });
                              this.intent ++;
           
                      }
  
  
                  });
              }
              else{
                  this.current = localStorage.getItem('currently');
                  this.username = localStorage.getItem('forgotUsername');
                  if (this.current =='admin'){
                      onValue(
                              child(dbRef, `admin/${this.username}/answerSQ`),
                              (snapshot) => {
                                  if(this.text != snapshot.val()){
                                      var x = document.getElementById("overlay");
                                      x.style.zIndex="1";
                                      this.actionMsg = "Invalid Action";
                                      this.errMsg="Wrong answer";
                                  }
                                  else{
                                      this.$router.push('/newPassword');
                                  }
  
  
                              });
  
                  }
                  else{
                      onValue(
                              child(dbRef, `cashier/${this.username}/answerSQ`),
                              (snapshot) => {
                                  if(this.text != snapshot.val()){
                                      var x = document.getElementById("overlay");
                                      x.style.zIndex="1";
                                      this.actionMsg = "Invalid Action";
                                      this.errMsg="Wrong answer";
                                  }
                                  else{
                                      this.$router.push('/newPassword');
                                  }
  
  
                              });
  
                  }
  
  
  
              }
              
  
  
            });
  
          },
  
      }   
    }
    
  </script>
  
  
  
  
  <style scoped>
  
  .x{
      margin-left: 445px;
      height: 25px;
      width: 25px;
  
  }
  .form {
      position: flex;
      width: 482px;
      height: 512px;
      text-align: center;
      background: #FEFEFE;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.75);
      border-radius: 25px;
  }
  
  span{
      text-decoration: underline;
  }
  
  span:hover {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
  }
  
  .plane{
      width: 225px;
      height: 225px;
  }
  
  select {
      text-align: center;
  }
  
  button {
      border-radius: 30px;
      box-sizing: border-box;
      background-color: #0F172A;
      color: #FEFEFE;
      position: block;
      width: 280px;
      height: 47px;
      left: 779px;
      margin-top: 15px;
      margin-bottom: 0px;
  }
  
  button:hover {
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.50);
  }
  
  input:hover {
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.50);
  }
  
  .bold {
      font-family: 'Inter';
      color: #0F172A;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
  }
  
  p {
      position: block;
      margin-left: auto;
      margin-right: auto;
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 45px;
      color: #0F172A;
  }
  
  img {
      height: 85px;
      margin-top: 0%;
      margin-left: auto;
      margin-right: auto;
      display: block;
  }
  
  input {
      border-radius: 30px;
      box-sizing: border-box;
      border: 2px solid #0F172A;
      width: 280px;
      height: 38px;
      margin-right: 15px;
      margin-left: 15px;
      text-align: center;
  }
  
  .white {
      display: flex;
      background-color: #ffffff99;
      height: 100%;
  }
  
  .flex {
      background-image: url(../assets/images/loginBg.jpg);
      background-size: cover;
      width: 100%;
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
  