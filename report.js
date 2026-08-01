import { db } from "./firebase-config.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tbody = document.querySelector("#classTable tbody");

let classStudents = [];

// Buttons

document.getElementById("loadClass").addEventListener("click", loadClass);

document.getElementById("printClass").addEventListener("click", printClass);

document.getElementById("excelClass").addEventListener("click", exportExcel);


// ===================================
// Load Class
// ===================================

async function loadClass(){

    tbody.innerHTML="";

    classStudents=[];

    const academicYear=document.getElementById("academicYear").value;
    const department=document.getElementById("department").value;
    const year=document.getElementById("year").value;
    const section=document.getElementById("section").value;

    if(
        academicYear==""||
        department==""||
        year==""||
        section==""
    ){

        alert("Select Academic Year, Department, Year and Section.");

        return;

    }

    const q=query(
        collection(db,"students"),

        where("academicYear","==",academicYear),

        where("department","==",department),

        where("year","==",year),

        where("section","==",section)

    );

    const snapshot=await getDocs(q);

    if(snapshot.empty){

        tbody.innerHTML=`
        <tr>

        <td colspan="4"
        style="text-align:center;">

        No Students Found

        </td>

        </tr>
        `;

        document.getElementById("totalStudents").innerHTML="0";

        return;

    }

    snapshot.forEach(doc=>{

        classStudents.push(doc.data());

    });

    // Sort by Register Number

    classStudents.sort((a,b)=>{

        return (a.registerNo||"").localeCompare(b.registerNo||"");

    });

    let sno=1;

    classStudents.forEach(student=>{

        tbody.innerHTML+=`

        <tr>

        <td>${sno++}</td>

        <td>${student.registerNo || ""}</td>

        <td>${student.rollNo}</td>

        <td>${student.studentName}</td>

        </tr>

        `;

    });

    document.getElementById("totalStudents").innerHTML=
    classStudents.length;

}



// ===================================
// Export Excel
// ===================================

function exportExcel(){

    if(classStudents.length==0){

        alert("Load Class First");

        return;

    }

    let data=[];

    classStudents.forEach((student,index)=>{

        data.push({

            "S.No":index+1,

            "Register No":student.registerNo,

            "Roll No":student.rollNo,

            "Student Name":student.studentName

        });

    });

    const wb=XLSX.utils.book_new();

    const ws=XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Class List"
    );

    XLSX.writeFile(
        wb,
        "Class_List.xlsx"
    );

}



// ===================================
// Print Report
// ===================================

function printClass(){

    if(classStudents.length==0){

        alert("Load Class First");

        return;

    }

    let department=document.getElementById("department").value;

    let year=document.getElementById("year").value;

    let section=document.getElementById("section").value;

    let academicYear=document.getElementById("academicYear").value;

    let html=`

    <html>

    <head>

    <title>Class List</title>

    <style>

    body{

        font-family:Arial;

        padding:20px;

    }

    h2,h3,p{

        text-align:center;

        margin:5px;

    }

    table{

        width:100%;

        border-collapse:collapse;

        margin-top:20px;

    }

    th,td{

        border:1px solid black;

        padding:8px;

        text-align:left;

        font-size:14px;

    }

    th{

        background:#efefef;

    }

    </style>

    </head>

    <body>

    <h2>M.A.A.S.C</h2>

    <h3>CLASS LIST</h3>

    <p>

    Academic Year : ${academicYear}<br>

    Department : ${department}<br>

    Year : ${year}<br>

    Section : ${section}

    </p>

    <table>

    <tr>

    <th>S.No</th>

    <th>Register No</th>

    <th>Roll No</th>

    <th>Student Name</th>

    </tr>

    `;

    classStudents.forEach((student,index)=>{

        html+=`

        <tr>

        <td>${index+1}</td>

        <td>${student.registerNo || ""}</td>

        <td>${student.rollNo}</td>

        <td>${student.studentName}</td>

        </tr>

        `;

    });

    html+=`

    </table>

    <br>

    <b>Total Students : ${classStudents.length}</b>

    </body>

    </html>

    `;

    const w=window.open("","","width=1200,height=700");

    w.document.write(html);

    w.document.close();

    w.print();

}