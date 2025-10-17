/**
 * Level 3 improved efficiency calculates prime numbers up to 10,000.
 */
function level3() {
    const prime = [2];
    const nonprime = [];
    
    // Set maxNumber and calculate its square root for the optimization check
    const maxNumber = 10000;
    const sqrtMax = Math.sqrt(maxNumber); // This is 100

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
		// Multiply x by every value in the prime array
		for (const p of prime) {
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