import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/lovable-uploads/878d986f-0c0e-47e7-84ff-c860fb7c6fee.png",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1555421689-491a97ff2040",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72",
];

const AnimatedGallery = () => {
  const [imagePositions, setImagePositions] = useState<number[]>(
    images.map((_, i) => i * 100)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setImagePositions((prev) =>
        prev.map((pos) => (pos <= -200 ? 400 : pos - 1))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-primary/10">
      <div className="relative h-full w-full" style={{ transform: "rotate(-15deg) scale(1.5)" }}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute left-0 w-full"
            style={{
              top: `${imagePositions[index]}%`,
              height: "50%",
            }}
            initial={false}
          >
            <motion.div
              className="relative mx-auto aspect-[3/4] w-3/4 overflow-hidden rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedGallery;