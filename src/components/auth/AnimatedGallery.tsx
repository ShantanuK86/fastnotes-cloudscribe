import { motion } from "framer-motion";

const images = [
  "/lovable-uploads/878d986f-0c0e-47e7-84ff-c860fb7c6fee.png",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1555421689-491a97ff2040",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72",
];

const AnimatedGallery = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-primary/10">
      <div className="grid h-full grid-cols-2 gap-4 p-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-[3/4] overflow-hidden rounded-xl"
            initial={{ y: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: { 
                duration: 0.8,
                delay: index * 0.2,
              }
            }}
          >
            <motion.img
              src={image}
              alt="Gallery image"
              className="h-full w-full object-cover"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 1.5,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedGallery;