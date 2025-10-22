/**
 * Level 3 improved efficiency calculates prime numbers up to 10,000.
 * This version is optimized to only generate ODD composite numbers.
 */
function level3() {
    const prime = [2];
    // We only need to store odd non-primes,
	// as the loop will never check an even number.
    const nonprime = [];
    
    // Set maxNumber
    const maxNumber = 10000;

    // Loop through odd numbers up to maxNumber
    for (let x = 3; x <= maxNumber; x+=2) {
		
        // Test x against the nonprime array.
		if (!nonprime.includes(x)) {
            // If not, add it to the prime array
            prime.push(x);
            
            // Only add x*x if it's within the maxNumber limit
            const square = x * x;
            if (square <= maxNumber) {
                nonprime.push(square);
            }
        }
		
		// Optimization: Only generate new non-primes within the limit
        // Multiply x by every ODD value in the prime array
        // We start the loop at i=1 to skip prime[0], which is 2.
        for (let i = 1; i < prime.length; i++) {
            const p = prime[i]; // p will be 3, 5, 7, ...
			const product = x * p;

			// Only add products within the limit
			if (product <= maxNumber && !nonprime.includes(product)) {
				nonprime.push(product);
			}
			// If product is already too big, no need to check other primes
			if (product > maxNumber) {
				break;
			}
		}
    }

    return prime;
}
