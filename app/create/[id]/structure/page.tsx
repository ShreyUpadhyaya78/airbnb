import SelectCategory from "@/app/components/SelectedCategory";
import { Button } from "@/components/ui/button";

export default function StructureRoute() {
  return (
    <>
    <div className="mx-auto w-3/5">
<h2 className="text-3xl transition-colors tracking-tight font-semibold">Which of these best describe your Home?</h2>
    </div>
    <form>
<SelectCategory />
<div className="fixed w-full bottom-0 z-10 border-t h-24 bg-white">
    <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
<Button>Cancel</Button>
    </div>

</div>
    </form>
    </>
  )
}