import { cn } from "@/lib/utils/cn";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-site px-gutter", className)} {...props} />;
}
