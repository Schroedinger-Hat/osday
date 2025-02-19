import NextImage, { type StaticImageData } from "next/image";
import { cn } from "~/lib/utils";

interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  rounded?: boolean;
  relative?: boolean;
  withContainer?: boolean;
  fill?: boolean;
}

export function Image({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  rounded = false,
  relative = false,
  withContainer = true,
  fill = false,
}: ImageProps) {
  const imageElement = (
    <NextImage
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      priority={priority}
      className={cn(
        rounded && "rounded-md",
        fill && "object-cover",
        !withContainer && className,
      )}
    />
  );

  if (!withContainer) {
    return imageElement;
  }

  return (
    <div
      className={cn(relative && "relative", rounded && "rounded-md", className)}
      style={
        !fill
          ? {
              width: width ? `${width}px` : "100%",
              height: height ? `${height}px` : "100%",
            }
          : undefined
      }
    >
      {imageElement}
    </div>
  );
}
