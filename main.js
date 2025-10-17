document.addEventListener('DOMContentLoaded', () => {
    // --- Global variable for Level 4 seed data ---
    let seedData = {
        primes: [],
        maxFromFile: 0
    };

    // --- Get references to DOM elements ---
    const level1Button = document.getElementById('run-level1');
    const level2Button = document.getElementById('run-level2');
    const level3Button = document.getElementById('run-level3');
    const level4SetupButton = document.getElementById('run-level4');
    const level4RunButton = document.getElementById('run-level4-action');
    const level4Controls = document.getElementById('level4-controls');
    const seedFileInput = document.getElementById('seed-file');
    const downloadButton = document.getElementById('download-seed');
    const maxNumberL4Input = document.getElementById('max-number-l4');
    const resultsDisplay = document.getElementById('results');

    // --- Event Listeners for Levels 1-3 ---
    level1Button.addEventListener('click', () => runCalculation(level1, "Level 1"));
    level2Button.addEventListener('click', () => runCalculation(level2, "Level 2"));
    level3Button.addEventListener('click', () => runCalculation(level3, "Level 3"));

    // --- Event Listener for showing Level 4 controls ---
    level4SetupButton.addEventListener('click', () => {
        level4Controls.classList.toggle('hidden');
    });
    
    // --- Event Listener to format the number input with commas ---
    maxNumberL4Input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/,/g, '');
        if (!isNaN(value) && value.length > 0) {
            e.target.value = parseInt(value, 10).toLocaleString('en-US');
        } else {
            e.target.value = ''; // Clear if not a number
        }
    });

    // --- Event Listener for reading the seed file ---
    seedFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        // **NEW:** Handle the case where the user cancels the file dialog
        if (!file) {
            resultsDisplay.textContent = "Seed file selection cancelled.";
            seedData = { primes: [], maxFromFile: 0 }; // Reset seed data
            maxNumberL4Input.value = (10000000).toLocaleString('en-US'); // Reset input to default
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target.result;
            try {
                const lines = contents.split('\n').map(line => line.trim()).filter(line => line);
                const header = lines.shift().split(',');
                
                if (header[0] !== '1') {
                    throw new Error("Seed file does not appear to start from 1.");
                }

                seedData.maxFromFile = parseInt(header[1], 10);
                seedData.primes = lines.flatMap(line => line.split(',').map(num => parseInt(num, 10)).filter(num => !isNaN(num)));
                
                resultsDisplay.textContent = `Successfully loaded seed file with ${seedData.primes.length} primes, calculated up to ${seedData.maxFromFile.toLocaleString('en-US')}.`;
                
                const nextMax = seedData.maxFromFile + 10000000;
                maxNumberL4Input.value = nextMax.toLocaleString('en-US');

            } catch (error) {
                resultsDisplay.textContent = `Error reading seed file: ${error.message}`;
                seedData = { primes: [], maxFromFile: 0 }; // Reset on error
            }
        };
        reader.readAsText(file);
    });

    // --- Event Listener for running the Level 4 calculation ---
    level4RunButton.addEventListener('click', () => {
        const newMaxNumber = parseInt(maxNumberL4Input.value.replace(/,/g, ''), 10);

        if (isNaN(newMaxNumber) || newMaxNumber <= 0) {
            resultsDisplay.textContent = "Please enter a valid maximum number.";
            return;
        }

        if (newMaxNumber <= seedData.maxFromFile) {
            resultsDisplay.textContent = `Error: The new maximum number must be greater than the maximum from the seed file (${seedData.maxFromFile.toLocaleString('en-US')}).`;
            return;
        }

        resultsDisplay.textContent = 'Calculating...';
        downloadButton.classList.add('hidden');

        setTimeout(() => {
            const startTime = performance.now();
            
            const updateProgress = (status) => {
                if (typeof status === 'number') {
                    resultsDisplay.textContent = `Calculating... currently at ${status.toLocaleString('en-US')}`;
                } else {
                    resultsDisplay.textContent = status;
                }
            };
            
            const finalPrimes = level4(newMaxNumber, seedData.primes, updateProgress);
            
            const endTime = performance.now();
            const executionTime = ((endTime - startTime) / 1000).toFixed(4);
            const resultsText = `Found ${finalPrimes.length.toLocaleString('en-US')} primes up to ${newMaxNumber.toLocaleString('en-US')} in ${executionTime} seconds.`;
            resultsDisplay.textContent = resultsText;

            prepareDownload(finalPrimes, newMaxNumber);
        }, 50);
    });

    // --- Helper function for simple calculations (Levels 1-3) ---
    function runCalculation(levelFunction, levelName) {
        resultsDisplay.textContent = 'Calculating...';
        setTimeout(() => {
            const startTime = performance.now();
            const primes = levelFunction();
            const endTime = performance.now();
            const executionTime = ((endTime - startTime) / 1000).toFixed(4);
            const resultsText = `[${levelName}] Found ${primes.length} primes in ${executionTime} seconds.\n\n${primes.join(', ')}`;
            resultsDisplay.textContent = resultsText;
        }, 50);
    }
    
    // --- Helper function to create and trigger the download ---
    function prepareDownload(primes, maxNumber) {
        const header = `1,${maxNumber}\n`;
        const csvContent = header + primes.join(',');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        
        if (downloadButton.href) {
            URL.revokeObjectURL(downloadButton.href);
        }

        const url = URL.createObjectURL(blob);
        downloadButton.href = url;
        downloadButton.setAttribute('download', `Primes to ${maxNumber.toLocaleString('en-US')}.csv`);
        downloadButton.classList.remove('hidden');
    }
});