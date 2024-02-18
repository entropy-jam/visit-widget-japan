document.getElementById('convert-btn').addEventListener('click', function() {
    var usdAmount = document.getElementById('usd-amount').value;
    var apiUrl = 'https://v6.exchangerate-api.com/v6/404abd13f890b73621528911/latest/USD';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var rate = data.conversion_rates.JPY;
            var result = usdAmount * rate;
            document.getElementById('result').innerHTML = usdAmount + ' USD is ' + result.toFixed(2) + ' JPY at an exchange rate of ' + rate + '.';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = 'Failed to fetch the exchange rate. Please try again.';
        });
});