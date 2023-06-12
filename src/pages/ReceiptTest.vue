<template>
  <div class="receipt">
  <div class="rHole">
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>

  </div>
  <div class="content">
    <div class="header">
      <div class="headLeft">
        <img class="imgLogo" :src="logo" alt="logo">
      </div>
      <div class="headRight">
        <div class="rUp"> 
          <div class="schoolName">SAINT WILLIAM COOPERATIVE SCHOOL</div>
          <div class="official">OFFICIAL RECEIPT</div> 
        </div>
        <hr>
        <div class="rDown">
          <div class="left1">
            <div class="schoolDetails">Corazon Poblacion, Catmon, Cebu Philippines</div>
            <div class="schoolDetails">Mobile No. +63 995 932 0034</div>
            <div class="schoolDetails">TIN 000-000-000-000 NON-VAT·BIR PERMIT No. 00-0000-000-00000-000</div>
          </div>
          <div class="right1">
            <div class="qDetails">
              <p>O.R. No.:</p>
              <p>Date:</p>
              <p>Time:</p>
              <p>Cashier:</p>
            </div>
            <div class="tDetails">
              <div class="tBox">
                <p class="customers">{{ orno }}</p>
                <p class="customers">{{ currentDate }}</p>
                <p class="customers">{{ currentTime }}</p>
                <p class="customers">{{ currentCashier }}</p>
              </div>
            </div>
          </div>
          
        </div>
    </div>
  </div>
  <div class="watermark">
                            <img class="logs" :src="logo" alt="logo">
  </div>
  <div class="content1">
    <div class="contentLeft">
      <div class="rFLabel">Received From <span class="customer">{{ idNumber }}</span> </div>
      <div class="rFBox">
        <p class="customer">{{ wholename }}</p>
      </div>
    </div>
    <!-- <div class="contentRight">
      
    </div> -->
  </div>

  <div class="content2">
    <div class="contentLeft2">
      <div class="rFLabel2">The amount of</div>
      <div class="rFBox2"><p class="customer">{{ capital }} PESOS</p></div>
    </div>
    <div class="contentRight2">
      <div class="lBox">
        <p class="cust">{{ total }}.00</p>
      </div>
    </div>
  </div>
  
  <div class="content3">
    <div class="contentLeft3">
      <div class="rFLabel3">Particulars</div>
      <div class="rFBox3">
        <p class="customer">01 Tuition fee</p>
        <p class="customer">02 Miscellaneus fee</p>
        <p class="customer">Transaction No. {{ transactionNum }}<span class="totalLabel">TOTAL &#10148;</span></p>
      </div>
    </div>
    <div class="contentRight3">
      <div class="lBox3">
        <p class="cust">{{ tuition }}.00</p>
        <p class="cust">{{ misc }}.00</p>
        <p class="cust">{{ total }}.00</p>
      </div>
    </div>
  </div>

  </div>

  <div class="lHole">
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
  
  </div>
</div>
</template>

<script setup>
  import logo from "~/assets/images/logo.png";
</script>

<script>
  export default {
    data(){
      return{
        wholename:'',
        idNumber:null,
        tuition:null,
        misc:null,
        total: null,
        currentCashier:'',
        currentTime:"",
        currentDate:"",
        orno:null,
        capital : '',
        transactionNum:''
      }
    },
    mounted(){

      this.currentCashier = localStorage.getItem('currentCashier');
      this.wholename = localStorage.getItem('wholeName');
      this.idNumber = Math.abs(localStorage.getItem('idNumber'));
      this.tuition = Math.abs(localStorage.getItem('tuitionfee'));
      this.misc = Math.abs(localStorage.getItem('miscfee'));
      this.orno = Math.abs(localStorage.getItem('ornoYEAH!'));
      this.total = Math.abs(this.misc + this.tuition);
      this.capital = this.convertToWords(this.total).toUpperCase();

      this.currentTime = localStorage.getItem('currentTimeHehe');
      this.currentDate = localStorage.getItem('currentDateHehe');
      this.transactionNum =localStorage.getItem('transactionYeah!');


      //time

    },
    methods: {
      convertToWords(number) {
      const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
      const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

      if (number === 0) {
        return 'zero';
      }

      if (number < 20) {
        return units[number];
      }

      let result = '';

      if (number < 100) {
        const tensDigit = Math.floor(number / 10);
        const unitsDigit = number % 10;
        result = tens[tensDigit] + ' ' + units[unitsDigit];
      } else if (number < 1000) {
        const hundredsDigit = Math.floor(number / 100);
        const remainingNumber = number % 100;
        result = units[hundredsDigit] + ' hundred ' + this.convertToWords(remainingNumber);
      } else {
        const thousandsDigit = Math.floor(number / 1000);
        const remainingNumber = number % 1000;
        result = this.convertToWords(thousandsDigit) + ' thousand ' + this.convertToWords(remainingNumber);
      }

      return result.trim();
    },
      
      
    printPage() {
      const printWindow = window.open('http://192.168.1.236:5173/receipt', 'printWindow');
      printWindow.onload = function() {
        printWindow.print();
      };
    }
  }
}
</script>

<style>

@media print{
  .receipt{
    visibility: visible !important;
    print-color-adjust: exact;
  }
}

.watermark{
  display: flex;
  justify-content: center;
}

.logs{
    position:absolute;
    height: 200x;
    width: 200px;
    margin-top: 0px;
    z-index:0;
    opacity:0.2;
  }

.totalLabel{
  margin-left: 250px;
  font-weight: 500;
  font-size: 10px;
  color: green;
  font-family: sans-serif;
}

.customer{
  font-size: 13px; 
  color: #3f3f46;
  font-weight: 700;
  padding-left: 25px;
  font-family: "Courier New", Courier, monospace;
}

.cust{
  font-size: 13px; 
  color: #3f3f46;
  font-weight: 700;
  font-family: "Courier New", Courier, monospace;
  margin-left: 3px;
}

.customers{
  font-size: 13px; 
  color: #3f3f46;
  font-weight: 700;
  /* padding-left: 25px; */
  font-family: "Courier New", Courier, monospace;
  line-height: 1;
  margin-bottom: 1px;
}

.lBox{
  height:40px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid green;
  align-items: center;
  padding-top: 10px;

}

.lBox3{
  height:68px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid green;
  padding-top: 5px;

}

.contentRight2{
  padding-top: 17px;
  display: flex;
  width: 24.5%;
  padding-left: 15px;
}

.contentRight3{
  padding-top: 17px;
  display: flex;
  width: 24.5%;
  padding-left: 15px;
}

  .tBox{
    margin-top: 7px;
    height: 65px;
    border: 1px solid green;
    border-radius: 8px;
    align-items: end;
    padding-top: 6px;
    padding-left: 5px;
  }

  .qDetails{
    width: 25%;
    height: 105px;
    font-size: 10px;
    text-align: end;
    padding-top: 15px;
    font-weight: 500;
  }

  .tDetails{
    height: 105px;
    width: 75%;
    padding: 5px;
    align-items: center;
    justify-content: center;
  }

  .left1{
    width: 70%;
  }

  .right1{
    width: 28%;
    position: absolute;
    display: flex;
    height: 105px;
    right: 35px;
  }

  .rFLabel,.rFLabel2,.rFLabel3{
    font-weight: 500;
    font-size: 10px;
    margin-left: 10px;
  }

  .rFBox{
    height: 25px;
    border-radius: 8px;
    border: 1px solid green;
    width: 100%;
    font-size: 13px; 
    color: #3f3f46;
    font-weight: 700;
    padding-top: 3px;
    /* padding-left: 25px; */
  
  }

  .rFBox2{
    height: 40px;
    border-radius: 8px;
    border: 1px solid green;
    width: 100%;
    padding-top: 10px;
  }

  .rFBox3{
    height: 68px;
    border-radius: 8px;
    border: 1px solid green;
    width: 100%;
    padding-top: 6px;
  }

  .content1{
    display: flex;
    width: 70%;
    margin-top: 5px;
  }

  .content2{
    display: flex;
    width: 100%;
    margin-top: 5px;
    
  }

  .content3{
    display: flex;
    width: 100%;
    margin-top: 5px;
    
  }

  .contentLeft{
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .contentLeft2{
    display: flex;
    flex-direction: column;
    width: 76.5%;

    
  }

  .contentLeft3{
    display: flex;
    flex-direction: column;
    width: 76.5%;

    
  }
  .receipt{
    display: flex;
    box-shadow: 0px 1px 2px rgba(0,0,0,0.1), 
            0px 2px 4px rgba(0,0,0,0.1), 
            0px 4px 8px rgba(0,0,0,0.1), 
            0px 8px 16px rgba(0,0,0,0.1);
    background-color: #fefefe;
    
    visibility: hidden;
    /* display: none; */

  }

  .rHole,.lHole{
    width: 5%;
  }

  .hole{
    height: 15px;
    width: 15px;
    background-color: #52525b;
    border-radius: 30px;
    margin: 10px;
    margin-bottom: 20px;
  }

  .content{
    width: 90%;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    color: green;

  }

  .header{
    display: flex;
    width: 100%;

  }
  .imgLogo{
    height: 52px;
    width: 52px;
   
  }

  .rUp{
    display: flex;
  }

  .rDown{
    display: flex;
    margin-top: 3px;
    padding: 0;
  }

  .schoolName{
    width: 70%;
    font-family: "Times New Roman", Times, serif;
    font-weight: 700;
    letter-spacing:0.3px;
  }
  
  .official{
    width: 30%;
    text-align: end;
    font-weight: 700;
    color: red;
  }

  .headLeft{
    width: 9%;
    justify-items: center;
    align-items: center;
    margin-right: 5px;
  }

  .headRight{
    width: 91%;
  }

  .schoolDetails{
    
    font-size: 10px;
    line-height: 1;
    font-weight: 500;
  }

  hr{
    border: 1px solid green;
  }
</style>
