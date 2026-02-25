
/**Hämtar data m. fetch och async/await. */
async function fetchExternalData() {
    const response = await fetch(
        "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json"
    );

    if (!response.ok) {
        throw new Error("Kunde inte hämta extern data");
    }

    return await response.json();
}

/**Initierar diagram. */
async function init() {
    try {
        //Hämta data
        const allData = await fetchExternalData();

        //Filtrera ut kurser och program.
        const courseData = allData.filter(item => item.type === "Kurs");
        const programData = allData.filter(item=> item.type === "Program");

        //Konvertera antal sökande till tal och sortera.
        const courses = courseData.map(c => ({
            name: c.name,
            applicants: parseInt((c.applicantsTotal || "0").trim(), 10)
        }));

        const programs = programData.map(p => ({
            name: p.name,
            applicants: parseInt((p.applicantsTotal || "0").trim(), 10)
        }));

        //Plocka ut topp 6 kurser och topp 5 program.
        const topCourses = courses
        .sort((a, b) => b.applicants - a.applicants)
        .slice (0, 6);

        const topPrograms = programs
        .sort((a, b) => b.applicants - a.applicants)
        .slice(0, 5);

        //Rita diagrammen.
        createBarChart(topCourses);
        createPieChart(topPrograms);

    } catch (error) {
        console.error("Fel vid hämtning:", error);
    }
}


//Skapa stapeldiagram
function createBarChart(courses) {
    const ctx = document.getElementById("coursesChart");

    new Chart(ctx, {
type: "bar",
data: {
    labels: courses.map(c => c.name),
    datasets: [{
        label: "Totalt antal sökande",
        data: courses.map(c => c.applicants),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
    }]
},
options: {
    responsive: true,
    scales: {
        y: { beginAtZero: true }
    }
}
    });
}

//Skapa cirkeldiagram
function createPieChart(programs) {
    const ctx = document.getElementById("programsChart");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: programs.map(p => p.name),
            datasets: [{
                data: programs.map(p => p.applicants),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF"
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

init();

