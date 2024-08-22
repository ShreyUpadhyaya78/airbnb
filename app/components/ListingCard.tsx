import Image from 'next/image';
import Link from 'next/link';
import { useCountries } from '../lib/getCountries';
import Flag from 'react-world-flags';
interface iAppProps {
  imagePath: string;
  location: string;
  price: number;
  description: string;
}
export default function ListingCard({
  imagePath,
  location,
  price,
  description,
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
      </div>
      <Link href={'/'} className="mt-2">
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
