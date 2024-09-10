"use client";
import { useCountries } from '@/app/lib/getCountries';
import Flag from 'react-world-flags';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import CreationBottomBar from '@/app/components/CreationBottomBar';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { createLocation } from '@/app/actions';

export default function AddressRoute({params}:{params:{id:string}}) {
  const { getAllCountries } = useCountries();
  const [locationValue,setLocationValue]=useState("");
  const LazyMap=dynamic(()=> import ("@/app/components/Map"),{
ssr:false,
loading:()=><Skeleton className='h-[50vh] w-full'/>
  })
  return (
    <>
      <div className='w-3/5 mx-auto'>
        <h2 className='text-3xl tracking-tight font-semibold mb-10 transition-colors'>
          Where is your Home located?
        </h2>
      </div>
      <form action={createLocation}>
        <Input type='hidden' name='homeId' value={params.id} />
        <Input type='hidden' name='countryValue' value={locationValue} />
        <div className='w-3/5 mx-auto mb-36'>
          <div className='mb-5'>
            <Select required onValueChange={(value)=>setLocationValue(value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a Country' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <div className='flex'>
                        <Flag code={item.value} height='19' width='19' className='pr-1' />{' '}
                        {item.label} / {item.region}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={locationValue} />
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
