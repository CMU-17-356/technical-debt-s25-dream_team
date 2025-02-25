export default function QueryProcessor(query: string): string {
  // Handle Shakespeare-related queries
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  // Handle name-related queries
  if (query.toLowerCase().includes("name")) {
    return "dreamteam";
  }

  // Handle arithmetic queries
  const arithmeticMatch = query.match(/what is (\d+)(\s*plus\s*\d+)+/i);
  if (arithmeticMatch) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      const sum = numbers.reduce((acc, num) => acc + parseFloat(num), 0);
      return sum.toString();
    }
  }

  const exponentiationMatch = query.match(/what is (\d+)\s*to the power of\s*(\d+)/i);
  if (exponentiationMatch) {
    const base = parseFloat(exponentiationMatch[1]);
    const exponent = parseFloat(exponentiationMatch[2]);
    const result = Math.pow(base, exponent);
    return result.toString();
  }

  // Handle arithmetic operations (plus, minus, multiplied by, divided by)
  const operatorMatch = query.match(/what is (\d+)\s*(plus|minus|multiplied by|divided by)\s*(\d+)/i);
  if (operatorMatch) {
    const num1 = parseFloat(operatorMatch[1]);
    const operator = operatorMatch[2].toLowerCase();
    const num2 = parseFloat(operatorMatch[3]);

    let result: number;

    switch (operator) {
      case 'plus':
        result = num1 + num2;
        break;
      case 'minus':
        result = num1 - num2;
        break;
      case 'multiplied by':
        result = num1 * num2;
        break;
      case 'divided by':
        result = num1 / num2;
        break;
      default:
        return "Invalid operation";
    }

    return result.toString();
  }

  // Handle largest number queries
  if (query.toLowerCase().includes("largest")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
        const largestNumber = Math.max(...numbers.map(Number));
        return `${largestNumber}`;
    } 
  }

  // Handle numbers that are both a square and a cube (sixth power)
  if (query.toLowerCase().includes("a square and a cube")) {
    const matches = query.match(/\d+/g);
    const numbers = matches ? matches.map(Number) : [];
    const sixthPowers = numbers.filter(num => Math.round(Math.pow(num, 1 / 6)) ** 6 === num);
    return String(sixthPowers);
  }

  // Handle prime number queries
  if (query.toLowerCase().includes("prime")) {
    const matches = query.match(/\d+/g);
    const numbers = matches ? matches.map(Number) : [];

    function isPrime(n: number): boolean {
      if (n < 2) return false;
      for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
      }
      return true;
    }

    const primes = numbers.filter(isPrime);
    return primes.length > 0 ? primes.join(", ") : "No prime numbers found";
  }

  // Default return for unrecognized queries
  return "";
}