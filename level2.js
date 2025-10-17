/**
 * Level 2 skips even numbers and calculates prime numbers up to 1,000.
 */
function level2() {
    const prime = [2];
    const nonprime = [];

    for (let x = 3; x <= 1000; x+=2) {
		
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