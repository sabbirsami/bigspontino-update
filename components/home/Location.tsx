'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatedText } from '../animation/text/AnimatedText';

const Location = () => {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const locations = [
    {
      id: 1,
      name: 'PARIS',
      image: '/assets/location/paris.jpg',
      location: '/paris',
    },
    {
      id: 2,
      name: 'MEGÈVE',
      image: '/assets/location/megeve.jpg',
      location: '/megeve',
    },
    {
      id: 3,
      name: 'RIYADH',
      image: '/assets/location/riyad.jpg',
      location: '/riyadh',
    },
    {
      id: 4,
      name: 'LONDON',
      image: '/assets/location/london.jpg',
      location: '/london',
    },
  ] as const;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <section className="py-20 lg:py-40 px-4 sm:px-6">
      {/* Header Section */}
      <motion.div
        className="w-full lg:w-3/5 mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <AnimatedText
          className="text-xl sm:text-2xl md:text-5xl lg:text-7xl uppercase font-bold text-center leading-tight lg:leading-16"
          text={[t('location.title')]}
        />

        <motion.p
          className="text-center font-narrow pt-4 sm:pt-6 text-sm sm:text-base w-full md:w-4/5 lg:w-3/5 mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {t('location.description')}
        </motion.p>
      </motion.div>

      {/* Location Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 lg:mt-16 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            className="relative overflow-hidden rounded-none shadow-lg cursor-pointer group"
            style={{ aspectRatio: '9/16' }}
            variants={cardVariants}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
            onMouseEnter={() => setHoveredCard(location.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Background Image */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${location.image})`,
              }}
              animate={{
                scale: hoveredCard === location.id ? 1.1 : 1,
              }}
              transition={{
                duration: 0.7,
              }}
            />

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-secondary/40"
              animate={{
                backgroundColor:
                  hoveredCard === location.id ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.4)',
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 sm:p-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.6,
                }}
                viewport={{ once: true }}
              >
                <motion.h3
                  className="font-light tracking-widest mb-1 sm:mb-2 opacity-90 text-xs sm:text-sm"
                  animate={{
                    y: hoveredCard === location.id ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Big Spuntino
                </motion.h3>

                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 tracking-wide"
                  animate={{
                    y: hoveredCard === location.id ? -5 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  {location.name}
                </motion.h2>

                <motion.div
                  animate={{
                    y: hoveredCard === location.id ? -5 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link
                    href={location?.location}
                    className="group relative inline-flex h-8 sm:h-10 items-center justify-center overflow-hidden rounded-full border-2 border-white font-narrow px-6 sm:px-8 py-2 sm:py-3"
                  >
                    <div className="inline-flex h-8 sm:h-10 translate-y-0 items-center justify-center bg-transparent text-xs sm:text-sm font-medium tracking-widest uppercase text-white transition group-hover:-translate-y-[150%]">
                      {t('location.explore')}
                    </div>
                    <div className="absolute inline-flex h-8 sm:h-10 w-full translate-y-[100%] items-center justify-center bg-background text-xs sm:text-sm font-medium tracking-widest uppercase text-secondary transition duration-300 group-hover:translate-y-0">
                      {t('location.explore')}
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Text */}
      <motion.div
        className="w-full lg:w-2/5 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="text-xs sm:text-sm font-narrow text-center font-bold mt-6 sm:mt-8 lg:mt-10">
          {t('location.footer')}
        </h2>
      </motion.div>
    </section>
  );
};

export default Location;
