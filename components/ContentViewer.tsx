import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chapter } from '../app/data/subjects';

type ContentViewerProps = {
  chapter: Chapter;
  file: string;
  onClose: () => void;
};

export default function ContentViewer({ chapter, file, onClose }: ContentViewerProps) {
  const [loading, setLoading] = useState(true);
  
  const filePath = `/${chapter.path}/${file}`.replace(/ /g, '%20');
  
  useEffect(() => {
    // Reset loading state when file changes
    setLoading(true);
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [file]);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold">{chapter.name}</h2>
          <p className="text-sm text-white/60">{file.replace(/_/g, ' ').replace('.html', '')}</p>
        </div>
        
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <iframe 
            src={filePath} 
            className="w-full h-full"
            title={file}
            onError={(e) => {
              console.error('Failed to load content:', filePath, e);
            }}
            onLoad={() => {
              console.log('Content loaded successfully:', filePath);
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
