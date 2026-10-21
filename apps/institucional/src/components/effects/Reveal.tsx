import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

const Reveal = ({ children, delay = 0, y = 20, className = '', as = 'div' }: Props) => {
  const Comp = motion[as] as typeof motion.div;
  const reduced = useReducedMotion();

  if (reduced) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
