const navbar = document.querySelector('#navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        navbar.style.position = "relative";
        // navbar.style.top = "1";

    }
    else {
        navbar.style.position = "sticky";
        navbar.style.top = 0;
    }

    lastScrollY = currentScrollY;

})

const startFormattingBtn = document.querySelector("#start-formatting-btn")
const textFormatSection = document.querySelector("#text-format-section")


startFormattingBtn.addEventListener("click", () => {
    textFormatSection.scrollIntoView({ behavior: "smooth" });
})



const formatButtons = document.querySelectorAll('.format-btn');

// show placeholder again if it's empty.

const normalInput = document.getElementById("basic-input");

normalInput.addEventListener("input", () => {
    if (normalInput.innerText.trim() === "") {
        normalInput.innerHTML = "";
    }
});


// FORMATTING 


// const normalInput = document.querySelector("#basic-input")



// const textData = "";
const textData = normalInput.innerText; // plain readable text
let liveText;

normalInput.addEventListener("input", () => {
    liveText = normalInput.innerText;

})


function formatText(action) {
    let result = normalInput.innerText;
    switch (action) {

        case "uppercase":
            result = liveText.toUpperCase();
            break;

        case "lowercase":
            result = liveText.toLowerCase();
            break;

        case "capitalize":
            result = liveText.toLowerCase()
                .replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase());
            break;

        case "capitalizeEveryWord":
            result = liveText.toLowerCase()
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            break;

        case "removeMultipleSpace":
            result = liveText.replace(/\s+/g, ' ').trim();
            break;

        case "lineBreakAfterSentence":
            const sentences = liveText.match(/[^.!?]+[.!?]*\s*/g) || [text];
            result = sentences.map(s => s.trim()).join('<br /> <br />');
            break;

        case "boldRandomLetters":
            result = boldRandomLettersFunction(liveText);
            break;
        case "removeNumbers":
            result = liveText.replace(/\d+/g, '');
            break;


        default:
            break;
    }
    normalInput.innerHTML = result;

}

function boldRandomLettersFunction(str, className = "") {
    const words = str.split(/\s+/);

    function getRandomIndexes(length, count) {
        const indexes = new Set();
        while (indexes.size < count) {
            indexes.add(Math.floor(Math.random() * length));
        }
        return Array.from(indexes);
    }

    return words.map(word => {
        if (word.length <= 2) return word;

        const boldCount = word.length >= 5 ? 3 : 2;
        const indexesToBold = getRandomIndexes(word.length, boldCount);

        let newWord = '';
        for (let i = 0; i < word.length; i++) {
            if (indexesToBold.includes(i)) {
                newWord += `<b class="${className}">${word[i]}</b>`;
            } else {
                newWord += word[i];
            }
        }
        return newWord;
    }).join(' ');
}


const btnUpperCase = document.querySelector("#btn-uppercase")
btnUpperCase.addEventListener("click", () => { formatText("uppercase") })


const btnLowerCase = document.querySelector("#btn-lowercase")
btnLowerCase.addEventListener("click", () => { formatText("lowercase") })


const btnCapitalizeSentences = document.querySelector("#btn-capitalize");
btnCapitalizeSentences.addEventListener("click", () => { formatText("capitalize") });


const btnCapitalizeWords = document.querySelector("#btn-capitalize-words");

btnCapitalizeWords.addEventListener("click", () => { formatText("capitalizeEveryWord") });


const btnRemoveSpace = document.querySelector("#btn-remove-space");
btnRemoveSpace.addEventListener("click", () => { formatText("removeMultipleSpace") });

// ADVANCED FORMAT OPTOINS 

const btnLineBreakSentences = document.querySelector("#btn-line-break-sentences");
btnLineBreakSentences.addEventListener("click", () => { formatText("lineBreakAfterSentence") });

const btnBoldRandomLetters = document.querySelector("#btn-bold-random-letters");
btnBoldRandomLetters.addEventListener("click", () => { formatText("boldRandomLetters") });

// bold with line break 
const btnBoldWithLineBreak = document.querySelector(".bold-with-line-break");

btnBoldWithLineBreak.addEventListener("click", () => {
    const text = normalInput.innerText;
    const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];

    const resultHTML = sentences.map(sentence => {
        const bolded = boldRandomLettersFunction(sentence.trim());
        return `<div style="margin-bottom: 1rem;">${bolded}</div>`;
    }).join('');

    normalInput.innerHTML = resultHTML;
});

const btnColorizeBold = document.querySelector("#btn-colorize-bold");
btnColorizeBold.addEventListener("click", () => {
    normalInput.innerHTML = boldRandomLettersFunction(normalInput.innerText, "yellow-bold");
});

const btnColorizeBoldLineBreak = document.querySelector("#btn-colorize-bold-line-break");
btnColorizeBoldLineBreak.addEventListener("click", () => {
    const text = normalInput.innerText;
    const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];

    const resultHTML = sentences.map(sentence => {
        const bolded = boldRandomLettersFunction(sentence.trim(), "yellow-bold");
        return `<div style="margin-bottom: 1rem;">${bolded}</div>`;
    }).join('');

    normalInput.innerHTML = resultHTML;
});

const removeNumbers = document.querySelector("#btn-remove-numbers")
removeNumbers.addEventListener("click", () => {
    formatText("removeNumbers")
})

/*
//read text *******************************

const btnReadText = document.querySelector("#btn-read-text");
let isSpeaking = false;
let currentSpeech;

btnReadText.addEventListener("click", () => {

    const text = normalInput.innerText;
    if (!isSpeaking) {
        isSpeaking = true;
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Create new speech instance
        currentSpeech = new SpeechSynthesisUtterance(text);
        currentSpeech.lang = "en-US"; // You can change this if needed

        window.speechSynthesis.speak(currentSpeech);
        btnReadText.innerText = "Stop";


        currentSpeech.onend = () => {
            isSpeaking = false;
            btnReadText.innerText = "Read Text"
        }





    } else {
        if (windows.speechSynthesis.speaking) {
            btnReadText.innerText = "Stop";
            window.speechSynthesis.cancel();
        }
        alert("Going")

    }

});
*/
// *******************************


// modal scripts
const modalContainer = document.querySelector("#modal-container")
const resultTextarea = document.querySelector("#result-textarea")



function toggleModal() {
    const modalContainer = document.querySelector("#modal-container")
    const htmlBody = document.querySelector("#body")

    modalContainer.classList.toggle("display-flex")

    htmlBody.classList.toggle("disable-scrolling")


    resultTextarea.innerHTML = normalInput.innerHTML
}

const fullViewBtn = document.querySelector("#full-view-btn")
const closeModalBtn = document.querySelector("#close-modal-btn")


fullViewBtn.addEventListener("click", () => { toggleModal() })

closeModalBtn.addEventListener("click", () => { toggleModal() })

// Basic text input optoins 

const clearInputBtn = document.querySelector("#clear-input-btn")

clearInputBtn.addEventListener("click", () => {
    normalInput.innerHTML = ""
})


// copy btn
const basicCopyBtn = document.querySelector("#basic-copy-btn");

basicCopyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(normalInput.innerText)
})

const modalCopyBtn = document.querySelector("#modal-copy-btn");

modalCopyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(normalInput.innerText)
})

// Modal Theme Toggle
const modalThemeBtn = document.querySelector("#modal-theme-btn");

// Set default to dark mode to match input
resultTextarea.classList.add("dark-mode");

modalThemeBtn.addEventListener("click", () => {
    resultTextarea.classList.toggle("dark-mode");

    // Update icon
    const icon = modalThemeBtn.querySelector("i");
    if (resultTextarea.classList.contains("dark-mode")) {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    } else {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }
});