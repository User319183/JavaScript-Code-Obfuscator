// @Author: User319183
// @Date:   2023-12-24
// @Description: JSfuscator - Your JavaScript Obfuscation tool. It's efficient, privacy-focused, easy to use, and currently free! JSfuscator uses advanced obfuscation techniques to make your code harder to reverse-engineer and includes anti-debugging features for added security. It's optimized for speed and produces obfuscated code that runs efficiently, making it suitable for large codebases. JSfuscator supports all modern JavaScript features and works with all major JavaScript engines. It also offers a high degree of customizability, with options for choosing which obfuscation techniques to use and for adding custom transformations. Plus, we offer prompt and helpful support and are constantly updating JSfuscator to improve its features and performance.
// @Version: 1.0.0
// @License: Proprietary License | © 2023 | All rights reserved

// String array obfuscation
function rotateArray(array, positions) {
    return array.slice(positions).concat(array.slice(0, positions));
}

// Shuffle a string array using the Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to obfuscate a functio. It replaces the function name with a random name and encrypts the function name
function generateRandomVarName() {
    var prefixes = [
        '_O0O0O0_', '_O0O0O00_', '_O0O0O00O_', '_O0O0O00O0_', '_O0O0O00O00_', '_O0O0O00O00O_', '_O0O0O00O00O0_', '_O0O0O00O00O00_', '_O0O0O00O00O00O_', '_O0O0O00O00O00O0_', '_O0O0O00O00O00O00_', '_O0O0O00O00O00O00O_', '_O0O0O00O00O00O00O0_', '_O0O0O00O00O00O00O00_', '_O0O0O00O00O00O00O00O_', '_O0O0O00O00O00O00O00O0_', '_O0O0O00O00O00O00O00O00_', '_O0O0O00O00O00O00O00O00O_', '_O0O0O00O00O00O00O00O00O0_', '_O0O0O00O00O00O00O00O00O00_'
    ];
    const suffixes = ['O0_', 'O00_', 'O00O_', 'O00O0_', 'O00O00_', 'O00O00O_', 'O00O00O0_', 'O00O00O00_', 'O00O00O00O_', 'O00O00O00O0_', 'O00O00O00O00_', 'O00O00O00O00O_', 'O00O00O00O00O0_', 'O00O00O00O00O00_', 'O00O00O00O00O00O_', 'O00O00O00O00O00O0_', 'O00O00O00O00O00O00_', 'O00O00O00O00O00O00O_', 'O00O00O00O00O00O00O0_', 'O00O00O00O00O00O00O00_'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return prefix + suffix;
}

// Custom encryption algorithm (XOR & Vernam cipher)
const encrypt = (function () {
    function encryptFunction(str, key) {
        var output = '';
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
            output += String.fromCharCode(charCode);
        }
        return output;
    }
    return Object.freeze(encryptFunction);
})();

// Custom decryption algorithm (XOR & Vernam cipher)
const decrypt = (function () {
    function decryptFunction(str, key) {
        return encrypt(str, key);
    }
    return Object.freeze(decryptFunction);
})();

// Replaces the function name with a random name and encrypts the function name
const encodeString = (function () {
    function encodeFunction(str, key) {
        var encrypted = encrypt(str, key);
        return Buffer.from(encrypted).toString('base64');
    }
    return Object.freeze(encodeFunction);
})();

// Replaces the function name with a random name and encrypts the function name
const decodeString = (function () {
    function decodeFunction(str, key) {
        var decoded = atob(str);
        var decrypted = decrypt(decoded, key);
        return decrypted;
    }
    return Object.freeze(decodeFunction);
})();


// Generate a random token
function generateToken(minLength, maxLength = minLength) {
    var characterSets = [
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    ];
    var characters = characterSets[Math.floor(Math.random() * characterSets.length)];
    var charactersLength = characters.length;
    var length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    var result = '';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// Dead code injection. It adds random dead code snippets after each statement in the code
function injectDeadCode(code) {
    const deadCodeSnippets = [
        '(function(){var _0x1abc=["foo"];var _0x2d3f=function(_0x1abc,_0x2d3f){_0x1abc=_0x1abc-0;var _0x4d74d0=_0x1abc[_0x1abc];return _0x4d74d0;};})();',
        '(function(){for(var _0x2aeb=0;_0x2aeb<10;_0x2aeb++){if(_0x2aeb===5){break;}}})();',
        '(function(){var _0x4b70;if(false){_0x4b70="no effect";}else{_0x4b70="still no effect";}})();',
        '(function(){var _0x4b70=0;while(_0x4b70<0){console.log("Never happens");_0x4b70++;}})();',
        '(function(){Math.random();Math.max();})();',
        '(function(){var _0x1abc;_0x1abc=undefined;})();',
        '(function(){var _0xcafe = 42; for(var _0xbeef = 0; _0xbeef < _0xcafe; _0xbeef++) { console.log(_0xbeef); }})();',
        '(function(){try { throw new Error(\'Simulated Error\'); } catch(e) {} })();',
        '(function(){var _0xUseless = [\'complex\',\'snippet\',\'with\',\'multiple\',\'values\']; _0xUseless.sort(); })();',
        '(function(){var _0xdead = { key: \'value\', method: function() { return undefined; }}; _0xdead.method(); })();',
        '(function(){var _0x1abc = ["item1", "item2", "item3"]; _0x1abc.forEach(function(item) {});})();',
        '(function(){var _0x1abc = function(x) { return x * x; }; _0x1abc(0);})();',
        '(function(){var _0x1abc = { key: "value" }; for (var key in _0x1abc) {} })();',
        '(function(){var _0x1abc = ["item1", "item2", "item3"]; _0x1abc.map(function(item) { return item; });})();',
        '(function(){var _0x1abc = ["item1", "item2", "item3"]; var _0x2d3f = _0x1abc.filter(function(item) { return false; });})();',
        '(function(){var _0x1abc = ["item1", "item2", "item3"]; var _0x2d3f = _0x1abc.reduce(function(acc, item) { return acc; }, "");})();',
        '(function(){var _0x1abc = function() { try { throw new Error("Simulated Error"); } catch(e) {} }; _0x1abc();})();',
        '(function(){var _0x1abc = ["item1", "item2", "item3"]; _0x1abc.some(function(item) { return false; });})();',
        '(function(){var _0x1abc = ["item1", "item2", "item3"]; _0x1abc.every(function(item) { return true; });})();',
        '(function(){var _0x1abc = function() { return new Promise(function(resolve, reject) {}); }; _0x1abc();})();',
    ];

    // Split the code into statements at semicolons
    const statements = code.split(';');

    let obfuscatedCode = '';
    let insertDeadCode;

    // Append a piece of dead code after each statement randomly and not after every statement
    statements.forEach(statement => {
        obfuscatedCode += statement + ';';
        // Randomly determine whether to insert dead code after this statement
        insertDeadCode = Math.random() < 0.5; // We have a 50% chance to insert dead code after each statement
        // Add nested dead code by chance
        if (insertDeadCode) {
            let snippet = deadCodeSnippets[Math.floor(Math.random() * deadCodeSnippets.length)];
            const nestedChance = Math.random();
            let finalSnippet = snippet;

            // Replace static variable names and values with random ones
            finalSnippet = finalSnippet.replace(/_0x1abc/g, generateRandomVarName());
            finalSnippet = finalSnippet.replace(/_0x2d3f/g, generateRandomVarName());
            finalSnippet = finalSnippet.replace(/_0x4b70/g, generateRandomVarName());
            finalSnippet = finalSnippet.replace(/"item1"/g, `"${generateRandomVarName()}"`);
            finalSnippet = finalSnippet.replace(/"item2"/g, `"${generateRandomVarName()}"`);
            finalSnippet = finalSnippet.replace(/"item3"/g, `"${generateRandomVarName()}"`);

            if (nestedChance < 0.5) { // 50% chance to nest the dead code snippet
                let outerSnippet = deadCodeSnippets[Math.floor(Math.random() * deadCodeSnippets.length)];
                // Replace static variable names and values with random ones in the outer snippet
                outerSnippet = outerSnippet.replace(/_0x1abc/g, generateRandomVarName());
                outerSnippet = outerSnippet.replace(/_0x2d3f/g, generateRandomVarName());
                outerSnippet = outerSnippet.replace(/_0x4b70/g, generateRandomVarName());
                outerSnippet = outerSnippet.replace(/"item1"/g, `"${generateRandomVarName()}"`);
                outerSnippet = outerSnippet.replace(/"item2"/g, `"${generateRandomVarName()}"`);
                outerSnippet = outerSnippet.replace(/"item3"/g, `"${generateRandomVarName()}"`);

                finalSnippet = outerSnippet.replace('{}', `{ ${snippet} }`);
            }

            obfuscatedCode += '\n' + finalSnippet;
        }
    });

    return obfuscatedCode;
}

// Split a string into multiple parts and concatenate them at runtime
function splitString(str) {
    var parts = [];
    for (var i = 0; i < str.length; i += 2) {
        parts.push(str.substring(i, i + 2));
    }
    return parts.join('" + "');
}


function obfuscate(code, settings) {
    // Generate a key for encrypting the strings
    const key = generateToken(16);

    // Generate a second key for encrypting the first key
    const keyEncryptionKey = generateToken(16);

    // Encrypt the first key with the second key
    const encryptedKey = encrypt(key, keyEncryptionKey);

    // Convert the keys to sequences of character codes
    var encryptedKeyCodes = encryptedKey.split('').map(c => c.charCodeAt(0)).join(',');
    var keyEncryptionKeyCodes = keyEncryptionKey.split('').map(c => c.charCodeAt(0)).join(',');


    var variableRegex = /\bvar\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g;
    var functionRegex = /\bfunction\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/g;
    var stringRegex = /"([^"]*)"/g;
    var integerRegex = /\b(\d+)\b/g;
    let obfuscated = code;
    let stringArray = [];
    var i = 0;

    if (settings.variableObfuscation) {
        // Combined regex for 'var' and 'let' variable declarations
        var variableRegex = /\b(var|let)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\b/g;
        var replacedNames = {};
        var match, newName, re;

        // Loop over all matches in the code
        while ((match = variableRegex.exec(code)) !== null) {
            var oldName = match[2];

            if (!replacedNames.hasOwnProperty(oldName)) { // Check if the oldName has not been replaced yet. If not, replace it with a new name
                newName = generateRandomVarName();
                // Ensure newName is unique; if not, regenerate:
                while (replacedNames.hasOwnProperty(newName) || code.includes(newName)) {
                    newName = generateRandomVarName();
                }
                replacedNames[oldName] = newName;
            }
        }

        // Replace all instances of the old names with the new obfuscated names
        for (var oldName in replacedNames) {
            re = new RegExp('\\b' + oldName + '\\b', 'g');
            code = code.replace(re, replacedNames[oldName]);
        }

        obfuscated = code; // Update the obfuscated code
    }


    if (settings.functionObfuscation) {
        var functionRegex = /\bfunction\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/g;
        var replacedNames = {};
        var i = 0;
        while ((match = functionRegex.exec(code)) !== null) {
            var oldName = match[1];
            if (!replacedNames[oldName]) {
                var newName = generateRandomVarName() + i;
                replacedNames[oldName] = newName;
                i++;
            }
            var re = new RegExp('\\b' + oldName + '\\b', 'g');
            obfuscated = obfuscated.replace(re, replacedNames[oldName]);
        }

        // String encryption
        var encryptedNames = {};
        for (var name in replacedNames) {
            var encryptedName = encrypt(replacedNames[name], key);
            encryptedNames[name] = encryptedName;
        }

        // Replace function names with encrypted names
        for (var name in encryptedNames) {
            var re = new RegExp('\\b' + name + '\\b', 'g');
            obfuscated = obfuscated.replace(re, encryptedNames[name]);
        }

        // String encryption
        var encryptedNames = {};
        for (var name in replacedNames) {
            var encryptedName = encrypt(replacedNames[name], key);
            encryptedNames[name] = encryptedName;
        }

        // Replace function names with encrypted names
        for (var name in encryptedNames) {
            var re = new RegExp('\\b' + name + '\\b', 'g');
            obfuscated = obfuscated.replace(re, encryptedNames[name]);
        }
    }

    if (settings.stringObfuscation) {
        var stringRegex = /"([^"]*)"/g;
        obfuscated = obfuscated.replace(stringRegex, function (match, p1) {
            var index = stringArray.length;
            var encodedString = encodeString(p1, key);
            stringArray.push('"' + encodedString + '"');
            return 'decodeString(_strings[' + index + '], "' + key + '")'; // Decode the string at runtime
        });
    }

    if (settings.integerObfuscation) {
        var integerRegex = /\b(\d+)\b/g;
        obfuscated = obfuscated.replace(integerRegex, function (match, p1) {
            var originalInteger = parseInt(p1);
            var encryptedInteger = encrypt(originalInteger.toString(), key);
            var encodedInteger = btoa(encryptedInteger);
            return 'parseInt(decodeString("' + encodedInteger + '", key))';
        });
    }

    if (settings.deadCodeInjection) {
        obfuscated = injectDeadCode(obfuscated);
    }

    if (settings.removeComments) {
        var commentRegex = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;
        obfuscated = obfuscated.replace(commentRegex, '');
    }

    if (settings.stringSplitting) {
        var stringRegex = /"([^"]*)"/g;
        obfuscated = obfuscated.replace(stringRegex, function (match, p1) {
            var splitStr = splitString(p1);  // Renamed variable
            return '"' + splitStr + '"';
        });
    }

    if (settings.literalEncryption) {
        var replacements = {
            'true': ['![]', '!!+[]', '+![]', '!!"0"', '!!1', '!!"JSfuscator on top"', '!![]+[]', '!!Infinity', '!!(1/Infinity)', '!!(Infinity/Infinity)'],
            'false': ['!![]', '+[]', '!+[]', '!"0"', '!!0', '!!""', '!!NaN', '!!null', '!!undefined', '!!(0/0)'],
            'undefined': ['[][[]]', 'void 0', 'void(0)', 'void("undefined")', 'void(null)', 'void(NaN)', 'void([])', 'void({})', 'void(Infinity)', 'void(-Infinity)'],
            'null': ['[]+[]', '""', '0[0]', 'null', 'undefined[0]', 'NaN[0]', '({}[[]])', '({}.a)', '([].a)', '(0)[0]'],
            'NaN': ['+[![]]', '0/0', 'Number("JSfuscator on top")', 'Infinity-Infinity', 'Math.sqrt(-1)', 'parseInt("JSfuscator on top")', 'Number(undefined)', 'Number({})', 'Number([])', 'Number(null)'],
            'Infinity': ['10/0', '1/0', 'Number.MAX_VALUE * 2', 'Infinity', 'Math.pow(10, 1000)', 'Number.POSITIVE_INFINITY', '2e308', '1.7976931348623157e+308', 'Number("Infinity")', 'parseFloat("Infinity")']
        };

        for (var literal in replacements) {
            var regex = new RegExp('\\b' + literal + '\\b', 'g');
            obfuscated = obfuscated.replace(regex, function () {
                var options = replacements[literal];
                var replacement = options[Math.floor(Math.random() * options.length)];
                return replacement;
            });
        }
    }

    // Redefine global objects and constants
    if (settings.redefineGlobals) {
        var redefinitions = [
            'undefined = decodeString("' + encodeString('typeof undefined', key) + '", key);',
            'Infinity = decodeString("' + encodeString('10 / 0', key) + '", key);',
            'NaN = decodeString("' + encodeString('0 / 0', key) + '", key);',
            'negativeZero = decodeString("' + encodeString('-1 / Infinity', key) + '", key);',
        ];

        // Define a list of global objects to be redefined
        var globalObjects =
            [
                'document',
                'console',
                'window',
                'Math',
                'Date',
                'Array',
                'Object',
                'String',
                'Number',
                'Boolean',
                'RegExp',
                'Error',
                'EvalError',
                'RangeError',
                'ReferenceError',
                'SyntaxError',
                'TypeError',
                'URIError',
                'Promise',
                'Set',
                'Map',
                'WeakSet',
                'WeakMap',
                'Symbol',
                'Reflect',
                'Proxy',
                'JSON',
                'Intl',
                'WebAssembly',
                'Atomics',
                'SharedArrayBuffer',
                'DataView',
                'ArrayBuffer',
                'Float32Array',
                'Float64Array',
                'Int8Array',
                'Int16Array',
                'Int32Array',
                'Uint8Array',
                'Uint8ClampedArray',
                'Uint16Array',
                'Uint32Array',
                'BigInt64Array',
                'BigUint64Array',
                'BigInt',
                'alert',
                'prompt',
                'confirm',

            ];

        // Replace the global objects with obfuscated versions
        globalObjects.forEach(function (globalObject) {
            var varName = generateRandomVarName();
            var obfuscatedGlobalObject = encodeString(globalObject, key);
            redefinitions.push('var ' + varName + ' = this.constructor.constructor(\'return this\')()[decodeString("' + obfuscatedGlobalObject + '", key)];');
            obfuscated = obfuscated.replace(new RegExp('\\b' + globalObject + '\\b', 'g'), varName);
        });

        // Add a self-defending mechanism. I don't think it even works lol
        redefinitions.push('Object.defineProperty(Object.prototype, decodeString("' + encodeString('toString', key) + '", key), { get: function() { return decodeString("' + encodeString('toString', key) + '", key); } });');
        // Wrap the redefinitions and the obfuscated code in an IIFE
        obfuscated = '(function() {\n' + redefinitions.join('\n') + '\n' + obfuscated + '\n})();';
    }

    // Zero obfuscation
    var zeroRegex = /\b0\b/g;
    obfuscated = obfuscated.replace(zeroRegex, function () {
        // Define multiple equivalent expressions for 0
        var replacements = [
            '[]["length"]',
            '+false',
            'false|false',
            'false&false',
            'false==true',
            'true==false',
            'null-null',
            '1&0',
            '1^1',
            '1-1'
        ];

        var replacement = replacements[Math.floor(Math.random() * replacements.length)];
        return replacement;
    });


    // Special case for setTimeout
    var setTimeoutRegex = /setTimeout\(([^,]*),\s*(\d+)\)/g;
    obfuscated = obfuscated.replace(setTimeoutRegex, function (match, p1, p2) {
        // Obfuscate the callback function and the delay separately
        var obfuscatedCallback = obfuscateFunction(p1, settings);
        var obfuscatedDelay = obfuscateInteger(p2, settings);

        // Define multiple equivalent expressions for setTimeout
        var replacements = [
            'setTimeout(' + obfuscatedCallback + ', ' + obfuscatedDelay + ')',
            'setTimeout(function() { ' + obfuscatedCallback + '() }, ' + obfuscatedDelay + ')',
            '(function(f, d) { setTimeout(f, d) })(' + obfuscatedCallback + ', ' + obfuscatedDelay + ')'
        ];

        var replacement = replacements[Math.floor(Math.random() * replacements.length)];
        return replacement;
    });


    // Credit System
    function createMultilineComment(lines) {
        return '/*\n' + lines.join('\n') + '\n*/';
    }

    const creditMessageLines = [
        "Obfuscated with JSfuscator - https://user319183.github.io/jsfuscator",
        "JSfuscator is a tool that transforms your original JavaScript source code into a new representation that's harder to understand, copy, re-use and modify without authorization",
        "While the output script works the same way as the original, its internals are significantly different and reverse-engineering the logic is much more difficult.",
    ];

    const creditMessage = createMultilineComment(creditMessageLines);


    // Convert the functions to strings
    var encryptStr = '(' + encrypt.toString() + ')';
    var decryptStr = '(' + decrypt.toString() + ')';
    var decodeStringStr = '(' + decodeString.toString() + ')';

    var rotatedArray = rotateArray(stringArray, 1); // Rotate the array by 1 position
    var shuffledArray = shuffleArray(rotatedArray); // Shuffle the array

    // Wrap the obfuscated code in an IIFE
    // Include the encrypted key and the key encryption key in the obfuscated code
    // Include the keys in the obfuscated code as sequences of character codes
    return creditMessage + '\n' +
        '(function() {\n' +
        'var _strings = [' + shuffledArray.join(',') + '];\n' +
        'var encrypt = eval(' + JSON.stringify(encryptStr) + ');\n' +
        'var decrypt = eval(' + JSON.stringify(decryptStr) + ');\n' +
        'var decodeString = eval(' + JSON.stringify(decodeStringStr) + ');\n' +
        'var encryptedKey = String.fromCharCode(' + encryptedKeyCodes + ');\n' +
        'var keyEncryptionKey = String.fromCharCode(' + keyEncryptionKeyCodes + ');\n' +
        'var key = decrypt(encryptedKey, keyEncryptionKey);\n' +
        obfuscated + '\n' +
        '})();';
}

module.exports = obfuscate;