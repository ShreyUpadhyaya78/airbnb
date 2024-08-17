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

export default function addressRoute() {
  const { getAllCountries } = useCountries();
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
      <form action=''>
        <div className='w-3/5 mx-auto mb-36'>
          <div className='mb-5'>
            <Select required>
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
          <LazyMap />
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
