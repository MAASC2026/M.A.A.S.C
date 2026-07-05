import { db } from "./firebase-config.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const excelFile = document.getElementById("excelFile");
const previewBtn = document.getElementById("previewBtn");
const importBtn = document.getElementById("importBtn");

const previewBody = document.getElementById("previewBody");
const progressBar = document.getElementById("progressBar");
const status = document.getElementById("status");

const departmentSelect = document.getElementById("department");
const yearSelect = document.getElementById("year");
const sectionSelect = document.getElementById("section");

let workbook = null;
let allStudents = [];

/* ============================
      Preview Excel
============================ */

previewBtn.onclick = async () => {

if(excelFile.files.length===0){
alert("Choose Excel File");
return;
}

if(departmentSelect.value===""){
alert("Please Select Department");
departmentSelect.focus();
return;
}

if(yearSelect.value===""){
alert("Please Select Year");
yearSelect.focus();
return;
}

if(sectionSelect.value===""){
alert("Please Select Section");
sectionSelect.focus();
return;
}

status.innerHTML="Reading Excel...";

const data=await excelFile.files[0].arrayBuffer();

workbook=XLSX.read(data);

previewBody.innerHTML="";
allStudents=[];

readWorkbook();

};

/* ============================
      Read Workbook
============================ */

function readWorkbook(){

allStudents=[];
previewBody.innerHTML="";

const department=departmentSelect.value;
const year=yearSelect.value;
const section=sectionSelect.value;

let semester="1";

if(year==="I")
semester="1";

if(year==="II")
semester="3";

if(year==="III")
semester="5";

workbook.SheetNames.forEach(sheetName=>{

const sheet=workbook.Sheets[sheetName];

const rows=XLSX.utils.sheet_to_json(sheet,{header:1});

if(rows.length<=1) return;

for(let i=1;i<rows.length;i++){

const row=rows[i];

if(!row || row.length===0)
continue;

const rollNo = (row[0] || "").toString().trim();
const regNo = (row[1] || "").toString().trim().toUpperCase();
const name = (row[1] || "").toString().trim();

const dob=(row[4]||"").toString().trim();

const email=(row[6]||"").toString().trim();

const mobile=(row[7]||"").toString().trim();

const address=(row[8]||"").toString().trim();

if(regNo==="")
continue;

const student = {

regNo,
rollNo,
name,

department,
year,
semester,
section,

dob,
mobile,
email,
address,

password:"1234",

status:"ACTIVE"

};

allStudents.push(student);

previewBody.innerHTML+=`

<tr>

<td>${rollNo}</td>

<td>${name}</td>

<td>${department}</td>

<td>${year}</td>

<td>${section}</td>

<td>${semester}</td>

</tr>

`;

}

});

status.innerHTML=
allStudents.length+
" Students Ready For Import";

}
/* ==============================
      Import to Firestore
================================ */

importBtn.onclick = async () => {

if(allStudents.length===0){

alert("Please Preview Excel First");

return;

}

let imported=0;
let skipped=0;
let errors=0;

progressBar.style.width="0%";
progressBar.innerHTML="0%";

status.innerHTML="Starting Import...";

for(let i=0;i<allStudents.length;i++){

const s=allStudents[i];

try{

const ref=doc(db,"students",s.regNo);

const snap=await getDoc(ref);

if(snap.exists()){

skipped++;

}else{

await setDoc(ref,{

regNo:s.regNo,

rollNo:s.rollNo,

name:s.name,

department:s.department,

year:s.year,

semester:s.semester,

section:s.section,

dob:s.dob,

mobile:s.mobile,

email:s.email,

address:s.address,

password:s.password,

status:s.status,

createdAt:new Date()

});

imported++;

}

}catch(error){

console.error("Import Error :",error);

errors++;

}

const percent=Math.round(
((i+1)/allStudents.length)*100
);

progressBar.style.width=percent+"%";

progressBar.innerHTML=percent+"%";

status.innerHTML=
`Importing ${i+1} / ${allStudents.length} Students...`;

}

status.innerHTML="Import Completed Successfully";

alert(

`IMPORT COMPLETED

Total Students : ${allStudents.length}

Imported : ${imported}

Skipped : ${skipped}

Errors : ${errors}`

);

};
/* ==============================
      Reset on New File Selection
================================ */

excelFile.onchange = function () {

previewBody.innerHTML = "";

allStudents = [];

progressBar.style.width = "0%";

progressBar.innerHTML = "0%";

status.innerHTML = "Excel Selected. Click Preview.";

};

/* ==============================
      Reset When Department Changes
================================ */

departmentSelect.onchange = function () {

previewBody.innerHTML = "";

allStudents = [];

progressBar.style.width = "0%";

progressBar.innerHTML = "0%";

status.innerHTML = "Department Changed. Click Preview.";

};

/* ==============================
      Reset When Year Changes
================================ */

yearSelect.onchange = function () {

previewBody.innerHTML = "";

allStudents = [];

progressBar.style.width = "0%";

progressBar.innerHTML = "0%";

status.innerHTML = "Year Changed. Click Preview.";

};

/* ==============================
      Reset When Section Changes
================================ */

sectionSelect.onchange = function () {

previewBody.innerHTML = "";

allStudents = [];

progressBar.style.width = "0%";

progressBar.innerHTML = "0%";

status.innerHTML = "Section Changed. Click Preview.";

};
