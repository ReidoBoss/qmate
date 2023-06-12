import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'



import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDtsKwx7mcaSnoPnZ2hlcolB8qluY69LMQ",
  authDomain: "fir-68a5f.firebaseapp.com",
  databaseURL: "https://fir-68a5f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-68a5f",
  storageBucket: "fir-68a5f.appspot.com",
  messagingSenderId: "939974599498",
  appId: "1:939974599498:web:40392f504dd093d1c257b3"
};

initializeApp(firebaseConfig);

const app = createApp(App)

import { getDatabase, ref,child ,get , update  } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

app.use(router);

app.mount('#app')
