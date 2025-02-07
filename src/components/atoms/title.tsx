import { Heading } from "~/components/atoms/typography/Heading";
import { cn } from "~/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Title({ children, className }: TitleProps) {
  return (
    <Heading level={2} className={cn("text-3xl font-bold", className)}>
      {children}
    </Heading>
  );
}
