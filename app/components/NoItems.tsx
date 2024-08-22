import { File } from "lucide-react";

export default function NoItems() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
        <div>
            <File />
        </div>
    </div>
  )
}