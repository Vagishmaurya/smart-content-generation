import { useState } from 'react';
import { motion } from 'framer-motion';
import { Subject } from '../app/data/subjects';

type SubjectCardProps = {
  subject: Subject;
  onClick: () => void;
};

export default function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      className={`subject-card ${subject.id}`}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="absolute inset-0 bg-white/5" 
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div 
        className="text-6xl mb-4 filter drop-shadow-lg"
        animate={{ y: hovered ? -5 : 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {subject.icon}
      </motion.div>

      <motion.h2 
        className="text-2xl font-bold mb-2 text-white"
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {subject.name}
      </motion.h2>

      <motion.p 
        className="text-sm text-center text-white/80 max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {subject.description}
      </motion.p>

      <motion.p
        className="mt-4 text-white/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {subject.chapters.length} {subject.chapters.length === 1 ? 'chapter' : 'chapters'}
      </motion.p>
    </motion.div>
  );
}
