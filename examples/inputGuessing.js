(async function() {
    let guess;
    do {
        guess = await new Promise(resolve => {
            setTimeout(() => resolve(prompt("Guess the number:")), 0);
        });
    } while (guess != 44902984);

    console.log("Congratulations! You guessed the number.");
})();