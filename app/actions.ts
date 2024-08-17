'use server';
import { redirect } from 'next/navigation';
import prisma from './lib/db';
import { supabase } from './lib/supabase';
export default async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`);
  }
  else if(data.addedCategory && !data.addedDescription){
return redirect(`/create/${data.id}/description`);
  }
}

export async function createCategoryPage(formData:FormData){
    const categoryName=formData.get('categoryName') as string;
    const homeId = formData.get('homeId') as string;
const data=prisma.home.update({
    where:{
        id:homeId
    },
    data:{
        categoryName:categoryName,
        addedCategory:true,
    }
})
return redirect(`/create/${homeId}/description`)
}
export async function createDescription(formData:FormData){
const title=formData.get('title') as string;
const description=formData.get('description') as string;
const price=formData.get('price');
const homeId=formData.get('homeId') as string;
const imageFile=formData.get('image') as File;
const guestNumber=formData.get('guest') as string;
const roomNumber=formData.get('room') as string;
const bathroomNumber=formData.get('bathroom') as string;
const {data:imageData}=await supabase.storage.from("images").upload(`${imageFile.name}-${new Date()}`,imageFile,{
  cacheControl:'2592000',
  contentType:'image/png',
});
const data=await prisma.home.update({
  where:{
    id:homeId,
  },
  data:{
    title:title,
    price:Number(price),
    description:description,
    photo:imageData?.path,
    bedrooms:roomNumber,
    bathrooms:bathroomNumber,
    guests:guestNumber,
    addedDescription:true,
  }
})
return redirect(`/create/${homeId}/address`);
}
