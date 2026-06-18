import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.getResult = async function () {
    try {
        const regno = document.getElementById("regno").value.trim();
        const dob = document.getElementById("dob").value;

        alert("Searching...");

        const docRef = doc(db, "results", regno);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            alert("Register Number Not Found");
            return;
        }

        const data = docSnap.data();

        alert("Document Found");

        localStorage.setItem(
            "studentData",
            JSON.stringify(data)
        );

        alert("Redirecting");

        window.location.href = "marksheet.html";

    } catch (error) {
        alert("ERROR: " + error.message);
        console.error(error);
    }
};