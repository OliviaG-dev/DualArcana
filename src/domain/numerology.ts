/**
 * Additionne les chiffres d'un nombre
 * @param value - Le nombre à traiter
 * @returns La somme des chiffres
 * 
 * @example
 * sumDigits(2026) // 2 + 0 + 2 + 6 = 10
 */
export const sumDigits = (value: number): number =>
  value
    .toString()
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);

/**
 * Réduit un nombre à un arcane valide (1–22)
 * 
 * Règles :
 * - Les nombres maîtres 11 et 22 ne sont pas réduits
 * - Si le résultat > 22, on réduit jusqu'à obtenir 1–22
 * - 0 n'existe pas → 22 = Le Mat
 * 
 * @param value - Le nombre à réduire
 * @returns Un nombre entre 1 et 22
 * 
 * @example
 * reduceToArcane(29) // 2 + 9 = 11 → 11
 * reduceToArcane(45) // 4 + 5 = 9 → 9
 */
export const reduceToArcane = (value: number): number => {
  // Les nombres maîtres ne sont pas réduits
  if (value === 11 || value === 22) return value;

  let result = value;

  // Réduction jusqu'à obtenir 1–22
  while (result > 22) {
    result = sumDigits(result);
    // Si après réduction on obtient un nombre maître, on le garde
    if (result === 11 || result === 22) return result;
  }

  // 0 n'existe pas → 22 = Le Mat
  if (result === 0) return 22;

  return result;
};

