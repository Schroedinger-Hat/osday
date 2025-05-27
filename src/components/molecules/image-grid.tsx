import Image from "next/image";
import { SectionContainer } from "../atoms/layout/SectionContainer";
import { Heading } from "../atoms/typography/Heading";
import { Link } from "../atoms/links/Link";
import { Button } from "../ui/button";
import gallery1 from "~/assets/images/osday25-gallery/OSDAY-1.jpg";
import gallery2 from "~/assets/images/osday25-gallery/OSDAY-2.jpg";
import gallery3 from "~/assets/images/osday25-gallery/OSDAY-3.jpg";
import gallery4 from "~/assets/images/osday25-gallery/OSDAY-4.jpg";
import gallery5 from "~/assets/images/osday25-gallery/OSDAY-5.jpg";

interface ImageGridProps {
  title: string;
}

const images = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
];

export default function ImageGrid({ title }: ImageGridProps) {

    // Define grid classes for each image index
  const gridClasses = [
    // index 0
    "md:row-span-2 md:col-span-1 w-full h-full object-cover rounded-md shadow-md",
    // index 1
    "w-full h-full object-cover rounded-md shadow-md md:col-span-2 md:row-span-1 md:col-start-2 md:row-start-1",
    // index 2
    "w-full h-full object-cover rounded-md shadow-md",
    // index 3
    "w-full h-full object-cover rounded-md shadow-md",
    // index 4
    "w-full h-full object-cover rounded-md shadow-md md:col-span-2 md:col-start-3 md:row-start-2",
  ];

  //   // Only render up to 5 images, fallback if less
  const displayedImages = images.slice(0, 5);

  return (
    <SectionContainer withBackground backgroundType="default">
      <Heading level={2} className="italic">
        {title}
      </Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 grid-rows-5 md:grid-rows-2">
      {displayedImages.map((img, i) => {
        return (
          <Image
            key={i}
            src={img}
            alt={`Image ${i + 1} from ${title}`}
            className={gridClasses[i] || gridClasses[0]}
          />
        );
      })}
      </div>
      <div className="mt-8 text-center">
        <Link href="https://photos.app.goo.gl/R8aE9RZuZ6cMM7NH9">
          <Button variant="default">Discover the OSDay25 photo album</Button>
        </Link>
      </div>
    </SectionContainer>
  );
}