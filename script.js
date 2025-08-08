const fields = [
    "destination", "otherDestination", "dates", "budget",
    "accommodation", "transport", "food", "packing", "notes"
];

function saveData() {
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) localStorage.setItem(id, el.value);
    });
    for (let i = 1; i <= 4; i++) {
        ["morning", "afternoon", "evening"].forEach(part => {
            const id = `day${i}_${part}`;
            const el = document.getElementById(id);
            localStorage.setItem(id, el.value);
        });
    }
}

function loadData() {
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el && localStorage.getItem(id)) el.value = localStorage.getItem(id);
    });
    for (let i = 1; i <= 4; i++) {
        ["morning", "afternoon", "evening"].forEach(part => {
            const id = `day${i}_${part}`;
            const el = document.getElementById(id);
            if (localStorage.getItem(id)) el.value = localStorage.getItem(id);
        });
    }
    toggleOtherDestination();
}

function resetPlanner() {
    if (confirm("Clear all data?")) {
        localStorage.clear();
        location.reload();
    }
}

function createPlanner() {
    const container = document.getElementById("planner");
    for (let i = 1; i <= 4; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.innerHTML = `
            <h3>Day ${i}</h3>
            <label>Morning:<br><textarea id="day${i}_morning" oninput="saveData()"></textarea></label><br>
            <label>Afternoon:<br><textarea id="day${i}_afternoon" oninput="saveData()"></textarea></label><br>
            <label>Evening:<br><textarea id="day${i}_evening" oninput="saveData()"></textarea></label>
        `;
        container.appendChild(dayDiv);
    }
}

function toggleOtherDestination() {
    const destSelect = document.getElementById("destination");
    const otherInput = document.getElementById("otherDestination");
    if (destSelect.value === "other") {
        otherInput.style.display = "block";
    } else {
        otherInput.style.display = "none";
    }
}

window.onload = function () {
    createPlanner();
    loadData();
};