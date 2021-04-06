const { speechSynthesis } = window;
const textbox = document.getElementById('text');
const voicesSelect = document.getElementById('voices');
const pitch = document.getElementById('pitch');
const rate = document.getElementById('rate');
const LANG_RU = 'ru-RU';

let voices = [];

const generateVoices = () => {
    voices = speechSynthesis.getVoices();

    const voicesList = voices
        .map((voice, index) => voice.lang === LANG_RU && `<option value=${index}>${voice.name} (${voice.lang})</option>`)
        .join('');

    voicesSelect.innerHTML = voicesList;
}

const speak = () => {
    if (speechSynthesis.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }

    if (textbox.value !== '') {
        const ssUtterance = new SpeechSynthesisUtterance(textbox.value);

        ssUtterance.addEventListener('end', (event) => console.log('SpeechSynthesisUtterance End'))
        ssUtterance.addEventListener('error', (event) => console.log('SpeechSynthesisUtterance Error'))
        
        ssUtterance.voice = voices[voicesSelect.value];
        ssUtterance.pitch = pitch.value;
        ssUtterance.rate = rate.value;

        speechSynthesis.speak(ssUtterance);
    }
}

generateVoices();

document.getElementById('btn-start').addEventListener('click', speak);
document.getElementById('btn-stop').addEventListener('click', () => speechSynthesis.cancel());

rate.addEventListener('change', () => document.querySelector('.rate-value').textContent = rate.value);
pitch.addEventListener('change', () => document.querySelector('.pitch-value').textContent = pitch.value);

voicesSelect.addEventListener('change', speak);

speechSynthesis.addEventListener('voiceschanged', generateVoices);
