<template>
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
                              <p>{{ wholename }}</p>
                              <p>{{ idNumber }}</p>
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

</template>

<script setup>
  import logo from "~/assets/images/logo.png";
</script>

<script>
  export default {
    data(){

      return {
        wholename:'',
        idNumber: null,        
      }
      

    },
    mounted(){
      this.wholename = localStorage.getItem('wholeName');
      this.idNumber = localStorage.getItem('idNumber');
    },
    methods: {
  }
}
</script>

<style>

@media print{
  .assesment{
    visibility: visible !important;
    print-color-adjust: exact;
  }
}

.log{
  height: 42px;
  width: 42px;
}

.fl{
    text-align:start;
    width:50%;
  }
  .fr{
    text-align:end;
    width:50%;
  }

.fChildren{
    display:flex;
    width:65%;
  }
.container{
    display:flex;
    justify-content: center;
    align-items:center;
    margin-bottom:5px;
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

.tu{
    font-weight: 900;
    margin-bottom:3px;
    text-align: center;
  }

.soa{
    width: 56%;
    height: 240px;
    padding-left:3px;
    padding-right:3px;
    z-index:0;
  }

.logs{
    position:absolute;
    height: 250x;
    width: 250px;
    margin-top: 0px;
    margin-left:300px;
    z-index:0;
    opacity:0.2;
  }

.watermark{
  display: flex;
  justify-content: center;
}

.p{
    text-align: center;
  }

.tu{
    font-weight: 900;
    margin-bottom:3px;
    text-align: center;
  }

.unit{
    width: 10%;
    height: 225px;
  }

.t{
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

.uleft{
    width: 50%;
    text-align:start;
  }

  .uright{
    width: 50%;
    text-align: end;
  }


.details{
    color:#3f3f46;
    font-size: 10px;
    letter-spacing:1.5px;
    font-weight: 700;
    /* font-family: "Courier New", Courier, monospace; */
  }

  .up{
    display:flex;
    margin-bottom: 8px;
  }

.asses{
    font-weight: 500;
    font-size:13px;
  }

.slip{
  display:flex;
  justify-content:center;
  align-items:center;
  height: 100%;
  width: 22%;
  margin-right:3px;
}

.l{
    font-weight: 600;
    font-size:11px;
    padding:0px;
    margin:0px;
    letter-spacing:2.5px;
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

.assesment{
  filter: drop-shadow;
  background-color: #fefefe;
  height: 373px;
  box-shadow: 0px 1px 2px rgba(0,0,0,0.1), 
            0px 2px 4px rgba(0,0,0,0.1), 
            0px 4px 8px rgba(0,0,0,0.1), 
            0px 8px 16px rgba(0,0,0,0.1);
  padding:8px;
  visibility: hidden;
  
}
.head{
  display:flex;
  background-color: #166534;
  height: 13%;
  padding:0px;
  margin-bottom: 15px;
  color: #fefefe;
}
</style>
