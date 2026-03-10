let bmiChart;

function toggleDark(){document.body.classList.toggle("dark");}

function openTool(tool){
document.getElementById("modal").style.display="flex";
let content="";

if(tool==="bmi"){
content=`<h2>BMI Calculator</h2>
<input type="number" id="weight" placeholder="Weight (kg)">
<input type="number" id="height" placeholder="Height (cm)">
<button onclick="calculateBMI()">Calculate</button>
<div class="result" id="bmiResult"></div>
<canvas id="bmiChart"></canvas>`;
}

if(tool==="cgpa"){
content=`<h2>University CGPA Calculator</h2>
<p>Enter your semester GPAs and credits:</p>
<div id="semesters">
<div class="semester">
<input type="number" class="gpa" placeholder="Semester GPA">
<input type="number" class="credit" placeholder="Semester Credits">
</div>
</div>
<button onclick="addSemester()">+ Add Semester</button>
<button onclick="calculateCGPA()">Calculate CGPA</button>
<div class="result" id="cgpaResult"></div>`;
}

if(tool==="currency"){
content=`<h2>Currency Converter</h2>
<input type="number" id="amount" placeholder="Amount">
<select id="fromCurrency">
<option value="USD">USD</option><option value="PKR">PKR</option><option value="EUR">EUR</option><option value="GBP">GBP</option>
<option value="CAD">CAD</option><option value="AUD">AUD</option><option value="JPY">JPY</option><option value="CNY">CNY</option>
<option value="AED">AED</option><option value="INR">INR</option><option value="SGD">SGD</option><option value="CHF">CHF</option>
<option value="MYR">MYR</option><option value="NZD">NZD</option><option value="SAR">SAR</option>
</select>
<select id="toCurrency">
<option value="USD">USD</option><option value="PKR">PKR</option><option value="EUR">EUR</option><option value="GBP">GBP</option>
<option value="CAD">CAD</option><option value="AUD">AUD</option><option value="JPY">JPY</option><option value="CNY">CNY</option>
<option value="AED">AED</option><option value="INR">INR</option><option value="SGD">SGD</option><option value="CHF">CHF</option>
<option value="MYR">MYR</option><option value="NZD">NZD</option><option value="SAR">SAR</option>
</select>
<button onclick="convertCurrency()">Convert</button>
<div class="result" id="currencyResult"></div>`;
}

if(tool==="unit"){
content=`<h2>Unit Converter</h2>
<select id="unitType" onchange="updateUnits()">
<option value="length">Length</option>
<option value="weight">Weight</option>
<option value="temperature">Temperature</option>
<option value="volume">Volume</option>
</select>
<input type="number" id="unitValue" placeholder="Value">
<select id="unitFrom"></select>
<select id="unitTo"></select>
<button onclick="convertUnit()">Convert</button>
<div class="result" id="unitResult"></div>`;
}

if(tool==="loan"){
content=`<h2>Loan / EMI Calculator</h2>
<input type="number" id="loanAmount" placeholder="Loan Amount">
<input type="number" id="interestRate" placeholder="Annual Interest %">
<input type="number" id="loanMonths" placeholder="Tenure (Months)">
<button onclick="calculateEMI()">Calculate EMI</button>
<div class="result" id="loanResult"></div>`;
}

if(tool==="gps"){
}

document.getElementById("toolContent").innerHTML=content;

if(tool==="unit"){updateUnits();}
}

function closeModal(){document.getElementById("modal").style.display="none";}

// BMI
function calculateBMI(){
let w=document.getElementById("weight").value;
let h=document.getElementById("height").value/100;
if(!w||!h){document.getElementById("bmiResult").innerText="Enter valid numbers";return;}
let bmi=(w/(h*h)).toFixed(1);
let category,color;
if(bmi<18.5){category="Underweight";color="blue";}
else if(bmi<25){category="Normal";color="green";}
else if(bmi<30){category="Overweight";color="orange";}
else{category="Obese";color="red";}
document.getElementById("bmiResult").innerHTML=`BMI: ${bmi} (<span style="color:${color}">${category}</span>)`;
if(bmiChart) bmiChart.destroy();
bmiChart=new Chart(document.getElementById("bmiChart"),{
type:"bar",
data:{labels:["Underweight","Normal","Overweight","Obese"],datasets:[{data:[18.5,25,30,40],backgroundColor:["blue","green","orange","red"]}]},
options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}
});
}

// CGPA
function addSemester(){
let div=document.createElement("div");
div.className="semester";
div.innerHTML=`<input type="number" class="gpa" placeholder="Semester GPA">
<input type="number" class="credit" placeholder="Semester Credits">`;
document.getElementById("semesters").appendChild(div);
}
function calculateCGPA(){
let gpas=document.querySelectorAll(".gpa");
let credits=document.querySelectorAll(".credit");
let totalPoints=0, totalCredits=0;
for(let i=0;i<gpas.length;i++){
let g=parseFloat(gpas[i].value);
let c=parseFloat(credits[i].value);
if(isNaN(g)||isNaN(c)||g<0||c<=0){document.getElementById("cgpaResult").innerText="Enter valid GPA and credits for all semesters"; return;}
totalPoints+=g*c;
totalCredits+=c;
}
let cgpa=(totalPoints/totalCredits).toFixed(2);
document.getElementById("cgpaResult").innerText="Your CGPA is: "+cgpa;
}

// Currency
function convertCurrency(){
let amt=parseFloat(document.getElementById("amount").value);
let from=document.getElementById("fromCurrency").value;
let to=document.getElementById("toCurrency").value;
let rates={"USD":1,"PKR":283,"EUR":0.93,"GBP":0.81,"CAD":1.36,"AUD":1.49,"JPY":141.5,"CNY":6.91,"AED":3.67,"INR":83,"SGD":1.36,"CHF":0.91,"MYR":4.75,"NZD":1.57,"SAR":3.75};
document.getElementById("currencyResult").innerText="Converted: "+(amt*rates[to]/rates[from]).toFixed(2)+" "+to;
}

// Unit Converter
const unitCategories={
length:["meter","kilometer","centimeter","millimeter","inch","feet","yard","mile"],
weight:["gram","kilogram","milligram","pound","ounce"],
temperature:["Celsius","Fahrenheit","Kelvin"],
volume:["liter","milliliter","gallon","pint","cup"]
};
function updateUnits(){
let type=document.getElementById("unitType").value;
let from=document.getElementById("unitFrom");
let to=document.getElementById("unitTo");
from.innerHTML="";to.innerHTML="";
unitCategories[type].forEach(u=>{from.innerHTML+=`<option value="${u}">${u}</option>`;to.innerHTML+=`<option value="${u}">${u}</option>`;});
}
function convertUnit(){
let val=parseFloat(document.getElementById("unitValue").value);
let type=document.getElementById("unitType").value;
let from=document.getElementById("unitFrom").value;
let to=document.getElementById("unitTo").value;
if(isNaN(val)){document.getElementById("unitResult").innerText="Enter valid number";return;}
let result;
if(type==="length"){const map={"meter":1,"kilometer":1000,"centimeter":0.01,"millimeter":0.001,"inch":0.0254,"feet":0.3048,"yard":0.9144,"mile":1609.34}; result=val*map[from]/map[to];}
else if(type==="weight"){const map={"gram":1,"kilogram":1000,"milligram":0.001,"pound":453.592,"ounce":28.3495}; result=val*map[from]/map[to];}
else if(type==="temperature"){if(from==="Celsius"&&to==="Fahrenheit")result=val*9/5+32;
else if(from==="Fahrenheit"&&to==="Celsius")result=(val-32)*5/9;
else if(from==="Celsius"&&to==="Kelvin")result=val+273.15;
else if(from==="Kelvin"&&to==="Celsius")result=val-273.15;
else if(from==="Fahrenheit"&&to==="Kelvin")result=(val-32)*5/9+273.15;
else if(from==="Kelvin"&&to==="Fahrenheit")result=(val-273.15)*9/5+32;
else result=val;}
else if(type==="volume"){const map={"liter":1,"milliliter":0.001,"gallon":3.78541,"pint":0.473176,"cup":0.24}; result=val*map[from]/map[to];}
document.getElementById("unitResult").innerText="Converted: "+result.toFixed(4)+" "+to;
}

// Loan EMI
function calculateEMI(){
let P=parseFloat(document.getElementById("loanAmount").value);
let r=parseFloat(document.getElementById("interestRate").value)/100/12;
let n=parseInt(document.getElementById("loanMonths").value);
let emi=P*r*(Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
document.getElementById("loanResult").innerText="Monthly EMI: "+emi.toFixed(2);
}

// Search
function searchTools(q){
document.querySelectorAll(".tool-card").forEach(card=>{
card.style.display=card.innerText.toLowerCase().includes(q.toLowerCase())?"block":"none";
});
}