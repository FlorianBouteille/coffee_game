"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/app/lib/supabaseClient"
import { isCloseTo } from "@/app/lib/utils"
import { Input } from "../form/Input"
import { json } from "stream/consumers"

export function FlightPlan({validateTrial} : {validateTrial : () => void})
{
    const [data, setData] = useState<any[]>([])
    const [foundIds, setFoundIds] = useState<any[]>([])
    const [guess, updateGuess] = useState("")
    const [allFound, setAllfound] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase.from("destinations").select("*")
            if (error) {
                console.log(error)
                return 
            }
            setData(data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const raw = localStorage.getItem("foundDestinations")
                if (raw) {
                    setFoundIds(JSON.parse(raw))
                }
            } catch (e) {
                console.error("Erreur en parsant localStorage:", e)
                localStorage.removeItem("foundDestinations")
            }
        }
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("foundDestinations", JSON.stringify(foundIds))
        }
    }, [foundIds])

    useEffect(() => {
        const found = data.find(dest =>
            isCloseTo(guess, dest.name, 0.8)
        )
        if (found) {
            setFoundIds(prev => {
            if (prev.includes(found.id)) return prev
            return [...prev, found.id]
            })
        }
    }, [guess, data])

    useEffect(() => {
        if (foundIds.length > 0 && foundIds.length === data.length) {
            setAllfound(true)
        }
    }, [foundIds, data])

    console.log("reloading")
    return  <div className="w-full max-w-xl rounded-xl border border-black/10 bg-white/20 p-4 shadow-sm backdrop-blur-sm">
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-black/10 text-black/70">
                            <th className="px-3 py-2 font-medium">Dest Id</th>
                            <th className="px-3 py-2 font-medium">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dest) => (
                            <tr key={dest.id} className="border-b border-black/10 last:border-b-0">
                                <td className="px-3 py-2">{dest.id}</td>
                                <td className="px-3 py-2">{foundIds.includes(dest.id) ? dest.name : "******"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <input type="text" onChange={(e) => updateGuess(e.target.value)}></input>
                {allFound && <button onClick={() => validateTrial()} className="mt-4 rounded-full bg-green-500/30 px-4 py-2 font-medium hover:bg-green-500/50">Bravo !</button>}
            </div>
}
