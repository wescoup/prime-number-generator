/**
 * Level 4: Calculates prime numbers using an optional seed file and provides progress updates.
 *
 * @param {number} maxNumber The new upper limit for prime number calculation.
 * @param {number[]} initialPrimes An array of primes from a seed file. Can be empty.
 * @param {function} progressCallback A function to call with the current number being processed.
 * @returns {number[]} The complete array of prime numbers up to maxNumber.
 */
function level4(maxNumber, initialPrimes, progressCallback) {
    const nonprime = new Set();
    const prime = [...initialPrimes];

    let startX = 3;
    if (prime.length > 0) {
        const lastPrime = prime[prime.length - 1];
        startX = lastPrime % 2 === 0 ? lastPrime + 1 : lastPrime + 2;
    } else {
        prime.push(2);
    }
    
    // **Pre-populate the nonprime set based on the seed primes.**
    // This is a crucial "catch-up" step.
    if (initialPrimes.length > 0) {
        progressCallback('Pre-calculating non-primes...');
        // We can skip prime[0] which is 2, 
		//since our main loop only checks odd numbers.
        for (let i = 1; i < initialPrimes.length; i++) {
            const p = initialPrimes[i];
            
            // Find the first odd multiple of p that is >= startX
            let startMultiple = Math.floor(startX / p) * p;
            if (startMultiple < startX) {
                startMultiple += p;
            }
            if (startMultiple % 2 === 0) {
                startMultiple += p;
            }
            
            // Add all odd multiples of p up to the maxNumber
            for (let j = startMultiple; j <= maxNumber; j += (p * 2)) {
                nonprime.add(j);
            }
        }
    }

    // Main calculation loop
    for (let x = startX; x <= maxNumber; x += 2) {
        
        if (x % 1001 === 1) {
            progressCallback(x);
        }

        if (!nonprime.has(x)) {
            prime.push(x);
            // Optimization: Only need to mark multiples starting from x*x,
            // as smaller multiples would have been handled by smaller primes.
            for (let i = x * x; i <= maxNumber; i += (x * 2)) {
                nonprime.add(i);
            }
        }
    }

    return prime;
}

