function getFromLocalStorage(key) {
    let localStorageValue = localStorage.getItem(key);
    if (localStorageValue) return JSON.parse(localStorageValue);
    return [];
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function clearLocalStorage() {
    localStorage.clear();
}

function removeDuplicatesFromArray(arr) {
    let filtered = arr.filter((v, p) => arr.indexOf(v) == p)
    return filtered;
}

function upperEachWord(strArr) {
    let theWord = strArr.split('');
    let foundSpace = false;
    let newWord = [];
    for (let i = 0; i < theWord.length; i++) {
        if (i === 0) {
            newWord.push(theWord[i].toUpperCase());
        } else if (theWord[i] === " ") {
            foundSpace = true;
            newWord.push(theWord[i]);
        } else if (foundSpace) {
            newWord.push(theWord[i].toUpperCase());
            foundSpace = false;
        } else {
            newWord.push(theWord[i]);
        }
    }
    return newWord.join("");
}

function kelvinToFarenheit(value) {
    return Math.round((value - 273.15) * 9 / 5 + 32);

}

function convertEpochToSpecificTimezone(offset, epoch) {
    var d = new Date(epoch);
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000); //This converts to UTC 00:00
    var nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString();
}