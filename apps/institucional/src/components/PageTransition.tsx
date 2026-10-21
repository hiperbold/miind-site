import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

// NOTE: only animate opacity. Animating `filter` or `transform` (y) on the
// wrapper creates a new CSS containing block, which breaks `position: fixed`
// for descendants like the Navbar. Keep this wrapper "containing-block-safe".
const pageVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants}>
    {children}
  </motion.div>
);

export default PageTransition;
