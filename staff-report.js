import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =======================================================
// FIREBASE
// =======================================================

const firebaseConfig = {

   apiKey: "AIzaSyAIv3091VM-gkmdwEAn7OhXWd9Cm2zh2bo",
  authDomain: "maasc-2026.firebaseapp.com",
  projectId: "maasc-2026",
  storageBucket: "maasc-2026.appspot.com",
  messagingSenderId: "585813001586",
  appId: "1:585813001586:web:664e0e90ff0725d2e849eb"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// =======================================================
// DAYS
// =======================================================

const days=[
    "DAY 01",
    "DAY 02",
    "DAY 03",
    "DAY 04",
    "DAY 05",
    "DAY 06"
];

// =======================================================
// HOURS
// =======================================================

const fnHours=[1,2,3,4,5];

const anHours=[1,2,3,4,5];

// =======================================================
// EVENTS
// =======================================================

document
.getElementById("loadBtn")
.addEventListener("click",loadReport);

document
.getElementById("refreshBtn")
.addEventListener("click",loadReport);

document
.getElementById("printBtn")
.addEventListener("click",()=>{

    window.print();

});

document
.getElementById("staffId")
.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        loadReport();

    }

});

// =======================================================
// LOAD REPORT
// =======================================================

async function loadReport(){

    const staffId=document
    .getElementById("staffId")
    .value
    .trim();

    if(staffId==""){

        alert("Enter Staff ID");

        return;

    }

    try{

        const staffRef=doc(db,"staff",staffId);

        const staffSnap=await getDoc(staffRef);

        if(!staffSnap.exists()){

            alert("Staff Not Found");

            return;

        }

        const staff=staffSnap.data();

        document.getElementById("staffName").value=staff.name;

        document.getElementById("department").value=staff.department;

        loadTimeTable(staffId);

    }

    catch(error){

        console.log(error);

        alert(error.message);

    }

}
// =======================================================
// LOAD STAFF TIMETABLE
// =======================================================

// =======================================================
// LOAD STAFF TIMETABLE
// =======================================================

async function loadTimeTable(staffId){

    createTable("FN","fnTable");
    createTable("AN","anTable");

    try{

        const q=query(

            collection(db,"staffTimetable"),

            where("staffId","==",staffId)

        );

        const snapshot=await getDocs(q);

        snapshot.forEach(docSnap=>{

            const data=docSnap.data();

            const tableId=
                data.session=="FN"
                ? "fnTable"
                : "anTable";

            const cell = document.querySelector(
    `#${tableId} td.slot[data-day="${data.day}"][data-hour="${data.hour}"]`
);

            if(cell){

                cell.innerHTML=`

                    <div class="subjectCode">

                        ${data.subjectCode}

                    </div>

                    <div class="subjectName">

                        ${data.subjectName}

                    </div>

                    <div class="classInfo">

                        ${data.classYear}

                        ${data.classDepartment}

                        ${data.classSection}

                    </div>

                    <div class="labInfo">

                        ${data.labNo}

                    </div>

                `;

            }

        });

    }

    catch(error){

        console.log(error);

        alert(error.message);

    }

}// =======================================================
// CREATE TABLE
// =======================================================

function createTable(session,containerId){

    const hours=session=="FN"
    ? fnHours
    : anHours;

    let html="";

    html+="<table>";

    html+="<thead>";

    html+="<tr>";

    html+="<th class='dayCol'>DAY</th>";

    hours.forEach(hour=>{

        html+=`

        <th>

            HOUR ${hour}

        </th>

        `;

    });

    html+="</tr>";

    html+="</thead>";

    html+="<tbody>";

    days.forEach(day=>{

        html+="<tr>";

        html+=`

        <td class="dayCol">

            ${day}

        </td>

        `;

        hours.forEach(hour=>{

            html+=`

            <td

                class="slot"

                data-day="${day}"

                data-hour="${hour}"

            >

                <div class="empty">

                    --

                </div>

            </td>

            `;

        });

        html+="</tr>";

    });

    html+="</tbody>";

    html+="</table>";

    document.getElementById(containerId).innerHTML=html;

}
async function loadAssignedSlots(){

    console.log("Loading assigned slots...");
    console.log("Staff:", currentStaff);
    console.log("Session:", currentSession);

    const q = query(
        collection(db,"staffTimetable"),
        where("staffId","==",currentStaff.staffId),
        where("session","==",currentSession)
    );

    const snap = await getDocs(q);
console.log("Documents:", snapshot.size);

snapshot.forEach(doc=>{
    console.log(doc.id, doc.data());
});

}