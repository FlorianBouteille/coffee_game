import { useState, useEffect } from "react"

type loadingBarTypes = 
{
    time : number,
    onFinish : (over : boolean) => void
}

export function LoadingBar({time, onFinish} : loadingBarTypes)
{
    let [percentage, setPercentage] = useState(0)
    const interval = time / 200 * 100

    useEffect (() => {
        const id = setInterval(() => {
        setPercentage(prev => {
            if (prev >= 100)
            {
                clearTimeout(id)
                return 100
            }
            return (prev + 0.05)
        })
        }, interval)
        return () => {
            clearTimeout(id)
        }
    }, [])

    useEffect (() => {
        if (percentage == 100)
            onFinish(true)
    }, [percentage])

    console.log(percentage)
    return  <div className="progressBar">
                <div className="fillBar" style={{width : percentage + "%"}}>
                </div>
            </div>
}