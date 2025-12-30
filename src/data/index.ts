import majorArcanesYearData from "./major-arcanes-year.json";
import majorArcanesPersonalData from "./major-arcanes-personal.json";
import majorArcaneFusionData from "./major-arcane-fusion.json";

/**
 * Interface pour un arcane majeur avec ses informations détaillées
 */
export interface MajorArcaneData {
  /** Numéro de l'arcane (1-22) */
  number: number;
  /** Nom de l'arcane */
  name: string;
  /** Mots-clés associés à l'arcane */
  keywords: string[];
  /** Description de l'énergie de l'arcane */
  description: string;
}

/**
 * Type pour la liste complète des arcanes majeurs
 */
export type MajorArcanesData = MajorArcaneData[];

/**
 * Export des données typées pour les arcanes de l'année (collectif)
 */
export const majorArcanesYear: MajorArcanesData =
  majorArcanesYearData as MajorArcanesData;

/**
 * Export des données typées pour les arcanes personnels
 */
export const majorArcanesPersonal: MajorArcanesData =
  majorArcanesPersonalData as MajorArcanesData;

/**
 * Fonction helper pour obtenir les données d'un arcane de l'année par son numéro
 * @param number - Le numéro de l'arcane (1-22)
 * @returns Les données de l'arcane ou undefined si non trouvé
 */
export const getYearArcaneData = (
  number: number
): MajorArcaneData | undefined => {
  return majorArcanesYear.find((arcane) => arcane.number === number);
};

/**
 * Fonction helper pour obtenir les données d'un arcane personnel par son numéro
 * @param number - Le numéro de l'arcane (1-22)
 * @returns Les données de l'arcane ou undefined si non trouvé
 */
export const getPersonalArcaneData = (
  number: number
): MajorArcaneData | undefined => {
  return majorArcanesPersonal.find((arcane) => arcane.number === number);
};

/**
 * Fonction helper générique pour obtenir les données d'un arcane
 * @param number - Le numéro de l'arcane (1-22)
 * @param type - Type d'arcane : 'year' ou 'personal'
 * @returns Les données de l'arcane ou undefined si non trouvé
 */
export const getArcaneData = (
  number: number,
  type: "year" | "personal" = "year"
): MajorArcaneData | undefined => {
  return type === "year"
    ? getYearArcaneData(number)
    : getPersonalArcaneData(number);
};

/**
 * Interface pour une description de fusion entre deux arcanes
 */
export interface ArcaneFusionDescription {
  /** Description de la fusion entre l'arcane collectif et personnel */
  description: string;
}

/**
 * Interface pour les fusions d'un arcane collectif avec tous les arcanes personnels
 */
export interface ArcaneFusionSet {
  /** Nom de l'arcane collectif */
  collectiveName: string;
  /** Fusions avec chaque arcane personnel (clé = numéro de l'arcane personnel) */
  fusion: Record<string, ArcaneFusionDescription>;
}

/**
 * Type pour les données de fusion des arcanes
 * Clé = numéro de l'arcane collectif (année)
 */
export type MajorArcaneFusionData = Record<string, ArcaneFusionSet>;

/**
 * Export des données typées pour les fusions d'arcanes
 */
export const majorArcaneFusion: MajorArcaneFusionData =
  majorArcaneFusionData as MajorArcaneFusionData;

/**
 * Fonction helper pour obtenir la description de fusion entre un arcane collectif et personnel
 * @param yearArcaneNumber - Le numéro de l'arcane de l'année (1-22)
 * @param personalArcaneNumber - Le numéro de l'arcane personnel (1-22)
 * @returns La description de la fusion ou undefined si non trouvée
 */
export const getArcaneFusion = (
  yearArcaneNumber: number,
  personalArcaneNumber: number
): ArcaneFusionDescription | undefined => {
  const yearKey = yearArcaneNumber.toString();
  const personalKey = personalArcaneNumber.toString();

  const fusionSet = majorArcaneFusion[yearKey];
  if (!fusionSet) return undefined;

  return fusionSet.fusion[personalKey];
};

/**
 * Fonction helper pour obtenir toutes les fusions d'un arcane collectif
 * @param yearArcaneNumber - Le numéro de l'arcane de l'année (1-22)
 * @returns L'objet de fusion ou undefined si non trouvé
 */
export const getArcaneFusionSet = (
  yearArcaneNumber: number
): ArcaneFusionSet | undefined => {
  const yearKey = yearArcaneNumber.toString();
  return majorArcaneFusion[yearKey];
};
