"use client"
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom"

export default function CreationSubmit() {
    const {pending}=useFormStatus();
  return (
    <>
      {pending ? (
        <Button size={'lg'} disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          Please Wait
        </Button>
      ) : (
        <Button size={'lg'} type='submit'>
          Next
        </Button>
      )}
    </>
  );
}

export function AddToFavoriteButton(){
  const {pending}=useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          variant={'outline'}
          size={'icon'}
          className='bg-primary-foreground'
         >
          <Loader2 className='h-4 w-4 animate-spin text-primary' />
        </Button>
      ) : (
        <Button
          type='submit'
          variant={'outline'}
          size={'icon'}
          className='bg-primary-foreground'
        >
          <Heart className='h-4 w-4 ' />
        </Button>
      )}
    </>
  );
}
export function DeleteFromFavoriteButton(){
  const {pending}=useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          variant={'outline'}
          size={'icon'}
          className='bg-primary-foreground'
         >
          <Loader2 className='h-4 w-4 animate-spin text-primary' />
        </Button>
      ) : (
        <Button
          type='submit'
          variant={'outline'}
          size={'icon'}
          className='bg-primary-foreground'
        >
          <Heart className='h-4 w-4 text-primary' fill="#E21C49" />
        </Button>
      )}
    </>
  );
}

export function ReservationSubmitButton(){
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className='w-full'>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />Please wait...
        </Button>
      ) : (
        <Button type='submit' className='w-full'>
          Make a Reservation!
        </Button>
      )}
    </>
  );
}