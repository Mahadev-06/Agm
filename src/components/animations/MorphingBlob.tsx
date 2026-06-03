"use client";

import { motion, Variants } from "framer-motion";
import { memo } from "react";

// ─────────────────────────────────────────────
//  Organic blob path sets — each set contains
//  a "rest" shape and a "hover" shape that morph
//  fluidly into each other.
// ─────────────────────────────────────────────
const blobPaths = {
  organic1: {
    rest: "M45.3,-51.2C58.1,-42.3,67.5,-27.1,71.4,-10.1C75.4,7,73.9,25.8,64.5,39.3C55.1,52.8,37.8,61,19.8,65.1C1.8,69.1,-16.9,69,-32.8,62.1C-48.7,55.2,-61.7,41.5,-68.1,25C-74.5,8.5,-74.2,-10.7,-66.6,-26C-59,-41.4,-44.1,-52.8,-28.9,-60.7C-13.8,-68.5,1.5,-72.8,16.4,-68.8C31.3,-64.8,32.5,-60.1,45.3,-51.2Z",
    hover: "M39.9,-48.7C51.7,-38.5,61.1,-25.7,65.2,-10.8C69.3,4.1,68.1,21.1,59.8,34.1C51.5,47.1,36.1,56.2,19.3,61.5C2.4,66.7,-15.9,68.2,-31.8,62.1C-47.8,56,-61.3,42.4,-67.3,26.2C-73.2,10,-71.5,-8.8,-64.1,-24.4C-56.7,-40,-43.6,-52.4,-29.3,-61.8C-15,-71.1,0.5,-77.4,13.5,-73.1C26.5,-68.8,28.2,-58.9,39.9,-48.7Z",
  },
  organic2: {
    rest: "M43.2,-55.8C55.6,-46.9,65,-33,69.8,-17.3C74.6,-1.6,74.8,15.9,67.5,29.8C60.2,43.7,45.4,54,29.6,59.8C13.8,65.7,-3,67.1,-19.2,63.1C-35.5,59.1,-51.1,49.7,-60.4,36C-69.7,22.3,-72.7,4.3,-69.6,-12.5C-66.5,-29.3,-57.3,-44.9,-44.3,-53.7C-31.3,-62.5,-14.7,-64.5,0.8,-65.5C16.3,-66.5,30.8,-64.7,43.2,-55.8Z",
    hover: "M35.5,-43.5C47.8,-36.3,60.5,-27.1,66.2,-14.3C71.9,-1.4,70.6,15.1,62.8,27.7C55,40.3,40.7,49.1,25.5,55.8C10.3,62.5,-5.8,67.2,-20.4,64C-35,60.9,-48.2,50,-56.4,36C-64.6,22,-67.7,4.9,-64.4,-10.3C-61.1,-25.5,-51.3,-38.8,-39.2,-46.1C-27.1,-53.4,-12.6,-54.6,0.2,-54.9C13,-55.1,23.2,-50.7,35.5,-43.5Z",
  },
  organic3: {
    rest: "M41.1,-52.3C53.5,-44.5,63.9,-32.7,68.7,-18.7C73.5,-4.7,72.6,11.5,65.5,24.5C58.4,37.5,45.1,47.3,30.7,54.1C16.3,60.8,0.8,64.4,-14.6,62.1C-30,59.7,-45.2,51.3,-55.2,38.7C-65.2,26.1,-70,9.2,-68.5,-7.1C-67,-23.4,-59.2,-39.1,-47,-50.7C-34.8,-62.2,-18.4,-69.6,-1.5,-67.8C15.4,-66,28.7,-60.1,41.1,-52.3Z",
    hover: "M46,-56.8C57.9,-47.5,64.7,-31.7,67.1,-15.6C69.5,0.5,67.5,16.9,60.2,30.8C52.9,44.7,40.3,56.2,25.5,62.2C10.7,68.2,-6.3,68.7,-22.4,64.3C-38.5,59.9,-53.7,50.6,-61.8,37.1C-69.9,23.6,-70.9,5.9,-66.7,-9.8C-62.4,-25.6,-52.9,-39.5,-40.7,-48.7C-28.5,-57.9,-13.6,-62.4,2.2,-65.2C18,-68,34.1,-66.1,46,-56.8Z",
  },
  organic4: {
    rest: "M38.5,-49.7C50.8,-40.9,62.1,-30.2,67.1,-16.5C72.1,-2.8,70.8,13.8,63.3,27.1C55.8,40.4,42.1,50.3,27.2,56.3C12.3,62.3,-3.8,64.3,-19.1,60.6C-34.5,56.8,-49.1,47.3,-57.7,33.8C-66.2,20.3,-68.8,2.8,-65.4,-12.9C-62.1,-28.6,-52.8,-42.5,-40.5,-51.3C-28.2,-60.1,-12.9,-63.8,0.5,-64.4C13.9,-65,26.1,-58.5,38.5,-49.7Z",
    hover: "M42.9,-54.1C54.5,-44.2,62.3,-30.4,65.7,-15.5C69.1,-0.5,68.2,15.7,61.2,28.9C54.2,42.1,41.2,52.3,26.7,58.1C12.2,63.9,-3.8,65.3,-19.3,61.7C-34.9,58.1,-50,49.5,-58.4,36.7C-66.8,23.9,-68.5,6.8,-65.1,-8.8C-61.7,-24.4,-53.2,-38.5,-41.3,-48.5C-29.3,-58.5,-13.9,-64.3,1.1,-65.6C16.1,-67,31.2,-64,42.9,-54.1Z",
  },
};

type BlobVariant = keyof typeof blobPaths;

interface MorphingBlobProps {
  variant?: BlobVariant;
  color?: string;
  size?: number;
  className?: string;
  opacity?: number;
  autoAnimate?: boolean;
}

// Memoized to prevent re-renders from parent scroll events
export const MorphingBlob = memo(function MorphingBlob({
  variant = "organic1",
  color = "#ff6b00",
  size = 200,
  className = "",
  opacity = 0.15,
  autoAnimate = false,
}: MorphingBlobProps) {
  const paths = blobPaths[variant];

  const autoVariants: Variants = {
    animate: {
      d: [paths.rest, paths.hover, paths.rest],
      transition: {
        duration: 12, // Slower = less CPU
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const hoverVariants: Variants = {
    rest: {
      d: paths.rest,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
    hover: {
      d: paths.hover,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (autoAnimate) {
    return (
      <div
        className={`pointer-events-none select-none ${className}`}
        style={{ width: size, height: size, willChange: "auto" }}
      >
        <svg
          viewBox="-80 -80 160 160"
          width={size}
          height={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            fill={color}
            fillOpacity={opacity}
            variants={autoVariants}
            animate="animate"
            d={paths.rest}
          />
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      initial="rest"
      whileHover="hover"
    >
      <svg
        viewBox="-80 -80 160 160"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          fill={color}
          fillOpacity={opacity}
          variants={hoverVariants}
          d={paths.rest}
        />
      </svg>
    </motion.div>
  );
});

interface MorphingBlobBgProps {
  variant?: BlobVariant;
  color?: string;
  size?: number;
  className?: string;
  opacity?: number;
}

export const MorphingBlobBg = memo(function MorphingBlobBg({
  variant = "organic1",
  color = "#ff6b00",
  size = 200,
  className = "",
  opacity = 0.15,
}: MorphingBlobBgProps) {
  const paths = blobPaths[variant];

  return (
    <div
      className={`absolute pointer-events-none select-none transition-transform duration-700 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="-80 -80 160 160"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          fill={color}
          fillOpacity={opacity}
          d={paths.rest}
          animate={{
            d: [paths.rest, paths.hover, paths.rest],
          }}
          transition={{
            duration: 14, // Slower = less CPU
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </svg>
    </div>
  );
});
