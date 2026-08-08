import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    deleteDoc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
 
 
// =======================================================
// FIREBASE CONFIG
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
// GLOBAL VARIABLES
// =======================================================
 
let currentStaff = null;
 
let selectedCell = null;
 
let currentSession = "FN";
 
let timetableData = {};
 
 
// =======================================================
// TIMETABLE DAYS
// =======================================================
 
// =====================================
// SUBJECT MASTER
// =====================================
 
const fnSubject = [
{
        code:"125C11",
        name:"PYTHON",
        year:"I",
        department:"B.SC CS ",
        section:"A",
        lab:"LAB 04"
    },
{
        code:"125C11",
        name:"PYTHON",
        year:"I",
        department:"B.SC CS ",
        section:"B",
        lab:"LAB 04"
    },
{
        code:"125C11",
        name:"PYTHON",
        year:"I",
        department:"B.SC CS ",
        section:"C",
        lab:"LAB 04"
    },

 {
        code:"225C31",
        name:"JAVA",
        year:"II",
        department:"B.SC CS ",
        section:"A",
        lab:"LAB 06"
    },
{
        code:"225C31",
        name:"JAVA",
        year:"II",
        department:"B.SC CS ",
        section:"B",
        lab:"LAB 06"
    },
{
        code:"225C31",
        name:"JAVA",
        year:"II",
        department:"B.SC CS ",
        section:"C",
        lab:"LAB 06"
    },

{
        code:"225S31",
        name:"WEB PAGE DESIGN",
        year:"II",
        department:"B.SC CS ",
        section:"A",
        lab:"LAB 08"
    },
{
        code:"225S31",
        name:"WEB PAGE DESIGN",
        year:"II",
        department:"B.SC CS ",
        section:"B",
        lab:"LAB 08"
    },
{
        code:"225S31",
        name:"WEB PAGE DESIGN",
        year:"II",
        department:"B.SC CS ",
        section:"C",
        lab:"LAB 08"
    },

{
        code:"325C51",
        name:"OPERATING SYSTEM",
        year:"III",
        department:"B.SC CS ",
        section:"A",
        lab:"LAB 02"
    },
{
        code:"325C51",
        name:"OPERATING SYSTEM",
        year:"III",
        department:"B.SC CS ",
        section:"B",
        lab:"LAB 02"
    },
{
        code:"325C51",
        name:"OPERATING SYSTEM",
        year:"III",
        department:"B.SC CS ",
        section:"C",
        lab:"LAB 02"
    },
{
        code:"325C52",
        name:"RDBMS",
        year:"III",
        department:"B.SC CS ",
        section:"A",
        lab:"LAB 02"
    },
{
        code:"325C52",
        name:"RDBMS",
        year:"III",
        department:"B.SC CS ",
        section:"B",
        lab:"LAB 02"
    },
{
        code:"325C52",
        name:"RDBMS",
        year:"III",
        department:"B.SC CS ",
        section:"C",
        lab:"LAB 02"
    },

{
        code:"126C11 ",
        name:"PYTHON",
        year:"I",
        department:"B.SC CS WITH AI ",
        section:"A",
        lab:"LAB 05"
    },
{
        code:"126C11 ",
        name:"PYTHON",
        year:"I",
        department:"B.SC CS WITH AI ",
        section:"B",
        lab:"LAB 05"
    },

{
        code:"226C31 ",
        name:"DATA STRUCTURE",
        year:"II",
        department:"B.SC CS WITH AI ",
        section:"A",
        lab:"LAB 08"
    },
{
        code:"226C31 ",
        name:"DATA STRUCTURE",
        year:"II",
        department:"B.SC CS WITH AI ",
        section:"B",
        lab:"LAB 08"
    },
{
        code:"226S31 ",
        name:"WEB PAGE DESIGN",
        year:"II",
        department:"B.SC CS WITH AI ",
        section:"A",
        lab:"LAB 10"
    },
{
        code:"226S31 ",
        name:"WEB PAGE DESIGN",
        year:"II",
        department:"B.SC CS WITH AI ",
        section:"B",
        lab:"LAB 10"
    },
{
        code:"326C51 ",
        name:"COMPUTER VISION",
        year:"III",
        department:"B.SC CS WITH AI ",
        section:"A",
        lab:"LAB 09"
    },
{
        code:"326C51 ",
        name:"COMPUTER VISION",
        year:"III",
        department:"B.SC CS WITH AI ",
        section:"B",
        lab:"LAB 09"
    },
{
        code:"326C52 ",
        name:"NATURAL LANGUAGE PROCESSING",
        year:"III",
        department:"B.SC CS WITH AI ",
        section:"B",
        lab:"LAB 09"
    },
{
        code:"127C11 ",
        name:"PYTHON ",
        year:"I",
        department:"B.SC CS WITH DS ",
        section:"A",
        lab:"LAB 05"
    },
{
        code:"227C31 ",
        name:"DATA STRUCTURE",
        year:"II",
        department:"B.SC CS WITH DS ",
        section:"A",
        lab:"LAB 08"
    },
{
        code:"227S31 ",
        name:"WEB PAGE DESIGN",
        year:"II",
        department:"B.SC CS WITH DS ",
        section:"A",
        lab:"LAB 10"
    },
{
        code:"120C11 ",
        name:"PYTHON",
        year:"I",
        department:"BCA ",
        section:"A",
        lab:"LAB 11"
    },
{
        code:"120C11 ",
        name:"PYTHON",
        year:"I",
        department:"BCA ",
        section:"B",
        lab:"LAB 11"
    },
{
        code:"120C11 ",
        name:"PYTHON",
        year:"I",
        department:"BCA ",
        section:"C",
        lab:"LAB 11"
    },
{
        code:"120C11 ",
        name:"PYTHON",
        year:"I",
        department:"BCA ",
        section:"D",
        lab:"LAB 11"
    },
{
        code:"141C11 ",
        name:"PYTHON",
        year:"I",
        department:"B.SC SA ",
        section:"A",
        lab:"LAB 10"
    },
{
        code:"141C11 ",
        name:"PYTHON",
        year:"I",
        department:"B.SC SA ",
        section:"A",
        lab:"LAB 10"
    },
{
        code:"151E12",
        name:"PYTHON",
        year:"I",
        department:"B.COM ISM ",
        section:"A",
        lab:"LAB 7"
    },
{
        code:"151E12",
        name:"PYTHON",
        year:"I",
        department:"B.COM ISM ",
        section:"B",
        lab:"LAB 7"
    },
{
        code:"151S1A",
        name:"MS OFFICE",
        year:"I",
        department:"B.COM ISM ",
        section:"A",
        lab:"LAB 6"
    },
{
        code:"151S1A",
        name:"MS OFFICE",
        year:"I",
        department:"B.COM ISM ",
        section:"B",
        lab:"LAB 6"
    },

{
        code:"351E51",
        name:"UML",
        year:"III",
        department:"B.COM ISM ",
        section:"A",
        lab:"LAB 4"
    },
{
        code:"351E51",
        name:"UML",
        year:"III",
        department:"B.COM ISM ",
        section:"B",
        lab:"LAB 4"
    },
{
        code:"147E12",
        name:"PYHON",
        year:"I",
        department:"B.COM CA ",
        section:"A",
        lab:"LAB 7"
    },
{
        code:"147E12",
        name:"PYHON",
        year:"I",
        department:"B.COM CA ",
        section:"B",
        lab:"LAB 7"
    },
{
        code:"147S1A",
        name:"MS OFFICE",
        year:"I",
        department:"B.COM CA ",
        section:"A",
        lab:"LAB 2"
    },
{
        code:"147S1A",
        name:"MS OFFICE",
        year:"I",
        department:"B.COM CA ",
        section:"B",
        lab:"LAB 2"
    },

{
        code:"247E31",
        name:"TALLY",
        year:"II",
        department:"B.COM CA ",
        section:"A",
        lab:"LAB 7"
    },
{
        code:"247E31",
        name:"TALLY",
        year:"II",
        department:"B.COM CA ",
        section:"B",
        lab:"LAB 7"
    },
{
        code:"347E31",
        name:"UML",
        year:"III",
        department:"B.COM CA ",
        section:"A",
        lab:"LAB 4"
    },
{
        code:"148S1A",
        name:"MS OFFICE",
        year:"III",
        department:"B.COM MM",
        section:"A",
        lab:"LAB 3"
    },
{
        code:"145S1A",
        name:"MS OFFICE",
        year:"I",
        department:"B.COM BM",
        section:"A",
        lab:"LAB 6"
    },
















    
  

];
 
 
/*
 * AFTERNOON SUBJECT LIST
 *
 * Put the existing afternoon subjects here.
 * No session field is used inside subject objects.
 *
 * The source file does not identify which of the existing
 * subjects are FN and which are AN, so this list is left
 * ready for the actual AN subjects rather than guessing.
 */
 
const anSubject = [
 
    {
        code:"220C31",
        name:"DATA STRUCTURE",
        year:"II",
        department:"BCA",
        section:"A",
        lab:"LAB 09"
    },
 
    {
        code:"220C31",
        name:"DATA STRUCTURE",
        year:"II",
        department:"BCA",
        section:"B",
        lab:"LAB 09"
    },
 
    {
        code:"220C31",
        name:"DATA STRUCTURE",
        year:"II",
        department:"BCA",
        section:"C",
        lab:"LAB 09"
    },
 
    {
        code:"220C31",
        name:"DATA STRUCTURE",
        year:"II",
        department:"BCA",
        section:"D",
        lab:"LAB 09"
    },
 
    {
        code:"320C51",
        name:"WEB TECHNOLOGY",
        year:"III",
        department:"BCA",
        section:"A",
        lab:"LAB 11"
    },
 
    {
        code:"320C51",
        name:"WEB TECHNOLOGY",
        year:"III",
        department:"BCA",
        section:"B",
        lab:"LAB 11"
    },
 
    {
        code:"320C51",
        name:"WEB TECHNOLOGY",
        year:"III",
        department:"BCA",
        section:"C",
        lab:"LAB 11"
    },
 
    {
        code:"320C51",
        name:"WEB TECHNOLOGY",
        year:"III",
        department:"BCA",
        section:"D",
        lab:"LAB 11"
    },
 
    {
        code:"NMUBCA",
        name:"NAAN MUDHALVAN",
        year:"III",
        department:"BCA",
        section:"A",
        lab:"LAB 07"
    },
 
    {
        code:"NMUBCA",
        name:"NAAN MUDHALVAN",
        year:"III",
        department:"BCA",
        section:"B",
        lab:"LAB 07"
    },
 
    {
        code:"NMUBCA",
        name:"NAAN MUDHALVAN",
        year:"III",
        department:"BCA",
        section:"C",
        lab:"LAB 07"
    },
 
    {
        code:"NMUBCA",
        name:"NAAN MUDHALVAN",
        year:"III",
        department:"BCA",
        section:"D",
        lab:"LAB 07"
    },
 
    {
        code:"341C52",
        name:"ASP.NET",
        year:"III",
        department:"B.SC SA",
        section:"A",
        lab:"LAB 03"
    },
 
    {
        code:"341C51",
        name:"RDBMS",
        year:"III",
        department:"B.SC SA",
        section:"A",
        lab:"LAB 03"
    }
 

 
];
const days = [
 
    "DAY 01",
    "DAY 02",
    "DAY 03",
    "DAY 04",
    "DAY 05",
    "DAY 06"
 
];
 
 
// =======================================================
// FN HOURS
// =======================================================
 
const fnHours = [
 
    {
        hour:1,
        time:"08:30 - 09:20"
    },
 
    {
        hour:2,
        time:"09:20 - 10:10"
    },
 
    {
        hour:3,
        time:"10:10 - 11:00"
    },
 
    {
        hour:4,
        time:"11:30 - 12:20"
    },
 
    {
        hour:5,
        time:"12:20 - 01:10"
    }
 
];
 
 
// =======================================================
// AN HOURS
// =======================================================
 
const anHours = [
 
    {
        hour:1,
        time:"01:30 - 02:20"
    },
 
    {
        hour:2,
        time:"02:20 - 03:10"
    },
 
    {
        hour:3,
        time:"03:30 - 04:20"
    },
 
    {
        hour:4,
        time:"04:20 - 05:10"
    },
 
    {
        hour:5,
        time:"05:10 - 06:00"
    }
 
];
 
 
// =======================================================
// PAGE LOAD
// =======================================================
 
window.addEventListener("load",()=>{
 
    createTable("FN");
 
    registerEvents();
 
});
 
 
// =======================================================
// REGISTER EVENTS
// =======================================================
 
function registerEvents(){
 
    document
    .getElementById("loadStaff")
    .addEventListener("click",loadStaff);
 
    document
    .getElementById("saveBtn")
    .addEventListener("click",saveEntireTimeTable);
 
    document
    .getElementById("savePeriod")
    .addEventListener("click",savePeriod);
 
    document
    .getElementById("deletePeriod")
    .addEventListener("click",deletePeriod);
 
    document
    .getElementById("cancelPeriod")
    .addEventListener("click",closePopup);
 
    document
    .getElementById("printBtn")
    .addEventListener("click",()=>{
 
        window.print();
 
    });
 
    document
    .querySelectorAll("input[name=session]")
    .forEach(r=>{
 
        r.addEventListener("change",()=>{
 
            currentSession = r.value;
 
            createTable(currentSession);
 
            if(currentStaff){
 
                loadStaffTimeTable();
 
            }
 
        });
 
    });
 
}
 
 
// =======================================================
// CREATE TABLE
// =======================================================
 
function createTable(session){
 
    const hours =
 
    session=="FN"
 
    ? fnHours
 
    : anHours;
 
    let html = "";
 
    html += "<table>";
 
    html += "<thead>";
 
    html += "<tr>";
 
    html += "<th class='dayCol'>DAY</th>";
 
    hours.forEach(h=>{
 
        html += `
 
        <th>
 
            <div class="periodHeader">
 
                <div class="periodNumber">
 
                    ${h.hour}
 
                </div>
 
                <div class="periodTime">
 
                    ${h.time}
 
                </div>
 
            </div>
 
        </th>
 
        `;
 
    });
 
    html += "</tr>";
 
    html += "</thead>";
 
    html += "<tbody>";
 
    days.forEach(day=>{
 
        html += "<tr>";
 
        html += `
 
        <td class="dayCol">
 
            ${day}
 
        </td>
 
        `;
 
        hours.forEach(hour=>{
 
            html += `
 
            <td
 
            class="slot"
 
            data-day="${day}"
 
            data-session="${session}"
 
            data-hour="${hour.hour}"
 
            data-time="${hour.time}"
 
            >
 
            <div class="empty">
 
                Click To Assign
 
            </div>
 
            </td>
 
            `;
 
        });
 
        html += "</tr>";
 
    });
 
    html += "</tbody>";
 
    html += "</table>";
 
    document
 
    .getElementById("tableContainer")
 
    .innerHTML = html;
 
    attachCellEvents();
 
}
 
 
// =======================================================
// CELL EVENTS
// =======================================================
 
function attachCellEvents(){
 
    document
 
    .querySelectorAll(".slot")
 
    .forEach(cell=>{
 
        cell.addEventListener("click",()=>{
 
            selectedCell = cell;
 
            openPopup();
 
        });
 
    });
 
}
 
 
// =======================================================
// OPEN POPUP
// =======================================================
 
function openPopup(){
 
    document
 
    .getElementById("popupDay")
 
    .value = selectedCell.dataset.day;
 
    document
 
    .getElementById("popupSession")
 
    .value = selectedCell.dataset.session;
 
    document
 
    .getElementById("popupHour")
 
    .value = selectedCell.dataset.hour;
 
    document
 
    .getElementById("popupTime")
 
    .value = selectedCell.dataset.time;
 
    loadSubjects();
 
    document
 
    .getElementById("assignModal")
 
    .style.display = "flex";
 
}
 
 
// =======================================================
// CLOSE POPUP
// =======================================================
 
function closePopup(){
 
    document
 
    .getElementById("assignModal")
 
    .style.display = "none";
 
}
// =======================================================
// LOAD STAFF
// =======================================================
 
async function loadStaff(){
 
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
 
        currentStaff=staffSnap.data();
 
        document.getElementById("staffName").value=
        currentStaff.name;
 
        document.getElementById("department").value=
        currentStaff.department;
 
 
        loadStaffTimeTable();
 
    }
 
    catch(error){
 
        console.log(error);
 
        alert(error.message);
 
    }
 
}
 
 
 
// =======================================================
// LOAD SUBJECTS
// =======================================================
 
async function loadSubjects(){
 
    const select = document.getElementById("popupSubject");
 
    select.innerHTML = "<option value=''>Select Subject</option>";
 
    const subjectList =
        currentSession === "FN"
        ? fnSubject
        : anSubject;
 
    subjectList.forEach((subject,index)=>{
 
        const option = document.createElement("option");
 
        option.value = index;
 
        option.textContent =
            `${subject.code} - ${subject.name} - ${subject.year} ${subject.department} ${subject.section} - ${subject.lab}`;
 
        select.appendChild(option);
 
    });
 
}
 
// =======================================================
// SAVE PERIOD
// =======================================================
async function savePeriod(){
 
    if(currentStaff==null){
 
        alert("Load Staff First");
 
        return;
 
    }
 
    if(selectedCell==null){
 
        alert("Select a Period");
 
        return;
 
    }
 
    const subjectIndex = document.getElementById("popupSubject").value;
 
    if(subjectIndex==""){
 
        alert("Select Subject");
 
        return;
 
    }
 
    const subjectList =
        currentSession === "FN"
        ? fnSubject
        : anSubject;
 
    const subject = subjectList[subjectIndex];
 
    const documentId =
 
        currentStaff.staffId + "_" +
        selectedCell.dataset.session + "_" +
        selectedCell.dataset.day + "_" +
        selectedCell.dataset.hour;
 
    try{
 
        await setDoc(
 
            doc(db,"staffTimetable",documentId),
 
            {
 
                staffId: currentStaff.staffId,
 
                staffName: currentStaff.name,
 
                department: currentStaff.department,
 
                session: selectedCell.dataset.session,
 
                day: selectedCell.dataset.day,
 
                hour: Number(selectedCell.dataset.hour),
 
                time: selectedCell.dataset.time,
 
                subjectCode: subject.code,
 
                subjectName: subject.name,
 
                classDepartment: subject.department,
 
                classYear: subject.year,
 
                classSection: subject.section,
 
                labNo: subject.lab,
 
                updatedAt: new Date()
 
            }
 
        );
 
        selectedCell.classList.add("assigned");
 
        selectedCell.innerHTML = `
 
            <div class="subjectCode">
 
                ${subject.code}
 
            </div>
 
            <div class="subjectName">
 
                ${subject.name}
 
            </div>
 
            <div class="classInfo">
 
                ${subject.year} ${subject.department} ${subject.section}
 
            </div>
 
            <div class="labInfo">
 
                ${subject.lab}
 
            </div>
 
        `;
 
        timetableData[documentId] = subject;
 
        closePopup();
 
        alert("Period Assigned Successfully");
 
    }
 
    catch(error){
 
        console.log(error);
 
        alert(error.message);
 
    }
 
}
 
 
// =======================================================
// DELETE PERIOD
// =======================================================
 
async function deletePeriod(){
 
    if(currentStaff==null) return;
 
    if(selectedCell==null) return;
 
    if(!confirm("Delete this period?")) return;
 
    try{
 
        const documentId=
 
        currentStaff.staffId+"_"+
        selectedCell.dataset.session+"_"+
        selectedCell.dataset.day+"_"+
        selectedCell.dataset.hour;
 
        await deleteDoc(
 
            doc(db,"staffTimetable",documentId)
 
        );
 
        delete timetableData[documentId];
 
        selectedCell.classList.remove("assigned");
 
        selectedCell.innerHTML=`
 
        <div class="empty">
 
            Click To Assign
 
        </div>
 
        `;
 
        closePopup();
 
    }
 
    catch(error){
 
        console.log(error);
 
        alert(error.message);
 
    }
 
}
// =======================================================
// LOAD STAFF TIMETABLE
// =======================================================
 
async function loadStaffTimeTable(){
 
    if(currentStaff==null) return;
 
    timetableData={};
 
    createTable(currentSession);
 
    try{
 
        const q=query(
 
            collection(db,"staffTimetable"),
 
            where("staffId","==",currentStaff.staffId),
 
            where("session","==",currentSession)
 
        );
 
        const snapshot=await getDocs(q);
 
       snapshot.forEach(docSnap => {
 
    const data = docSnap.data();
 
    const docId = docSnap.id;
 
    timetableData[docId] = data;
 
    const cell = document.querySelector(
        `.slot[data-day="${data.day}"][data-hour="${data.hour}"][data-session="${data.session}"]`
    );
 
    if (cell) {
        fillCell(cell, data);
    }
 
});
 
    }
 
    catch(error){
 
        console.log(error);
 
        alert(error.message);
 
    }
 
}
 
 
 
// =======================================================
// FILL CELL
// =======================================================
 
function fillCell(cell,data){
 
    cell.classList.add("assigned");
 
    cell.dataset.subjectId=data.subjectId;
 
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
 
 
 
// =======================================================
// CHECK STAFF CONFLICT
// =======================================================
 
async function checkStaffConflict(){
 
    const q=query(
 
        collection(db,"staffTimetable"),
 
        where("staffId","==",currentStaff.staffId),
 
        where("session","==",selectedCell.dataset.session),
 
        where("day","==",selectedCell.dataset.day),
 
        where("hour","==",Number(selectedCell.dataset.hour))
 
    );
 
    const snapshot=await getDocs(q);
 
    return !snapshot.empty;
 
}
 
 
 
// =======================================================
// CHECK CLASS CONFLICT
// =======================================================
 
async function checkClassConflict(subject){
 
    const q=query(
 
        collection(db,"staffTimetable"),
 
        where("session","==",selectedCell.dataset.session),
 
        where("day","==",selectedCell.dataset.day),
 
        where("hour","==",Number(selectedCell.dataset.hour)),
 
        where("classDepartment","==",subject.department),
 
        where("classYear","==",subject.year),
 
        where("classSection","==",subject.section)
 
    );
 
    const snapshot=await getDocs(q);
 
    return !snapshot.empty;
 
}
 
 
 
// =======================================================
// CHECK LAB CONFLICT
// =======================================================
 
async function checkLabConflict(subject){
 
    if(subject.labNo==""){
 
        return false;
 
    }
 
    const q=query(
 
        collection(db,"staffTimetable"),
 
        where("session","==",selectedCell.dataset.session),
 
        where("day","==",selectedCell.dataset.day),
 
        where("hour","==",Number(selectedCell.dataset.hour)),
 
        where("labNo","==",subject.labNo)
 
    );
 
    const snapshot=await getDocs(q);
 
    return !snapshot.empty;
 
}
 
 
 
// =======================================================
// EDIT PERIOD
// =======================================================
 
async function editPeriod(){
 
    if(selectedCell==null) return;
 
    if(!selectedCell.dataset.subjectId) return;
 
    document.getElementById("popupSubject").value=
 
    selectedCell.dataset.subjectId;
 
    document.getElementById("assignModal").style.display="flex";
 
}
 
 
 
// =======================================================
// SAVE ENTIRE TIMETABLE
// =======================================================
 
async function saveEntireTimeTable(){
 
    if(currentStaff==null){
 
        alert("Load Staff First");
 
        return;
 
    }
 
    alert("All Periods Saved Successfully");
 
}
 
 
 
// =======================================================
// CLEAR TIMETABLE
// =======================================================
 
function clearTable(){
 
    document.querySelectorAll(".slot").forEach(cell=>{
 
        cell.classList.remove("assigned");
 
        cell.removeAttribute("data-subjectId");
 
        cell.innerHTML=`
 
        <div class="empty">
 
            Click To Assign
 
        </div>
 
        `;
 
    });
 
}
 
 
 
// =======================================================
// REFRESH TIMETABLE
// =======================================================
 
async function refreshTable(){
 
    clearTable();
 
    loadStaffTimeTable();
 
}
 
 
 
// =======================================================
// DOUBLE CLICK TO EDIT
// =======================================================
 
document.addEventListener("dblclick",function(e){
 
    const slot=e.target.closest(".slot");
 
    if(!slot) return;
 
    if(!slot.classList.contains("assigned")) return;
 
    selectedCell=slot;
 
    editPeriod();
 
});
 
 
 
// =======================================================
// KEYBOARD SHORTCUTS
// =======================================================
 
document.addEventListener("keydown",function(e){
 
    if(e.key==="Escape"){
 
        closePopup();
 
    }
 
});
 
 
 
// =======================================================
// ENTER KEY LOAD STAFF
// =======================================================
 
document.getElementById("staffId")
 
.addEventListener("keypress",function(e){
 
    if(e.key==="Enter"){
 
        loadStaff();
 
    }
 
});
 
 
 
// =======================================================
// PRINT
// =======================================================
 
function printTimeTable(){
 
    window.print();
 
}
 
 
 
// =======================================================
// INITIALIZE
// =======================================================
 
window.onload=()=>{
 
    registerEvents();
 
    createTable("FN");
 
};
 
 
 
// =======================================================
// END OF PART 3
// =======================================================
// =======================================================
// AUTO UPDATE EXISTING PERIOD
// =======================================================
 
async function updateExistingPeriod(subject){
 
    if(currentStaff==null) return;
 
    if(selectedCell==null) return;
 
    const documentId=
 
    currentStaff.staffId+"_"+
    selectedCell.dataset.session+"_"+
    selectedCell.dataset.day+"_"+
    selectedCell.dataset.hour;
await setDoc(
 
    doc(db,"staffTimetable",documentId),
 
    {
 
        staffId: currentStaff.staffId,
 
        staffName: currentStaff.name,
 
        department: currentStaff.department,
 
        
 
        session: selectedCell.dataset.session,
 
        day: selectedCell.dataset.day,
 
        hour: Number(selectedCell.dataset.hour),
 
        time: selectedCell.dataset.time,
 
        subjectCode: subject.code,
 
        subjectName: subject.name,
 
        classDepartment: subject.department,
 
        classYear: subject.year,
 
        classSection: subject.section,
 
        labNo: subject.lab,
 
        updatedAt: new Date()
 
    }
 
);
 
}
 
 
 
// =======================================================
// SEARCH SUBJECT
// =======================================================
 
async function searchSubject(keyword){
 
    const list=[];
 
    const snapshot=await getDocs(collection(db,"subjects"));
 
    snapshot.forEach(document=>{
 
        const s=document.data();
 
        const value=(
 
            s.subjectCode+" "+
 
            s.subjectName+" "+
 
            s.department+" "+
 
            s.section
 
        ).toLowerCase();
 
        if(value.includes(keyword.toLowerCase())){
 
            list.push({
 
                id:document.id,
 
                ...s
 
            });
 
        }
 
    });
 
    return list;
 
}
 
 
 
// =======================================================
// HIGHLIGHT CURRENT PERIOD
// =======================================================
 
function highlightCell(cell){
 
    document.querySelectorAll(".slot").forEach(item=>{
 
        item.style.outline="none";
 
    });
 
    cell.style.outline="3px solid #1976d2";
 
}
 
 
 
// =======================================================
// CLICK EVENT
// =======================================================
 
document.addEventListener("click",function(e){
 
    const slot=e.target.closest(".slot");
 
    if(!slot) return;
 
    highlightCell(slot);
 
});
 
 
 
// =======================================================
// EXPORT JSON
// =======================================================
 
function exportJSON(){
 
    if(currentStaff==null){
 
        alert("Load Staff First");
 
        return;
 
    }
 
    const json=JSON.stringify(
 
        timetableData,
 
        null,
 
        4
 
    );
 
    console.log(json);
 
}
 
 
 
// =======================================================
// DOWNLOAD JSON
// =======================================================
 
function downloadJSON(){
 
    const data=
 
    JSON.stringify(
 
        timetableData,
 
        null,
 
        4
 
    );
 
    const blob=new Blob(
 
        [data],
 
        {
 
            type:"application/json"
 
        }
 
    );
 
    const url=
 
    URL.createObjectURL(blob);
 
    const a=document.createElement("a");
 
    a.href=url;
 
    a.download="TimeTable.json";
 
    a.click();
 
    URL.revokeObjectURL(url);
 
}
 
 
 
// =======================================================
// EXPORT CSV
// =======================================================
 
function exportCSV(){
 
    let csv="DAY,HOUR,TIME,SUBJECT,CLASS,LAB\n";
 
    Object.values(timetableData).forEach(item=>{
 
        csv+=
 
        item.day+","+
 
        item.hour+","+
 
        item.time+","+
 
        item.subjectCode+"-"+item.subjectName+","+
 
        item.classYear+" "+
 
        item.classDepartment+" "+
 
        item.classSection+","+
 
        item.labNo+"\n";
 
    });
 
    const blob=new Blob(
 
        [csv],
 
        {
 
            type:"text/csv"
 
        }
 
    );
 
    const url=
 
    URL.createObjectURL(blob);
 
    const a=document.createElement("a");
 
    a.href=url;
 
    a.download="TimeTable.csv";
 
    a.click();
 
    URL.revokeObjectURL(url);
 
}
 
 
 
// =======================================================
// COLORIZE TABLE
// =======================================================
 
function colorize(){
 
    document.querySelectorAll(".assigned")
 
    .forEach(cell=>{
 
        const text=
 
        cell.innerText.toUpperCase();
 
        if(text.includes("I ")){
 
            cell.style.background="#FFF8E1";
 
        }
 
        else if(text.includes("II ")){
 
            cell.style.background="#E8F5E9";
 
        }
 
        else if(text.includes("III ")){
 
            cell.style.background="#E3F2FD";
 
        }
 
    });
 
}
 
 
 
// =======================================================
// LOADING
// =======================================================
 
function showLoading(){
 
    document.body.style.cursor="wait";
 
}
 
function hideLoading(){
 
    document.body.style.cursor="default";
 
}
 
 
 
// =======================================================
// SUCCESS
// =======================================================
 
function showSuccess(message){
 
    alert(message);
 
}
 
 
 
// =======================================================
// ERROR
// =======================================================
 
function showError(message){
 
    alert(message);
 
}
 
 
 
// =======================================================
// RESET STAFF
// =======================================================
 
function resetStaff(){
 
    currentStaff=null;
 
    timetableData={};
 
    document.getElementById("staffId").value="";
 
    document.getElementById("staffName").value="";
 
    document.getElementById("department").value="";
 
    document.getElementById("designation").value="";
 
    clearTable();
 
}
 
 
 
// =======================================================
// REFRESH BUTTON
// =======================================================
 
async function refresh(){
 
    if(currentStaff){
 
        await loadStaffTimeTable();
 
    }
 
}
 
 
 
// =======================================================
// AUTO REFRESH EVERY 60 SECONDS
// =======================================================
 
setInterval(function(){
 
    if(currentStaff){
 
        loadStaffTimeTable();
 
    }
 
},60000);
 
 
 
// =======================================================
// PRINT BUTTON
// =======================================================
 
document
 
.getElementById("printBtn")
 
.addEventListener("click",printTimeTable);
 
 
 
// =======================================================
// BEFORE PRINT
// =======================================================
 
window.onbeforeprint=function(){
 
    document.body.classList.add("printing");
 
};
 
 
 
// =======================================================
// AFTER PRINT
// =======================================================
 
window.onafterprint=function(){
 
    document.body.classList.remove("printing");
 
};
 
 
 
// =======================================================
// FINAL INITIALIZATION
// =======================================================
 
window.addEventListener("DOMContentLoaded",()=>{
 
    registerEvents();
 
    createTable("FN");
 
    colorize();
 
});
 
async function loadAssignedSlots() {
 
    if (!currentStaff) return;
 
    // Clear all cells first
    document.querySelectorAll(".slot-cell").forEach(cell => {
        cell.classList.remove("assigned");
        cell.innerHTML = "";
    });
 
    const q = query(
        collection(db, "staffTimetable"),
        where("staffId", "==", currentStaff.staffId),
        where("session", "==", currentSession)
    );
 
    const snap = await getDocs(q);
 
    snap.forEach(docSnap => {
 
        const data = docSnap.data();
 
        const cell = document.querySelector(
            `[data-day="${data.day}"][data-hour="${data.hour}"]`
        );
 
        if (cell) {
            cell.classList.add("assigned");
            cell.innerHTML = `
                <b>${data.department}</b><br>
                ${data.year}-${data.section}
            `;
        }
    });
}
 

