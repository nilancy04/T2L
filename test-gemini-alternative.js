// Alternative approach to test Gemini API
require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiAlternative() {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return;
    }

    // Log the API key (first few characters) for debugging
    const apiKeyPreview = process.env.GEMINI_API_KEY.substring(0, 10) + '...';
    console.log(`Using API key: ${apiKeyPreview}`);

    // Initialize the API
    console.log('Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try different model names
    const modelNames = [
      'gemini-pro',
      'gemini-1.0-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-2.0-flash'
    ];
    
    for (const modelName of modelNames) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        
        // Initialize the model
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Generate a simple response
        const prompt = "What is 2+2?";
        console.log('Sending test prompt:', prompt);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('Received response:', text);
        console.log(`Model ${modelName} works!`);
        
        // If we get here, the model works
        return;
      } catch (modelError) {
        console.error(`Error with model ${modelName}:`, modelError.message);
      }
    }
    
    console.error('None of the models worked. Please check your API key and permissions.');
  } catch (error) {
    console.error('Gemini API Test Error:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
}

// Run the test
testGeminiAlternative(); 