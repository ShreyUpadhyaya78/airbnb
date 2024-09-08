import CategoryShowcase from '@/app/components/CategoryShowcase';
import HomeMap from '@/app/components/HomeMap';
import SelectCalendar from '@/app/components/SelectCalendar';
import prisma from '@/app/lib/db';
import { useCountries } from '@/app/lib/getCountries';
import { Separator } from '@/components/ui/separator';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import Flag from 'react-world-flags';

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bathrooms: true,
      bedrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      createdAt:true,
      User:{
        select:{
            profileImage:true,
            firstName:true,
        }
      }
    },
  });
  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const {getCountryByValue}=useCountries();
  const country =getCountryByValue(data?.country as string);
  return (
    <>
      <div className='mx-auto mt-10 w-[75%] mb-12'>
        <h1 className='font-medium text-2xl mb-5 '>{data?.title}</h1>
        <div className='relative h-[550px]'>
          <Image
            alt='Image of home'
            src={`https://zfronslehmtoeeccaqyn.supabase.co/storage/v1/object/public/images/${data?.photo}`}
            className='rounded-lg h-full w-full object-cover'
            fill
          />
        </div>
        <div className='flex justify-between mt-8 gap-x-24'>
          <div className='w-2/3'>
            <h3 className='font-medium text-xl flex tracking-normal'>
              <Flag
                code={country?.value}
                height='18'
                width='18'
                className='pr-1'
              />
              {country?.label} / {country?.region}
            </h3>
            <div className='flex gap-x-2 text-muted-foreground'>
              <p>{data?.guests} Guests</p>*<p>{data?.bedrooms} Bedrooms</p>*{' '}
              {data?.bathrooms} Bathrooms
            </div>
            <div className='flex mt-6 items-center'>
              <img
                src={
                  data?.User?.profileImage ??
                  'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                }
                alt='User Profile Image'
                className='w-11 h-11 rounded-full'
              />
            <div className="flex-col flex ml-4">
<h3 className='font-medium'>Hosted by {data?.User?.firstName}</h3>
            <p className='text-sm text-muted-foreground'>Host since 2018</p>
            </div>
            </div>
            <Separator className="my-7"/>
            <CategoryShowcase categoryName={data?.categoryName as string} />
            <Separator className="my-7"/>
            <p className="text-muted-foreground text-justify">{data?.description}</p>
            <Separator className="my-7"/>
            <HomeMap locationValue={country?.value as string} />
          </div>
          <SelectCalendar />
        </div>
      </div>
    </>
  );
}
