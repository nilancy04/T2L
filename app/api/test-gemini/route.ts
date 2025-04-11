import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing GEMINI_API_KEY environment variable',
          status: 'error'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Log the API key (first few characters) for debugging
    const apiKeyPreview = process.env.GEMINI_API_KEY.substring(0, 10) + '...';
    console.log(`Using API key: ${apiKeyPreview}`);

    // Initialize the API
    console.log('Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Initialize the model
    console.log('Initializing model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
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
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Gemini API is working!',
        response: text,
        prompt: prompt
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Gemini API Test Error:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Return detailed error information
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        status: 'error',
        apiKey: process.env.GEMINI_API_KEY ? 'Present' : 'Missing'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 