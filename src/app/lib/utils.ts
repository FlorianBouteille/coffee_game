/**
 * 🧰 UTILS - Boite à outils pour les epreuves
 * 
 * Contient des fonctions utilitaires réutilisables
 */

/**
 * Normalise une string pour la comparaison
 * - Minuscules
 * - Supprime les accents
 * - Remplace les tirets par des espaces
 * - Supprime les espaces multiples
 */
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    // Supprimer les accents (é -> e, ç -> c, etc.)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Remplacer tirets par espaces
    .replace(/-/g, " ")
    // Supprimer espaces multiples
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Calcule la distance de Levenshtein entre deux strings
 * 
 * La distance = nombre minimum de modifications (insertion, suppression, substitution)
 * pour transformer une string en une autre
 * 
 * Ex:
 * - "galafeu" vs "galafeau" = 1 (1 insertion)
 * - "hello" vs "hallo" = 1 (1 substitution)
 * - "abc" vs "xyz" = 3 (3 substitutions)
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // suppression
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

/**
 * Calcule le ratio de similitude entre deux strings (0 à 1)
 * 
 * Formule: (longueur_totale - distance_levenshtein) / longueur_totale
 * 
 * Ex:
 * - 1.0 = identique
 * - 0.8 = 80% similaire
 * - 0.0 = complètement différent
 */
function similarityRatio(a: string, b: string): number {
  const distance = levenshteinDistance(a, b)
  const maxLength = Math.max(a.length, b.length)
  
  if (maxLength === 0) return 1.0 // Les deux strings sont vides
  
  return 1 - (distance / maxLength)
}

/**
 * Vérifie si deux strings sont "suffisamment proches"
 * 
 * Tolerance aux:
 * - Majuscules/minuscules
 * - Accents (é, è, ê, etc.)
 * - Tirets vs espaces (hello-world = hello world)
 * - Petites fautes de frappe (jusqu'au seuil de similitude)
 * 
 * @param answer - La réponse de l'utilisateur
 * @param expected - La réponse attendue
 * @param threshold - Seuil de similitude (0-1). Défaut: 0.8 (80%)
 * 
 * Exemples:
 * - isCloseTo("Galafeu", "galafeu") → true (majuscules)
 * - isCloseTo("galafeu", "galaféu") → true (accents)
 * - isCloseTo("galafeu", "gala-feu") → true (tiret)
 * - isCloseTo("galafeu", "galafw") → true (80% similaire)
 * - isCloseTo("galafeu", "hello") → false (trop différent)
 * - isCloseTo("kenya", "kenia", 0.75) → true (83% similaire, seuil 75%)
 */
export function isCloseTo(
  answer: string,
  expected: string,
  threshold: number = 0.8
): boolean {
  const normalized1 = normalizeString(answer)
  const normalized2 = normalizeString(expected)

  // Si c'est exactement pareil après normalisation
  if (normalized1 === normalized2) return true

  // Sinon, vérifier le ratio de similitude
  const similarity = similarityRatio(normalized1, normalized2)
  return similarity >= threshold
}

/**
 * Version stricte: vérifie juste la normalisation (accents, majuscules, espaces)
 * Pas de tolerance aux fautes de frappe
 * 
 * Exemple:
 * - isCloseToStrict("Galafeu", "galafeu") → true
 * - isCloseToStrict("galafeu", "galafw") → false
 */
export function isCloseToStrict(answer: string, expected: string): boolean {
  return normalizeString(answer) === normalizeString(expected)
}

// Export les fonctions internes au cas où on en aurait besoin
export { normalizeString, levenshteinDistance, similarityRatio }
