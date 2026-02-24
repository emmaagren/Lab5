
//Hämta canvas-element.
const coursesCtx = document.getElementById('coursesChart');
const programsCtx = document.getElementById('programsChart');

//Stapeldiagram
new Chart(coursesCtx, {
    type: 'bar' ,
    data: {
        labels: ['Kurs A', 'Kurs B', 'Kurs C'],
        datasets: [{
            label: 'Antal sökande',
            data: [120, 95, 80, 70, 65, 50],
            borderWidth: 1,
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});