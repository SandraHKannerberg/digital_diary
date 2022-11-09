//Vi utvecklar en dagbok för oss själva. Våra dagboksinlägg skall sparas i localStorage så att vi kan återkomma 
//till sidan vid ett senare tillfälle och skriva nya inlägg. 
//När vi skapar ett inlägg så skall vi kunna ändra och skriva datum, rubrik samt en text.
//Alla skriva inlägg skall sedan visas i kronologiskt ordning på sidan under formuläret.

const inputDate = document.querySelector(".date");
inputDate.valueAsDate = new Date();

const inputHeading = document.querySelector(".rubrik");
const inputText = document.querySelector("textarea");
const addDayBtn = document.querySelector("button");
const entriesContainer = document.querySelector(".entries-container")

addDayBtn.addEventListener("click", () => {

    const entry = {
        date: inputDate.value,
        heading: inputHeading.value,
        text: inputText.value,
    }

    if (!localStorage.getItem("entries")) {
        localStorage.setItem("entries", JSON.stringify([entry]));;
    } else {
        const entries = JSON.parse(localStorage.getItem("entries"));
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));
    }

    inputHeading.value = "";
    inputText.value = "";
    renderEntries();


});

function renderEntries() {
    const entries = JSON.parse(localStorage.getItem("entries"));

    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    entriesContainer.innerHTML = "";

    entries.forEach((entry) => {
        const div = document.createElement("div");
        const h6 = document.createElement("h6");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");

        h6.innerText = entry.date;
        h4.innerText = entry.heading;
        p.innerText = entry.text;

        div.appendChild(h6);
        div.appendChild(h4);
        div.appendChild(p);

        entriesContainer.appendChild(div);
    });
}

renderEntries();
