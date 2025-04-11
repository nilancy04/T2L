// Simple script to test Gemini API directly
require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiDirect() {
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
    
    // Initialize the model
    console.log('Initializing model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Generate a simple response
    const prompt = "What is 2+2?";
    console.log('Sending test prompt:', prompt);
    
    console.log('Generating content...');
    const result = await model.generateContent(prompt);
    
    console.log('Getting response...');
    const response = await result.response;
    
    console.log('Extracting text...');
    const text = response.text();
    
    console.log('Received response:', text);
    
    console.log('Gemini API test successful!');
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
testGeminiDirect(); 