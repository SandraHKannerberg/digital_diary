const inputDate = document.querySelector(".date");
inputDate.valueAsDate = new Date();

const inputTitle = document.querySelector(".entry-text-title");
const inputText = document.querySelector(".entry-text-box");
const addDayBtn = document.querySelector("button");
const entriesContainer = document.querySelector(".entries-container")

addDayBtn.addEventListener("click", () => {

    const entry = {
        date: inputDate.value,
        title: inputTitle.value,
        text: inputText.value,
    }

    if (!localStorage.getItem("entries")) {
        localStorage.setItem("entries", JSON.stringify([entry]));;
    } else {
        const entries = JSON.parse(localStorage.getItem("entries"));
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));
    }

    inputTitle.value = "";
    inputText.value = "";
    renderEntries();


});

function renderEntries() {
    const entries = JSON.parse(localStorage.getItem("entries"));

    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    entriesContainer.innerHTML = "";

    const journalHeading = document.createElement("h2");
    journalHeading.innerText ="Memories"
    entriesContainer.appendChild(journalHeading);

    entries.forEach((entry) => {
        const div = document.createElement("div");
        const headingDiv = document.createElement("div");
        const date = document.createElement("h3");
        const title = document.createElement("h3");
        const p = document.createElement("p");

        div.setAttribute('class', 'singel-day-container');
        headingDiv.setAttribute('class', 'headingDiv');

        date.innerText = entry.date;
        title.innerText = entry.title;
        p.innerText = entry.text;

        div.appendChild(headingDiv);
        headingDiv.appendChild(date);
        headingDiv.appendChild(title);
        div.appendChild(p);

        entriesContainer.appendChild(div);
    });
}

renderEntries();
