/**
 * 📚 COMPOSANT BASICTRAIL - COURS COMPLET REACT & TYPESCRIPT
 * 
 * Ce fichier est conçu comme un COURS pour comprendre React et TypeScript.
 * Il explique en détail comment fonctionnent les concepts clés.
 */

// ============================================================================
// 1️⃣ IMPORTS - COMPRENDRE POURQUOI ON IMPORTE QUOI
// ============================================================================

/**
 * React: La librairie de base. Elle fournit les composants et les hooks.
 * 
 * 💡 POURQUOI "import { useState }"?
 * - React fournit des FONCTIONS appelées "hooks" (crochets)
 * - Les hooks permettent d'utiliser l'état et d'autres features dans des
 *   composants fonctionnels (vs les anciennes classes)
 * - On utilise la destructuration { } pour importer UNIQUEMENT ce qu'on utilise
 */
import { useState } from "react"

/**
 * Import du composant Input depuis le dossier form.
 * 
 * 💡 CHEMIN RELATIF: "../form/Input"
 * - ".." = monte d'un dossier (on sort de "pages", on va à "components")
 * - "./form" = entre dans le dossier "form"
 * - "/Input" = le fichier Input.tsx (on omet l'extension .tsx)
 */
import { Input } from "../form/Input"

// ============================================================================
// 2️⃣ TYPAGE TYPESCRIPT - CRÉER UNE "INTERFACE" (CONTRAT)
// ============================================================================

/**
 * ✨ INTERFACE = Un "contrat" qui dit: "Voici les props que ce composant attend"
 * 
 * TypeScript force à respecter ce contrat. Si tu oublies une prop requise,
 * TypeScript te montre une ERREUR à la compilation (avant même de lancer l'app!)
 * 
 * 💡 AVANTAGES:
 * - Autocomplétion dans VS Code (Ctrl+Space)
 * - Détection d'erreurs AVANT d'exécuter le code
 * - Documentation automatique des props attendues
 */
interface BasicTrialProps {
  /**
   * @label - Le texte affiché au-dessus du champ input
   * Exemple: "Entrez votre nom"
   */
  label: string

  /**
   * @placeholder - Le texte gris à l'intérieur du champ (avant qu'on tape)
   * Exemple: "Galafeu"
   * 
   * 💡 "?" = OPTIONNEL
   * Si tu fournis pas cette prop, elle vaudra undefined.
   * Dans le code, on utilise || pour donner une valeur par défaut.
   */
  placeholder?: string

  /**
   * @correctAnswer - LA RÉPONSE ATTENDUE
   * 
   * 💡 UNION TYPES (string | fonction)
   * "string | ((answer: string) => boolean)" signifie:
   * - SOIT une string "galafeu" (simple)
   * - SOIT une fonction qui prend une string et retourne true/false (complexe)
   * 
   * Exemple:
   * - Simple: correctAnswer="galafeu"
   * - Complexe: correctAnswer={(ans) => ans.length > 3}
   */
  correctAnswer: string | ((answer: string) => boolean)

  /**
   * @onSuccess - CALLBACK appelée quand la réponse est correcte
   * 
   * 💡 CALLBACK = Une fonction passée en paramètre
   * C'est le composant ENFANT qui l'appelle quand quelque chose se passe.
   * Le composant PARENT décide quoi faire (ex: router.push("/trials/3"))
   * 
   * POURQUOI ne pas directement appeler router.push dans BasicTrial?
   * → Parce qu'on veut que BasicTrial soit RÉUTILISABLE
   * → Le parent décide de la logique métier, l'enfant gère juste l'UI
   */
  onSuccess: () => void

  /**
   * @children - Le contenu ENFANT du composant
   * 
   * 💡 CHILDREN en React:
   * Si tu écris:
   *   <BasicTrial>
   *     <p>Mon texte</p>
   *   </BasicTrial>
   * 
   * Alors "children" = "<p>Mon texte</p>"
   * 
   * On peut l'afficher en écrivant "{children}" dans le JSX
   * 
   * TYPE "React.ReactNode":
   * - Accepte: string, ReactElement, Fragment, null, undefined
   * - C'est le type UNIVERSEL pour "n'importe quel contenu React"
   */
  children?: React.ReactNode

  /**
   * @hints - Tableau de messages d'aide quand la réponse est MAUVAISE
   * 
   * 💡 TYPES AVANCÉS:
   * "string[]" = un tableau de strings
   * Le "?" le rend optionnel
   * 
   * Exemple:
   * hints={["Essaye encore", "C'est faux", "Vraiment pas bon"]}
   */
  hints?: string[]

  /**
   * @caseSensitive - Est-ce que "Galafeu" != "galafeu"?
   * 
   * 💡 BOOLEAN PAR DÉFAUT:
   * Si on ne précise pas cette prop, elle vaudra FALSE.
   * Avec "= false" ici, on donne une valeur par défaut DANS l'interface.
   * Dans React, c'est une convention courante.
   */
  caseSensitive?: boolean
}

// ============================================================================
// 3️⃣ COMPOSANT PRINCIPAL - COMPRENDRE LES HOOKS ET LE RENDU
// ============================================================================

/**
 * ✨ COMPOSANT FONCTIONNEL
 * 
 * 💡 POURQUOI "export function"?
 * - "export" = on peut l'importer dans d'autres fichiers
 * - "function" = c'est une fonction JavaScript normale
 * - Les composants React = simplement des fonctions qui retournent du JSX!
 * 
 * 💡 "React before 17 / after 17":
 * Avant React 17, on DEVAIT importer React.
 * Depuis React 17, c'est automatique. Mais on peut l'importer quand même.
 */
export function BasicTrial({
  label,
  placeholder = "...",
  correctAnswer,
  onSuccess,
  children,
  hints,
  caseSensitive = false
}: BasicTrialProps) {
  /**
   * ============================================================================
   * 🪝 HOOK #1: useState - GÉRER L'ÉTAT LOCAL
   * ============================================================================
   * 
   * 💡 QU'EST-CE QUE L'ÉTAT (state)?
   * L'état = les données qui CHANGENT au fil du temps dans ton composant.
   * Ex: La valeur tapée dans l'input, si on affiche les hints, etc.
   * 
   * 💡 POURQUOI useState et pas juste une variable?
   * 
   * ❌ MAUVAIS:
   * let answer = ""
   * answer = "hello" // Ça change la variable, mais React ne le VOIT PAS!
   * → React ne re-rend pas le composant, l'UI ne change pas.
   * 
   * ✅ BON:
   * const [answer, setAnswer] = useState("")
   * setAnswer("hello") // React VOIT le changement et re-rend!
   * → L'UI se met à jour automatiquement.
   * 
   * 💡 DESTRUCTURING [answer, setAnswer]:
   * useState() retourne un TABLEAU avec 2 éléments:
   * - answer (index 0) = la valeur ACTUELLE
   * - setAnswer (index 1) = la fonction pour CHANGER la valeur
   */
  const [answer, setAnswer] = useState("")
  // La valeur par défaut "" = un input vide au démarrage

  /**
   * 💡 ÉTAT #2: Quel hint afficher?
   * 
   * Exemple: hints = ["Essaye", "Faux", "Non"]
   * hintIndex = 0 → affiche "Essaye"
   * hintIndex = 1 → affiche "Faux"
   * hintIndex = 2 → affiche "Non"
   * 
   * On incrémente avec (prev + 1) % hints.length pour "tourner en boucle"
   */
  const [hintIndex, setHintIndex] = useState(0)

  /**
   * 💡 ÉTAT #3: Montrer ou cacher les hints?
   * 
   * Booléen = true (affiche) ou false (cache)
   * Au démarrage = false (on ne montre rien)
   */
  const [showHint, setShowHint] = useState(false)

  // ============================================================================
  // 🎯 FONCTION: Vérifier si la réponse est correcte
  // ============================================================================

  /**
   * ✨ CETTE FONCTION EST APPELÉE QUAND L'UTILISATEUR CLIQUE "VALIDER"
   * 
   * 💡 PORTÉE ET CLOSURES:
   * Cette fonction a accès à:
   * - "correctAnswer" (prop passée du parent)
   * - "caseSensitive" (prop du parent)
   * - setAnswer(), setHintIndex(), setShowHint() (hooks)
   * - "hints" (prop)
   * 
   * C'est une CLOSURE = une fonction qui "capture" des variables
   * de son environnement.
   * 
   * Quand tu passes checkAnswer() en callback (ex: onClick={checkAnswer}),
   * React se souvient des variables qu'elle utilise.
   */
  const checkAnswer = (input: string) => {
    /**
     * 💡 ÉTAPE 1: Vérifier le type de correctAnswer
     * 
     * "typeof correctAnswer === 'string'" = est-ce que c'est une string?
     * 
     * ✨ TERNAIRE (raccourci if/else):
     * condition ? valeur_si_vrai : valeur_si_faux
     */
    const isCorrect = typeof correctAnswer === "string"
      /**
       * 💡 SI C'EST UNE STRING:
       * 
       * Vérifier: input === correctAnswer (ou case-insensitive)
       * 
       * ✨ "caseSensitive ? ... : ..."
       * Si caseSensitive = true → comparer "Galafeu" vs "Galafeu"
       * Si caseSensitive = false → comparer "galafeu" vs "galafeu"
       *
       * .toLowerCase() = convertir en minuscules
       * Ex: "GALAFEU".toLowerCase() = "galafeu"
       */
      ? (caseSensitive 
          ? input === correctAnswer 
          : input.toLowerCase() === correctAnswer.toLowerCase())
      /**
       * 💡 SINON C'EST UNE FONCTION:
       * 
       * Appeler la fonction avec la réponse.
       * La fonction retourne true/false.
       * 
       * Exemple:
       * correctAnswer = (ans) => ans.length > 3
       * correctAnswer("hello") → true (5 lettres > 3)
       * correctAnswer("hi") → false (2 lettres < 3)
       */
      : correctAnswer(input)

    /**
     * 💡 ÉTAPE 2: RÉAGIR AU RÉSULTAT
     */
    if (isCorrect) {
      /**
       * ✅ BONNE RÉPONSE!
       * 
       * Appeler onSuccess() = la fonction passée par le PARENT.
       * 
       * Ex: Le parent a écrit:
       *   <BasicTrial onSuccess={() => router.push("/trials/3")} />
       * 
       * Quand on appelle onSuccess() ici,
       * ça exécute "router.push("/trials/3")" là-bas.
       * 
       * C'EST ÇA QUI REND LES COMPOSANTS RÉUTILISABLES!
       */
      onSuccess()
    } else {
      /**
       * ❌ MAUVAISE RÉPONSE!
       * 
       * Si des hints sont fournis, passer au suivant.
       * Sinon, rien ne se passe.
       */
      if (hints) {
        /**
         * 💡 setHintIndex((prev) => ...)
         * 
         * C'est la forme "updater function" de setState.
         * 
         * ❌ MAUVAIS (bug possible):
         * setHintIndex(hintIndex + 1)
         * → Si React fait 2 setState très vite, ça peut bugger
         * 
         * ✅ BON:
         * setHintIndex((prev) => prev + 1)
         * → React garantit que prev = la VRAIE valeur précédente
         * 
         * (prev + 1) % hints.length = boucler quand on arrive au bout
         * Ex: Si 3 hints, et prev = 2:
         * (2 + 1) % 3 = 3 % 3 = 0 (retour au début!)
         */
        setHintIndex((prev) => (prev + 1) % hints.length)
      }
      
      /**
       * Afficher le hint (passer de false à true)
       */
      setShowHint(true)
    }
  }

  // ============================================================================
  // ⚛️ RETURN - QU'EST-CE QUE LE COMPOSANT AFFICHE?
  // ============================================================================

  /**
   * ✨ JSX = "JavaScript XML"
   * 
   * On peut écrire du HTML directement en JavaScript!
   * Mais attention: ce n'est pas du vrai HTML, React le transforme.
   * 
   * 💡 RÈGLES JSX IMPORTANTES:
   * 1. Un seul élément racine (ou <> ... </>)
   * 2. className au lieu de class
   * 3. onClick au lieu de onclick
   * 4. Les variables vont entre { }
   */
  return (
    <>
      {/**
        * ✨ FRAGMENT React = <>...</>
        * 
        * Permet de retourner plusieurs éléments sans wrapper div.
        * C'est l'équivalent moderne de <React.Fragment>.
        * 
        * Avant: Fallait faire <div><p/><p/></div> pour 2 paragraphes
        * Maintenant: <><p/><p/></> sans div inutile
        */}

      {/**
        * 💡 AFFICHER children
        * 
        * Si le parent a écrit:
        * <BasicTrial>
        *   <p>Bonjour</p>
        * </BasicTrial>
        * 
        * Alors {children} sera <p>Bonjour</p>
        * 
        * Si children est undefined (vide), ça affiche rien (pas d'erreur).
        */}
      {children}

      {/**
        * 💡 COMPOSANT CUSTOM = Input
        * 
        * On importe depuis "../form/Input"
        * 
        * On lui passe des props:
        * - label: ce qu'on veut afficher
        * - placeholder: le texte gris
        * - id: identifiant unique (important pour l'accessibilité)
        * - onChange: CALLBACK appelée quand l'user tape
        * 
        * ✨ onChange={(newValue) => setAnswer(newValue)}
        * 
        * Chaque fois que l'utilisateur tape:
        * 1. Le Input appelle onChange(newValue)
        * 2. On appelle setAnswer(newValue)
        * 3. React détecte le changement d'état
        * 4. React re-rend le composant avec la nouvelle valeur
        * 5. L'utilisateur voit le texte apparaître instantanément
        * 
        * C'EST ÇA LE "REACTIVE" DE REACT!
        */}
      <Input
        label={label}
        placeholder={placeholder}
        id="trial-answer"
        onChange={(newValue) => setAnswer(newValue)}
      />

      {/**
        * 💡 BOUTON VALIDER
        * 
        * onClick = appelé quand on clique
        * 
        * ✨ onClick={() => checkAnswer(answer)}
        * 
        * POURQUOI une ARROW FUNCTION () => ?
        * 
        * ❌ MAUVAIS:
        * onClick={checkAnswer(answer)}
        * → Ça exécute checkAnswer IMMÉDIATEMENT (au render)!
        * → On ne clique pas, mais ça s'exécute quand même.
        * 
        * ✅ BON:
        * onClick={() => checkAnswer(answer)}
        * → C'est une fonction QUI sera appelée au clic
        * → Pas exécutée maintenant, exécutée plus tard au clic
        * 
        * C'est une CLOSURE: la fonction se souvient de "answer"
        * au moment où elle a été créée.
        */}
      <button onClick={() => checkAnswer(answer)}>
        Valider
      </button>

      {/**
        * 💡 AFFICHAGE CONDITIONNEL
        * 
        * "showHint && <div>{hints[hintIndex]}</div>"
        * 
        * ✨ OPÉRATEUR && (ET logique):
        * - Si showHint = true ET hints existe: afficher le hint
        * - Sinon: ne rien afficher
        * 
        * Pourquoi "hints && hints[hintIndex]"?
        * → Si hints est undefined, hints[0] crasherait
        * → L'opérateur && protège: undefined && X = undefined (pas d'erreur)
        */}
      {showHint && hints && <div>{hints[hintIndex]}</div>}

      {/**
        * Fin du Fragment
        */}
    </>
  )
}

// ============================================================================
// 📝 RÉSUMÉ DES CONCEPTS CLÉS
// ============================================================================

/**
 * ✨ COMPOSANT REACT:
 * 1. C'est une FONCTION qui retourne du JSX
 * 2. Elle reçoit des PROPS (propriétés/arguments)
 * 3. Elle gère l'ÉTAT (données qui changent) avec useState
 * 4. Elle retourne ce qu'on VOIT à l'écran
 * 
 * ✨ CYCLE DE VIE SIMPLIFIÉ:
 * 1. Le composant monte (première fois qu'on l'affiche)
 * 2. L'utilisateur fait quelque chose (clique, tape)
 * 3. On appelle setState (ex: setAnswer)
 * 4. React détecte le changement
 * 5. React RE-REND le composant (l'exécute à nouveau)
 * 6. L'écran se met à jour avec les nouvelles valeurs
 * 
 * ✨ TYPESCRIPT:
 * 1. Ajoute des TYPES au JavaScript
 * 2. Détecte les erreurs AVANT d'exécuter
 * 3. Donne de l'autocomplétion (super utile!)
 * 4. Interface = contrat des props attendues
 * 5. Union Types (|) = plusieurs possibilités
 * 
 * ✨ RÉUTILISABILITÉ:
 * Ce composant marche pour NB IMPORTE QUEL essai simple!
 * - Essai 1: Deviner un nom
 * - Essai 2: Compter des lettres
 * - Essai X: Valider n'importe quelle réponse
 * 
 * Tout est customizable via les props.
 * C'est la FORCE de React!
 */
