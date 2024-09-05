import Image from 'next/image';
import Link from 'next/link';
import { useCountries } from '../lib/getCountries';
import Flag from 'react-world-flags';
import { AddToFavoriteButton, DeleteFromFavoriteButton } from './SubmitButtons';
import { Input } from '@/components/ui/input';
import { addToFavorite, DeleteFromFavorite } from '../actions';
interface iAppProps {
  imagePath: string;
  location: string;
  price: number;
  description: string;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId:string;
  pathName:string;
}
export default function ListingCard({
  imagePath,
  location,
  price,
  description,
  userId,
  pathName,
  favoriteId,
  isInFavoriteList,
  homeId,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  return (
    <div className='flex flex-col'>
      <div className='relative h-72'>
        <Image
          src={`https://zfronslehmtoeeccaqyn.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt='Image of a house'
          fill
          className='rounded-lg h-full object-cover'
        />
        {userId && (
          <div className='z-10 absolute top-2 right-2'>
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type='hidden' name='favoriteId' value={favoriteId} />
                <input type='hidden' name='userId' value={userId} />
                <input type='hidden' name='pathName' value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type='hidden' name='homeId' value={homeId} />
                <input type='hidden' name='userId' value={userId} />
                <input type='hidden' name='pathName' value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`} className='mt-2'>
        <h3 className='font-medium text-base flex'>
          <Flag code={country?.value} height='18' width='18' className='pr-1' />
          {country?.label} / {country?.region}
        </h3>
        <p className='text-muted-foreground line-clamp-2 text-sm'>
          {description}
        </p>
        <p className='text-muted-foreground pt-2'>
          <span className='text-black font-medium'>${price}</span> Night
        </p>
      </Link>
    </div>
  );
}
