import { MAJOR_ARCANES } from "./arcane";
import { reduceToArcane, sumDigits } from "./numerology";

/**
 * Calcule l'arcane de l'année (collectif)
 *
 * On additionne les chiffres de l'année :
 * 2026 → 2 + 0 + 2 + 6 = 10 → Arcane X
 *
 * @param year - L'année (ex: 2026)
 * @returns Le numéro de l'arcane (1–22)
 *
 * @example
 * getYearArcane(2026) // 10
 */
export const getYearArcane = (year: number): number => {
  const sum = sumDigits(year);
  return reduceToArcane(sum);
};

/**
 * Calcule l'arcane personnel (année personnelle)
 *
 * Formule : Jour + Mois + Année
 *
 * Exemple :
 * 29 / 10 / 2026
 * (2+9) + (1+0) + (2+0+2+6)
 * 11 + 1 + 10 = 22 → Le Mat
 *
 * @param day - Le jour de naissance (1–31)
 * @param month - Le mois de naissance (1–12)
 * @param year - L'année (ex: 2026)
 * @returns Le numéro de l'arcane personnel (1–22)
 *
 * @example
 * getPersonalArcane(29, 10, 2026) // 22
 */
export const getPersonalArcane = (
  day: number,
  month: number,
  year: number
): number => {
  const daySum = sumDigits(day);
  const monthSum = sumDigits(month);
  const yearSum = sumDigits(year);

  const total = daySum + monthSum + yearSum;
  return reduceToArcane(total);
};

/**
 * Type représentant un arcane avec son numéro et son nom
 */
export interface ArcaneResult {
  number: number;
  name: string;
}

/**
 * Type représentant le résultat DualArcana
 */
export interface DualArcanaResult {
  year: ArcaneResult;
  personal: ArcaneResult;
}

/**
 * Calcule les deux arcanes : de l'année et personnel
 *
 * @param day - Le jour de naissance (1–31)
 * @param month - Le mois de naissance (1–12)
 * @param year - L'année (ex: 2026)
 * @returns Un objet contenant l'arcane de l'année et l'arcane personnel
 *
 * @example
 * getDualArcana(29, 10, 2026)
 * // {
 * //   year: { number: 10, name: "La Roue de Fortune" },
 * //   personal: { number: 22, name: "Le Mat" }
 * // }
 */
export const getDualArcana = (
  day: number,
  month: number,
  year: number
): DualArcanaResult => {
  const yearArcane = getYearArcane(year);
  const personalArcane = getPersonalArcane(day, month, year);

  return {
    year: {
      number: yearArcane,
      name: MAJOR_ARCANES[yearArcane],
    },
    personal: {
      number: personalArcane,
      name: MAJOR_ARCANES[personalArcane],
    },
  };
};
