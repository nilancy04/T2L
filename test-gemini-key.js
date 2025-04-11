// Simple script to test Gemini API key
require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiKey() {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return;
    }

    console.log('API Key:', process.env.GEMINI_API_KEY);
    console.log('API Key length:', process.env.GEMINI_API_KEY.length);

    // Initialize the API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try to list available models
    try {
      console.log('Listing available models...');
      const models = await genAI.listModels();
      console.log('Available models:', models);
    } catch (listError) {
      console.error('Error listing models:', listError.message);
    }
    
    // Try with gemini-1.0-pro model
    console.log('Trying with gemini-1.0-pro model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
    
    console.log('Model initialized successfully');
    
    // Generate a simple response
    console.log('Sending request to Gemini API...');
    const result = await model.generateContent('Hello, are you working?');
    const response = await result.response;
    const text = response.text();
    
    console.log('Response received:');
    console.log(text);
    
    console.log('Gemini API test successful!');
  } catch (error) {
    console.error('Gemini API Test Error:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
}

// Run the test
testGeminiKey(); 