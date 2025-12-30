import type { DualArcanaResult } from "./cycle";
import {
  getYearArcaneData,
  getPersonalArcaneData,
  getArcaneFusion,
  type MajorArcaneData,
  type ArcaneFusionDescription,
} from "../data";

/**
 * Type enrichi pour un arcane avec ses données d'interprétation
 */
export interface EnrichedArcaneResult {
  number: number;
  name: string;
  data?: MajorArcaneData;
}

/**
 * Type pour le résultat DualArcana enrichi avec toutes les interprétations
 */
export interface EnrichedDualArcanaResult {
  year: EnrichedArcaneResult;
  personal: EnrichedArcaneResult;
  fusion?: ArcaneFusionDescription;
}

/**
 * Enrichit un résultat DualArcana avec les données d'interprétation
 * 
 * @param result - Le résultat de base de getDualArcana
 * @returns Le résultat enrichi avec descriptions, keywords et fusion
 * 
 * @example
 * const result = getDualArcana(29, 10, 2026);
 * const enriched = enrichDualArcanaResult(result);
 */
export const enrichDualArcanaResult = (
  result: DualArcanaResult
): EnrichedDualArcanaResult => {
  const yearData = getYearArcaneData(result.year.number);
  const personalData = getPersonalArcaneData(result.personal.number);
  const fusion = getArcaneFusion(result.year.number, result.personal.number);

  return {
    year: {
      ...result.year,
      data: yearData,
    },
    personal: {
      ...result.personal,
      data: personalData,
    },
    fusion: fusion || undefined,
  };
};

