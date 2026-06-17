document.addEventListener("DOMContentLoaded", () => {

    const {
        worksData,
        postsData,
        months,
        roleCounts,
        roleLabels
    } = window.dashboardData;

    // ------ Activity Chart ------
    const activityOptions = {
        series: [
            { name: 'Eserler (Saz)', data: worksData },
            { name: 'Makalalar', data: postsData }
        ],
        chart: {
            height: 350,
            type: "area",
            toolbar: { show: false }
        },
        colors: ['#D68C09', '#2c3e50'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: { categories: months }
    };

    new ApexCharts(document.querySelector("#activityChart"), activityOptions).render();


    // ------ Roles Chart ------
    const roleOptions = {
        series: roleCounts,
        labels: roleLabels,
        chart: { type: "donut", height: 320 },
        legend: { position: "bottom" }
    };

    new ApexCharts(document.querySelector("#rolesChart"), roleOptions).render();
});
