import SkeletonCard from "../components/SkeletonCard";

export default function FavoritesLoading() {
  return (
    <section className='container px-5 lg:px-10 mt-10 mx-auto'>
      <h2 className='text-3xl font-semibold tracking-tight'>Your Favorites</h2>
      <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8 grid-cols-1'>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </section>
  );
}