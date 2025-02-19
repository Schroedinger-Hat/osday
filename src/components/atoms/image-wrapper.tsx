import Image from "next/image";
import { cn } from "~/lib/utils";

interface ImageWrapperProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
}

export function ImageWrapper({
  src,
  alt,
  width = 300,
  height = 150,
  className,
  imageClassName,
}: ImageWrapperProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md bg-slate-50 p-8",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("h-16 w-auto object-contain", imageClassName)}
      />
    </div>
  );
}
