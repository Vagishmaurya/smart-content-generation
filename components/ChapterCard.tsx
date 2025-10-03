import { useState } from 'react';
import { motion } from 'framer-motion';
import { Chapter } from '../app/data/subjects';

type ChapterCardProps = {
  chapter: Chapter;
  subjectId: string;
  onClick: (chapter: Chapter) => void;
};

export default function ChapterCard({ chapter, subjectId, onClick }: ChapterCardProps) {
  const [hovered, setHovered] = useState(false);
  
  const formattedName = chapter.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return (
    <motion.div
      className={`chapter-card ${subjectId}`}
      onClick={() => onClick(chapter)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: `0 10px 25px -5px rgba(var(--${subjectId}-rgb, 0, 0, 0), 0.2)` 
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center bg-${subjectId}-${subjectId}/20`}
        animate={{ 
          scale: hovered ? 1.1 : 1,
          backgroundColor: hovered ? `var(--${subjectId}-color, #3b82f6)` : 'transparent'
        }}
        transition={{ duration: 0.3 }}
        style={{ 
          '--biology-color': '#2dd4bf',
          '--english-color': '#a78bfa',
          '--physics-color': '#f97316',
        } as any}
      >
        <span className="text-xl">{
          subjectId === 'biology' ? '🧬' : 
          subjectId === 'english' ? '📚' : '⚛️'
        }</span>
      </motion.div>

      <motion.h3 
        className="text-lg font-medium mb-1 text-center"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {formattedName}
      </motion.h3>

      <motion.p 
        className="text-sm text-white/60 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        {/* Special handling for English main subject - don't show files count */}
        {subjectId === 'english' ? (
          // For English books, don't show file count
          chapter.id === 'english-beehive-book' ? '📘 Book' : 
          chapter.id === 'english-word-expression-book' ? '📕 Book' : 
          'Book'
        ) : (
          // For book subjects, show "Chapter" instead of "files" for English books
          (subjectId === 'english-book-beehive' || subjectId === 'english-word-expression') ? 
          'Chapter' : 
          // For all other subjects, show the original file count
          `${chapter.files.length} ${chapter.files.length === 1 ? 'file' : 'files'}`
        )}
      </motion.p>
    </motion.div>
  );
}
