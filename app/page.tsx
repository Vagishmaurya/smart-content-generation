'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { subjects } from './data/subjects';
import SubjectCard from '../components/SubjectCard';
import ChapterCard from '../components/ChapterCard';
import ThreeBackground from '../components/ThreeBackground';
import Header from '../components/Header';
import { Chapter } from './data/subjects';

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setSelectedChapter(null);
    setSelectedTopic(null);
  };
  
  const handleChapterClick = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    // If chapter has only one file, automatically select it
    if (chapter.files.length === 1) {
      setSelectedTopic(chapter.files[0]);
    } else {
      setSelectedTopic(null);
    }
  };
  
  const handleTopicClick = (file: string) => {
    setSelectedTopic(file);
  };
  
  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedChapter(null);
    setSelectedTopic(null);
  };
  
  const handleBackToChapters = () => {
    setSelectedChapter(null);
    setSelectedTopic(null);
  };
  
  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };
  
  const handleBackFromContent = () => {
    const currentChapter = currentSubject?.chapters.find(chapter => chapter.id === selectedChapter?.id);
    // If it's a single-file chapter, go back to chapters list
    if (currentChapter && currentChapter.files.length === 1) {
      setSelectedChapter(null);
      setSelectedTopic(null);
    } else {
      // For multi-file chapters, go back to topic selection
      setSelectedTopic(null);
    }
  };
  
  const currentSubject = subjects.find(subject => subject.id === selectedSubject);
  const chapters = currentSubject?.chapters || [];
  
  // Dynamic navbar colors based on subject
  const getNavbarColors = () => {
    if (!selectedSubject) return 'bg-white/5 border-white/20';
    
    switch (selectedSubject) {
      case 'physics':
        return 'bg-blue-500/10 border-blue-400/30';
      case 'biology':
        return 'bg-green-500/10 border-green-400/30';
      case 'english':
        return 'bg-purple-500/10 border-purple-400/30';
      default:
        return 'bg-white/5 border-white/20';
    }
  };
  
  const getButtonColors = () => {
    if (!selectedSubject) return 'bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/50';
    
    switch (selectedSubject) {
      case 'physics':
        return 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-400/40 hover:border-blue-400/60';
      case 'biology':
        return 'bg-green-500/20 hover:bg-green-500/30 border-green-400/40 hover:border-green-400/60';
      case 'english':
        return 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-400/40 hover:border-purple-400/60';
      default:
        return 'bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/50';
    }
  };
  
  const getLogoGlow = () => {
    if (!selectedSubject) return 'from-blue-500/20 to-purple-500/20';
    
    switch (selectedSubject) {
      case 'physics':
        return 'from-blue-500/30 to-cyan-500/30';
      case 'biology':
        return 'from-green-500/30 to-emerald-500/30';
      case 'english':
        return 'from-purple-500/30 to-pink-500/30';
      default:
        return 'from-blue-500/20 to-purple-500/20';
    }
  };
  
  // Function to clean and format file names
  const formatFileName = (fileName: string) => {
    // Remove .html extension
    let cleanName = fileName.replace('.html', '');
    
    // Remove numbering patterns like "7.1_", "8.2_", "10.1_", etc.
    cleanName = cleanName.replace(/^\d+\.\d+\.?\d*_/, '');
    
    // Replace underscores with spaces
    cleanName = cleanName.replace(/_/g, ' ');
    
    // Replace hyphens with spaces
    cleanName = cleanName.replace(/-/g, ' ');
    
    // Convert to title case
    cleanName = cleanName.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    
    // Handle special cases for better readability
    cleanName = cleanName.replace(/\bOf\b/g, 'of');
    cleanName = cleanName.replace(/\bAnd\b/g, 'and');
    cleanName = cleanName.replace(/\bThe\b/g, 'the');
    cleanName = cleanName.replace(/\bIn\b/g, 'in');
    cleanName = cleanName.replace(/\bTo\b/g, 'to');
    cleanName = cleanName.replace(/\bFor\b/g, 'for');
    cleanName = cleanName.replace(/\bWith\b/g, 'with');
    
    return cleanName;
  };
  
  // Control body scroll when in content view
  useEffect(() => {
    if (selectedSubject && selectedChapter && selectedTopic) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedSubject, selectedChapter, selectedTopic]);
  
  return (
    <main className={`${selectedSubject && selectedChapter && selectedTopic ? 'h-screen overflow-hidden' : 'min-h-screen px-4 py-6 md:px-8'} relative`}>
      {/* Modern Glassmorphism Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b shadow-2xl transition-all duration-500 ${getNavbarColors()}`}>
        <div className="flex items-center justify-between px-6 py-2">
          {/* Left side - Back button (only show when viewing content) */}
          <div className="flex-1">
            {selectedSubject && selectedChapter && selectedTopic ? (
              <motion.button
                onClick={handleBackFromContent}
                className={`group flex items-center gap-2 px-4 py-2 rounded-2xl text-white transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm ${getButtonColors()}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back</span>
              </motion.button>
            ) : (
              /* EduCraft AI Branding */
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-xl font-bold text-white tracking-wide">
                  EduCraft AI
                </h1>
                <p className="text-sm text-white/70 font-medium">
                  AI-Powered Interactive Learning
                </p>
              </motion.div>
            )}
          </div>
          
          {/* Right side - Calance Logo with enhanced styling */}
          <div className="flex-1 flex justify-end">
            <motion.div
              className="relative group flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Powered by Calance text */}
              <motion.div
                className="text-white/80 text-sm font-medium tracking-wide"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Powered by
              </motion.div>
              
              {/* Logo container */}
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${getLogoGlow()} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                  <img 
                    src="/calance_logo.jpg" 
                    alt="Calance Logo" 
                    className="h-8 w-auto object-contain filter brightness-110"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </nav>
      
      {/* Dynamic background based on selected subject */}
      <ThreeBackground subject={selectedSubject} />
      
      
      {!selectedSubject && (
        <>
          <div className="pt-20">
            <Header 
              title="Educational Content Explorer" 
              subtitle="Explore interactive content in various subjects"
              centered={true}
            />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {subjects.map(subject => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onClick={() => handleSubjectClick(subject.id)}
              />
            ))}
          </motion.div>
          </div>
        </>
      )}
      
      {selectedSubject && !selectedChapter && (
        <>
          <div className="pt-20">
            <Header 
              title={currentSubject?.name || ''} 
              subtitle={`${chapters.length} ${chapters.length === 1 ? 'chapter' : 'chapters'}`}
              onBack={handleBackToSubjects}
            />
          
          {chapters.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {chapters.map(chapter => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  subjectId={selectedSubject}
                  onClick={handleChapterClick}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center h-64 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-6 opacity-60">
                {selectedSubject === 'physics' ? '⚛️' : 
                 selectedSubject === 'biology' ? '🧬' : '📚'}
              </div>
              <p className="text-xl text-white/70 text-center max-w-md">
                {selectedSubject === 'physics' ? 
                  'Physics content is coming soon! Check back later for exciting chapters on mechanics, electricity, and more.' :
                  'No chapters available yet'}
              </p>
              <button 
                onClick={handleBackToSubjects}
                className={`mt-6 px-6 py-3 rounded-full transition-colors text-white ${
                  selectedSubject === 'physics' ? 'bg-primary-physics/40 hover:bg-primary-physics/60' :
                  selectedSubject === 'biology' ? 'bg-primary-biology/40 hover:bg-primary-biology/60' :
                  'bg-primary-english/40 hover:bg-primary-english/60'
                }`}
              >
                Go back to subjects
              </button>
            </motion.div>
          )}
          </div>
        </>
      )}
      
      {selectedSubject && selectedChapter && !selectedTopic && selectedChapter.files.length > 1 && (
        <>
          <div className="pt-20">
            <Header 
              title={selectedChapter.name} 
              subtitle={`${selectedChapter.files.length} ${selectedChapter.files.length === 1 ? 'topic' : 'topics'}`}
              onBack={handleBackToChapters}
            />
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {selectedChapter.files.map(file => {
              const fileName = formatFileName(file);
              
              return (
                <motion.div
                  key={file}
                  className={`p-5 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors border border-white/10 hover:border-${selectedSubject}-${selectedSubject}/30`}
                  onClick={() => handleTopicClick(file)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-lg font-medium mb-2">{fileName}</h3>
                  <p className="text-sm text-white/60">View content</p>
                </motion.div>
              );
            })}
          </motion.div>
          </div>
        </>
      )}
      
      {selectedSubject && selectedChapter && selectedTopic && (
        <>
          {/* Full-screen content with navbar offset */}
          <motion.div
            className="w-full h-screen pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <iframe 
              src={`/${selectedChapter.path}/${selectedTopic}`}
              className="w-full h-full border-0"
              title={formatFileName(selectedTopic)}
            />
          </motion.div>
        </>
      )}
    </main>
  );
}
