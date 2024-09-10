'use client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Flag from 'react-world-flags';
import { useCountries } from '../lib/getCountries';
import HomeMap from './HomeMap';
import { Button } from '@/components/ui/button';
import CreationSubmit from './SubmitButtons';
import { Card, CardHeader } from '@/components/ui/card';
import Counter from './Counter';

export default function SearchModalComponent() {
  const [step, setStep] = useState(1);
    const { getAllCountries } = useCountries();
    const [locationValue, setLocationValue] = useState('');
    function SubmitButtonLocal(){
        if (step === 1){
            return (
              <Button onClick={() => setStep(step + 1)} type='button'>
                Next
              </Button>
            );
         }
         else if(step === 2){
            return (
                <CreationSubmit />
            );
         }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='rounded-full py-2 px-5 border flex cursor-pointer items-center'>
          <div className='divide-x flex h-full font-medium'>
            <p className='px-4'>Anywhere</p>
            <p className='px-4'>Any Week</p>
            <p className='px-4'>Add guests</p>
          </div>
          <Search className='bg-primary text-white p-1 h-8 w-8 rounded-full' />
        </div>
      </DialogTrigger>
      <DialogContent className='sm:mx-w-[425px]'>
        <form className='gap-4 flex flex-col'>
            <input type='hidden' value={locationValue} name='country' />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a country</DialogTitle>
                <DialogDescription>
                  Please Choose a Country, so that we know what you want
                </DialogDescription>
              </DialogHeader>
              <Select
                required
                onValueChange={(value) => setLocationValue(value)}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a Country' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {getAllCountries().map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <div className='flex'>
                          <Flag
                            code={item.value}
                            height='19'
                            width='19'
                            className='pr-1'
                          />{' '}
                          {item.label} / {item.region}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>
                  Please Choose a Country, so that we know what you want
                </DialogDescription>
              </DialogHeader>
              <Card>
                <CardHeader className='flex flex-col gap-y-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                      <h3 className='underline font-medium'>Guests</h3>
                      <p className='text-muted-foreground text-sm'>
                        How many guests do you want?
                      </p>
                    </div>
                    <Counter name='guest' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                      <h3 className='underline font-medium'>Rooms</h3>
                      <p className='text-muted-foreground text-sm'>
                        How many rooms do you have?
                      </p>
                    </div>
                    <Counter name='room' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                      <h3 className='underline font-medium'>Bathrooms</h3>
                      <p className='text-muted-foreground text-sm'>
                        How many bathrooms do you have?
                      </p>
                    </div>
                    <Counter name='bathroom' />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}
          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
