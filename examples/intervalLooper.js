let count = 0;

// This function will be called every second
const intervalId = setInterval(() => {
    console.log(`This is loop iteration number: ${count}`);
    count++;

    // Stop the loop after 10 iterations
    if (count > 10) {
        clearInterval(intervalId);
    }
}, 1000);