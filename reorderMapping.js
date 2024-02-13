var obfuscationMap = {
    "0": "j",
    "1": "l",
    "2": "0",
    "3": "o",
    "4": ",",
    "5": "V",
    "6": "~",
    "7": "6",
    "8": "a",
    "9": "M",
    "a": "R",
    "b": "*",
    "c": ")",
    "d": "y",
    "e": "k",
    "f": "z",
    "g": "u",
    "h": "S",
    "i": "h",
    "j": "r",
    "k": ".",
    "l": ">",
    "m": "f",
    "n": "q",
    "o": "N",
    "p": ";",
    "q": "2",
    "r": "Y",
    "s": "9",
    "t": "e",
    "u": "4",
    "v": "3",
    "w": "%",
    "x": "(",
    "y": "7",
    "z": "J",
    "A": "<",
    "B": "5",
    "C": "X",
    "D": "E",
    "E": "`",
    "F": "[",
    "G": "b",
    "H": ":",
    "I": "=",
    "J": "A",
    "K": "Z",
    "L": "}",
    "M": "F",
    "N": "v",
    "O": "{",
    "P": "/",
    "Q": "|",
    "R": "?",
    "S": "x",
    "T": "d",
    "U": "p",
    "V": "i",
    "W": "m",
    "X": "s",
    "Y": "1",
    "Z": "t",
    " ": "D",
    ".": "c",
    ",": "8",
    ";": "K",
    ":": ">",
    "?": "<",
    "!": "&",
    "@": "L",
    "#": "O",
    "$": "T",
    "%": "C",
    "^": "Q",
    "&": "U",
    "*": "_",
    "(": "B",
    ")": "G",
    "+": "^",
    "=": "P",
    "<": "W",
    ">": "w",
    "[": "n",
    "]": ",",
    "{": "g",
    "}": "+",
    "|": "]",
    "~": "I",
    "`": "H"
}

function secureRandomNumber(min, max) {
    var crypto = window.crypto || window.msCrypto;
    var array = new Uint32Array(1);
    crypto.getRandomValues(array);
    var range = max - min + 1;
    var max_range = 4294967295;
    if (array[0] >= Math.floor(max_range / range) * range)
        return secureRandomNumber(min, max);
    return min + (array[0] % range);
}

function shuffle(obj) {
    var keys = Object.keys(obj);
    for (var i = keys.length - 1; i > 0; i--) {
        var j = secureRandomNumber(0, i);
        var temp = obj[keys[i]];
        obj[keys[i]] = obj[keys[j]];
        obj[keys[j]] = temp;
    }
    return obj;
}

var obfuscationMap = shuffle(obfuscationMap);

var newObfuscationMap = {};
var keys = Object.keys(obfuscationMap);
var values = Object.values(obfuscationMap);
for (var i = 0; i < keys.length; i++) {
    newObfuscationMap[keys[i]] = values[i];
}

console.log(newObfuscationMap);