'use server';
import { redirect } from 'next/navigation';
import prisma from './lib/db';
import { supabase } from './lib/supabase';
import { revalidatePath } from 'next/cache';
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
  else if(data.addedCategory && data.addedDescription && !data.addedLocation){
    return redirect(`/create/${data.id}/address`);
  }
  else if(data.addedCategory && data.addedDescription && data.addedLocation){
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData:FormData){
    const categoryName=formData.get('categoryName') as string;
    const homeId = formData.get('homeId') as string;
const data=await prisma.home.update({
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

export async function createLocation(formData:FormData){
const homeId=formData.get("homeId") as string
const countryValue=formData.get("countryValue") as string
  const data =await prisma.home.update({
  where:{
    id:homeId,
  },
  data:{
    addedLocation:true,
    country:countryValue,
  },
})
return redirect('/');
}

export async function addToFavorite(formData:FormData){
const homeId=formData.get('homeId') as string;
const userId=formData.get('userId') as string;
const pathName=formData.get('pathName') as string;

  const data =await prisma.favorite.create(
    {
      data:{
        homeId:homeId,
        userId:userId,  
      },
    },
  );
  revalidatePath(pathName);
}
export async function DeleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get('favoriteId') as string;
  const pathName = formData.get('pathName') as string;
  const userId = formData.get('userId') as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}