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

let workbook = null;
let allStudents = [];

/* ==============================
   Department Mapping
================================ */

const departmentMap = {
"BCOMGEN":"B.Com General",
"BCOMBM":"B.Com BM",
"BCOMMM":"B.Com MM",
"BCOMCS":"B.Com CS",
"BCOMA&F":"B.Com A&F",
"BCOMISM":"B.Com ISM",
"BCOMCA":"B.Com CA",
"BCOMBUSAD":"B.Com BUS.AD",

"BADEFENCE":"B.A DEFENCE",
"BAPUBAD":"B.A PUB.AD",
"BATAMIL":"B.A TAMIL",
"BATOURISM":"B.A TOURISM",

"BSCCS":"B.Sc CS",
"BSCCSWITHAI":"B.Sc CS WITH AI",
"BSCCRIMINOLOGY":"B.Sc CRIMINOLOGY",
"BSCSA":"B.Sc SA",
"BSCPHYSWITHCA":"B.Sc PHYS WITH CA",
"BSCMATHSWITHCA":"B.Sc MATHS WITH CA",
"BSCELECTRONICSWITHAI":"B.Sc ELECTRONICS WITH AI",
"BSCVISCOM":"B.Sc VISCOM",
"BSCELECTRONICMEDIA":"B.Sc ELECTRONIC MEDIA",
"BSCIDD":"B.Sc IDD",
"BSCPHYSICS":"B.Sc PHYSICS",

"BCA":"BCA COMPUTER APPLICATION",
};

/* ==============================
   Preview Excel
================================ */

previewBtn.onclick = async () => {

if (excelFile.files.length === 0) {
alert("Choose Excel File");
return;
}

status.innerHTML = "Reading Excel...";

const data = await excelFile.files[0].arrayBuffer();

workbook = XLSX.read(data);

previewBody.innerHTML = "";
allStudents = [];

readWorkbook();
};

/* ==============================
   Read Workbook
================================ */

function readWorkbook() {

allStudents = [];
previewBody.innerHTML = "";

workbook.SheetNames.forEach(sheetName => {

const sheet = workbook.Sheets[sheetName];

const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

if (rows.length <= 1) return;

const dept = getDepartment(sheetName);

let count = 0;

for (let i = 1; i < rows.length; i++) {

const row = rows[i];

if (!row || row.length === 0) continue;

const regNo = (row[1] || "").toString().trim().toUpperCase();
const rollNo = (row[0] || "").toString().trim();
const name = (row[3] || "").toString().trim();
const dob = (row[4] || "").toString().trim();
const email = (row[6] || "").toString().trim();
const mobile = (row[7] || "").toString().trim();
const address = (row[8] || "").toString().trim();

if (regNo === "") continue;

count++;

const section = getSection(count);

const student = {
regNo,
rollNo,
name,
department: dept,
year: "I",
semester: "1",
section,
dob,
mobile,
email,
address,
password: "1234",
status: "ACTIVE"
};

allStudents.push(student);

previewBody.innerHTML += `
<tr>
<td>${regNo}</td>
<td>${name}</td>
<td>${dept}</td>
<td>${section}</td>
<td>1</td>
</tr>
`;

}

});

status.innerHTML = allStudents.length + " Students Ready for Import";
}

/* ==============================
   Section Logic
================================ */

function getSection(no) {
if (no <= 50) return "A";
if (no <= 100) return "B";
if (no <= 150) return "C";
if (no <= 200) return "D";
if (no <= 250) return "E";
return "F";
}

/* ==============================
   Department Fix
================================ */

function getDepartment(sheet) {
const key = sheet
.toUpperCase()
.replace(/[^A-Z0-9&]/g, "");

return departmentMap[key] || sheet;
}

/* ==============================
   Import to Firestore
================================ */

importBtn.onclick = async () => {

if (allStudents.length === 0) {
alert("Please Preview Excel First");
return;
}

let imported = 0;
let skipped = 0;
let errors = 0;

for (let i = 0; i < allStudents.length; i++) {

const s = allStudents[i];

try {

const ref = doc(db, "students", s.regNo);
const snap = await getDoc(ref);

if (snap.exists()) {
skipped++;
continue;
}

await setDoc(ref, {
...s,
createdAt: new Date()
});

imported++;

} catch (err) {
console.error(err);
errors++;
}

const percent = Math.round(((i + 1) / allStudents.length) * 100);

progressBar.style.width = percent + "%";
progressBar.innerHTML = percent + "%";

status.innerHTML = `Importing ${i + 1} / ${allStudents.length}`;
}

status.innerHTML = "Import Completed";

alert(
`IMPORT COMPLETED

Total: ${allStudents.length}
Imported: ${imported}
Skipped: ${skipped}
Errors: ${errors}`
);

};

/* ==============================
   Reset
================================ */

excelFile.onchange = function () {
previewBody.innerHTML = "";
progressBar.style.width = "0%";
progressBar.innerHTML = "0%";
status.innerHTML = "Excel Selected. Click Preview.";
allStudents = [];
};