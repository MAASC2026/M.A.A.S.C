const data = JSON.parse(localStorage.getItem("studentData"));

console.log(data);

document.getElementById("name").innerText =
    data["Name"];

document.getElementById("regno").innerText =
    data["Reg No"];

const tbody =
    document.querySelector("#marksTable tbody");

for (let code in data["Subjects"]) {

    let sub = data["Subjects"][code];

    tbody.innerHTML += `
        <tr>
            <td>${code}</td>
            <td>${sub["UE"]}</td>
            <td>${sub["IA"]}</td>
            <td>${sub["TOTAL"]}</td>
            <td>${sub["Result"]}</td>
        </tr>
    `;
}