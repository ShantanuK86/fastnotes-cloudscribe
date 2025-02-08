
import { StickyNote, Book, BookOpen } from "lucide-react";

const images = [
  "public/lovable-uploads/david-travis-5bYxXawHOQg-unsplash.jpg",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
];

const AnimatedGallery = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-primary/5">
      <div className="grid h-full grid-cols-2 gap-4 p-8">
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={image}
              alt={`Note taking ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              {index === 0 && <StickyNote className="h-12 w-12 text-white" />}
              {index === 1 && <Book className="h-12 w-12 text-white" />}
              {index === 2 && <BookOpen className="h-12 w-12 text-white" />}
              {index === 3 && <StickyNote className="h-12 w-12 text-white" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedGallery;

