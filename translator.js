// Function to translate text
function translateText() {
    const englishInput = document.getElementById('input-english').value;
    const japaneseInput = document.getElementById('input-japanese').value;

    // Determine direction of translation based on input
    let sourceLang, targetLang, textToTranslate;
    if (englishInput) {
        sourceLang = 'en';
        targetLang = 'ja';
        textToTranslate = englishInput;
    } else if (japaneseInput) {
        sourceLang = 'ja';
        targetLang = 'en';
        textToTranslate = japaneseInput;
    } else {
        // Handle case where no input is provided
        document.getElementById('translation-output').innerText = 'Please enter text to translate.';
        return;
    }

    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${sourceLang}|${targetLang}&key=0def2de36e57999b1af9`;

    // Make the API call
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.responseData) {
                document.getElementById('translation-output').innerText = data.responseData.translatedText;
            } else {
                document.getElementById('translation-output').innerText = 'Translation failed.';
            }
        })
        .catch(error => {
            console.error('Error translating text:', error);
            document.getElementById('translation-output').innerText = 'An error occurred during translation.';
        });
}

// Add event listeners if needed, for example, to handle button click for translation
document.addEventListener('DOMContentLoaded', () => {
    const translateButton = document.querySelector('button[onclick="translateText()"]');
    if (translateButton) {
        translateButton.addEventListener('click', translateText);
    }
});
