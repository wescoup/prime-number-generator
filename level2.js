/**
 * Level 2 skips even numbers and calculates prime numbers up to 1,000.
 * This version is optimized to only generate ODD composite numbers.
 */
function level2() {
    const prime = [2];
    // We only need to store odd non-primes, 
	// as the loop will never check an even number.
    const nonprime = [];

	// Skip even numbers, starting with 3
    for (let x = 3; x <= 1000; x+=2) {
		
        // Test x against the nonprime array.
		if (!nonprime.includes(x)) {
            // If not, add it to the prime array
            prime.push(x);
            // x*x will always be odd, so we add it.
			nonprime.push(x*x);
        }
		
        // Multiply x by every ODD value in the prime array
        // We start the loop at i=1 to skip prime[0], which is 2.
        for (let i = 1; i < prime.length; i++) {
            const p = prime[i]; // p will be 3, 5, 7, ...
            const product = x * p;
            
            // Only add the product if it's not already in the list
            // This is necessary because this loop runs for composite 'x' values,
            // creating duplicate products (e.g., 9*5 = 45 and 15*3 = 45).
            if (product <= 1000 && !nonprime.includes(product)) {
                nonprime.push(product);
            }
        }
    }

    return prime;
}
