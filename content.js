chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeSelection") {
      performAIAnalysis(request.text)
        .then(analysis => {
          createAnalysisPopup(analysis);
        })
        .catch(error => {
          console.error("AI Analysis Error:", error);
          alert("Sorry, AI analysis failed. Please try again.");
        });
    }
  });
  
  async function performAIAnalysis(text) {
    try {
      // Simulated AI API calls (replace with actual Chrome AI APIs when available)
      const summarization = await simulateAISummarize(text);
      const rewrite = await simulateAIRewrite(text);
      const translation = await simulateAITranslate(text, "es");
  
      return {
        summary: summarization,
        academicRewrite: rewrite,
        translation: translation
      };
    } catch (error) {
      console.error("Analysis Error:", error);
      throw error;
    }
  }
  
  function createAnalysisPopup(analysis) {
    // Remove existing popup if any
    const existingPopup = document.getElementById('studysync-analysis-popup');
    if (existingPopup) {
      existingPopup.remove();
    }
  
    const popupContainer = document.createElement('div');
    popupContainer.id = 'studysync-analysis-popup';
    popupContainer.innerHTML = `
      <div style="
        position: fixed; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        width: 500px; 
        max-height: 80vh; 
        overflow-y: auto; 
        background: white; 
        border: 2px solid #4CAF50; 
        border-radius: 10px; 
        padding: 20px; 
        box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
        z-index: 10000;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h2 style="margin: 0; color: #4CAF50;">StudySync AI Analysis</h2>
          <button id="close-studysync-popup" style="
            background: none; 
            border: none; 
            font-size: 24px; 
            cursor: pointer;
          ">×</button>
        </div>
        
        <div style="background: #f0f0f0; border-radius: 5px; padding: 15px; margin-bottom: 15px;">
          <h3 style="color: #4CAF50; margin-top: 0;">Summary</h3>
          <p>${analysis.summary}</p>
        </div>
        
        <div style="background: #e6f3e6; border-radius: 5px; padding: 15px; margin-bottom: 15px;">
          <h3 style="color: #4CAF50; margin-top: 0;">Academic Rewrite</h3>
          <p>${analysis.academicRewrite}</p>
        </div>
        
        <div style="background: #f0f0f0; border-radius: 5px; padding: 15px;">
          <h3 style="color: #4CAF50; margin-top: 0;">Spanish Translation</h3>
          <p>${analysis.translation}</p>
        </div>
      </div>
    `;
  
    document.body.appendChild(popupContainer);
  
    // Add close button functionality
    const closeButton = document.getElementById('close-studysync-popup');
    closeButton.addEventListener('click', () => {
      popupContainer.remove();
    });
  }
  
  // Simulated AI functions (to be replaced with actual Chrome AI APIs)
  async function simulateAISummarize(text) {
    // Mock summarization
    return `Summary: ${text.slice(0, 200)}... (Shortened for demonstration)`;
  }
  
  async function simulateAIRewrite(text) {
    // Mock academic rewrite
    return `Academic Rewrite: ${text.replace(/simple/g, 'sophisticated').slice(0, 250)}...`;
  }
  
  async function simulateAITranslate(text, language) {
    // Mock translation
    const translations = {
      'es': `Traducción: ${text.slice(0, 200)}...`
    };
    return translations[language] || text;
  }