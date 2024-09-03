import { File, FileQuestion } from "lucide-react";
interface IAppProps{
  title: string;
  description:string;
}
export default function NoItems({description,title}:IAppProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <FileQuestion  className="h-10 w-10 text-primary"/>
        </div>
        <h2 className="text-xl font-semibold mt-6">{title}</h2>
        <p className="text-muted-foreground mt-2 text-center text-sm leading-6">{description}</p>
    </div>
  )
}