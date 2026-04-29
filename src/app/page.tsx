"use client";
import Image from "next/image";
import { supabase } from "./lib/supabaseClient";
import { useState, useEffect } from "react";

export default function Home() 
{
  const [data, setData] = useState<any[]>([]);
  const [currentTrial, setCurrentTrial] = useState(1)

  let pageContent = null

  switch (currentTrial)
  {
    case(1):
      pageContent = <Enter />
      break
    default:
      break
  }

  useEffect(() => {
    const fetchData = async () => {
      const {data, error} = await supabase.from("trials").select("*")
      if (error)
      {
        console.log(error)
        return
      }
      setData(data || [])
    }
    fetchData()
  }, []);

  return (
    <div>
      <h1>Coffee Game</h1>
      <div>{data.map((row : any) => (
        <p key={row.id}>{row.name}</p>
      ))}</div>
    </div>
  );
}
