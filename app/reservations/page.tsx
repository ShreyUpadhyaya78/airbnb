import { data } from "emoji-flags";
import ListingCard from "../components/ListingCard";
import NoItems from "../components/NoItems";
import prisma from "../lib/db";

async function getData(userId:string){
    const data= await prisma.reservation.findMany({
        where:{
            userId:userId,
        },
    })
}
export default function ReservationsRoute() {
  return (
    <section className='lg:px-10 mt-10 px-5 container mx-auto'>
      <h2 className='text-3xl font-semibold tracking-tight'>Your Favorites</h2>
      {data.length === 0 ? (
        <NoItems
          description='Please add favorites to see them right here...'
          title='Hey you dont have any favorites'
        />
      ) : (
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8 grid-cols-1'>
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathName='/favorites'
              homeId={item.Home?.id as string}
              imagePath={item.Home?.photo as string}
              price={item.Home?.price as number}
              userId={user.id}
              favoriteId={item.Home?.Favorite[0].id as string}
              isInFavoriteList={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}