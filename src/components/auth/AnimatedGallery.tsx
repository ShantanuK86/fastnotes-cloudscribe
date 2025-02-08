
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/lovable-uploads/878d986f-0c0e-47e7-84ff-c860fb7c6fee.png",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  "https://images.unsplash.com/photo-1503437313881-503a91226402",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  "/lovable-uploads/2e70ba08-3885-4512-8f90-c2d013e55101.png",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1555421689-491a97ff2040",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
];

const COLUMNS = 3;
const IMAGES_PER_COLUMN = Math.ceil(images.length / COLUMNS);

const AnimatedGallery = () => {
  const [columnPositions, setColumnPositions] = useState<number[][]>(
    Array(COLUMNS).fill([]).map((_, colIndex) => 
      Array(IMAGES_PER_COLUMN).fill(0).map((_, i) => i * 95) // Reduced gap between images
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setColumnPositions((prev) =>
        prev.map((column, colIndex) =>
          column.map((pos) => {
            const speed = 0.15 + (colIndex * 0.05); // Much slower speed
            return pos <= -95 ? 380 : pos - speed; // Adjusted for connected images
          })
        )
      );
    }, 16); // Keep 60fps for smooth animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-primary/5">
      <div 
        className="relative h-full w-full" 
        style={{ 
          transform: "rotate(-25deg) scale(2.2)",
          transformOrigin: "center center"
        }}
      >
        <div className="flex h-full justify-center gap-2 px-6">
          {Array(COLUMNS).fill(0).map((_, columnIndex) => (
            <div 
              key={columnIndex} 
              className="relative w-full before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-[#222222] before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-2 after:bg-[#222222] after:content-['']"
            >
              {images
                .slice(
                  columnIndex * IMAGES_PER_COLUMN,
                  (columnIndex + 1) * IMAGES_PER_COLUMN
                )
                .map((image, imageIndex) => (
                <motion.div
                  key={imageIndex}
                  className="absolute left-0 w-full"
                  style={{
                    top: `${columnPositions[columnIndex][imageIndex]}%`,
                    height: "33%", // Smaller images to connect better
                  }}
                  initial={false}
                >
                  <motion.div
                    className="relative mx-auto aspect-[3/4] w-[95%] overflow-hidden rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={image}
                      alt={`Gallery image ${columnIndex}-${imageIndex + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 border-4 border-[#333333] bg-black/10" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedGallery;
