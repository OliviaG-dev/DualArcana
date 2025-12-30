/**
 * Exports principaux du domaine DualArcana
 */

export { MAJOR_ARCANES } from "./arcane";
export { sumDigits, reduceToArcane } from "./numerology";
export {
  getYearArcane,
  getPersonalArcane,
  getDualArcana,
  type ArcaneResult,
  type DualArcanaResult,
} from "./cycle";
export {
  enrichDualArcanaResult,
  type EnrichedArcaneResult,
  type EnrichedDualArcanaResult,
} from "./interpretation";
