"use client"
import { Card, CardHeader } from "@/components/ui/card"
import { categoryItems } from "../lib/categoryItems"
import Image from "next/image"
import { useState } from "react"
export default function SelectCategory() {
    const [selectedCategory,setSelectedCategory]=useState<string | undefined>(undefined);
  return (
    <div className="grid grid-cols-4 mx-auto gap-8 mt-10 w-3/5 mb-36">
        <input type="hidden" name="categoryName" value={selectedCategory as string} />
        {categoryItems.map((item)=>{
            return (
<div key={item.id} className="cursor-pointer">
    <Card className={selectedCategory === item.name ? "border-primary" : ""}
    onClick={()=>setSelectedCategory(item.name)}>
        <CardHeader>
            <Image 
            src={item.imageUrl}
            alt={item.name}
            height={32}
            width={32}
            className="w-8 h-8" 
            />
            <h3 className="font-medium">{item.title}</h3>
        </CardHeader>
    </Card>
</div>
        )})}
    </div>
  )
}