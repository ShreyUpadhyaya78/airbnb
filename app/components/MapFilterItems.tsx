import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import Link from "next/link";
export default function MapFilterItems() {
  return (
    <div className="flex gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
        {categoryItems.map((item) => {
            return (
              <Link key={item.id} href=''>
                <div className='relative w-6 h-6'>
                  <Image
                    src={item.imageUrl}
                    alt='Category Image'
                    className='w-6 h-6'
                    width={24}
                    height={24}
                  />
                </div>
                <p className="text-xs font-medium">{item.title}</p>
              </Link>
            );})}

    </div>
  )
}