import { GoogleGenerativeAI } from '@google/generative-ai';

// Check if API key exists
if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Legal assistant system prompt
const SYSTEM_PROMPT = `You are Turn2Law's AI Legal Assistant. Your role is to:
1. Provide accurate legal information and guidance
2. Help users understand basic legal concepts and procedures
3. Assist with legal document understanding
4. Direct users to appropriate legal resources
5. Maintain confidentiality and professional tone
6. Clarify when a question requires consultation with a human lawyer

Remember: Always provide a disclaimer that your responses are for informational purposes only and not legal advice.`;

export async function POST(request: Request) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON in request body',
          status: 'error'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { message } = body;

    if (!message) {
      return new Response(
        JSON.stringify({ 
          error: 'Message is required',
          status: 'error'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Log the API key (first few characters) for debugging
    const apiKeyPreview = process.env.GEMINI_API_KEY.substring(0, 10) + '...';
    console.log(`Using API key: ${apiKeyPreview}`);

    try {
      // Initialize the model
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      // Create a simple prompt
      const prompt = `You are a legal assistant. Please respond to this question: ${message}`;
      
      // Generate content
      console.log('Sending request to Gemini API...');
      const result = await model.generateContent(prompt);
      
      // Get the response
      console.log('Getting response from Gemini API...');
      const response = await result.response;
      
      // Get the text
      console.log('Extracting text from response...');
      const text = response.text();
      
      console.log('Response received successfully');
      
      // Return the response
      return new Response(
        JSON.stringify({ 
          response: text,
          status: 'success'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Log detailed error information
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      // Return a user-friendly error message
      return new Response(
        JSON.stringify({ 
          error: 'I apologize, but I encountered an error processing your request. Please try again or rephrase your question.',
          status: 'error'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Request processing error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request',
        status: 'error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}