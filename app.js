// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const pwdLenght = document.getElementById('pwdLenght');
const message = document.querySelector('.message');
const btnLarge = document.querySelector('.btn-large');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

// Generate eventlistener
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

lengthEl.addEventListener('input', (e) => {
    pwdLenght.innerText = e.target.value;
});

// copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    message.classList.add('animate');
    window.setTimeout(() => {
        message.classList.remove('animate');
    }, 3000);
});

// generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // initialize password variable
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;

    // filter out unchecked
    const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
        (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
        return '';
    }

    // loop over length, call generator function for each type
    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach((type) => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }

    // add final password to the password var and return
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%&/()=[]{}<>,.*?';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
