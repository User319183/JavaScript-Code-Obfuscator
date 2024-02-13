var isTrue = true;
var isFalse = false;
var nothing = null;
var notANumber = NaN;
var infinite = Infinity;

console.log(isTrue, isFalse, nothing, notANumber, infinite);

// Obfuscated code
var decrypt = function(str) {
    return str === "true" ? true :
           str === "false" ? false :
           str === "null" ? null :
           str === "NaN" ? NaN :
           str === "Infinity" ? Infinity :
           undefined;
};

var isTrue = decrypt("true");
var isFalse = decrypt("false");
var nothing = decrypt("null");
var notANumber = decrypt("NaN");
var infinite = decrypt("Infinity");

console.log(isTrue, isFalse, nothing, notANumber, infinite);