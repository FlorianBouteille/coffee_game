"use client"
import { useState } from "react"
import { Input } from "../form/Input"

interface BasicTrialProps {
  label: string
  placeholder?: string
  correctAnswer: string | ((answer: string) => boolean)
  onSuccess: () => void
  children?: React.ReactNode
  hints?: string[]
  caseSensitive?: boolean
  renderInput?: (answer: string, setAnswer: (v: string) => void) => React.ReactNode
  showSubmitButton?: boolean
}

export function BasicTrial({
  label,
  placeholder = "...",
  correctAnswer,
  onSuccess,
  children,
  hints,
  caseSensitive = false,
  renderInput,
  showSubmitButton = true
}: BasicTrialProps) {
  const [answer, setAnswer] = useState("")
  const [hintIndex, setHintIndex] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const checkAnswer = (input: string) => {
    const isCorrect = typeof correctAnswer === "string"
      ? (caseSensitive 
          ? input === correctAnswer 
          : input.toLowerCase() === correctAnswer.toLowerCase())
      : correctAnswer(input)

    if (isCorrect) {
      onSuccess()
    } else {
      setHintIndex((prev) => (hints ? (prev + 1) % hints.length : 0))
      setShowHint(true)
    }
  }

  return (
    <>
      {children}
      <div className="flex flex-col gap-2">
        {renderInput ? (
          renderInput(answer, setAnswer)
        ) : (
          <Input
            label={label}
            placeholder={placeholder}
            id="trial-answer"
            onChange={setAnswer}
          />
        )}
      </div>
      {showSubmitButton && (
        <button className="my-4" onClick={() => checkAnswer(answer)}>
          Valider
        </button>
      )}
      {showHint && hints && <div>{hints[hintIndex]}</div>}
    </>
  )
}
