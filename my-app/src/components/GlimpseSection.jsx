'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export default function GlimpseSection() {
  const images = [
    { src: '/1744536747180.jpeg' },
    { src: '/1713016969706.jpeg' },
    { src: '/WhatsApp Image 2025-12-29 at 1.39.40 PM.jpeg' },
    { src: '/WhatsApp Image 2025-12-29 at 1.39.40 PM (1).jpeg' },
    { src: '/1744990371908.jpeg' },
    { src: '/1755072730968.jpeg' },
    { src: '/1757788966313.jpeg' },
    { src: '/1757788966702.jpeg' },
    { src: '/WhatsApp Image 2025-12-29 at 1.39.41 PM.jpeg' },
    { src: '/WhatsApp Image 2025-12-29 at 1.39.38 PM.jpeg' },
  ];

  return (
    <section id="glimpse" className="py-32 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold"
          >
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              A Glimpse
            </span>
          </motion.h2>
        </motion.div>

        {/* Stacked Gallery with Clear Visibility */}
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12 md:space-y-16 lg:space-y-20">
            {images.map((image, index) => (
              <motion.div
                key={`glimpse-${index}`}
                initial={{ 
                  opacity: 0, 
                  y: 60,
                  scale: 0.95,
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                }}
                viewport={{ 
                  once: false,
                  margin: "-100px",
                  amount: 0.3
                }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group w-full"
                style={{
                  zIndex: images.length - index,
                }}
              >
                <motion.div 
                  className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] rounded-2xl overflow-hidden bg-black/20 shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
                  whileHover={{
                    scale: 1.02,
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {/* Image with brightness enhancement */}
                  <Image
                    src={image.src}
                    alt={`Gallery moment ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-105 contrast-105"
                    quality={100}
                    priority={index < 3}
                  />

                  {/* Lighter gradient overlay - only at bottom for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                  {/* Subtle border with glow */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 group-hover:ring-purple-400/60 transition-all duration-500 pointer-events-none" />
                  
                  {/* Accent glow on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-transparent group-hover:from-purple-500/15 transition-all duration-500 pointer-events-none rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}