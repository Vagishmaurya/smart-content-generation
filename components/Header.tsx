import { motion } from 'framer-motion';

type HeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  centered?: boolean;
};

export default function Header({ title, subtitle, onBack, centered = false }: HeaderProps) {
  // Special handling for English book titles
  let displayTitle = title;
  
  if (title === 'English: Beehive') {
    displayTitle = '📘 English: Beehive';
  } else if (title === 'English: Word Expression 2') {
    displayTitle = '📕 English: Word Expression 2';
  }
  
  return (
    <motion.header 
      className={`py-6 px-4 md:px-8 mb-8 flex items-center ${centered ? 'justify-center' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {onBack && (
        <motion.button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}
      
      <div className={centered ? 'text-center' : ''}>
        <motion.h1 
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {displayTitle}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className="text-white/70 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.header>
  );
}
