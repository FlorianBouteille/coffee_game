type inputTypes = 
{
    placeholder: string,
    label: string, 
    id: string,
    onChange: (value:string) => void
}

export function Input({placeholder, label, id, onChange} : inputTypes)
{
    return  <>
                {label && <label htmlFor={id}>{label}</label>}
                <input type="text" placeholder={placeholder} id={id} onChange={(e) => onChange(e.target.value)}></input>
            </>

}