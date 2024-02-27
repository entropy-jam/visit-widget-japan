// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the input fields, result display area, and the convert button
    const usdInput = document.getElementById('usd-amount');
    const jpyInput = document.getElementById('jpy-amount');
    const resultDiv = document.getElementById('result');
    const convertBtn = document.getElementById('convert-btn');

    // Add event listener to the convert button for click events
    convertBtn.addEventListener('click', () => {
        const usdAmount = parseFloat(usdInput.value);
        const jpyAmount = parseFloat(jpyInput.value);
        let apiUrl = '';
        let convertFrom = '';
        let convertTo = '';

        // Determine which API URL to use based on which input field has a value
        if (!isNaN(usdAmount) && isNaN(jpyAmount)) {
            // If only USD amount is entered, convert from USD to JPY
            apiUrl = `https://v6.exchangerate-api.com/v6/404abd13f890b73621528911/latest/USD`;
            convertFrom = 'USD';
            convertTo = 'JPY';
        } else if (isNaN(usdAmount) && !isNaN(jpyAmount)) {
            // If only JPY amount is entered, convert from JPY to USD
            apiUrl = `https://v6.exchangerate-api.com/v6/404abd13f890b73621528911/latest/JPY`;
            convertFrom = 'JPY';
            convertTo = 'USD';
        } else {
            // If both or neither of the boxes have values, show an error message
            resultDiv.innerText = 'Please enter a value in one box only.';
            return;
        }

        // Fetch the conversion rate from the API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rates[convertTo];
                const result = (convertFrom === 'USD' ? usdAmount : jpyAmount) * rate;
                // Display the conversion result
                resultDiv.innerHTML = `${convertFrom === 'USD' ? usdAmount : jpyAmount} ${convertFrom} is ${result.toFixed(2)} ${convertTo}`;
            })
            .catch(error => {
                // If there's an error with the API call, display an error message
                console.error('Error:', error);
                resultDiv.innerText = 'Failed to fetch the exchange rate. Please try again.';
            });
    });
});
