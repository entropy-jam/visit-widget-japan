// Simulated historical data (replace this with actual API data if available)
const historicalData = {
    dates: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'], // Example dates
    rates: [110, 111, 109, 112, 113] // Example exchange rates from USD to JPY
};

// Function to initialize the Chart
function initChart(data) {
    const ctx = document.getElementById('exchangeRateChart').getContext('2d');
    const exchangeRateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.dates,
            datasets: [{
                label: 'USD to JPY Exchange Rate',
                data: data.rates,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Call initChart with simulated data (or real data fetched from an API)
initChart(historicalData);
