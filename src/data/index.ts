import majorArcanesYearData from "./major-arcanes-year.json";
import majorArcanesPersonalData from "./major-arcanes-personal.json";
import majorArcaneFusionData from "./major-arcane-fusion.json";

/**
 * Interface pour un arcane majeur avec ses informations détaillées (année)
 */
export interface MajorArcaneYearData {
  /** Numéro de l'arcane (1-22) */
  number: number;
  /** Nom de l'arcane */
  name: string;
  /** Mots-clés associés à l'arcane */
  keywords: string[];
  /** Introduction de l'énergie de l'arcane */
  intro: string;
  /** Expérience vécue pendant cette année */
  experience: string;
  /** Défi de cette année */
  challenge: string;
  /** Résultat si bien vécue */
  outcome: string;
}

/**
 * Interface pour un arcane majeur avec ses informations détaillées (personnel)
 */
export interface MajorArcanePersonalData {
  /** Numéro de l'arcane (1-22) */
  number: number;
  /** Nom de l'arcane */
  name: string;
  /** Mots-clés associés à l'arcane */
  keywords: string[];
  /** Introduction de l'énergie de l'arcane */
  intro: string;
  /** Expérience vécue pendant cette année */
  experience: string;
  /** Défi de cette année */
  challenge: string;
  /** Résultat si bien vécue */
  outcome: string;
}

/**
 * Type union pour les données d'arcanes (année ou personnel)
 */
export type MajorArcaneData = MajorArcaneYearData | MajorArcanePersonalData;

/**
 * Type pour la liste complète des arcanes majeurs (année)
 */
export type MajorArcanesYearData = MajorArcaneYearData[];

/**
 * Type pour la liste complète des arcanes majeurs (personnel)
 */
export type MajorArcanesPersonalData = MajorArcanePersonalData[];

/**
 * Export des données typées pour les arcanes de l'année (collectif)
 */
export const majorArcanesYear: MajorArcanesYearData =
  majorArcanesYearData as MajorArcanesYearData;

/**
 * Export des données typées pour les arcanes personnels
 */
export const majorArcanesPersonal: MajorArcanesPersonalData =
  majorArcanesPersonalData as MajorArcanesPersonalData;

/**
 * Fonction helper pour obtenir les données d'un arcane de l'année par son numéro
 * @param number - Le numéro de l'arcane (1-22)
 * @returns Les données de l'arcane ou undefined si non trouvé
 */
export const getYearArcaneData = (
  number: number
): MajorArcaneYearData | undefined => {
  return majorArcanesYear.find((arcane) => arcane.number === number);
};

/**
 * Fonction helper pour obtenir les données d'un arcane personnel par son numéro
 * @param number - Le numéro de l'arcane (1-22)
 * @returns Les données de l'arcane ou undefined si non trouvé
 */
export const getPersonalArcaneData = (
  number: number
): MajorArcanePersonalData | undefined => {
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
  /** Titre de la fusion */
  title: string;
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
 * Tableau contenant un objet avec les clés = numéro de l'arcane collectif (année)
 */
export type MajorArcaneFusionData = Array<Record<string, ArcaneFusionSet>>;

/**
 * Export des données typées pour les fusions d'arcanes
 */
export const majorArcaneFusion: Record<string, ArcaneFusionSet> =
  (majorArcaneFusionData as MajorArcaneFusionData)[0] || {};

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
