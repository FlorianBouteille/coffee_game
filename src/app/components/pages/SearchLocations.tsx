"use client"
import { Input } from "../form/Input"
import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabaseClient";

export function SearchLocations({validateTrial} : {validateTrial : () => void})
{
    const [data, setData] = useState<any[]>([])
    const [locationUrl, setLocationUrl] = useState<string | null>(null)
    const defaultImageUrl = "https://eaegnamwiiqzybxnxaid.supabase.co/storage/v1/object/public/destinations/map.jpg"

    useEffect(() => 
    {
        const fetchData = async () =>
        {
            const {data, error} = await supabase.from("destinations").select("*")
            if (error)
            {
                console.log(error)
                return ;
            }
            setLocationUrl(defaultImageUrl)
            setData(data)
        }
        fetchData()
    }, [])

    const checkDb = (s : string) =>
    {
        const found = data.find(dest => 
            dest.name.toLowerCase() === s.toLowerCase()
        )
        setLocationUrl(found?.image_url ?? defaultImageUrl)
    }

    const checkResult = (s : string) => 
    {
        if (s.toLowerCase() == "kenya")
            validateTrial()
    }

    return  <>
                <p>A l'aide du plan de vol et de la carte, trouve la destination finale ! Vite !</p>
                <Input label="entrez une destination" placeholder="Petaouchnok" id="destinations" onChange={checkDb}/>
                {locationUrl && <img src={locationUrl} alt="oops" />}
                <Input label="Destination finale !" placeholder="Petaouchnok" id="finale" onChange={checkResult}/>
            </>
}