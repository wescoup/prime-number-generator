# Prime Number Generator

This project is a web-based tool for calculating prime numbers up to a very large value. It demonstrates an algorithm that works by identifying and excluding non-prime (composite) numbers, rather than by testing for primality directly.

The project is structured in four "levels," each building upon the last with improved optimizations and features.

---

## How to Run Locally

1.  Click the green `<> Code` button on this repository page.
2.  Select **Download ZIP**.
3.  Extract the contents of the ZIP file to a folder on your computer.
4.  Open the `primes.html` file in your preferred web browser.

---

## Levels of Calculation

### Level 1: Proof of Concept
* **Description:** A basic implementation of the core algorithm.
* **Range:** Calculates prime numbers up to 1,000.

### Level 2: Skip Even Numbers
* **Description:** An improved version that pre-loads '2' as the first prime and then only processes odd numbers, doubling the efficiency.
* **Range:** Calculates prime numbers up to 1,000.

### Level 3: Improved Efficiency
* **Description:** A more robust version designed to handle larger numbers more effectively.
* **Range:** Calculates prime numbers up to 10,000.

### Level 4: Seed File Implementation
* **Description:** The most advanced version, designed for calculating very large sets of primes. It features:
    * The ability to load a `.csv` seed file to continue a previous calculation.
    * A progress indicator for long calculations.
    * The ability to download the results as a new seed file for future use.
* **Default Range:** Calculates up to 10,000,000 and beyond.

---

## The Algorithm

The core concept of this program is to identify prime numbers by generating a comprehensive list of non-prime numbers.

1.  Iterate through a range of numbers (`x`).
2.  If `x` has not been previously marked as non-prime, it is identified as a prime.
3.  Once a new prime `x` is found, it is used to calculate its future multiples (e.g., `x*x`, `x * (x+2)`, etc.), which are then added to the list of non-primes.
4.  This ensures that composite numbers are identified and excluded before the main loop reaches them.
