import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Chapter } from '../app/data/subjects';

type ContentViewerProps = {
  chapter: Chapter;
  file: string;
  onClose: () => void;
};

export default function ContentViewer({ chapter, file, onClose }: ContentViewerProps) {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const filePath = `/${chapter.path}/${file}`.replace(/ /g, '%20');
  
  // Function to stop all audio in the iframe
  const stopAllAudio = () => {
    try {
      // Stop speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Try to access iframe content and stop audio there
      if (iframeRef.current?.contentWindow) {
        try {
          const iframeWindow = iframeRef.current.contentWindow as any;
          
          // Stop speech synthesis in iframe
          if (iframeWindow.speechSynthesis) {
            iframeWindow.speechSynthesis.cancel();
          }
          
          // Stop any audio elements in iframe
          const audioElements = iframeWindow.document.querySelectorAll('audio, video');
          audioElements.forEach((element: any) => {
            if (element.pause) {
              element.pause();
              element.currentTime = 0;
            }
          });
          
          // Call cleanup functions if they exist in the iframe
          if (typeof iframeWindow.stopAllAudio === 'function') {
            iframeWindow.stopAllAudio();
          }
          if (typeof iframeWindow.cleanupAudio === 'function') {
            iframeWindow.cleanupAudio();
          }
          if (typeof iframeWindow.destroy === 'function') {
            iframeWindow.destroy();
          }
          
          // Call cleanup on any global teacher instances
          if (iframeWindow.currentTeacher && typeof iframeWindow.currentTeacher.destroy === 'function') {
            iframeWindow.currentTeacher.destroy();
          }
          if (iframeWindow.currentTeacher && typeof iframeWindow.currentTeacher.stop === 'function') {
            iframeWindow.currentTeacher.stop();
          }
        } catch (e) {
          // Cross-origin restrictions might prevent access
          console.log('Cannot access iframe content for audio cleanup (cross-origin)');
        }
      }
    } catch (error) {
      console.log('Error during audio cleanup:', error);
    }
  };
  
  useEffect(() => {
    // Reset loading state when file changes
    setLoading(true);
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [file]);
  
  // Cleanup audio when component unmounts or when file changes
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, [file]);
  
  // Enhanced close handler that stops audio before closing
  const handleClose = () => {
    stopAllAudio();
    onClose();
  };
  
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
          onClick={handleClose}
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
            ref={iframeRef}
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
