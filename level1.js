/**
 * Level 1 is a proof of concept and calculates prime numbers up to 1000.
 */
function level1() {
    const prime = [];
    const nonprime = [];

    for (let x = 2; x <= 1000; x++) {
		
        // Test x against the nonprime array.
		if (!nonprime.includes(x)) {
            // If not, add it to the prime array
            prime.push(x);
			nonprime.push(x*x);
        }
		
        // Multiply x by every value in the prime array
        for (const p of prime) {
            const product = x * p;
            if (!nonprime.includes(product)) {
                nonprime.push(product);
            }
        }
    }

    return prime;
}