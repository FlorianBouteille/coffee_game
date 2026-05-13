"use client"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label: string
  colors: string[]
}

/**
 * 💡 COMPOSANT RÉUTILISABLE
 * 
 * Un simple sélecteur de couleur avec boutons.
 * Peut être utilisé seul ou dans BasicTrial via renderInput!
 */
export function ColorPicker({ value, onChange, label, colors }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <div className="flex gap-3 justify-center">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`
              w-10 h-10 rounded-lg border-2 transition-all
              ${value === color 
                ? "border-black scale-110" 
                : "border-transparent hover:scale-105"
              }
            `}
            style={{ backgroundColor: color }}
            aria-label={`Sélectionner ${color}`}
          />
        ))}
      </div>
      {value && <p className="text-xs text-gray-600">Sélectionné: {value}</p>}
    </div>
  )
}
