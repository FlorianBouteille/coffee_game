import { Input } from "../form/Input"
import { useState } from "react"

type enterTypes = 
{
    validateTrial: (n : number) => void
}

export function Enter({validateTrial} : enterTypes)
{
    const hints = [
        "Je ne crois pas...",
        "Etes vous sur de vous ?",
        "Un nom d'aventurier doit etre plus FLAMBOYANT"
    ]
    const [answer, setAnswer] = useState("")
    const [hintVisible, setHintVisible] = useState(false)
    const [hintIndex, setHintIndex] = useState(0)

    const checkAnswer = (answer : string) =>
    {
        if (answer.toLowerCase() == "galafeu")
             return validateTrial(2)
        setHintIndex((hintIndex + 1) % 3)
        setHintVisible(true)
    }

    return  <>
                <Input  placeholder="..." 
                        label="Entrez votre blase !" 
                        id="nameInput" 
                        onChange={setAnswer} />
                <button onClick={() => checkAnswer(answer)}>Valider</button>
                {hintVisible && <div>{hints[hintIndex]}</div>}
            </>
}