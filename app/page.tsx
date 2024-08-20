import ListingCard from "./components/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "./lib/db";

async function getData() {
  const data = await prisma.home.findMany({
    where:{
      addedCategory:true,
      addedLocation:true,
      addedDescription:true,
    },
    select:{
      photo:true,
      id:true,
      description:true,
      price:true,
      country:true,
    },
  });
  return data;
}
export default async function Home() {
  const data = await getData();
  return (
    <>
   <div className="container mx-auto px-5 lg:px-10">
    <MapFilterItems></MapFilterItems>
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {data.map((item)=>(
<ListingCard key={item.id} description={item.description as string} price={item.price as number} imagePath={item.photo as string} location={item.country as string}/>
      ))}
    </div>
   </div>
    </>
   
  );
}
