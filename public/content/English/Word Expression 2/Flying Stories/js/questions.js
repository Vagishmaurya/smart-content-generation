// Questions and exercises for Two Stories About Flying lesson

// Function to check meanings of 'black' in different contexts
function checkMeanings() {
    const meaningInputs = document.querySelectorAll('.meaning-input');
    let correctCount = 0;
    let totalPoints = 0;
    
    meaningInputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        // Check if the answer contains key words from the correct answer
        const keyWords = correctAnswer.split('/');
        let isCorrect = false;
        
        for (const word of keyWords) {
            if (userAnswer.includes(word.trim())) {
                isCorrect = true;
                break;
            }
        }
        
        if (isCorrect) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
            totalPoints += 2;
        } else if (userAnswer) {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    if (correctCount === meaningInputs.length) {
        showAchievement('Vocabulary Master', 'You understand all the different meanings of "black"!');
    } else {
        showFeedback(`You got ${correctCount} out of ${meaningInputs.length} correct!`);
    }
    
    updateScore(totalPoints);
}

// Function to check phrase matching
function checkPhrases() {
    const phraseSelects = document.querySelectorAll('.phrase-select');
    let correctCount = 0;
    let totalPoints = 0;
    
    phraseSelects.forEach(select => {
        const userAnswer = select.value;
        const correctAnswer = select.getAttribute('data-answer');
        
        if (userAnswer === correctAnswer) {
            select.classList.add('correct');
            select.classList.remove('incorrect');
            correctCount++;
            totalPoints += 2;
        } else if (userAnswer) {
            select.classList.add('incorrect');
            select.classList.remove('correct');
        }
    });
    
    if (correctCount === phraseSelects.length) {
        showAchievement('Phrase Expert', 'You matched all the phrases correctly!');
    } else {
        showFeedback(`You got ${correctCount} out of ${phraseSelects.length} correct!`);
    }
    
    updateScore(totalPoints);
}

// Function to toggle synonym selection
function toggleSynonymSelection(element) {
    element.classList.toggle('selected');
}

// Function to check synonym selections
function checkSynonyms() {
    const synonymItems = document.querySelectorAll('.synonym-item');
    let correctSelections = 0;
    let incorrectSelections = 0;
    
    synonymItems.forEach(item => {
        const isCorrect = item.getAttribute('data-correct') === 'true';
        const isSelected = item.classList.contains('selected');
        
        if (isSelected && isCorrect) {
            item.classList.add('correct');
            item.classList.remove('incorrect');
            correctSelections++;
        } else if (isSelected && !isCorrect) {
            item.classList.add('incorrect');
            item.classList.remove('correct');
            incorrectSelections++;
        } else if (!isSelected && isCorrect) {
            item.classList.add('missed');
            item.classList.remove('correct', 'incorrect');
        } else {
            item.classList.remove('correct', 'incorrect', 'missed');
        }
    });
    
    const totalCorrect = document.querySelectorAll('.synonym-item[data-correct="true"]').length;
    const feedback = document.getElementById('synonymFeedback');
    
    if (correctSelections === totalCorrect && incorrectSelections === 0) {
        feedback.textContent = 'Perfect! You identified all the synonyms of "fly" correctly!';
        feedback.className = 'feedback-message success';
        showAchievement('Synonym Expert', 'You identified all the synonyms of "fly" correctly!');
        updateScore(12);
    } else {
        feedback.textContent = `You found ${correctSelections} out of ${totalCorrect} synonyms, with ${incorrectSelections} incorrect selections.`;
        feedback.className = 'feedback-message';
        updateScore(correctSelections - incorrectSelections);
    }
    
    feedback.style.display = 'block';
}

// Function to select matching items
let selectedTerm = null;
let selectedDef = null;

function selectMatch(element, type) {
    // Reset previously selected items of the same type
    document.querySelectorAll(`.match-item[data-selected="${type}"]`).forEach(item => {
        item.removeAttribute('data-selected');
    });
    
    // Mark this element as selected
    element.setAttribute('data-selected', type);
    
    if (type === 'term') {
        selectedTerm = element;
    } else {
        selectedDef = element;
    }
    
    // If we have both a term and definition selected, check if they match
    if (selectedTerm && selectedDef) {
        const termMatch = selectedTerm.getAttribute('data-match');
        const defMatch = selectedDef.getAttribute('data-match');
        
        if (termMatch === defMatch) {
            // Correct match
            selectedTerm.classList.add('matched');
            selectedDef.classList.add('matched');
            
            // Disable the matched items
            selectedTerm.onclick = null;
            selectedDef.onclick = null;
            
            // Show feedback
            const feedback = document.getElementById('matchFeedback');
            feedback.textContent = 'Correct match!';
            feedback.className = 'feedback-message success';
            feedback.style.display = 'block';
            
            // Award points
            updateScore(3);
            
            // Check if all items are matched
            const unmatchedTerms = document.querySelectorAll('.match-column:first-child .match-item:not(.matched)');
            if (unmatchedTerms.length === 0) {
                feedback.textContent = 'Excellent! You matched all the flying terms correctly!';
                showAchievement('Flight Expert', 'You matched all flying terms correctly!');
            }
            
            // Clear feedback after a delay
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 2000);
        } else {
            // Incorrect match
            const feedback = document.getElementById('matchFeedback');
            feedback.textContent = 'That\'s not a correct match. Try again.';
            feedback.className = 'feedback-message error';
            feedback.style.display = 'block';
            
            // Clear feedback after a delay
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 2000);
        }
        
        // Reset selections
        selectedTerm.removeAttribute('data-selected');
        selectedDef.removeAttribute('data-selected');
        selectedTerm = null;
        selectedDef = null;
    }
}

// Check if preloaded images are needed for any activities
window.addEventListener('DOMContentLoaded', () => {
    // This space is for any initializations related to questions and activities
});
