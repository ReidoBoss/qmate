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
            <div class="form">
                <img :src="logo" alt="logo">
                <p>CREATE NEW PASSWORD</p>
                <br>
                <br>
                <div class="element px-16">
                    <label for="newPassword">New Password</label><br>
                    <input type="password" id="newPassword" class="no1" v-model = "newPass"><br>
                    <label for="retryPassword">Retry Password</label><br>
                    <input type="password" id="retryPassword" class="no2" v-model = "retryPass"><br>
                    <br>
                    <br>
                    <button @click="submit">SUBMIT</button>
                    <button @click="back">CANCEL</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import logo from "~/assets/images/logo.png";
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
    data(){
        return {
            actionMsg: '',
            errMsg:'',

        }
    },
    created(){

        

    },
methods: {
    exitPop(){
            var x = document.getElementById("overlay");
            x.style.zIndex="-1";
        },
    submit(){
        if(this.newPass != this.retryPass){
                        var x = document.getElementById("overlay");
                        x.style.zIndex="1";
                        this.actionMsg = "Invalid Action";
                        this.errMsg="Passwords doesn't match.";
            
        }
        else{

                this.current = localStorage.getItem('currently');
                this.username = localStorage.getItem('forgotUsername');
                if (this.current =='admin'){
                    const dbRef = ref(db, `admin/${this.username}`);
                    update(dbRef, { password: this.newPass });    
                    this.backToLogin();
                }
                else if (this.current =='cashier'){
                    const dbRef = ref(db, `cashier/${this.username}`);
                    update(dbRef, { password: this.newPass });    
                    this.backToLogin();
                }
                else{
                        var x = document.getElementById("overlay");
                        x.style.zIndex="1";
                        this.actionMsg = "Invalid Action";
                        this.errMsg="Please press CANCEL and try again.";
                }


        }

    },
    backToLogin() {
        this.$router.push('/');
    },
    back(){
        this.$router.push('/forgotPassword');
    }
}
};
</script>


<style scoped>
.form {
    position: flex;
    width: 482px;
    height: 512px;
    background: #FEFEFE;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.75);
    border-radius: 25px;
    padding-left: 3%;
    padding-right: 3%;
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
    color: #0F172A;
    padding-left: 0px;

}

button {
    border-radius: 30px;
    box-sizing: border-box;
    background-color: #0F172A;
    color: #FEFEFE;
    width: 291px;
    height: 47px;
    left: 779px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    position: flex;
}

button:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.50);
}

input:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.50);
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
    text-align: center;
    margin-top: 5px;
}



img {
    height: 85px;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
    display: block;
}

input {
    border-radius: 30px;
    box-sizing: border-box;
    border-bottom: 2px solid #0F172A;
    width: 280px;
    height: 38px;
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
