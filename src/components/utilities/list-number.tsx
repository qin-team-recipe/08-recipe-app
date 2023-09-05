import { cn } from "@/lib/utils";

export function ListNumber ({index, className}: {index: number, className?: string}) {
  return (
  <div className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full bg-tomato-10 text-sm text-tomato-1", className)}>
  {index}
  </div>
  );
}
