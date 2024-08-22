import { Suspense } from "react";
import ListingCard from "./components/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "./lib/db";
import SkeletonCard from "./components/SkeletonCard";

async function getData({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName:searchParams?.filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      description: true,
      price: true,
      country: true,
    },
  });
  return data;
}
export default function Home({searchParams}:{searchParams?:{filter?:string}}) {

  return (
    <>
      <div className='container mx-auto px-5 lg:px-10'>
        <MapFilterItems></MapFilterItems>
        <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />
        }> 
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
    const data = await getData({ searchParams: searchParams });
    return(
    <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
      {data.map((item) => (
        <ListingCard
          key={item.id}
          description={item.description as string}
          price={item.price as number}
          imagePath={item.photo as string}
          location={item.country as string}
        />
      ))}
    </div>
    )
}

function SkeletonLoading(){
  
  return (
    <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}