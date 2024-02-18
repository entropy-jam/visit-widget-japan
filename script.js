document.getElementById('convert-btn').addEventListener('click', function() {
    var usdAmount = document.getElementById('usd-amount').value;
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            var rate = data.rates.JPY;
            var result = usdAmount * rate;
            document.getElementById('result').innerHTML = usdAmount + ' USD is ' + result.toFixed(2) + ' JPY';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = 'Error fetching exchange rate';
        });
});
