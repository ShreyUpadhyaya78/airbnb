import { createDescription } from "@/app/actions";
import Counter from "@/app/components/Counter";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionPage({params}:{params:{id:string}}) {
  return (
    <>
      <div className='w-3/5 mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Please describe your home as good as you can!
        </h2>
      </div>
      <form action={createDescription}>
        <Input type="hidden" name="homeId" value={params.id}/>
        <div className='flex flex-col w-3/5 mx-auto mt-10 mb-36 gap-y-5'>
          <div className='flex flex-col gap-y-2'>
            <Label>Title</Label>
            <Input
              placeholder='Short and simple...'
              name='title'
              required
              type='text'
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label>Description</Label>
            <Textarea
              placeholder='Please describe your home...'
              name='description'
              required
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label>Price</Label>
            <Input
              required
              placeholder='Price per Night in USD'
              type='number'
              name='price'
              min={10}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label>Image</Label>
            <Input required type='file' name='image' />
          </div>
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
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}