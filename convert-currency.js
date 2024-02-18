document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-currency');
    const currencyLabel = document.getElementById('currency-label');
    const amountInput = document.getElementById('usd-amount');
    const resultDiv = document.getElementById('result');
    let isUsdToJpy = true;

    const updateUIForConversionDirection = () => {
        currencyLabel.innerText = isUsdToJpy ? '$USD to ¥JPY Converter' : '¥JPY to $USD Converter';
        amountInput.placeholder = isUsdToJpy ? 'Enter USD amount' : 'Enter JPY amount';
        amountInput.value = ''; // Clear the input for a new conversion direction
        resultDiv.innerText = ''; // Clear previous results
    };

    toggleBtn.addEventListener('click', () => {
        isUsdToJpy = !isUsdToJpy;
        updateUIForConversionDirection();
    });

    document.getElementById('convert-btn').addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            resultDiv.innerText = 'Please enter a valid amount.';
            return;
        }

        const apiUrl = `https://v6.exchangerate-api.com/v6/404abd13f890b73621528911/latest/${isUsdToJpy ? 'USD' : 'JPY'}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const rate = isUsdToJpy ? data.conversion_rates.JPY : 1 / data.conversion_rates.USD;
                const result = amount * rate;
                resultDiv.innerHTML = isUsdToJpy
                    ? `${amount} $USD is ${result.toFixed(2)} ¥JPY`
                    : `${amount} ¥JPY is ${result.toFixed(2)} $USD`;
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.innerText = 'Failed to fetch the exchange rate. Please try again.';
            });
    });

    updateUIForConversionDirection(); // Initialize UI based on default conversion direction
});
